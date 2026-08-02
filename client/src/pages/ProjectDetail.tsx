import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Lock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import { getProjectBySlug } from "@/lib/projects-data";
import NotFound from "./not-found";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-28 pb-10">
        <div className="container mx-auto px-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Hero image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 mb-10">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
              <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 right-6 z-20">
                {project.private ? (
                  <span className="bg-black/60 backdrop-blur text-xs px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Private / Internal Tool
                  </span>
                ) : (
                  <span className="bg-primary/90 backdrop-blur text-xs px-3 py-1.5 rounded-full text-white flex items-center gap-1.5">
                    Live Project
                  </span>
                )}
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="text-primary font-mono text-sm mb-2">{project.tagline}</p>
                <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Left: overview + features */}
              <div className="md:col-span-2 space-y-10">
                <div>
                  <h2 className="text-xl font-bold mb-3">Overview</h2>
                  <p className="text-gray-400 leading-relaxed">{project.overview}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {project.techStack.map((group) => (
                      <div key={group.label} className="glass-card p-4 rounded-xl border border-white/5">
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-mono mb-2">
                          {group.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-mono"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: sidebar */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5">
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Role</p>
                      <p className="font-medium">{project.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Timeline</p>
                      <p className="font-medium">{project.timeline}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Tags</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {project.tags.map((t) => (
                          <span key={t} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => project.private && e.preventDefault()}
                    className={`mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all ${
                      project.private
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {project.private ? "Access Restricted" : "Visit Live Site"}
                    {!project.private && <ExternalLink className="w-4 h-4" />}
                  </a>
                </div>

                {project.impact.length > 0 && (
                  <div className="glass-card p-6 rounded-2xl border border-white/5">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-mono mb-4">Impact</p>
                    <div className="grid grid-cols-2 gap-4">
                      {project.impact.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-2xl font-bold text-primary">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Contact />
    </div>
  );
}
