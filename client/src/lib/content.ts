/**
 * All site content lives in client/src/content/*.json.
 * These files are edited from the admin panel (/admin) — no database needed.
 */
import siteJson from "@/content/site.json";
import experienceJson from "@/content/experience.json";
import educationJson from "@/content/education.json";
import certificatesJson from "@/content/certificates.json";
import skillsJson from "@/content/skills.json";
import servicesJson from "@/content/services.json";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "erp" | "website";
  order: number;
  featured: boolean;
  private: boolean;
  liveUrl: string;
  codeUrl: string;
  role: string;
  timeline: string;
  cardDescription: string;
  overview: string;
  problem: string;
  solution: string;
  result: string;
  features: string[];
  contributions: string[];
  challenges: { challenge: string; solution: string }[];
  techStack: { label: string; items: string[] }[];
  highlights: { value: string; label: string }[];
  images: string[];
  tags: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  body: string;
}

const projectFiles = import.meta.glob<Project>("../content/projects/*.json", {
  eager: true,
  import: "default",
});
const blogFiles = import.meta.glob<BlogPost>("../content/blog/*.json", {
  eager: true,
  import: "default",
});

const withDefaults = (p: Partial<Project>): Project => ({
  slug: "",
  title: "Untitled",
  tagline: "",
  category: "erp",
  order: 99,
  featured: false,
  private: false,
  liveUrl: "",
  codeUrl: "",
  role: "",
  timeline: "",
  cardDescription: "",
  overview: "",
  problem: "",
  solution: "",
  result: "",
  features: [],
  contributions: [],
  challenges: [],
  techStack: [],
  highlights: [],
  images: [],
  tags: [],
  ...p,
});

export const projects: Project[] = Object.values(projectFiles)
  .map(withDefaults)
  .filter((p) => p.slug)
  .sort((a, b) => a.order - b.order);

export const blogPosts: BlogPost[] = Object.values(blogFiles)
  .filter((p) => p?.slug)
  .map((p) => ({ ...p, tags: p.tags ?? [], summary: p.summary ?? "", body: p.body ?? "" }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const site = siteJson;
export const experience = experienceJson.items;
export const education = educationJson.items;
export const certificates = certificatesJson.items;
export const skills = skillsJson;
export const services = servicesJson.items;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const whatsappLink = (msg = "Hi Rasul, I saw your portfolio and would like to connect.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const erpCount = projects.filter((p) => p.category === "erp").length;
export const websiteCount = projects.filter((p) => p.category === "website").length;
