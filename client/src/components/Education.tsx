import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen } from "lucide-react";
import { education } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Certificates from "./Certificates";

const ICONS = { degree: GraduationCap, book: BookOpen, school: School } as const;

export default function Education() {
  const { t } = useI18n();

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

        <Certificates />
      </div>

    </section>
  );
}