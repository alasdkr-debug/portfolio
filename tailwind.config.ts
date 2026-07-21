import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep cinematic identity — near-black studio background with a
        // restrained crimson accent system. No bright/saturated reds
        // anywhere; everything is desaturated toward black for a premium,
        // film-grade feel rather than a "brand red" website.
        void: "#040404",
        ink: "#070707",
        surface: "rgba(255,255,255,0.04)",
        surface2: "rgba(255,255,255,0.06)",
        surface3: "rgba(255,255,255,0.09)",
        paper: "#F8F8F8",
        crimson: "#B11226",
        "crimson-deep": "#6E0D18",
        "crimson-dim": "rgba(177,18,38,0.45)",
        accent: "#E63946",
        "accent-dim": "rgba(230,57,70,0.5)",
        "accent-bright": "#F2555F",
        mist: "rgba(248,248,248,0.62)",
        "mist-dim": "rgba(248,248,248,0.38)",
        hairline: "rgba(255,255,255,0.12)",
        "hairline-strong": "rgba(255,255,255,0.22)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "serif"],
      },
      fontSize: {
        "hero": ["clamp(3.4rem, 9.5vw, 10.5rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-2xl": ["clamp(3rem, 7vw, 7.5rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.1rem, 4.5vw, 4.2rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "lead": ["clamp(1.15rem, 1.6vw, 1.5rem)", { lineHeight: "1.65" }],
        "counter": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        tight2: "-0.04em",
        widest2: "0.35em",
      },
      lineHeight: {
        relaxed2: "1.75",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        expensive: "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      transitionDuration: {
        900: "900ms",
        1100: "1100ms",
        1400: "1400ms",
      },
      borderRadius: {
        xs: "3px",
        card: "14px",
        panel: "22px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.5), 0 24px 48px -24px rgba(0,0,0,0.75)",
        "card-hover": "0 1px 2px rgba(0,0,0,0.6), 0 50px 100px -30px rgba(0,0,0,0.85)",
        glow: "0 0 0 1px rgba(230,57,70,0.22), 0 20px 70px -20px rgba(177,18,38,0.4)",
        "glow-soft": "0 0 40px -8px rgba(177,18,38,0.35)",
      },
      maxWidth: {
        content: "1600px",
        measure: "40rem",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
