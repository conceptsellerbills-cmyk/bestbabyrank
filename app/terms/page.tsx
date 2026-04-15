import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use — BestBabyRank", description: "Terms of Use for BestBabyRank (bestbabyrank.com)." };
export default function TermsPage() {
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
        <h1 className="page-title">Terms of Use</h1>
        <p className="page-subtitle">Last updated: April 15, 2026</p>
        <hr className="page-divider" />
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using bestbabyrank.com, you accept and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website.</p>
        <h2>2. Use of Content</h2>
        <p>All content published on BestBabyRank — including articles, reviews, images, and graphics — is the intellectual property of BestBabyRank unless otherwise stated. You may not reproduce, distribute, or republish our content without prior written permission.</p>
        <h2>3. Accuracy of Information</h2>
        <p>We strive to provide accurate and up-to-date information, but we make no warranties regarding the completeness or accuracy of any content. Information on this site is provided for informational purposes only and should not be taken as professional advice.</p>
        <h2>4. Third-Party Links</h2>
        <p>Our site contains links to third-party websites and products. We are not responsible for the content, privacy practices, or availability of those sites. Affiliate links may result in a commission to us at no extra cost to you.</p>
        <h2>5. Limitation of Liability</h2>
        <p>BestBabyRank is not liable for any direct, indirect, or consequential damages arising from your use of this website or reliance on information published here.</p>
        <h2>6. Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes your acceptance of the revised terms.</p>
        <h2>7. Contact</h2>
        <p>For questions about these Terms of Use, contact us at <a href="mailto:hello@bestbabyrank.com">hello@bestbabyrank.com</a>.</p>
      </div>
    </>
  );
}
