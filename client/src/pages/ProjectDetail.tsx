import { useState } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Lock, CheckCircle2, Github, AlertTriangle, Lightbulb, Target, Wrench, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Contact from "@/components/Contact";
import { getProject, projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useSeo } from "@/lib/seo";
import NotFound from "./not-found";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;
  const { t } = useI18n();
  const [lightbox, setLightbox] = useState<number | null>(null);
  useSeo(project ? `${project.title} — ${project.tagline}` : "Not found", project?.cardDescription, project?.images[0]);

  if (!project) return <NotFound />;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const imgs = project.images;

  return (
    <>
      <main className="pt-24 md:pt-28 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {t("projects.back")}
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Hero */}
            <div className="relative h-64 md:h-[26rem] rounded-2xl overflow-hidden border border-border mb-10">
              <img src={imgs[0]} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-5 right-5">
                {project.private ? (
                  <span className="bg-black/60 text-white backdrop-blur text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> {t("projects.private")}</span>
                ) : (
                  <span className="bg-emerald-600/90 text-white text-xs px-3 py-1.5 rounded-full">{t("projects.live")}</span>
                )}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-violet-300 font-mono text-sm mb-2">{project.tagline}</p>
                <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-10">
                <Block title={t("projects.overview")}>
                  <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
                </Block>

                {(project.problem || project.solution || project.result) && (
                  <div className="grid gap-4">
                    {project.problem && <PSR icon={<AlertTriangle className="w-5 h-5" />} title={t("projects.problem")} text={project.problem} tone="text-amber-500" />}
                    {project.solution && <PSR icon={<Lightbulb className="w-5 h-5" />} title={t("projects.solution")} text={project.solution} tone="text-primary" />}
                    {project.result && <PSR icon={<Target className="w-5 h-5" />} title={t("projects.result")} text={project.result} tone="text-emerald-500" />}
                  </div>
                )}

                {imgs.length > 0 && (
                  <Block title={t("projects.gallery")}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imgs.map((src, i) => (
                        <button key={src} onClick={() => setLightbox(i)} className="rounded-lg overflow-hidden border border-border hover:border-primary transition-colors aspect-video">
                          <img src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </Block>
                )}

                <Block title={t("projects.features")}>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-foreground/80 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </Block>

                {project.contributions.length > 0 && (
                  <Block title={t("projects.contribution")}>
                    <ul className="space-y-2.5">
                      {project.contributions.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-foreground/80 text-sm leading-relaxed">
                          <Wrench className="w-4 h-4 text-primary shrink-0 mt-0.5" /> <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </Block>
                )}

                {project.challenges.length > 0 && (
                  <Block title={t("projects.challenges")}>
                    <div className="space-y-4">
                      {project.challenges.map((c) => (
                        <div key={c.challenge} className="glass-card rounded-xl p-5">
                          <p className="font-medium mb-2 flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-1 shrink-0" /> {c.challenge}</p>
                          <p className="text-sm text-muted-foreground flex gap-2"><Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {c.solution}</p>
                        </div>
                      ))}
                    </div>
                  </Block>
                )}

                <Block title={t("projects.tech")}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.techStack.map((g) => (
                      <div key={g.label} className="glass-card p-4 rounded-xl">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-2">{g.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.items.map((item) => (
                            <span key={item} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Block>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6 md:sticky md:top-28 h-fit">
                <div className="glass-card p-6 rounded-2xl">
                  <dl className="space-y-4 text-sm">
                    <div><dt className="text-muted-foreground mb-1">{t("projects.role")}</dt><dd className="font-medium">{project.role}</dd></div>
                    <div><dt className="text-muted-foreground mb-1">{t("projects.timeline")}</dt><dd className="font-medium">{project.timeline}</dd></div>
                    <div><dt className="text-muted-foreground mb-1">{t("projects.category")}</dt><dd className="font-medium">{project.category === "erp" ? "ERP / CRM Application" : "Website"}</dd></div>
                  </dl>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    {project.private || !project.liveUrl ? (
                      <p className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm bg-muted text-muted-foreground">
                        <Lock className="w-4 h-4" /> {t("projects.restricted")}
                      </p>
                    ) : (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
                        {t("projects.liveSite")} <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm border border-border hover:border-primary hover:text-primary transition-colors">
                        <Github className="w-4 h-4" /> {t("projects.viewCode")}
                      </a>
                    )}
                  </div>
                </div>

                {project.highlights.length > 0 && (
                  <div className="glass-card p-6 rounded-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      {project.highlights.map((s) => (
                        <div key={s.label}>
                          <p className="text-2xl font-bold text-primary">{s.value}</p>
                          <p className="text-xs text-muted-foreground">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>

            {/* Prev / Next */}
            <nav className="mt-16 grid sm:grid-cols-2 gap-4" aria-label="Project navigation">
              <Link href={`/projects/${prev.slug}`} className="group glass-card rounded-xl p-5 hover:border-primary/40 transition-all">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> {t("projects.prev")}</p>
                <p className="font-bold mt-1 group-hover:text-primary transition-colors">{prev.title}</p>
              </Link>
              <Link href={`/projects/${next.slug}`} className="group glass-card rounded-xl p-5 text-right hover:border-primary/40 transition-all">
                <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">{t("projects.next")} <ArrowRight className="w-3.5 h-3.5" /></p>
                <p className="font-bold mt-1 group-hover:text-primary transition-colors">{next.title}</p>
              </Link>
            </nav>
          </motion.div>
        </div>
      </main>

      <Contact />

      {/* Lightbox */}
      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-5xl w-[95vw] p-2 bg-black border-none [&>button]:hidden">
          <DialogTitle className="sr-only">{project.title} screenshot</DialogTitle>
          <DialogDescription className="sr-only">Screenshot viewer</DialogDescription>
          {lightbox !== null && (
            <div className="relative">
              <img src={imgs[lightbox]} alt={`${project.title} screenshot ${lightbox + 1}`} className="w-full max-h-[85vh] object-contain rounded" />
              <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white"><X className="w-5 h-5" /></button>
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setLightbox((lightbox - 1 + imgs.length) % imgs.length)} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white"><ChevronLeft className="w-6 h-6" /></button>
                  <button onClick={() => setLightbox((lightbox + 1) % imgs.length)} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white"><ChevronRight className="w-6 h-6" /></button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

function PSR({ icon, title, text, tone }: { icon: React.ReactNode; title: string; text: string; tone: string }) {
  return (
    <div className="glass-card rounded-xl p-5 flex gap-4">
      <div className={`${tone} shrink-0 mt-0.5`}>{icon}</div>
      <div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
