import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { site, whatsappLink } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "./BlogPreview";

// Free hit counter (counterapi.dev). Counts once per browser session. Hidden if unavailable.
const COUNTER_NS = import.meta.env.VITE_COUNTER_NAMESPACE || "rasulpanari-portfolio";

function useVisitors() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let counted = false;
    try { counted = sessionStorage.getItem("visit-counted") === "1"; } catch {}
    const url = `https://api.counterapi.dev/v1/${COUNTER_NS}/visits${counted ? "" : "/up"}`;
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (typeof d?.count === "number") {
          setCount(d.count);
          try { sessionStorage.setItem("visit-counted", "1"); } catch {}
        }
      })
      .catch(() => {});
  }, []);
  return count;
}

export default function Footer() {
  const { t } = useI18n();
  const visitors = useVisitors();
  const links = [
    { href: site.links.github, icon: <Github className="w-4 h-4" />, label: "GitHub" },
    { href: site.links.linkedin, icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
    { href: `mailto:${site.email}`, icon: <Mail className="w-4 h-4" />, label: "Email" },
    { href: whatsappLink(), icon: <FaWhatsapp className="w-4 h-4" />, label: "WhatsApp" },
  ];
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {site.name}. {t("footer.rights")}</p>
        <div className="flex items-center gap-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}
               className="p-2 rounded-full border border-border hover:text-primary hover:border-primary transition-colors">
              {l.icon}
            </a>
          ))}
        </div>
        <p className="flex items-center gap-3 text-xs">
          <span>{t("footer.updated")}: {formatDate(site.lastUpdated)}</span>
          {visitors !== null && (
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {visitors.toLocaleString("en-IN")} {t("footer.visitors")}</span>
          )}
        </p>
      </div>
    </footer>
  );
}
