// Biography, career timeline, clients, and contact details — extracted from
// the source portfolio and lightly rewritten for tone and grammar only.

import { getProject } from "./projects";

export const person = {
  name: "Asadullah Karim",
  title: "Creative Producer & Documentary Filmmaker",
  born: "Born 1992 · Kingdom of Saudi Arabia",
  email: "al.asd.kr@gmail.com",
  phone: "+966 50 766 6276",
  statement:
    "In my creative journey, I am not just a content maker, but a leader who shapes vision and transforms ideas into visual stories that put people first. I believe every project is an opportunity to highlight the human side behind technology and art, showing how stories can inspire and create lasting impact. As a Creative Director and Producer, my role is to guide both the team and the idea — crafting works that inspire, document, and endure.",
  heroLine: "A Storyteller Behind the Lens",
  bio: [
    "A creative leader in documentary filmmaking and visual production, Asadullah has led visual campaigns for government entities across Saudi Arabia.",
    "He leads teams and shapes institutional content in a bold visual style — with the professionalism and discretion senior officials require on set.",
  ],
};

export type TimelineEntry = {
  role: string;
  org: string;
  period: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    role: "Creative Producer",
    org: "Ministry of Communications and Information Technology (MCIT)",
    period: "2023 — Present",
    description:
      "Leading creative productions and digital content strategy, readying to take on full Creative Director responsibilities.",
  },
  {
    role: "Digital Content Analyst & Producer",
    org: "Ministry of Communications and Information Technology (MCIT)",
    period: "2019 — 2022",
    description:
      "Developed and executed digital campaigns, producing impactful content for national initiatives and building strong creative direction skills.",
  },
  {
    role: "Videographer, Editor & Director",
    org: "Ministry of Communications and Information Technology (MCIT)",
    period: "2019 — 2022",
    description:
      "Managed end-to-end video production, from concept to editing, aligned with institutional identity and creative vision.",
  },
  {
    role: "Videographer",
    org: "Rotana Khalejia — Taif Season",
    period: "2019",
    description:
      "Produced daily reports and creative coverage for national seasonal events.",
  },
  {
    role: "Production Team",
    org: "MBC Group — Souq Okaz",
    period: "2018",
    description:
      "Supported large-scale media production in a fast-paced broadcast environment.",
  },
  {
    role: "Videographer",
    org: "MBC Group — Souq Okaz",
    period: "2017",
    description: "Delivered visual storytelling for cultural and entertainment events.",
  },
  {
    role: "Videographer, Editor & Director",
    org: "Taif University",
    period: "2017 — 2019",
    description:
      "Oversaw creative projects from videography to directing, building the foundation for creative leadership.",
  },
];

export const awards = [
  {
    title: "Netflix — New Saudi Voices",
    detail: "Covida the 19th selected for global distribution.",
    year: "2021",
  },
  {
    title: "Red Sea International Film Festival",
    detail: "Official Selection — Covida the 19th.",
    year: "2021",
  },
  {
    title: "Okaz Film Competition — First Place",
    detail: "Awarded for Okaz, produced and edited in under 24 hours.",
    year: "2018",
  },
  {
    title: "Cefalù Film Festival",
    detail: "Official Selection — Sarmadi (Eternal).",
    year: "2018",
  },
];

export const clients = [
  "Ministry of Communications and Information Technology (MCIT)",
  "Esports World Cup (EWC)",
  "Fourth Industrial Revolution Center",
  "Taif University",
  "MBC Group",
  "Rotana Khalejia",
  "Netflix — New Saudi Voices",
  "Red Sea International Film Festival",
];

export const socials = {
  email: "al.asd.kr@gmail.com",
  linkedin: "#",
  instagram: "#",
};

// Temporary showreel source for the Hero/Showreel "watch instantly" CTAs.
// No dedicated reel has been cut yet, so this points at the most
// award-recognised existing film (Netflix-selected, Red Sea IFF official
// selection) as a stand-in. Swap for a real compilation reel URL the
// moment one exists — everything that plays it reads from this constant.
export const showreelUrl = getProject("covida-the-19th")?.watchUrl ?? "";

// The site's own five-stage creative workflow, described in general terms
// (not a claim about any specific project) — used by the Creative Process
// section.
export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const creativeProcess: ProcessStep[] = [
  {
    index: "01",
    title: "Concept & Research",
    description:
      "Every film starts with a real question, not a shot list — understanding the people, the institution, and the story worth telling before a single frame is planned.",
  },
  {
    index: "02",
    title: "Story & Script",
    description:
      "Structure comes next: a narrative spine strong enough to carry documentary honesty and institutional clarity at the same time.",
  },
  {
    index: "03",
    title: "Production & Cinematography",
    description:
      "On set, craft meets discretion — composing, lighting, and directing with the professionalism senior officials and institutions require.",
  },
  {
    index: "04",
    title: "Post-Production & Color",
    description:
      "In the edit, pace and color give the story its final emotional register — where a document becomes a film.",
  },
  {
    index: "05",
    title: "Delivery & Distribution",
    description:
      "From festival premiere to national broadcast, the final cut is prepared and delivered to meet each platform's own bar.",
  },
];

// Testimonials and press mentions are not yet collected — these are
// intentionally left as labeled placeholders rather than invented quotes
// or press coverage. Replace with real client testimonials / press links
// as they become available.
export const testimonialsPlaceholder = true;
export const mediaCoveragePlaceholder = true;
