import type { Express, Request, Response } from "express";
import type { Server } from "http";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { buildKnowledge, getContent } from "./content";

const startedAt = Date.now();

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  /* ------------------------------------------------------------------
   * Health check — ping this every 5 min with UptimeRobot so Render's
   * free plan doesn't put the server to sleep.
   * ------------------------------------------------------------------ */
  app.get("/api/health", (_req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ status: "ok", uptime: Math.round((Date.now() - startedAt) / 1000), time: new Date().toISOString() });
  });

  /* ------------------------------------------------------------------
   * AI chat assistant — free AI providers, key goes in .env
   *   GEMINI_API_KEY  (Google AI Studio, free tier)   ← used first
   *   GROQ_API_KEY    (console.groq.com, free tier)   ← used if no Gemini key
   * Returns 503 if neither key is set; the frontend then uses its built-in bot.
   * ------------------------------------------------------------------ */
  const hits = new Map<string, { n: number; reset: number }>();
  app.post("/api/chat", async (req: Request, res: Response) => {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "anon";
    const now = Date.now();
    const h = hits.get(ip);
    if (!h || h.reset < now) hits.set(ip, { n: 1, reset: now + 60_000 });
    else if (++h.n > 15) return res.status(429).json({ error: "Too many messages, please wait a minute." });

    const raw = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const messages = raw
      .filter((m: any) => (m?.role === "user" || m?.role === "assistant") && typeof m.text === "string")
      .slice(-10)
      .map((m: any) => ({ role: m.role as "user" | "assistant", text: String(m.text).slice(0, 1000) }));
    if (!messages.length || messages[messages.length - 1].role !== "user") return res.status(400).json({ error: "Bad request" });

    const system = `You are the friendly assistant on Rasul Panari's portfolio website. Answer visitors' questions about Rasul (recruiters, clients) using ONLY the facts below. Be concise (2–5 sentences or a short list), warm and professional. Speak about Rasul in the third person. If something isn't in the facts, say you don't know and suggest contacting him by email or WhatsApp. Never invent numbers, companies or dates. Reply in the same language the visitor writes in.\n\nFACTS:\n${buildKnowledge()}`;

    try {
      let reply = "";
      if (process.env.GEMINI_API_KEY) reply = await gemini(system, messages);
      else if (process.env.GROQ_API_KEY) reply = await groq(system, messages);
      else return res.status(503).json({ error: "AI not configured" });
      if (!reply) throw new Error("empty reply");
      res.json({ reply });
    } catch (err) {
      console.error("[chat]", (err as Error).message);
      res.status(502).json({ error: "AI unavailable" });
    }
  });


  /* ------------------------------------------------------------------
   * Certificates from a public Google Drive folder.
   * Needs GOOGLE_API_KEY (free, Google Cloud → enable "Google Drive API").
   * Folder ID comes from certificates.json (editable in /admin).
   * Cached for 30 minutes. Returns [] if not configured → site uses certificates.json.
   * ------------------------------------------------------------------ */
  let certCache: { at: number; folder: string; items: any[] } | null = null;
  app.get("/api/certificates", async (_req, res) => {
    const key = process.env.GOOGLE_API_KEY;
    const folder = (getContent() as any).certificatesFolder || process.env.DRIVE_CERT_FOLDER_ID || "";
    res.set("Cache-Control", "public, max-age=600");
    if (!key || !folder) return res.json({ items: [], source: "none" });
    if (certCache && certCache.folder === folder && Date.now() - certCache.at < 30 * 60_000) {
      return res.json({ items: certCache.items, source: "drive" });
    }
    try {
      const items: any[] = [];
      let pageToken = "";
      do {
        const url = new URL("https://www.googleapis.com/drive/v3/files");
        url.searchParams.set("q", `'${folder.replace(/[^\w-]/g, "")}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'`);
        url.searchParams.set("fields", "nextPageToken, files(id, name, mimeType, createdTime)");
        url.searchParams.set("orderBy", "name");
        url.searchParams.set("pageSize", "200");
        url.searchParams.set("key", key);
        if (pageToken) url.searchParams.set("pageToken", pageToken);
        const r = await fetch(url);
        if (!r.ok) throw new Error(`Drive ${r.status}: ${(await r.text()).slice(0, 200)}`);
        const d: any = await r.json();
        for (const f of d.files ?? []) {
          items.push({
            id: f.id,
            name: prettyName(f.name),
            fileName: f.name,
            mimeType: f.mimeType,
            thumbnail: `https://drive.google.com/thumbnail?id=${f.id}&sz=w800`,
            preview: `https://drive.google.com/file/d/${f.id}/preview`,
            view: `https://drive.google.com/file/d/${f.id}/view`,
            download: `https://drive.google.com/uc?export=download&id=${f.id}`,
          });
        }
        pageToken = d.nextPageToken || "";
      } while (pageToken);
      certCache = { at: Date.now(), folder, items };
      res.json({ items, source: "drive" });
    } catch (e) {
      console.error("[certificates]", (e as Error).message);
      res.json({ items: certCache?.items ?? [], source: certCache ? "drive-cache" : "error" });
    }
  });

  /* ------------------------------------------------------------------
   * Admin panel (Decap CMS) — GitHub login via OAuth.
   * Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env
   * ------------------------------------------------------------------ */
  app.get("/api/auth", (req, res) => {
    const id = process.env.GITHUB_CLIENT_ID;
    if (!id) return res.status(500).send("GITHUB_CLIENT_ID is not set on the server.");
    const state = crypto.randomBytes(16).toString("hex");
    res.setHeader("Set-Cookie", `oauth_state=${state}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax${isHttps(req) ? "; Secure" : ""}`);
    const redirect = `${origin(req)}/api/callback`;
    const url = new URL("https://github.com/login/oauth/authorize");
    url.searchParams.set("client_id", id);
    url.searchParams.set("redirect_uri", redirect);
    url.searchParams.set("scope", "repo,user");
    url.searchParams.set("state", state);
    res.redirect(url.toString());
  });

  app.get("/api/callback", async (req, res) => {
    const send = (status: "success" | "error", payload: object) => {
      const msg = `authorization:github:${status}:${JSON.stringify(payload)}`;
      res.set("Content-Type", "text/html").send(`<!doctype html><html><body><script>
(function(){
  function receive(e){ window.opener.postMessage(${JSON.stringify(msg)}, e.origin); window.removeEventListener("message", receive, false); }
  window.addEventListener("message", receive, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script><p>Logging you in…</p></body></html>`);
    };
    try {
      const cookieState = /(?:^|;\s*)oauth_state=([a-f0-9]+)/.exec(req.headers.cookie || "")?.[1];
      if (!req.query.state || req.query.state !== cookieState) return send("error", { message: "Invalid state" });
      const r = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: req.query.code,
          redirect_uri: `${origin(req)}/api/callback`,
        }),
      });
      const data: any = await r.json();
      if (!data.access_token) return send("error", { message: data.error_description || "No token" });
      send("success", { token: data.access_token, provider: "github" });
    } catch (e) {
      send("error", { message: (e as Error).message });
    }
  });

  /* ------------------------------------------------------------------
   * Admin config with this site's URL filled in, plus SEO files.
   * ------------------------------------------------------------------ */
  app.get("/admin/config.yml", (req, res) => {
    try {
      const yml = fs.readFileSync(path.resolve(process.cwd(), "client/public/admin/config.yml"), "utf-8");
      res.type("text/yaml").set("Cache-Control", "no-store").send(yml.replace(/__SITE_URL__/g, origin(req)));
    } catch {
      res.status(404).end();
    }
  });

  app.get(["/admin", "/admin/"], (_req, res) => {
    res.set("Cache-Control", "no-store").sendFile(path.resolve(process.cwd(), "client/public/admin/index.html"));
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${origin(req)}/sitemap.xml\n`);
  });

  app.get("/sitemap.xml", (req, res) => {
    const base = origin(req);
    const c = getContent();
    const urls = ["/", "/blog", ...c.projects.map((p: any) => `/projects/${p.slug}`), ...c.blog.map((b: any) => `/blog/${b.slug}`)];
    res.type("application/xml").send(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${base}${u}</loc></url>`)
        .join("\n")}\n</urlset>`,
    );
  });

  return httpServer;
}

function isHttps(req: Request) {
  return req.secure || req.headers["x-forwarded-proto"] === "https";
}
export function origin(req: Request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  return `${isHttps(req) ? "https" : "http"}://${req.headers["x-forwarded-host"] || req.headers.host}`;
}

/** "DevTown_Backend-Cert.pdf" → "DevTown Backend Cert" */
function prettyName(n: string) {
  return n.replace(/\.[a-z0-9]{2,5}$/i, "").replace(/[_]+/g, " ").replace(/\s+/g, " ").trim();
}

type Msg = { role: "user" | "assistant"; text: string };

async function gemini(system: string, messages: Msg[]): Promise<string> {
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY! },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.text }] })),
      generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
    }),
  });
  if (!r.ok) throw new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d: any = await r.json();
  return d?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("")?.trim() ?? "";
}

async function groq(system: string, messages: Msg[]): Promise<string> {
  const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 500,
      messages: [{ role: "system", content: system }, ...messages.map((m) => ({ role: m.role, content: m.text }))],
    }),
  });
  if (!r.ok) throw new Error(`Groq ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const d: any = await r.json();
  return d?.choices?.[0]?.message?.content?.trim() ?? "";
}