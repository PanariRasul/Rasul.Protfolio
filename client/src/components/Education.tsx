import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Award, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { education, certificates } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

const ICONS = { degree: GraduationCap, book: BookOpen, school: School } as const;
type Cert = (typeof certificates)[number];

export default function Education() {
  const { t } = useI18n();
  const [cert, setCert] = useState<Cert | null>(null);

  return (
    <section id="education" className="py-20 bg-background relative scroll-mt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title={t("education.title")} />

        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          {education.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? GraduationCap;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="absolute -left-10 md:-left-14 top-1 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                    <span className="text-primary font-mono text-sm font-semibold shrink-0">{item.score}</span>
                  </div>
                  <p className="text-foreground/80 text-sm mt-1">{item.place}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-primary/10 rounded-lg"><Award className="w-5 h-5 text-primary" /></div>
            <h3 className="text-xl font-bold">{t("certs.title")}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((c) => (
              <button
                key={c.name}
                onClick={() => setCert(c)}
                className="text-left group rounded-xl border border-border overflow-hidden bg-card/50 hover:border-primary/50 transition-all"
              >
                {c.image && (
                  <div className="h-36 overflow-hidden bg-muted">
                    <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                  <p className="text-xs text-primary mt-2">{t("certs.view")} →</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog open={!!cert} onOpenChange={(o) => !o && setCert(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle>{cert?.name}</DialogTitle>
          <DialogDescription>{cert?.issuer}</DialogDescription>
          {cert?.image && <img src={cert.image} alt={cert.name} className="w-full rounded-lg border border-border" />}
          {cert?.link && (
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm">
              Verify <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
