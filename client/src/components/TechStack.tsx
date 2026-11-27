import { SiReact, SiTypescript, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb, SiPrisma, SiVite, SiCapacitor, SiGit, SiPostman, SiCloudflare, SiRender } from "react-icons/si";

// color: undefined → uses currentColor so it works in both light and dark mode
const techs = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: undefined },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", icon: SiPrisma, color: undefined },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Capacitor", icon: SiCapacitor, color: "#119EFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "Render", icon: SiRender, color: undefined },
];

export default function TechStack() {
  return (
    <section aria-label="Tech stack" className="py-10 border-y border-border/50 bg-secondary/20 overflow-hidden">
      <div className="flex w-max animate-infinite-scroll gap-12 py-2 hover:[animation-play-state:paused]">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group" aria-hidden={i >= techs.length}>
            <div className="p-4 rounded-xl bg-background border border-border shadow-sm group-hover:scale-110 transition-transform duration-300 text-foreground">
              <tech.icon className="w-9 h-9" style={tech.color ? { color: tech.color } : undefined} />
            </div>
            <span className="text-sm font-mono font-medium text-muted-foreground group-hover:text-primary transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
