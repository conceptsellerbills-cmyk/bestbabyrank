import { getAllPosts } from "../lib/posts";
import type { Metadata } from "next";
import NewsletterForm from '../components/NewsletterForm'

export const metadata: Metadata = {
  title: "Best Baby Products Ranked 2025 — Expert Reviews for Parents",
  description: "Research-backed rankings of strollers, car seats, baby monitors and feeding gear. Trusted safety reviews for new parents.",
};

const STARS = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0] ?? null;
  const recent = posts.slice(1, 7);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #080b14; --surface: #0f1420; --surface2: #141926;
          --border: #1e2535; --border2: #252d40;
          --text: #e4e8f4; --muted: #7a82a0;
          --accent: #f472b6; --accent2: #a855f7;
          --radius: 12px; --radius-sm: 8px;
        }
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; }
        a { text-decoration: none; color: inherit; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

        /* Hero */
        .hero { position: relative; overflow: hidden; padding: 100px 24px 90px; text-align: center; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(244,114,182,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.12) 0%, transparent 60%); pointer-events: none; }
        .hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px; border-radius: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: var(--accent); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 28px; }
        .hero-badge::before { content: '●'; color: #2ecc71; font-size: 0.55rem; }
        .hero h1 { font-size: clamp(2.4rem, 5.5vw, 4rem); font-weight: 900; line-height: 1.12; letter-spacing: -0.035em; margin-bottom: 22px; background: linear-gradient(135deg, #ffffff 25%, var(--accent) 65%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted); max-width: 640px; margin: 0 auto 40px; line-height: 1.8; }
        .hero-ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .hero-cta-primary { display: inline-flex; align-items: center; gap: 8px; padding: 15px 34px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 1rem; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 40px rgba(79,139,255,0.25); }
        .hero-cta-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .hero-cta-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 15px 34px; border-radius: 50px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: var(--text); font-weight: 600; font-size: 1rem; transition: background 0.2s; }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.1); }

        /* Stats */
        .stats-bar { display: flex; flex-wrap: wrap; margin-top: 64px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; background: var(--surface); max-width: 800px; margin-left: auto; margin-right: auto; }
        .stat-item { flex: 1; min-width: 130px; padding: 24px 16px; text-align: center; border-right: 1px solid var(--border); position: relative; }
        .stat-item:last-child { border-right: none; }
        .stat-value { font-size: 1.8rem; font-weight: 900; color: var(--accent); display: block; letter-spacing: -0.03em; }
        .stat-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 4px; display: block; }

        /* Section */
        .section { padding: 70px 0; }
        .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 36px; }
        .section-title { font-size: 1.6rem; font-weight: 800; letter-spacing: -0.025em; }
        .section-link { font-size: 0.85rem; color: var(--accent); }
        .section-link:hover { text-decoration: underline; }
        .section-eyebrow { font-size: 0.72rem; color: var(--accent); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }

        /* Trending */
        .trending-row { display: flex; flex-wrap: wrap; gap: 10px; }
        .trending-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px; background: var(--surface); border: 1px solid var(--border); font-size: 0.82rem; color: var(--muted); transition: border-color 0.15s, color 0.15s; }
        .trending-pill:hover { border-color: var(--accent); color: var(--accent); }
        .trending-pill-hot { border-color: rgba(239,68,68,0.3); color: #f87171; background: rgba(239,68,68,0.06); }

        /* Top 3 picks */
        .picks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .pick-card { padding: 28px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); position: relative; transition: border-color 0.15s, transform 0.15s; }
        .pick-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .pick-card--featured { border-color: var(--accent); background: linear-gradient(145deg, var(--surface), rgba(79,139,255,0.05)); }
        .pick-badge { position: absolute; top: -12px; left: 24px; padding: 4px 14px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.07em; text-transform: uppercase; }
        .pick-badge--gold { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; }
        .pick-badge--silver { background: linear-gradient(135deg, #94a3b8, #64748b); color: #fff; }
        .pick-badge--bronze { background: linear-gradient(135deg, #b45309, #92400e); color: #fff; }
        .pick-icon { font-size: 2.4rem; margin-bottom: 16px; display: block; }
        .pick-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 8px; }
        .pick-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.6; margin-bottom: 14px; }
        .pick-rating { color: #f59e0b; font-size: 0.9rem; margin-bottom: 4px; letter-spacing: 2px; }
        .pick-rating-text { font-size: 0.75rem; color: var(--muted); }
        .pick-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 0.83rem; color: var(--accent); font-weight: 600; }
        .pick-link:hover { text-decoration: underline; }

        /* Category grid */
        .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 14px; }
        .category-card { padding: 26px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s; display: block; }
        .category-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        .category-icon { font-size: 2rem; margin-bottom: 12px; display: block; }
        .category-label { font-weight: 700; font-size: 0.95rem; margin-bottom: 5px; color: var(--text); }
        .category-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

        /* How it works */
        .how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; position: relative; }
        .how-grid::before { content: ''; position: absolute; top: 36px; left: calc(33.33% - 20px); right: calc(33.33% - 20px); height: 1px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0.3; }
        .how-card { padding: 32px 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .how-num { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 900; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        .how-title { font-weight: 700; font-size: 1rem; margin-bottom: 10px; }
        .how-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }

        /* Featured */
        .featured-card { display: grid; grid-template-columns: 1fr 1fr; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: border-color 0.15s; }
        .featured-card:hover { border-color: var(--accent); }
        .featured-visual { display: flex; align-items: center; justify-content: center; min-height: 300px; font-size: 6rem; background: linear-gradient(135deg, rgba(79,139,255,0.1), rgba(124,92,252,0.08)); position: relative; overflow: hidden; }
        .featured-visual::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 70%); }
        .featured-content { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; }
        .featured-badge { display: inline-block; padding: 5px 14px; border-radius: 20px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 18px; width: fit-content; }
        .featured-content h2 { font-size: 1.65rem; font-weight: 900; line-height: 1.25; margin-bottom: 14px; letter-spacing: -0.025em; }
        .featured-content p { color: var(--muted); font-size: 0.92rem; line-height: 1.8; margin-bottom: 22px; }
        .featured-meta { font-size: 0.75rem; color: var(--muted); margin-bottom: 22px; display: flex; gap: 14px; }
        .read-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; border-radius: 10px; background: var(--accent); color: #fff; font-weight: 700; font-size: 0.9rem; transition: opacity 0.15s; width: fit-content; }
        .read-btn:hover { opacity: 0.85; }

        /* Why trust us */
        .why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .why-card { padding: 28px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .why-icon { font-size: 2rem; margin-bottom: 14px; display: block; }
        .why-title { font-weight: 700; font-size: 0.95rem; margin-bottom: 8px; }
        .why-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.6; }

        /* Post grid */
        .post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); gap: 20px; }
        .post-card { padding: 28px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.15s, transform 0.15s; display: flex; flex-direction: column; }
        .post-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .post-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .post-tag { display: inline-block; padding: 3px 10px; border-radius: 20px; background: rgba(124,92,252,0.1); border: 1px solid rgba(124,92,252,0.2); color: var(--accent2); font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
        .post-read-time { font-size: 0.72rem; color: var(--muted); }
        .post-card h3 { font-size: 1.02rem; font-weight: 700; line-height: 1.4; margin-bottom: 10px; }
        .post-card h3 a:hover { color: var(--accent); }
        .post-card p { color: var(--muted); font-size: 0.87rem; line-height: 1.65; flex: 1; margin-bottom: 18px; }
        .post-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--border); }
        .post-date { font-size: 0.72rem; color: var(--muted); }
        .post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
        .faq-q { padding: 20px 24px; font-weight: 600; font-size: 0.95rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
        .faq-q::after { content: '+'; font-size: 1.4rem; color: var(--accent); font-weight: 300; flex-shrink: 0; margin-left: 16px; }
        .faq-a { padding: 0 24px 20px; font-size: 0.88rem; color: var(--muted); line-height: 1.75; }

        /* Newsletter */
        .newsletter-section { padding: 60px 40px; background: linear-gradient(135deg, var(--surface), rgba(79,139,255,0.06)); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; margin: 0 0 20px; }
        .newsletter-section h2 { font-size: 1.7rem; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.02em; }
        .newsletter-section p { color: var(--muted); margin-bottom: 28px; font-size: 1rem; }
        .newsletter-form { display: flex; gap: 12px; max-width: 460px; margin: 0 auto; }
        .newsletter-input { flex: 1; padding: 13px 18px; border-radius: 50px; background: var(--bg); border: 1px solid var(--border2); color: var(--text); font-size: 0.92rem; }
        .newsletter-input:focus { outline: none; border-color: var(--accent); }
        .newsletter-btn { padding: 13px 28px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 0.9rem; border: none; cursor: pointer; white-space: nowrap; }

        /* CTA */
        .cta-section { margin: 20px 0 70px; padding: 70px 40px; background: linear-gradient(135deg, var(--surface), rgba(79,139,255,0.06)); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; }
        .cta-section h2 { font-size: 2rem; font-weight: 900; margin-bottom: 14px; letter-spacing: -0.025em; }
        .cta-section p { color: var(--muted); margin-bottom: 32px; font-size: 1.05rem; max-width: 520px; margin-left: auto; margin-right: auto; }
        .cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; font-weight: 700; font-size: 1rem; transition: opacity 0.2s, transform 0.2s; box-shadow: 0 0 40px rgba(79,139,255,0.2); }
        .cta-btn:hover { opacity: 0.88; transform: translateY(-2px); }

        .empty-state { text-align: center; padding: 80px 0; color: var(--muted); }

        @media (max-width: 900px) {
          .picks-grid { grid-template-columns: 1fr; }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid { grid-template-columns: 1fr; }
          .how-grid::before { display: none; }
          .featured-card { grid-template-columns: 1fr; }
          .featured-visual { min-height: 160px; font-size: 4rem; }
          .featured-content { padding: 28px 24px; }
        }
        @media (max-width: 600px) {
          .hero { padding: 60px 20px 50px; }
          .cta-section, .newsletter-section { padding: 40px 20px; }
          .newsletter-form { flex-direction: column; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .stat-item { min-width: 100px; padding: 18px 10px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-dots" />
        <div className="hero-badge">Trusted by 50K+ Parents</div>
        <h1 dangerouslySetInnerHTML={{ __html: "Find the Safest<br />Best Baby Products" }} />
        <p>Expert-tested safety rankings for strollers, car seats, monitors and feeding gear. Every recommendation backed by rigorous research and real parent feedback.</p>
        <div className="hero-ctas">
          <a href="/best-baby-products" className="hero-cta-primary">Explore Top Picks →</a>
          <a href="/categories" className="hero-cta-secondary">Browse Categories →</a>
        </div>
        <div className="stats-bar">
          {([{"v":"500+","l":"Products Tested"},{"v":"50K+","l":"Parents Helped"},{"v":"50+","l":"Categories"},{"v":"2025","l":"Up-to-date"}] as {v:string,l:string}[]).map((st) => (
            <div className="stat-item" key={st.l}>
              <span className="stat-value">{st.v}</span>
              <span className="stat-label">{st.l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container">

        {/* ── TRENDING ── */}
        <section className="section" style={{ paddingBottom: 40 }}>
          <div className="section-eyebrow">Trending Now</div>
          <div className="trending-row">
            {([{"label":"Best Strollers 2025","hot":true,"href":"/best-strollers"},{"label":"Safest Car Seats","hot":true,"href":"/safest-car-seats"},{"label":"Baby Monitor Reviews","href":"/best-baby-monitors"},{"label":"Best Breast Pumps","href":"/best-breast-pumps"},{"label":"Convertible Cribs","href":"/best-convertible-cribs"},{"label":"Baby Food Makers","hot":true,"href":"/best-baby-food-makers"}] as {label:string,hot?:boolean,href:string}[]).map((t) => (
              <a key={t.label} href={t.href} className={"trending-pill" + (t.hot ? " trending-pill-hot" : "")}>
                {t.hot && "🔥 "}{t.label}
              </a>
            ))}
          </div>
        </section>

        {/* ── TOP 3 PICKS ── */}
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="section-eyebrow">Expert Picks</div>
          <div className="section-header">
            <h2 className="section-title">Top Baby Products of 2025</h2>
          </div>
          <div className="picks-grid">
            {([{"badge":"Best Overall","badgeType":"gold","icon":"🛒","title":"UPPAbaby Vista V2","desc":"The gold standard of full-size strollers — versatile, durable, and grows with your family.","rating":5,"href":"/uppababy-vista-v2-review"},{"badge":"Best Car Seat","badgeType":"silver","icon":"🚗","title":"Graco 4Ever DLX","desc":"One convertible seat that works from newborn to booster. Unmatched safety ratings.","rating":5,"href":"/graco-4ever-dlx-review"},{"badge":"Best Monitor","badgeType":"bronze","icon":"📷","title":"Nanit Pro Camera","desc":"Crystal-clear video, smart sleep tracking, and breathing monitoring in one device.","rating":4,"href":"/nanit-pro-review"}] as {badge:string,badgeType:string,icon:string,title:string,desc:string,rating:number,href:string}[]).map((p, i) => (
              <div key={p.title} className={"pick-card" + (i === 0 ? " pick-card--featured" : "")}>
                <span className={"pick-badge pick-badge--" + p.badgeType}>{p.badge}</span>
                <span className="pick-icon">{p.icon}</span>
                <div className="pick-title">{p.title}</div>
                <div className="pick-desc">{p.desc}</div>
                <div className="pick-rating">{STARS(p.rating)}</div>
                <div className="pick-rating-text">{p.rating}.0 / 5.0 — Expert Score</div>
                <a href={p.href} className="pick-link">Read Full Review →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section">
          <div className="section-eyebrow">Our Process</div>
          <div className="section-header">
            <h2 className="section-title">How We Rank Baby Products</h2>
          </div>
          <div className="how-grid">
            {([{"num":"01","title":"Safety Research First","desc":"We start with CPSC data, NHTSA crash test results and pediatrician recommendations."},{"num":"02","title":"Real Parent Testing","desc":"Products are tested by parents with babies of different ages across everyday scenarios."},{"num":"03","title":"Honest Rankings","desc":"We rank by safety, usability, and value — not by who has the biggest marketing budget."}] as {num:string,title:string,desc:string}[]).map((h) => (
              <div key={h.num} className="how-card">
                <div className="how-num">{h.num}</div>
                <div className="how-title">{h.title}</div>
                <div className="how-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="section" style={{ paddingTop: 0 }}>
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

        {/* ── FEATURED ── */}
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
                <p>{featured.description || "Read our comprehensive in-depth review and expert verdict."}</p>
                <div className="featured-meta">
                  {featured.date && <span>📅 {featured.date}</span>}
                  <span>⏱ 8 min read</span>
                </div>
                <span className="read-btn">Read Full Article →</span>
              </div>
            </a>
          </section>
        )}

        {/* ── LATEST ARTICLES ── */}
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
                  <div className="post-card-top">
                    {post.keyword && <span className="post-tag">{post.keyword}</span>}
                    <span className="post-read-time">⏱ 6 min</span>
                  </div>
                  <h3><a href={`/${post.slug}`}>{post.title}</a></h3>
                  <p>{post.description || "Read our expert analysis and verdict."}</p>
                  <div className="post-card-footer">
                    <span className="post-date">{post.date}</span>
                    <a href={`/${post.slug}`} className="post-link">Read →</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── WHY TRUST US ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Why Choose Us</div>
          <div className="section-header">
            <h2 className="section-title">Why Readers Trust BestBabyRank</h2>
          </div>
          <div className="why-grid">
            {([{"icon":"🛡️","title":"Safety First","desc":"We check CPSC recalls, NHTSA ratings and AAP guidelines before recommending anything."},{"icon":"👨‍👩‍👧","title":"Real Parent Testing","desc":"Every product is tested by actual parents with babies — not in a sterile lab."},{"icon":"💰","title":"No Brand Deals","desc":"We don't take money from brands. Our rankings reflect genuine safety and usability."},{"icon":"🔄","title":"Always Current","desc":"We update rankings when products are recalled, discontinued or significantly changed."}] as {icon:string,title:string,desc:string}[]).map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-eyebrow">Common Questions</div>
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {([{"q":"What is the safest infant car seat in 2025?","a":"The Graco SnugRide 35 Lite and Chicco KeyFit 35 consistently top safety ratings. Always check for current NHTSA ratings before purchasing."},{"q":"When should I buy a stroller?","a":"Ideally during the second trimester so you have time to research, compare and assemble before the baby arrives. Many parents buy around 28-32 weeks."},{"q":"Are expensive baby products always safer?","a":"Not always. Price often reflects features and materials, not safety. We highlight the best value picks that meet the same safety standards as premium options."},{"q":"How do you test baby products?","a":"We combine manufacturer safety data, independent lab reports, and hands-on testing by parent volunteers with babies ages 0-24 months."},{"q":"Do you cover recalls?","a":"Yes — we update rankings immediately when products are recalled by the CPSC or manufacturer."}] as {q:string,a:string}[]).map((f) => (
              <div key={f.q} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <div className="newsletter-section">
          <h2>New Parent? We've Got You</h2>
          <p>Get our weekly picks, safety alerts and buying guides delivered to your inbox.</p>
          <NewsletterForm />
        </div>

        {/* ── CTA ── */}
        <div className="cta-section">
          <h2>Give Your Baby the Safest Start</h2>
          <p>Get expert-tested rankings and trusted safety reviews so you can choose with total confidence.</p>
          <a href="/best-baby-products" className="cta-btn">Browse All Baby Rankings →</a>
        </div>

      </div>
    </>
  );
}
