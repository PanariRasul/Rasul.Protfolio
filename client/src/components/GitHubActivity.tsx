import { useState } from "react";
import { motion } from "framer-motion";
import { Github, BookOpen, ExternalLink } from "lucide-react";
import { site } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

/** GitHub contribution graph + "Currently learning" side by side. */
export default function GitHubActivity() {
  const { t } = useI18n();
  const [failed, setFailed] = useState(false);
  const user = site.githubUsername;

  return (
    <section id="github" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Github className="w-5 h-5 text-primary" /></div>
              <div>
                <h3 className="font-bold text-lg">{t("github.title")}</h3>
                <p className="text-xs text-muted-foreground">{t("github.sub")}</p>
              </div>
            </div>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
              @{user} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="overflow-x-auto">
            {!failed ? (
              <img
                src={`https://ghchart.rshah.org/7c3aed/${user}`}
                alt={`GitHub contribution chart for ${user}`}
                loading="lazy"
                onError={() => setFailed(true)}
                className="min-w-[640px] w-full  rounded bg-white p-2"
              />
            ) : (
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="block text-center py-10 text-muted-foreground hover:text-primary">
                View my activity on GitHub →
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="w-5 h-5 text-primary" /></div>
            <h3 className="font-bold text-lg">{t("learning.title")}</h3>
          </div>
          <ul className="space-y-3">
            {site.learning.map((l) => (
              <li key={l.name} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                <div>
                  <p className="font-medium text-sm">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
