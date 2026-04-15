import type { Metadata } from "next";
export const metadata: Metadata = { title: "Write for Us — BestBabyRank", description: "Contribute a guest post to BestBabyRank. Share your expertise on baby products and parenting." };
export default function WriteForUsPage() {
  return (
    <>
      <style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{background:#09080f;color:#e4e8f4;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.7}
  a{color:#4f8bff;text-decoration:none}
  a:hover{text-decoration:underline}
  .page-wrap{max-width:800px;margin:0 auto;padding:56px 24px 100px}
  .page-eyebrow{font-size:0.72rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4f8bff;margin-bottom:10px}
  .page-title{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:900;letter-spacing:-0.03em;margin-bottom:16px;color:#e4e8f4}
  .page-subtitle{font-size:1rem;color:#7a82a0;margin-bottom:40px;line-height:1.7;max-width:600px}
  .page-divider{border:none;border-top:1px solid #1e2535;margin:36px 0}
  h2{font-size:1.2rem;font-weight:700;color:#e4e8f4;margin:32px 0 12px}
  p{color:#9ca3af;line-height:1.8;margin-bottom:16px}
  ul{color:#9ca3af;margin:0 0 16px 20px;line-height:1.9}
  li{margin-bottom:4px}
  .contact-form{display:flex;flex-direction:column;gap:16px;margin-top:24px}
  .form-group{display:flex;flex-direction:column;gap:6px}
  .form-group label{font-size:0.85rem;font-weight:600;color:#c8cad8}
  .form-group input,.form-group textarea,.form-group select{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px 16px;color:#e4e8f4;font-size:0.95rem;font-family:inherit;outline:none;transition:border-color 0.15s;resize:vertical}
  .form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:#4f8bff}
  .form-group input::placeholder,.form-group textarea::placeholder{color:#4b5563}
  .form-submit{background:#4f8bff;color:#fff;border:none;border-radius:10px;padding:13px 32px;font-size:1rem;font-weight:700;cursor:pointer;align-self:flex-start;transition:opacity 0.15s}
  .form-submit:hover{opacity:0.85}
  .info-card{background:rgba(255,255,255,0.03);border:1px solid #1e2535;border-radius:12px;padding:24px 28px;margin-bottom:20px}
  .info-card h3{font-size:1rem;font-weight:700;color:#e4e8f4;margin-bottom:8px}
  .info-card p{margin:0;font-size:0.9rem}
  .highlight-box{background:rgba(79,139,255,0.08);border:1px solid rgba(79,139,255,0.25);border-radius:12px;padding:24px 28px;margin:28px 0}
  .highlight-box p{margin:0;color:#c8cad8}
`}</style>
      <div className="page-wrap">
        <div className="page-eyebrow">Contribute</div>
        <h1 className="page-title">Write for Us</h1>
        <p className="page-subtitle">We welcome guest contributors who can bring original insights and expertise to our readers. If you know baby products and parenting well, we'd love to publish your work.</p>
        <hr className="page-divider" />
        <h2>What We're Looking For</h2>
        <ul>
          <li>Original, well-researched articles on baby products and parenting</li>
          <li>Minimum 1,200 words — we prefer depth over brevity</li>
          <li>Practical, actionable content that genuinely helps readers</li>
          <li>No promotional content or paid placements disguised as editorial</li>
          <li>Proper grammar, clear structure, and cited sources where needed</li>
        </ul>
        <h2>What You Get</h2>
        <ul>
          <li>Author bio with a link to your website or social profile</li>
          <li>Exposure to our engaged readership</li>
          <li>Published under your name with full credit</li>
        </ul>
        <h2>How to Pitch</h2>
        <p>Email us at <a href="mailto:hello@bestbabyrank.com">hello@bestbabyrank.com</a> with the subject line "Guest Post Pitch" and include:</p>
        <ul>
          <li>Your proposed article title and a brief outline (3–5 bullet points)</li>
          <li>A short bio and any previous writing samples or published links</li>
          <li>Why you're qualified to write on this topic</li>
        </ul>
        <div className="highlight-box">
          <p><strong>Note:</strong> We do not accept articles that are AI-generated without substantial human editing, duplicate content, or posts that have been published elsewhere. All submissions are reviewed for quality before a response is sent.</p>
        </div>
      </div>
    </>
  );
}
