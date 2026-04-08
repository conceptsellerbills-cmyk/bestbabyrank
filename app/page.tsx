import { getAllPosts } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Baby Products Ranked by Experts 2025 — BestBabyRank",
  description: "Research-backed rankings of strollers, car seats, baby monitors and feeding gear. Trusted safety reviews for new parents.",
};

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --border: #1e2535;
          --text: #e4e8f4; --muted: #7a82a0;
          --accent: #f472b6; --accent2: #a855f7; --radius: 12px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .hero { position: relative; overflow: hidden; padding: 90px 24px 80px; text-align: center; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(244,114,182,0.15) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.1) 0%, transparent 60%); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 20px; background: rgba(244,114,182,0.1); border: 1px solid rgba(244,114,182,0.25); color: var(--accent); font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px; }
        .hero-badge::before { content: '●'; color: #2ecc71; font-size: 0.6rem; }
        .hero h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 20px; background: linear-gradient(135deg, #e4e8f4 30%, var(--accent) 70%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted); max-width: 620px; margin: 0 auto 36px; line-height: 1.75; }
        .hero-cta { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 1rem; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 30px rgba(244,114,182,0.3); }
        .hero-cta:hover { opacity: 0.9; transform: translateY(-1px); }
        .stats-bar { display: flex; flex-wrap: wrap; margin-top: 56px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); max-width: 700px; margin-left: auto; margin-right: auto; }
        .stat-item { flex: 1; min-width: 120px; padding: 20px 16px; text-align: center; border-right: 1px solid var(--border); }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 1.6rem; font-weight: 800; color: var(--accent); display: block; }
        .stat-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .section { padding: 60px 0; }
        .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 32px; }
        .section-title { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }
        .section-link { font-size: 0.85rem; color: var(--accent); }
        .section-link:hover { text-decoration: underline; }
        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(165px, 1fr)); gap: 14px; }
        .category-card { padding: 24px 18px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s; display: block; }
        .category-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(244,114,182,0.1); }
        .category-icon { font-size: 1.8rem; margin-bottom: 10px; display: block; }
        .category-label { font-weight: 700; font-size: 0.95rem; margin-bottom: 4px; color: var(--text); }
        .category-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }
        .featured-card { display: grid; grid-template-columns: 1fr 1fr; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: border-color 0.15s; }
        .featured-card:hover { border-color: var(--accent); }
        .featured-visual { display: flex; align-items: center; justify-content: center; min-height: 280px; font-size: 5rem; background: linear-gradient(135deg, rgba(244,114,182,0.12), rgba(168,85,247,0.08)); }
        .featured-content { padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; gap: 0; }
        .featured-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(244,114,182,0.12); border: 1px solid rgba(244,114,182,0.25); color: var(--accent); font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px; width: fit-content; }
        .featured-content h2 { font-size: 1.55rem; font-weight: 800; line-height: 1.3; margin-bottom: 14px; letter-spacing: -0.02em; color: var(--text); }
        .featured-content p { color: var(--muted); font-size: 0.92rem; line-height: 1.75; margin-bottom: 20px; }
        .featured-meta { font-size: 0.75rem; color: var(--muted); margin-bottom: 22px; }
        .read-btn { display: inline-flex; align-items: center; gap: 6px; padding: 11px 24px; border-radius: 8px; background: var(--accent); color: #fff; font-weight: 700; font-size: 0.88rem; transition: opacity 0.15s; width: fit-content; }
        .read-btn:hover { opacity: 0.85; }
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }
        .post-card { padding: 26px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-tag { display: inline-block; padding: 3px 10px; border-radius: 20px; background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.2); color: var(--accent2); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 12px; }
        .post-card h3 { font-size: 1.02rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.87rem; line-height: 1.65; flex: 1; margin-bottom: 16px; }
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }
        .post-link:hover { text-decoration: underline; }
        .cta-section { margin: 20px 0 60px; padding: 60px 40px; background: linear-gradient(135deg, var(--surface), rgba(244,114,182,0.06)); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .cta-section h2 { font-size: 1.9rem; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
        .cta-section p { color: var(--muted); margin-bottom: 28px; font-size: 1.02rem; }
        .cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 0.95rem; transition: opacity 0.2s; }
        .cta-btn:hover { opacity: 0.85; }
        .empty-state { text-align: center; padding: 80px 0; color: var(--muted); font-size: 1rem; }
        @media (max-width: 720px) {
          .featured-card { grid-template-columns: 1fr; }
          .featured-visual { min-height: 140px; font-size: 3.5rem; }
          .featured-content { padding: 24px 20px; }
          .hero { padding: 60px 20px 50px; }
          .cta-section { padding: 40px 20px; }
          .stat-item { min-width: 90px; padding: 16px 10px; }
        }
`}</style>

      <section className="hero">
        <div className="hero-badge">Trusted by Parents</div>
        <h1 dangerouslySetInnerHTML={{ __html: "Find the Safest, Best<br />Products for Your Baby" }} />
        <p>Expert-tested rankings of strollers, car seats, baby monitors and feeding gear. Every recommendation is backed by real testing and safety research.</p>
        <a href="/best-baby-products" className="hero-cta">Explore Top Picks →</a>
        <div className="stats-bar">
          {([{"v":"500+","l":"Products Tested"},{"v":"98%","l":"Parent Approved"},{"v":"50+","l":"Categories"},{"v":"2025","l":"Up-to-date"}] as {v:string,l:string}[]).map((s) => (
            <div className="stat-item" key={s.l}>
              <span className="stat-value">{s.v}</span>
              <span className="stat-label">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container">

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <a href="/categories" className="section-link">View all →</a>
          </div>
          <div className="category-grid">
            {([{"icon":"🛒","label":"Strollers","desc":"Full-size, lightweight & jogging","href":"/category/strollers"},{"icon":"🚗","label":"Car Seats","desc":"Infant, convertible & booster","href":"/category/car-seats"},{"icon":"📷","label":"Baby Monitors","desc":"Video & audio monitors ranked","href":"/category/baby-monitors"},{"icon":"🍼","label":"Feeding","desc":"Bottles, high chairs & pumps","href":"/category/feeding"},{"icon":"😴","label":"Sleep","desc":"Cribs, bassinets & sleep aids","href":"/category/sleep"},{"icon":"🎮","label":"Toys & Play","desc":"Age-appropriate development toys","href":"/category/toys"}] as {icon:string,label:string,desc:string,href:string}[]).map((c) => (
              <a href={c.href} className="category-card" key={c.label}>
                <span className="category-icon">{c.icon}</span>
                <div className="category-label">{c.label}</div>
                <div className="category-desc">{c.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {featured && (
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Featured Article</h2>
            </div>
            <a href={`/${featured.slug}`} className="featured-card">
              <div className="featured-visual">👶</div>
              <div className="featured-content">
                <span className="featured-badge">⭐ Editor's Pick</span>
                <h2>{featured.title}</h2>
                <p>{featured.description || "Read our full in-depth review and expert verdict."}</p>
                {featured.date && <div className="featured-meta">📅 {featured.date}</div>}
                <span className="read-btn">Read Full Article →</span>
              </div>
            </a>
          </section>
        )}

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            <a href="/all-articles" className="section-link">View all →</a>
          </div>
          {posts.length === 0 ? (
            <p className="empty-state">No articles yet — check back soon!</p>
          ) : (
            <div className="post-grid">
              {(featured ? recent : posts.slice(0, 6)).map((post) => (
                <article className="post-card" key={post.slug}>
                  {post.keyword && <span className="post-tag">{post.keyword}</span>}
                  <h3><a href={`/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.description || "Read our in-depth analysis and expert verdict."}</p>
                  <div className="post-card-footer">
                    <span className="post-date">{post.date}</span>
                    <a href={`/${post.slug}`} className="post-link">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="cta-section">
          <h2>Safe Choices for Happy Babies</h2>
          <p>Get expert reviews and side-by-side comparisons to find the perfect baby gear for your family.</p>
          <a href="/best-baby-products" className="cta-btn">Browse All Rankings →</a>
        </div>

      </div>
    </>
  );
}
