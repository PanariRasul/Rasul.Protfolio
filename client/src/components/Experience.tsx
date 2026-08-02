import { motion } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";
import abaccoLogo from "@assets/generated_images/abacco-logo.png";

interface ExperienceEntry {
    role: string;
    company: string;
    companyLogo?: string;
    location: string;
    duration: string;
    current: boolean;
    achievements: string[];
}

// Add future roles here — the timeline renders however many entries exist.
const experiences: ExperienceEntry[] = [
    {
        role: "Full Stack Web Developer / Web Architect",
        company: "Abacco Technology",
        companyLogo: abaccoLogo,
        location: "Bengaluru, Karnataka",
        duration: "June 2025 — Present",
        current: true,
        achievements: [
            "Architected and developed full-stack applications using the MERN stack with TypeScript, PostgreSQL, MongoDB, and Prisma ORM",
            "Designed and implemented 3 custom CRM solutions (Lead Management, Sales, Domain Management), improving operational efficiency by 40%",
            "Built 7+ responsive, production-ready websites achieving 95+ PageSpeed scores with optimized performance",
            "Led code reviews and established Git workflow best practices for a 5-member development team",
        ],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="py-20 bg-background relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Experience</h2>
                        <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
                    </div>

                    <div className="relative pl-10 md:pl-14">
                        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />

                        {experiences.map((exp, i) => (
                            <motion.div
                                key={exp.company + exp.role}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="relative mb-8 last:mb-0"
                            >
                                {/* Timeline node */}
                                <div className="absolute -left-10 md:-left-14 top-1 w-8 h-8 md:w-9 md:h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                </div>
                                {exp.current && (
                                    <span className="absolute -left-[2.65rem] md:-left-[3.65rem] top-1 w-8 h-8 md:w-9 md:h-9 rounded-full border border-primary/40 animate-ping" />
                                )}

                                <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            {exp.companyLogo && (
                                                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
                                                    <img
                                                        src={exp.companyLogo}
                                                        alt={`${exp.company} logo`}
                                                        className="w-full h-full object-contain p-1.5"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-lg md:text-xl font-bold leading-snug">{exp.role}</h3>
                                                <p className="text-primary font-medium text-sm">{exp.company}</p>
                                                <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                                                    <MapPin className="w-3 h-3" /> {exp.location}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className={`shrink-0 text-xs font-mono px-3 py-1.5 rounded-full border ${exp.current
                                                    ? "border-primary/40 text-primary bg-primary/10"
                                                    : "border-white/10 text-gray-400 bg-white/5"
                                                }`}
                                        >
                                            {exp.duration}
                                        </span>
                                    </div>

                                    <ul className="space-y-2.5 pt-2 border-t border-white/5">
                                        {exp.achievements.map((achievement) => (
                                            <li key={achievement} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}