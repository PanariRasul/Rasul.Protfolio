import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Lock } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

type Filter = "all" | "erp" | "website";

export default function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t("projects.all"), count: projects.length },
    { key: "erp", label: t("projects.erp"), count: projects.filter((p) => p.category === "erp").length },
    { key: "website", label: t("projects.websites"), count: projects.filter((p) => p.category === "website").length },
  ];

  return (
    <section id="projects" className="py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("projects.title")} sub={t("projects.sub")} />

        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === tab.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {tab.label} <span className="opacity-70 ml-1">{tab.count}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col"
    >
      <Link href={`/projects/${project.slug}`} className="relative h-48 overflow-hidden block" aria-label={project.title}>
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          width={600}
          height={375}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 text-[11px] font-mono uppercase tracking-wider bg-black/60 text-white backdrop-blur px-2 py-1 rounded">
          {project.category === "erp" ? "ERP / CRM" : "Website"}
        </div>
        <div className="absolute top-3 right-3">
          {project.private ? (
            <span className="bg-black/60 text-white backdrop-blur text-xs px-2 py-1 rounded flex items-center gap-1">
              <Lock className="w-3 h-3" /> {t("projects.private")}
            </span>
          ) : (
            <span className="bg-emerald-600/90 backdrop-blur text-xs px-2 py-1 rounded text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white" /> {t("projects.live")}
            </span>
          )}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-xs text-primary font-mono mb-3">{project.tagline}</p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.cardDescription}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            {t("projects.knowMore")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          {!project.private && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className="inline-flex items-center justify-center p-2.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
