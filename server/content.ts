import fs from "fs";
import path from "path";

/** Reads the JSON content files at runtime (same files the admin panel edits). */
const CONTENT_DIR = path.resolve(process.cwd(), "client", "src", "content");

function readJson<T = any>(file: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8"));
  } catch {
    return null;
  }
}

function readDir<T = any>(dir: string): T[] {
  try {
    return fs
      .readdirSync(path.join(CONTENT_DIR, dir))
      .filter((f) => f.endsWith(".json"))
      .map((f) => readJson<T>(path.join(dir, f)))
      .filter(Boolean) as T[];
  } catch {
    return [];
  }
}

let cache: { at: number; data: ReturnType<typeof load> } | null = null;

function load() {
  return {
    site: readJson("site.json") ?? {},
    experience: readJson("experience.json")?.items ?? [],
    education: readJson("education.json")?.items ?? [],
    certificates: readJson("certificates.json")?.items ?? [],
    certificatesFolder: readJson("certificates.json")?.driveFolderId ?? "",
    skills: readJson("skills.json") ?? { groups: [], languages: [] },
    services: readJson("services.json")?.items ?? [],
    projects: readDir("projects").sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99)),
    blog: readDir("blog"),
  };
}

export function getContent() {
  if (!cache || Date.now() - cache.at > 60_000) cache = { at: Date.now(), data: load() };
  return cache.data;
}

/** Plain-text knowledge base for the AI assistant. */
export function buildKnowledge(): string {
  const c = getContent();
  const s: any = c.site;
  const lines: string[] = [];
  lines.push(`NAME: ${s.name}. TITLE: ${s.title}. LOCATION: ${s.location}.`);
  lines.push(`AVAILABILITY: ${s.availability?.label} — ${s.availability?.note}.`);
  lines.push(`CONTACT: email ${s.email}; phone/WhatsApp ${s.phone}; GitHub ${s.links?.github}; LinkedIn ${s.links?.linkedin}${s.links?.bookingUrl ? `; book a call ${s.links.bookingUrl}` : ""}.`);
  lines.push(`SUMMARY: ${s.about?.summary}`);
  for (const e of c.experience as any[]) lines.push(`EXPERIENCE: ${e.role} at ${e.company}, ${e.location} (${e.start} – ${e.end}). ${e.points?.join(" ")}`);
  lines.push(`SKILLS: ${(c.skills as any).groups?.map((g: any) => `${g.name}: ${g.items.join(", ")}`).join(" | ")}`);
  lines.push(`SPOKEN LANGUAGES: ${(c.skills as any).languages?.join(", ")}`);
  for (const p of c.projects as any[]) {
    const stack = (p.techStack ?? []).map((g: any) => `${g.label}: ${g.items.join(", ")}`).join("; ");
    lines.push(
      `PROJECT [${p.category === "erp" ? "ERP/CRM app" : "Website"}]: ${p.title} — ${p.tagline}. ${p.overview} Features: ${(p.features ?? []).join("; ")}. Stack: ${stack}. ${p.private ? "Private internal tool." : `Live: ${p.liveUrl}`}`,
    );
  }
  for (const e of c.education as any[]) lines.push(`EDUCATION: ${e.title}, ${e.place} (${e.score})`);
  for (const ce of c.certificates as any[]) lines.push(`CERTIFICATION: ${ce.name} — ${ce.issuer}`);
  for (const sv of c.services as any[]) lines.push(`SERVICE: ${sv.title} — ${sv.text}${sv.price ? ` (${sv.price})` : ""}`);
  return lines.join("\n");
}