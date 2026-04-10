"use client";
import { useEffect, useRef } from "react";

interface CommentsProps {
  title?: string;
}

export function Comments({ title }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "conceptsellerbills-cmyk/bestbabyrank");
    script.setAttribute("data-repo-id", "R_kgDOR8_5LQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOR8_5Lc4C6ga0");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;
    ref.current.appendChild(script);
  }, []);

  return (
    <div style={{ marginTop: 48 }}>
      <div style={{
        borderTop: "1px solid #1e2535",
        paddingTop: 40,
        marginBottom: 28,
      }}>
        <div style={{ fontSize: "0.72rem", color: "#4f8bff", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          Community
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#e4e8f4", letterSpacing: "-0.02em", marginBottom: 8 }}>
          Join the Discussion
        </h2>
        <p style={{ fontSize: "0.88rem", color: "#7a82a0", lineHeight: 1.6 }}>
          Share your experience, ask questions or leave a tip for other readers. Sign in with GitHub to comment.
        </p>
      </div>
      <div ref={ref} />
    </div>
  );
}
