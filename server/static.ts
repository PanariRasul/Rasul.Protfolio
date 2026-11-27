import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getContent } from "./content";
import { origin } from "./routes";

const esc = (s: string) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }
  const template = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");

  // Hashed build files can be cached for a year; everything else briefly.
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), { immutable: true, maxAge: "1y" }),
  );
  app.use(express.static(distPath, { maxAge: "1h", index: false }));

  // All other routes → index.html, with page-specific SEO tags so shared links show the right preview.
  app.use("*", (req, res) => {
    const base = origin(req);
    const url = req.originalUrl.split("?")[0];
    const c = getContent();
    let title = "", desc = "", image = "/og-image.png", status = 200;

    const pm = /^\/projects\/([^/]+)\/?$/.exec(url);
    const bm = /^\/blog\/([^/]+)\/?$/.exec(url);
    if (pm) {
      const p: any = c.projects.find((x: any) => x.slug === pm[1]);
      if (p) {
        title = `${p.title} — ${p.tagline} | Rasul Panari`;
        desc = p.cardDescription;
        if (p.images?.[0] && !p.images[0].endsWith(".svg")) image = p.images[0];
      } else status = 404;
    } else if (bm) {
      const b: any = c.blog.find((x: any) => x.slug === bm[1]);
      if (b) { title = `${b.title} | Rasul Panari`; desc = b.summary; } else status = 404;
    } else if (url !== "/" && url !== "/blog" && url !== "/blog/") {
      status = 404;
    }

    let html = template
      .replace(/(property="og:image" content=")\/og-image\.png/, `$1${base}${image}`)
      .replace(/(name="twitter:image" content=")\/og-image\.png/, `$1${base}${image}`)
      .replace(/(property="og:url" content=")\//, `$1${base}${url}`)
      .replace("</head>", `<link rel="canonical" href="${esc(base + url)}" />\n  </head>`);
    if (title) {
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
        .replace(/(property="og:title" content=")[^"]*/, `$1${esc(title)}`)
        .replace(/(name="twitter:title" content=")[^"]*/, `$1${esc(title)}`);
    }
    if (desc) {
      html = html
        .replace(/(name="description" content=")[^"]*/, `$1${esc(desc)}`)
        .replace(/(property="og:description" content=")[^"]*/, `$1${esc(desc)}`)
        .replace(/(name="twitter:description" content=")[^"]*/, `$1${esc(desc)}`);
    }
    res.status(status).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).send(html);
  });
}
