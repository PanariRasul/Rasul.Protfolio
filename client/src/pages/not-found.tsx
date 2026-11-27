import { Link } from "wouter";
import { motion } from "framer-motion";
import { Home, Terminal } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSeo } from "@/lib/seo";

export default function NotFound() {
  const { t } = useI18n();
  useSeo(t("notfound.title"));
  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-lg">
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-8xl md:text-9xl font-bold text-primary glow-text tracking-tighter"
        >
          404
        </motion.p>
        <div className="mt-6 mb-8 rounded-xl border border-border bg-card text-left font-mono text-sm p-4">
          <p className="text-muted-foreground flex items-center gap-2"><Terminal className="w-4 h-4" /> rasul@portfolio:~$</p>
          <p className="mt-2">cd {typeof window !== "undefined" ? window.location.pathname : ""}</p>
          <p className="text-red-500">bash: no such page or directory</p>
        </div>
        <h1 className="text-2xl font-bold mb-2">{t("notfound.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("notfound.text")}</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
          <Home className="w-4 h-4" /> {t("notfound.home")}
        </Link>
      </div>
    </main>
  );
}
