import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import VideoModalProvider from "@/components/VideoModal";
import { SoundProvider } from "@/components/SoundToggle";
import CustomCursor from "@/components/CustomCursor";
import CinematicBackground from "@/components/CinematicBackground";
import LoadingScreen from "@/components/LoadingScreen";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { person } from "@/data/site";

// Fonts are loaded via a runtime <link> tag rather than next/font/google.
// next/font fetches font files at BUILD time, which fails in network-
// restricted CI/sandbox environments; a standard <link> defers the fetch
// to the browser, which works everywhere (including Vercel) and is what
// most production sites do for Google Fonts. Swap for next/font if your
// deploy environment has unrestricted build-time network access.
const siteUrl = "https://asadullahkarim.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} — Documentary Filmmaker & Creative Producer`,
    template: `%s — ${person.name}`,
  },
  description:
    "Asadullah Karim is a Saudi documentary filmmaker and creative producer. Selected work spans Netflix, the Red Sea International Film Festival, and national institutional campaigns.",
  keywords: [
    "Asadullah Karim",
    "documentary filmmaker",
    "creative producer",
    "Saudi Arabia filmmaker",
    "Netflix New Saudi Voices",
    "creative director",
  ],
  authors: [{ name: person.name }],
  openGraph: {
    title: `${person.name} — Documentary Filmmaker & Creative Producer`,
    description:
      "A cinematic portfolio of documentary films, institutional campaigns, and creative direction from Saudi Arabia.",
    url: siteUrl,
    siteName: person.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Documentary Filmmaker & Creative Producer`,
    description:
      "A cinematic portfolio of documentary films, institutional campaigns, and creative direction from Saudi Arabia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
};

// Person structured data (schema.org) — lets search engines and AI
// assistants understand who this site belongs to and what they do,
// independent of how the visible copy is phrased. Built entirely from
// existing data (src/data/site.ts), nothing new is asserted.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.title,
  email: `mailto:${person.email}`,
  url: siteUrl,
  description: person.statement,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500;600&family=Fraunces:ital,opsz,wght@1,9..144,460&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper font-body relative">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <CinematicBackground />
        <LoadingScreen />
        <SmoothScroll>
          <SoundProvider>
            <VideoModalProvider>
              <CustomCursor />
              <Nav />
              <main id="main-content" className="relative z-10">
                {children}
              </main>
              <Footer />
            </VideoModalProvider>
          </SoundProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
