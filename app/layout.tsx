import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "BestBabyRank";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bestbabyrank.com"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: "Expert guides, reviews and tips.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <style>{`
          .site-header{background:#080b14;border-bottom:1px solid rgba(255,255,255,0.07);padding:14px 0;position:sticky;top:0;z-index:100}
          .header-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:24px}
          .site-brand{font-size:1.1rem;font-weight:800;color:#fff;text-decoration:none;white-space:nowrap;display:flex;align-items:center;gap:9px;transition:color 0.15s}
          .site-brand:hover{color:#4f8bff}
          .site-logo{flex-shrink:0;display:block}
          .cat-nav{position:relative}
          .cat-btn{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e2e8f0;font-size:0.875rem;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:6px;white-space:nowrap;transition:background 0.15s,border-color 0.15s}
          .cat-btn:hover,.cat-nav:focus-within .cat-btn{background:rgba(255,255,255,0.1);border-color:#4f8bff;color:#4f8bff}
          .cat-btn svg{transition:transform 0.2s}
          .cat-nav:hover .cat-btn svg,.cat-nav:focus-within .cat-btn svg{transform:rotate(180deg)}
          .cat-dropdown{display:none;position:absolute;top:calc(100% + 8px);left:0;background:#1a1d2e;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:8px;min-width:220px;box-shadow:0 16px 48px rgba(0,0,0,0.5);z-index:200;max-height:70vh;overflow-y:auto}
          .cat-nav:hover .cat-dropdown,.cat-nav:focus-within .cat-dropdown{display:block}
          .cat-dropdown a{display:block;padding:9px 14px;border-radius:8px;color:#c8cad8;font-size:0.875rem;text-decoration:none;transition:background 0.1s,color 0.1s;white-space:nowrap}
          .cat-dropdown a:hover{background:rgba(255,255,255,0.06);color:#4f8bff}
          .site-footer{border-top:1px solid rgba(255,255,255,0.07);padding:24px 0;margin-top:60px}
          .site-footer p{color:#6b7280;font-size:0.82rem;text-align:center}
        `}</style>
        <header className="site-header">
          <div className="header-inner">
            <a href="/" className="site-brand">
              <svg className="site-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f8bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="#4f8bff22" stroke="#4f8bff"/>
              </svg>
              {SITE_NAME}
            </a>
            <nav className="cat-nav" tabIndex={0}>
              <button className="cat-btn" aria-haspopup="true">
                Categories
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              <div className="cat-dropdown" role="menu">
              <a href="/category/baby-monitors">🍼 Baby Monitors</a>
              <a href="/category/baby-wipes">🧻 Baby Wipes</a>
              <a href="/category/play-mats">🟦 Play Mats</a>
              <a href="/category/baby-carriers">🎒 Baby Carriers</a>
              <a href="/category/strollers">🛒 Strollers</a>
              <a href="/category/baby-feeding">🍽️ Baby Feeding</a>
              <a href="/category/baby-sleep">😴 Baby Sleep</a>
              <a href="/category/baby-bath">🛁 Baby Bath</a>
              <a href="/category/baby-safety">🔒 Baby Safety</a>
              <a href="/category/baby-clothing">👕 Baby Clothing</a>
              </div>
            </nav>
          </div>
        </header>
        <main className="container main-content">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
