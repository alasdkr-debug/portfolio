import { ImageResponse } from "next/og";
import { person } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${person.name} — Documentary Filmmaker & Creative Producer`;

// Generated share card (no external image asset required) — used whenever
// this site is shared on social platforms, iMessage, Slack, etc. Individual
// project pages generate their own version (see work/[slug]/opengraph-image.tsx).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(216,181,106,0.16), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#D8B56A",
            marginBottom: 28,
          }}
        >
          Documentary Filmmaker &amp; Creative Producer
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1,
            letterSpacing: -2,
          }}
        >
          {person.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
