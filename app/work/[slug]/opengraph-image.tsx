import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";
import { person } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ProjectOpengraphImage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  const title = project?.title ?? person.name;
  const category = project?.category ?? "";

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
          {category}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", marginTop: 32 }}>
          {person.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
