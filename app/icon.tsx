import { ImageResponse } from "next/og";

// Generates a simple monogram favicon at build/runtime — no external image
// asset required. Replace with a real /app/icon.png if a designed mark is
// available later (Next.js will prefer a static file automatically).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          color: "#D8B56A",
          fontSize: 32,
          fontWeight: 600,
          fontFamily: "sans-serif",
          letterSpacing: "-1px",
        }}
      >
        AK
      </div>
    ),
    { ...size }
  );
}
