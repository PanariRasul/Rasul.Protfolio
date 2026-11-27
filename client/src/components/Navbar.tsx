import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, FileText, Command } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useI18n, LANGS } from "@/lib/i18n";
import { openCommand, openResume } from "@/lib/seo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.experience"), href: "/#experience" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  const ThemeBtn = (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  const LangBtn = (
    <div className="flex items-center rounded-full border border-border p-0.5 text-xs" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2 py-1 rounded-full transition-colors ${lang === l.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          aria-pressed={lang === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group" aria-label="Home">
            <img src="/logo.webp" alt="" width={34} height={34} className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-xl tracking-tighter text-foreground">
              RP<span className="text-primary">.DEV</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-baseline">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all px-3 py-2 rounded-full text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="h-6 w-px bg-border" />
            <button
              onClick={openCommand}
              className="hidden xl:flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-primary/50 transition-colors"
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5" /> Ctrl K
            </button>
            {LangBtn}
            {ThemeBtn}
            <button
              onClick={openResume}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              {t("nav.resume")}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {ThemeBtn}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary hover:bg-muted block px-3 py-3 rounded-xl text-base font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 px-3">
                {LangBtn}
                <button
                  onClick={() => { setIsOpen(false); openResume(); }}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" /> {t("nav.resume")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
