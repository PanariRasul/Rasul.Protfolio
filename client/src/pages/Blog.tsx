import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { marked } from "marked";
import { ArrowLeft, Calendar } from "lucide-react";
import { blogPosts, getPost } from "@/lib/content";
import { PostCard, formatDate } from "@/components/BlogPreview";
import SectionHeading from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { useSeo } from "@/lib/seo";
import NotFound from "./not-found";

export function BlogList() {
  const { t } = useI18n();
  useSeo(t("blog.title"), t("blog.sub"));
  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title={t("blog.title")} sub={t("blog.sub")} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((p, i) => <PostCard key={p.slug} post={p} i={i} />)}
        </div>
      </div>
    </main>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  const { t } = useI18n();
  useSeo(post?.title ?? "Not found", post?.summary);
  const html = useMemo(() => (post ? (marked.parse(post.body, { async: false }) as string) : ""), [post]);
  if (!post) return <NotFound />;

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> {t("blog.all")}
        </Link>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-3"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{post.summary}</p>
        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{tag}</span>)}
        </div>
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </main>
  );
}
