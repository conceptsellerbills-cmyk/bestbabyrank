import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy — BestBabyRank", description: "Privacy Policy for BestBabyRank (bestbabyrank.com)." };
export default function PrivacyPolicyPage() {
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
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">Last updated: April 15, 2026</p>
        <hr className="page-divider" />
        <h2>1. Introduction</h2>
        <p>Welcome to BestBabyRank ("we", "us", or "our"), accessible at bestbabyrank.com. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.</p>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Usage data:</strong> Pages visited, time spent on site, browser type, device type, and IP address — collected automatically via analytics tools.</li>
          <li><strong>Email address:</strong> If you subscribe to our newsletter or contact us through a form.</li>
          <li><strong>Cookies:</strong> Small files stored on your device to improve your browsing experience. See our Cookie Policy for details.</li>
        </ul>
        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To improve and personalize our website content</li>
          <li>To send newsletters and updates (only if you subscribed)</li>
          <li>To respond to inquiries and support requests</li>
          <li>To analyze site traffic and user behavior (anonymized)</li>
        </ul>
        <h2>4. Third-Party Services</h2>
        <p>We use third-party services that may collect data independently, including Google Analytics for traffic analysis and email service providers for newsletter delivery. These services have their own privacy policies.</p>
        <h2>5. Affiliate Links</h2>
        <p>Some links on our site are affiliate links. Clicking them does not cost you anything extra but may result in a commission for us. This does not affect our editorial opinions. See our Affiliate Disclosure for details.</p>
        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at <a href="mailto:hello@bestbabyrank.com">hello@bestbabyrank.com</a>.</p>
        <h2>7. Data Retention</h2>
        <p>We retain your email address only as long as you remain subscribed to our newsletter. You can unsubscribe at any time via the link in any email we send.</p>
        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance.</p>
        <h2>9. Contact</h2>
        <p>For privacy-related questions, contact us at <a href="mailto:hello@bestbabyrank.com">hello@bestbabyrank.com</a>.</p>
      </div>
    </>
  );
}
