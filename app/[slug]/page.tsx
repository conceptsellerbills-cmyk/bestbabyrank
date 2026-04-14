import { getAllPosts, getPostBySlug } from "../../lib/posts";
import { marked } from "marked";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Comments } from "../../components/Comments";

type Props = { params: Promise<{ slug: string }> };

const CATEGORIES: { label: string; href: string }[] = [{"label":"🍼 Baby Monitors","href":"/category/baby-monitors"},{"label":"🧻 Baby Wipes","href":"/category/baby-wipes"},{"label":"🟦 Play Mats","href":"/category/play-mats"},{"label":"🎒 Baby Carriers","href":"/category/baby-carriers"},{"label":"🛒 Strollers","href":"/category/strollers"},{"label":"🍽️ Baby Feeding","href":"/category/baby-feeding"},{"label":"😴 Baby Sleep","href":"/category/baby-sleep"},{"label":"🛁 Baby Bath","href":"/category/baby-bath"},{"label":"🔒 Baby Safety","href":"/category/baby-safety"},{"label":"👕 Baby Clothing","href":"/category/baby-clothing"}];

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
  const suggested = getAllPosts().filter((p) => p.slug !== slug).slice(0, 6);

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
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--bg:#080b14;--surface:#111520;--border:#1e2535;--text:#e4e8f4;--muted:#7a82a0;--accent:#4f8bff;--radius:10px}
        body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7;font-size:16px}
        a{text-decoration:none;color:inherit}
        /* override layout container for wide layout */
        .main-content{max-width:1280px !important;padding:0 !important}
        /* two-column page layout */
        .page-wrap{display:grid;grid-template-columns:1fr 268px;gap:48px;max-width:1280px;margin:0 auto;padding:40px 24px 80px;align-items:start}
        /* article column */
        .article-col{min-width:0}
        .article{max-width:100%}
        .article-header{margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--border)}
        .post-meta{font-size:0.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px}
        .article-header h1{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:800;margin-bottom:12px;line-height:1.3}
        .article-desc{color:var(--muted);font-size:1rem;margin-bottom:12px}
        .keyword-pill{display:inline-block;font-size:0.72rem;padding:3px 10px;border-radius:20px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);color:var(--accent);margin-right:8px}
        /* article body */
        .article-body{color:#c8cad8}
        .article-body h2{font-size:1.35rem;color:var(--text);margin:36px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--border)}
        .article-body h3{font-size:1.1rem;color:var(--text);margin:24px 0 10px}
        .article-body p{margin-bottom:16px;line-height:1.8}
        .article-body ul,.article-body ol{margin:12px 0 16px 24px}
        .article-body li{margin-bottom:6px}
        .article-body strong{color:var(--text);font-weight:600}
        .article-body a{color:var(--accent)}
        .article-body a:hover{color:#6b96ff}
        .article-body img{max-width:100%;border-radius:var(--radius);margin:20px 0}
        .article-body table{width:100%;border-collapse:collapse;margin:20px 0;font-size:0.9rem}
        .article-body th{background:var(--surface);padding:10px 14px;text-align:left;border:1px solid var(--border);color:var(--text)}
        .article-body td{padding:10px 14px;border:1px solid var(--border);color:var(--muted)}
        .article-body blockquote{border-left:3px solid var(--accent);padding:12px 18px;margin:20px 0;background:var(--surface);border-radius:0 var(--radius) var(--radius) 0;color:var(--muted)}
        .article-body code{background:var(--surface);padding:2px 6px;border-radius:4px;font-size:0.88em;color:var(--accent);border:1px solid var(--border)}
        .article-body pre{background:var(--surface);padding:16px;border-radius:var(--radius);overflow-x:auto;margin:20px 0;border:1px solid var(--border)}
        .article-body pre code{background:none;border:none;padding:0}
        .article-footer{margin-top:48px;padding-top:24px;border-top:1px solid var(--border)}
        .article-footer a{color:var(--muted);font-size:0.9rem}
        .article-footer a:hover{color:var(--accent)}
        /* suggested articles (desktop + mobile) */
        .suggested{margin-top:48px;padding-top:32px;border-top:1px solid var(--border)}
        .suggested-title{font-size:1rem;font-weight:700;letter-spacing:0.02em;text-transform:uppercase;color:var(--muted);margin-bottom:16px}
        .suggested-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
        .sugg-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s;text-decoration:none}
        .sugg-card:hover{border-color:var(--accent);transform:translateY(-3px)}
        .sugg-thumb{height:110px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;flex-shrink:0}
        .sugg-thumb::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.55) 100%)}
        .sugg-kw{position:relative;z-index:1;font-size:0.68rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.92);background:rgba(0,0,0,0.28);padding:3px 10px;border-radius:20px;backdrop-filter:blur(4px)}
        .sugg-body{padding:12px 14px 14px;display:flex;flex-direction:column;gap:5px;flex:1}
        .sugg-card h3{font-size:0.875rem;font-weight:600;line-height:1.4;color:var(--text)}
        .sugg-card h3 a:hover{color:var(--accent)}
        .sugg-date{font-size:0.72rem;color:var(--muted)}
        /* mobile categories (hidden on desktop) */
        .cats-mobile{display:none;margin-top:40px;padding-top:32px;border-top:1px solid var(--border)}
        .cats-mobile-title{font-size:1rem;font-weight:700;letter-spacing:0.02em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
        .cats-mobile-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
        .cats-mobile-item{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px 12px;font-size:0.82rem;color:#c8cad8;transition:border-color 0.12s,color 0.12s;display:block}
        .cats-mobile-item:hover{border-color:var(--accent);color:var(--accent)}
        /* sidebar (desktop only) */
        .sidebar{min-width:0}
        .sidebar-inner{position:sticky;top:80px}
        .sidebar-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:20px}
        .sidebar-heading{font-size:0.72rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
        .sidebar-cats{max-height:calc(100vh - 150px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.15) transparent}
        .sidebar-cats::-webkit-scrollbar{width:4px}.sidebar-cats::-webkit-scrollbar-track{background:transparent}.sidebar-cats::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:4px}
        .sidebar-cats a{display:block;padding:8px 10px;border-radius:7px;color:#c8cad8;font-size:0.83rem;transition:background 0.1s,color 0.1s}
        .sidebar-cats a:hover{background:rgba(255,255,255,0.05);color:var(--accent)}
        /* responsive */
        @media(max-width:960px){
          .page-wrap{grid-template-columns:1fr;gap:0;padding:32px 20px 60px}
          .sidebar{display:none}
          .cats-mobile{display:block}
          .suggested-grid{grid-template-columns:1fr}
        }
        @media(max-width:520px){.cats-mobile-grid{grid-template-columns:1fr}}
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />

      <div className="page-wrap">
        {/* ── Main article column ── */}
        <div className="article-col">
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

            <Comments slug={slug} />
          </article>

          {/* Mobile-only: categories */}
          <div className="cats-mobile">
            <p className="cats-mobile-title">Browse Categories</p>
            <div className="cats-mobile-grid">
              {CATEGORIES.map((c) => (
                <a key={c.href} href={c.href} className="cats-mobile-item">{c.label}</a>
              ))}
            </div>
          </div>

          {/* Suggested articles — both mobile + desktop */}
          {suggested.length > 0 && (
            <section className="suggested">
              <p className="suggested-title">Related Articles</p>
              <div className="suggested-grid">
                {suggested.map((s) => {
                  const hue = s.slug.split('').reduce((h: number, c: string) => (h * 31 + c.charCodeAt(0)) % 360, 0)
                  const bg = `linear-gradient(135deg,hsl(${hue},45%,14%) 0%,hsl(${(hue+40)%360},55%,26%) 100%)`
                  return (
                    <a className="sugg-card" href={`/${s.slug}`} key={s.slug}>
                      <div className="sugg-thumb" style={{ background: bg }}>
                        {s.keyword && <span className="sugg-kw">{s.keyword}</span>}
                      </div>
                      <div className="sugg-body">
                        <h3>{s.title}</h3>
                        <span className="sugg-date">{s.date}</span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          )}
        </div>

        {/* ── Desktop sidebar ── */}
        <aside className="sidebar">
          <div className="sidebar-inner">
            <div className="sidebar-box">
              <p className="sidebar-heading">Categories</p>
              <nav className="sidebar-cats">
                {CATEGORIES.map((c) => (
                  <a key={c.href} href={c.href}>{c.label}</a>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
