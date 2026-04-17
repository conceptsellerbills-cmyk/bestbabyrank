import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Best Baby Rank";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#060d1f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* gradient accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#4f8bff" }} />

        {/* site name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Best Baby Rank
        </div>

        {/* tagline */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: 700 }}>
          Expert reviews, guides and top picks
        </div>

        {/* accent dot decoration */}
        <div style={{ position: "absolute", bottom: 48, display: "flex", gap: 10 }}>
          {[0,1,2].map((i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i === 1 ? "#4f8bff" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
