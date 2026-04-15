import type { Metadata } from "next";
export const metadata: Metadata = { title: "Affiliate Disclosure — BestBabyRank", description: "Affiliate Disclosure for BestBabyRank." };
export default function AffiliateDisclosurePage() {
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
        <div className="page-eyebrow">Legal</div>
        <h1 className="page-title">Affiliate Disclosure</h1>
        <p className="page-subtitle">Last updated: April 15, 2026</p>
        <hr className="page-divider" />
        <div className="highlight-box">
          <p><strong>BestBabyRank participates in affiliate programs, including the Amazon Associates Program.</strong> This means we may earn a commission when you click on certain links and make a purchase — at no additional cost to you.</p>
        </div>
        <h2>How It Works</h2>
        <p>When you click an affiliate link on our site and complete a purchase, we receive a small percentage of the sale from the retailer. This helps us keep the site running and continue producing free content for our readers.</p>
        <h2>Does It Affect Our Reviews?</h2>
        <p>No. Our editorial content is written independently and is not influenced by affiliate relationships. We recommend products based on research, testing, and genuine value to our readers — not based on commission rates. We sometimes recommend products for which we earn no commission if they are the best option for our readers.</p>
        <h2>Amazon Associates Program</h2>
        <p>BestBabyRank is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
        <h2>Other Affiliate Programs</h2>
        <p>We may also participate in affiliate programs with other retailers and brands relevant to baby products and parenting. All affiliate relationships are disclosed with "sponsored" or "affiliate link" labels where applicable.</p>
        <h2>Questions?</h2>
        <p>If you have questions about our affiliate relationships, contact us at <a href="mailto:hello@bestbabyrank.com">hello@bestbabyrank.com</a>.</p>
      </div>
    </>
  );
}
