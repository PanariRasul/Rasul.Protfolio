import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/lib/projects-data";

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of full-stack applications and CRM solutions I've architected and built.
            Click any card for the full case study.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative bg-card rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 block cursor-pointer h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    {project.private ? (
                      <span className="bg-black/50 backdrop-blur text-xs px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Private
                      </span>
                    ) : (
                      <span className="bg-primary/80 backdrop-blur text-xs px-2 py-1 rounded text-white flex items-center gap-1">
                        Live
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
