import { motion } from "framer-motion";
import { Layers, Receipt, Globe2, Smartphone, Plug, Server, Sparkles, type LucideIcon } from "lucide-react";
import { services } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  layers: Layers, receipt: Receipt, globe: Globe2, smartphone: Smartphone, plug: Plug, server: Server,
};

export default function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="py-20 bg-secondary/20 border-y border-border/50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title={t("services.title")} sub={t("services.sub")} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-background p-6 rounded-xl border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg"><Icon className="w-6 h-6 text-primary" /></div>
                  {s.price && <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{s.price}</span>}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
