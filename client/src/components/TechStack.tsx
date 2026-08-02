import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiVite, SiNodedotjs, SiExpress, SiPostgresql, SiTypescript, SiPostman, SiTailwindcss, SiFramer } from "react-icons/si";

const techs = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" }, // Next.js is white in dark mode, black in light
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" }, // Express is typically black/white
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
  { name: "Framer Motion", icon: SiFramer, color: "#FF0055" },
];

export default function TechStack() {
  return (
    <section className="py-12 border-y border-border/50 bg-secondary/20 overflow-hidden">
      <div className="flex gap-12 items-center justify-center">
        {/* Simple Marquee Effect */}
        <div className="flex animate-infinite-scroll gap-16 min-w-full justify-around py-2">
          {[...techs, ...techs].map((tech, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group">
              <div className="p-4 rounded-xl bg-background border border-border shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <tech.icon 
                  className="w-10 h-10 transition-colors duration-300" 
                  style={{ color: tech.color }} 
                />
              </div>
              <span className="text-sm font-mono font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}