import { motion } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import { experience } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const { t } = useI18n();
  return (
    <section id="experience" className="py-20 bg-background relative scroll-mt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title={t("experience.title")} />
        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative mb-8 last:mb-0"
            >
              <div className="absolute -left-10 md:-left-14 top-1 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <div className="glass-card p-6 rounded-2xl hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    {exp.logo && (
                      <div className="w-11 h-11 rounded-lg bg-white border border-border flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
                        <img src={exp.logo} alt={`${exp.company} logo`} width={44} height={44} loading="lazy" className="w-full h-full object-contain p-1.5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-snug">{exp.role}</h3>
                      <p className="text-primary font-medium text-sm">{exp.company}</p>
                      <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-full border ${exp.current ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground bg-muted"}`}>
                    {exp.start} — {exp.end}
                  </span>
                </div>
                <ul className="space-y-2.5 pt-3 border-t border-border">
                  {exp.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
