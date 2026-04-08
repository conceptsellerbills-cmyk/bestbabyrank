import { getAllPosts } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Latest articles and guides.",
};

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="hero">
        <h1>Latest Articles</h1>
        <p>Expert guides, reviews and in-depth resources.</p>
      </section>

      {posts.length === 0 ? (
        <p className="empty">No articles yet. Check back soon!</p>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <article key={post.slug} className="post-card">
              <div className="post-meta">{post.date}</div>
              <h2><a href={`/${post.slug}`}>{post.title}</a></h2>
              <p>{post.description}</p>
              {post.keyword && <span className="keyword-pill">{post.keyword}</span>}
              <a href={`/${post.slug}`} className="read-more">Read article →</a>
            </article>
          ))}
        </div>
      )}
    </>
  );
}