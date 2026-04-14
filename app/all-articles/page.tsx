import { getAllPosts } from "../../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles — BestBabyRank",
  description: "Browse every article published on BestBabyRank.",
};

export default function AllArticlesPage() {
  const posts = getAllPosts();

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{background:#080b14;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
        a{text-decoration:none;color:inherit}
        .aa-wrap{max-width:1100px;margin:0 auto;padding:48px 24px 80px}
        .aa-header{margin-bottom:40px;padding-bottom:24px;border-bottom:1px solid #1e2535}
        .aa-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f8bff;margin-bottom:8px}
        .aa-title{font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:900;letter-spacing:-0.03em}
        .aa-count{font-size:0.9rem;color:#7a82a0;margin-top:8px}
        .aa-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
        .aa-card{background:#0f1420;border:1px solid #1e2535;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;transition:border-color 0.15s,transform 0.15s}
        .aa-card:hover{border-color:#4f8bff;transform:translateY(-2px)}
        .aa-img{width:100%;height:180px;object-fit:cover;display:block;flex-shrink:0}
        .aa-img-placeholder{width:100%;height:180px;display:flex;align-items:center;justify-content:center;font-size:3rem;flex-shrink:0}
        .aa-body{padding:20px;display:flex;flex-direction:column;flex:1}
        .aa-tag{display:inline-block;font-size:0.68rem;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#4f8bff;background:#4f8bff18;border:1px solid #4f8bff30;padding:3px 10px;border-radius:20px;margin-bottom:12px;width:fit-content}
        .aa-card-title{font-size:0.98rem;font-weight:700;line-height:1.4;margin-bottom:8px;color:#e4e8f4}
        .aa-card-title:hover{color:#4f8bff}
        .aa-desc{font-size:0.85rem;color:#7a82a0;line-height:1.65;flex:1;margin-bottom:16px}
        .aa-footer{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid #1e2535}
        .aa-date{font-size:0.72rem;color:#7a82a0}
        .aa-read{font-size:0.82rem;font-weight:600;color:#4f8bff}
        .aa-empty{text-align:center;padding:80px 0;color:#7a82a0}
        @media(max-width:600px){.aa-grid{grid-template-columns:1fr}}
      `}</style>
      <div className="aa-wrap">
        <div className="aa-header">
          <div className="aa-eyebrow">Archive</div>
          <h1 className="aa-title">All Articles</h1>
          <p className="aa-count">{posts.length} article{posts.length !== 1 ? "s" : ""} published</p>
        </div>
        {posts.length === 0 ? (
          <p className="aa-empty">No articles yet — check back soon!</p>
        ) : (
          <div className="aa-grid">
            {posts.map((post) => {
              const hue = post.slug.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 0);
              const grad = `linear-gradient(135deg,hsl(${hue},40%,12%) 0%,hsl(${(hue+50)%360},50%,22%) 100%)`;
              return (
                <a href={`/${post.slug}`} className="aa-card" key={post.slug}>
                  {post.coverImage
                    ? <img src={post.coverImage} alt={post.title} className="aa-img" />
                    : <div className="aa-img-placeholder" style={{ background: grad }}>📄</div>
                  }
                  <div className="aa-body">
                    {post.keyword && <span className="aa-tag">{post.keyword}</span>}
                    <div className="aa-card-title">{post.title}</div>
                    {post.description && <p className="aa-desc">{post.description}</p>}
                    <div className="aa-footer">
                      <span className="aa-date">{post.date}</span>
                      <span className="aa-read">Read →</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
