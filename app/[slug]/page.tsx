import { getAllPosts, getPostBySlug } from "../../lib/posts";
import { marked } from "marked";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
      </article>
    </>
  );
}