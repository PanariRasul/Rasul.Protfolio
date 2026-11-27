import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPosts, type BlogPost } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

export function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export function PostCard({ post, i = 0 }: { post: BlogPost; i?: number }) {
  const { t } = useI18n();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
      <Link href={`/blog/${post.slug}`} className="group block h-full glass-card rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
          <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
        </p>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{post.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        <span className="text-sm text-primary inline-flex items-center gap-1">
          {t("blog.read")} <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function BlogPreview() {
  const { t } = useI18n();
  if (blogPosts.length === 0) return null;
  return (
    <section id="blog" className="py-20 bg-secondary/20 border-y border-border/50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title={t("blog.title")} sub={t("blog.sub")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((p, i) => <PostCard key={p.slug} post={p} i={i} />)}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="text-primary hover:underline text-sm font-medium">{t("blog.all")} →</Link>
        </div>
      </div>
    </section>
  );
}
