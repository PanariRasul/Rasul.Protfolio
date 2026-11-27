import { useEffect } from "react";

const DEFAULT_TITLE = "Rasul Panari | Full Stack Developer — ERP, CRM & POS Apps";
const DEFAULT_DESC =
  "Portfolio of Rasul Panari, Full Stack Developer in Bengaluru building ERP, CRM, POS and business apps with React, Node.js, PostgreSQL and Prisma.";

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

/** Sets page title + description + OG tags for the current page. */
export function useSeo(title?: string, description?: string, image?: string) {
  useEffect(() => {
    const t = title ? `${title} | Rasul Panari` : DEFAULT_TITLE;
    const d = description || DEFAULT_DESC;
    document.title = t;
    setMeta("name", "description", d);
    setMeta("property", "og:title", t);
    setMeta("property", "og:description", d);
    setMeta("name", "twitter:title", t);
    setMeta("name", "twitter:description", d);
    if (image && !image.endsWith(".svg")) {
      const abs = image.startsWith("http") ? image : window.location.origin + image;
      setMeta("property", "og:image", abs);
    }
    setMeta("property", "og:url", window.location.href);
  }, [title, description, image]);
}

/** Global UI events (open resume viewer / command palette from anywhere). */
export const openResume = () => window.dispatchEvent(new Event("open-resume"));
export const openCommand = () => window.dispatchEvent(new Event("open-command"));
