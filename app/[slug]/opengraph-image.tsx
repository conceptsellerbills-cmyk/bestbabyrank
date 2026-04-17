import { ImageResponse } from "next/og";
import { getPostBySlug } from "../../lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title || "Article";
  const description = post?.description || "";
  const category = post?.category?.replace(/-/g, " ") || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#060d1f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          fontFamily: "sans-serif",
          padding: "60px 64px",
          position: "relative",
        }}
      >
        {/* gradient accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "#4f8bff" }} />

        {/* subtle gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />

        {/* category pill */}
        {category ? (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignSelf: "flex-start",
              background: "#4f8bff22",
              border: "1px solid #4f8bff66",
              color: "#4f8bff",
              fontSize: 18,
              fontWeight: 700,
              padding: "6px 18px",
              borderRadius: 40,
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {category}
          </div>
        ) : null}

        {/* title */}
        <div
          style={{
            position: "relative",
            fontSize: title.length > 60 ? 42 : title.length > 40 ? 50 : 58,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 20,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        {/* description */}
        {description ? (
          <div style={{ position: "relative", fontSize: 22, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, maxWidth: 900 }}>
            {description.length > 120 ? description.slice(0, 120) + "…" : description}
          </div>
        ) : null}

        {/* site badge */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 64,
            fontSize: 20,
            fontWeight: 700,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.05em",
          }}
        >
          bestbabyrank.com
        </div>
      </div>
    ),
    { ...size }
  );
}
