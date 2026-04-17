import Link from "next/link";
import { getAllPosts } from "../lib/posts";

export default function NotFound() {
  const recent = getAllPosts().slice(0, 6);

  return (
    <>
      <style>{`
        .nf-wrap{min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;text-align:center;background:#060d1f}
        .nf-code{font-size:clamp(5rem,15vw,9rem);font-weight:900;line-height:1;background:linear-gradient(135deg,#4f8bff55,#4f8bff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px}
        .nf-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;color:#fff;margin-bottom:12px}
        .nf-desc{color:#7a82a0;font-size:1rem;max-width:480px;margin:0 auto 36px}
        .nf-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:64px}
        .nf-btn-primary{background:#4f8bff;color:#fff;border:none;padding:12px 28px;border-radius:8px;font-size:0.95rem;font-weight:700;cursor:pointer;text-decoration:none;transition:opacity 0.15s}
        .nf-btn-primary:hover{opacity:0.85}
        .nf-btn-secondary{background:transparent;color:#7a82a0;border:1px solid #1e2535;padding:12px 28px;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;text-decoration:none;transition:border-color 0.15s,color 0.15s}
        .nf-btn-secondary:hover{border-color:#4f8bff;color:#4f8bff}
        .nf-recent{width:100%;max-width:800px;margin:0 auto}
        .nf-recent-title{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7a82a0;margin-bottom:20px}
        .nf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
        .nf-card{background:#0f1420;border:1px solid #1e2535;border-radius:10px;padding:16px;text-align:left;text-decoration:none;transition:border-color 0.15s,transform 0.15s;display:block}
        .nf-card:hover{border-color:#4f8bff;transform:translateY(-2px)}
        .nf-card-title{font-size:0.88rem;font-weight:600;color:#e4e8f4;line-height:1.4;margin-bottom:6px}
        .nf-card-kw{font-size:0.72rem;color:#7a82a0}
      `}</style>

      <div className="nf-wrap">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Page not found</h1>
        <p className="nf-desc">The page you&apos;re looking for doesn&apos;t exist or has been moved. Try one of these instead:</p>

        <div className="nf-actions">
          <Link href="/" className="nf-btn-primary">← Back to Home</Link>
          <Link href="/all-articles" className="nf-btn-secondary">All Articles</Link>
        </div>

        {recent.length > 0 && (
          <div className="nf-recent">
            <p className="nf-recent-title">Recent Articles</p>
            <div className="nf-grid">
              {recent.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="nf-card">
                  <div className="nf-card-title">{post.title}</div>
                  {post.keyword && <div className="nf-card-kw">{post.keyword}</div>}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
