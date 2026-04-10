import { getAllPosts, getPostBySlug } from "../../lib/posts";
import { marked } from "marked";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Comments } from "../../components/Comments";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keyword,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    keywords: post.keyword,
  });

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --border: #1e2535;
          --text: #e4e8f4; --muted: #7a82a0; --accent: #4f8bff; --radius: 10px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.7; font-size: 16px; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 860px; margin: 0 auto; padding: 0 24px; }
        .site-header { background: var(--surface); border-bottom: 1px solid var(--border); padding: 16px 0; position: sticky; top: 0; z-index: 10; }
        .site-brand { font-size: 1.1rem; font-weight: 700; color: var(--text); }
        .site-brand:hover { color: var(--accent); }
        .main-content { padding: 40px 24px 80px; }
        .post-meta { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .keyword-pill { display: inline-block; font-size: 0.72rem; padding: 3px 10px; border-radius: 20px; background: rgba(74,124,255,0.12); border: 1px solid rgba(74,124,255,0.25); color: #7ca9ff; margin-right: 8px; }
        .article { max-width: 720px; }
        .article-header { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
        .article-header h1 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); font-weight: 800; margin: 8px 0 12px; line-height: 1.3; }
        .article-desc { color: var(--muted); font-size: 1rem; margin-bottom: 12px; }
        .article-body { color: #c8cad8; }
        .article-body h2 { font-size: 1.35rem; color: var(--text); margin: 36px 0 14px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
        .article-body h3 { font-size: 1.1rem; color: var(--text); margin: 24px 0 10px; }
        .article-body p { margin-bottom: 16px; line-height: 1.8; }
        .article-body ul, .article-body ol { margin: 12px 0 16px 24px; }
        .article-body li { margin-bottom: 6px; }
        .article-body strong { color: var(--text); font-weight: 600; }
        .article-body a { color: var(--accent); }
        .article-body a:hover { color: #6b96ff; }
        .article-body table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem; }
        .article-body th { background: var(--surface); padding: 10px 14px; text-align: left; border: 1px solid var(--border); color: var(--text); }
        .article-body td { padding: 10px 14px; border: 1px solid var(--border); color: var(--muted); }
        .article-body blockquote { border-left: 3px solid var(--accent); padding: 12px 18px; margin: 20px 0; background: var(--surface); border-radius: 0 var(--radius) var(--radius) 0; color: var(--muted); }
        .article-body code { background: var(--surface); padding: 2px 6px; border-radius: 4px; font-size: 0.88em; color: #7ca9ff; border: 1px solid var(--border); }
        .article-body pre { background: var(--surface); padding: 16px; border-radius: var(--radius); overflow-x: auto; margin: 20px 0; border: 1px solid var(--border); }
        .article-body pre code { background: none; border: none; padding: 0; }
        .article-footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); }
        .article-footer a { color: var(--muted); font-size: 0.9rem; }
        .article-footer a:hover { color: var(--accent); }
        .site-footer { border-top: 1px solid var(--border); padding: 24px 0; margin-top: 60px; }
        .site-footer p { color: var(--muted); font-size: 0.82rem; }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />

      <article className="article">
        <header className="article-header">
          <div className="post-meta">{post.date}</div>
          <h1>{post.title}</h1>
          {post.description && <p className="article-desc">{post.description}</p>}
          {post.keyword && <span className="keyword-pill">{post.keyword}</span>}
        </header>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

        <footer className="article-footer">
          <a href="/">← Back to all articles</a>
        </footer>

        <Comments title={post.title} />
      </article>
    </>
  );
}
