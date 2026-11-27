import { motion } from "framer-motion";
import { Monitor, Server, Database, Smartphone, Plug, Wrench, Languages, Code2, type LucideIcon } from "lucide-react";
import { skills } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

const ICONS: LucideIcon[] = [Monitor, Server, Database, Smartphone, Plug, Wrench];

export default function Skills() {
  const { t } = useI18n();
  return (
    <section id="skills" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title={t("skills.title")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.groups.map((g, i) => {
            const Icon = ICONS[i] ?? Code2;
            return (
              <motion.div
                key={g.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg"><Icon className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-bold text-lg">{g.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="text-xs font-mono px-2.5 py-1.5 rounded-md bg-muted text-foreground/80 border border-border">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
        {skills.languages?.length > 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-2">
            <Languages className="w-4 h-4 text-primary" /> {t("skills.languages")}: {skills.languages.join(" · ")}
          </p>
        )}
      </div>
    </section>
  );
}
