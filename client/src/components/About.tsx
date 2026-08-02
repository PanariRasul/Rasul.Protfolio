import { motion } from "framer-motion";
import { Briefcase, User, Code } from "lucide-react";
import abaccoLogo from "@assets/generated_images/abacco-logo.png";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              icon={<User className="w-8 h-8 text-primary" />}
              title="The Developer"
              desc="Passionate Full Stack Developer with a knack for building robust and scalable web applications. I transform complex requirements into seamless digital experiences."
            />
            <Card 
              icon={<Briefcase className="w-8 h-8 text-primary" />}
              title="The Architect"
              desc="Currently working as a Web Architect at Abacco Technology. I design systems that stand the test of time, focusing on performance, security, and maintainability."
            />
            <Card 
              icon={<Code className="w-8 h-8 text-primary" />}
              title="The Stack"
              desc="Specialized in the React ecosystem, Next.js, Node.js, and PostgreSQL. I love exploring new technologies and implementing modern best practices."
            />
          </div>

          <div className="mt-16 glass-card p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  <img 
                    src={abaccoLogo} 
                    alt="Abacco Technology logo" 
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Abacco Technology</h3>
                  <p className="text-gray-400">Web Architect & Full Stack Developer</p>
                </div>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block" />
              <div className="text-center md:text-right">
                <p className="text-4xl font-bold text-primary">4+</p>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Full Stack Projects</p>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block" />
              <div className="text-center md:text-right">
                <p className="text-4xl font-bold text-primary">5+</p>
                <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">Static Websites</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-card/50 p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-1 group">
      <div className="mb-4 p-3 bg-primary/10 w-fit rounded-lg group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}