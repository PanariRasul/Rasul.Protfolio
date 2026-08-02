import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Award } from "lucide-react";

const timeline = [
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "Bachelor of Engineering — Computer Science",
    place: "Government Engineering College, Talakal",
    sub: "Visvesvaraya Technological University, Belagavi",
    meta: "CGPA: 7.6 / 10",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Pre-University Course (PCMB)",
    place: "New Composite PU College, Raibag",
    sub: "Dept. of School Education and Literacy",
    meta: "74%",
  },
  {
    icon: <School className="w-6 h-6 text-primary" />,
    title: "Secondary School Leaving Certificate (SSLC)",
    place: "GS Kante High School, Nasalapur",
    sub: "Karnataka Secondary Education Board · 2018",
    meta: "88.96%",
  },
];

const certifications = [
  "MERN Full Stack Web Developer — Dev Town & Tap Academy",
  "Java Full Stack Developer — Tap Academy",
];

export default function Education() {
  return (
    <section id="education" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Education</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          {/* Timeline */}
          <div className="relative pl-10 md:pl-14">
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative mb-8 last:mb-0"
              >
                <div className="absolute -left-10 md:-left-14 top-1 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                  {item.icon}
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                    <span className="text-primary font-mono text-sm font-semibold shrink-0">
                      {item.meta}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{item.place}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 glass-card p-8 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-primary/10 rounded-lg">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Certifications</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-3 bg-card/50 p-4 rounded-xl border border-white/5"
                >
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{cert}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
