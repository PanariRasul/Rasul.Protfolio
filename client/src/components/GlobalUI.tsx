import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowUp, Download, ExternalLink, FileText, Home, User, Briefcase, FolderGit2, Mail, Newspaper, Moon, Github, Linkedin, Wrench, Languages } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { projects, blogPosts, site, whatsappLink } from "@/lib/content";
import { useI18n, LANGS } from "@/lib/i18n";
import { useTheme } from "@/hooks/use-theme";

/* ---------------- Loading screen (once per browser session) ---------------- */
export function Loader() {
  const [show, setShow] = useState(() => {
    try { return sessionStorage.getItem("loaded") !== "1"; } catch { return false; }
  });
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("loaded", "1"); } catch {}
    }, 900);
    return () => clearTimeout(id);
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-4"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.img
            src="/logo.webp"
            alt=""
            width={80}
            height={80}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 object-contain"
          />
          <div className="h-1 w-32 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Scroll progress + back to top + WhatsApp ---------------- */
export function ScrollExtras() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]" aria-hidden />
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-3">
        <AnimatePresence>
          {showTop && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="p-3 rounded-full bg-card border border-border shadow-lg hover:border-primary hover:text-primary transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="p-3 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform"
        >
          <FaWhatsapp className="w-6 h-6" />
        </a>
      </div>
    </>
  );
}

/* ---------------- Resume viewer ---------------- */
export function ResumeViewer() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("open-resume", on);
    return () => window.removeEventListener("open-resume", on);
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between pr-8">
          <div>
            <DialogTitle>{site.name} — Resume</DialogTitle>
            <DialogDescription className="sr-only">Resume preview</DialogDescription>
          </div>
          <div className="flex gap-2">
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-border hover:text-primary" aria-label="Open in new tab">
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href={site.resume} download="Rasul_Panari_Resume.pdf" className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm">
              <Download className="w-4 h-4" /> {t("resume.download")}
            </a>
          </div>
        </div>
        <object data={`${site.resume}#view=FitH`} type="application/pdf" className="flex-1 w-full rounded-lg border border-border bg-muted">
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-6">
            <FileText className="w-10 h-10 text-primary" />
            <p className="text-sm text-muted-foreground">Your browser can't preview PDFs here.</p>
            <a href={site.resume} download className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">{t("resume.download")}</a>
          </div>
        </object>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Command palette (Ctrl/Cmd + K) ---------------- */
export function CommandPalette() {
  const { t, setLang } = useI18n();
  const { theme, setTheme } = useTheme();
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command", onOpen);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto")) {
      window.open(href, "_blank", "noopener");
    } else if (href.startsWith("/#")) {
      if (window.location.pathname !== "/") navigate("/");
      setTimeout(() => document.getElementById(href.slice(2))?.scrollIntoView({ behavior: "smooth" }), 50);
    } else navigate(href);
  };

  const sections = [
    { label: t("nav.home"), href: "/#home", icon: Home },
    { label: t("nav.about"), href: "/#about", icon: User },
    { label: t("nav.services"), href: "/#services", icon: Wrench },
    { label: t("nav.experience"), href: "/#experience", icon: Briefcase },
    { label: t("nav.projects"), href: "/#projects", icon: FolderGit2 },
    { label: t("nav.blog"), href: "/blog", icon: Newspaper },
    { label: t("nav.contact"), href: "/#contact", icon: Mail },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 max-w-lg">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">{t("cmd.hint")}</DialogDescription>
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-input]]:h-12">
          <CommandInput placeholder={t("cmd.placeholder")} />
          <CommandList className="max-h-[60vh]">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Navigate">
              {sections.map((s) => (
                <CommandItem key={s.href} onSelect={() => go(s.href)}>
                  <s.icon className="mr-2 h-4 w-4" /> {s.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading={t("nav.projects")}>
              {projects.map((p) => (
                <CommandItem key={p.slug} value={`project ${p.title} ${p.tagline}`} onSelect={() => go(`/projects/${p.slug}`)}>
                  <FolderGit2 className="mr-2 h-4 w-4" /> {p.title}
                  <span className="ml-auto text-xs text-muted-foreground">{p.category === "erp" ? "ERP/CRM" : "Website"}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {blogPosts.length > 0 && (
              <CommandGroup heading={t("nav.blog")}>
                {blogPosts.map((p) => (
                  <CommandItem key={p.slug} value={`post ${p.title}`} onSelect={() => go(`/blog/${p.slug}`)}>
                    <Newspaper className="mr-2 h-4 w-4" /> {p.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => { setOpen(false); window.dispatchEvent(new Event("open-resume")); }}>
                <FileText className="mr-2 h-4 w-4" /> {t("hero.viewResume")}
              </CommandItem>
              <CommandItem onSelect={() => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); }}>
                <Moon className="mr-2 h-4 w-4" /> Toggle theme
              </CommandItem>
              {LANGS.map((l) => (
                <CommandItem key={l.code} value={`language ${l.code} ${l.label}`} onSelect={() => { setLang(l.code); setOpen(false); }}>
                  <Languages className="mr-2 h-4 w-4" /> Language: {l.code === "en" ? "English" : l.code === "hi" ? "हिन्दी" : "ಕನ್ನಡ"}
                </CommandItem>
              ))}
              <CommandItem onSelect={() => go(whatsappLink())}><FaWhatsapp className="mr-2 h-4 w-4" /> WhatsApp</CommandItem>
              <CommandItem onSelect={() => go(`mailto:${site.email}`)}><Mail className="mr-2 h-4 w-4" /> Email</CommandItem>
              <CommandItem onSelect={() => go(site.links.github)}><Github className="mr-2 h-4 w-4" /> GitHub</CommandItem>
              <CommandItem onSelect={() => go(site.links.linkedin)}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Google Analytics (only if VITE_GA_ID is set) ---------------- */
export function Analytics() {
  const [location] = useLocation();
  const id = import.meta.env.VITE_GA_ID as string | undefined;
  useEffect(() => {
    if (!id || (window as any).gtag) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function () { (window as any).dataLayer.push(arguments); };
    (window as any).gtag("js", new Date());
    (window as any).gtag("config", id, { send_page_view: false });
  }, [id]);
  useEffect(() => {
    if (id && (window as any).gtag) (window as any).gtag("event", "page_view", { page_path: location });
  }, [id, location]);
  return null;
}

/* Scroll to #hash after route changes (e.g. /#projects from a project page) */
export function HashScroll() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 150);
    else window.scrollTo(0, 0);
  }, [location]);
  return null;
}
