import { motion } from "framer-motion";
import { User, Layers, Code, Trophy } from "lucide-react";
import { site, experience } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

const icons = [User, Layers, Code];

export default function About() {
  const { t } = useI18n();
  const job = experience.find((e) => e.current) ?? experience[0];

  return (
    <section id="about" className="py-20 bg-background relative scroll-mt-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title={t("about.title")} />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12"
        >
          {site.about.summary}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {site.about.cards.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 p-6 rounded-xl border border-border hover:border-primary/40 transition-all hover:-translate-y-1 group"
              >
                <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Company + stats */}
        {job && (
          <div className="mt-12 glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white border border-border flex items-center justify-center overflow-hidden shrink-0">
                  <img src={job.logo} alt={`${job.company} logo`} width={56} height={56} loading="lazy" className="w-full h-full object-contain p-1.5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{job.company}</h3>
                  <p className="text-muted-foreground">{job.role} · {job.start} — {job.end}</p>
                </div>
              </div>
              <div className="flex gap-8">
                {site.about.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements row */}
        <div className="mt-8">
          <p className="flex items-center justify-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
            <Trophy className="w-4 h-4 text-primary" /> {t("achievements.title")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {site.achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card/50 p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary">{a.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
