import { motion } from "framer-motion";

export default function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
      <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
      {sub && <p className="text-muted-foreground max-w-2xl mx-auto mt-5">{sub}</p>}
    </motion.div>
  );
}
