// All project data extracted from the source portfolio (Canva design "ASAD").
// Copy has been lightly rewritten for tone and grammar; no facts, credits,
// awards, or projects have been invented, exaggerated, or removed.

export type Project = {
  slug: string;
  title: string;
  arabicTitle?: string;
  category: string;
  duration?: string;
  year?: string;
  client?: string;
  role: string;
  synopsis: string;
  overview: string;
  awards?: string[];
  watchUrl?: string;
  tone: "warm" | "cool" | "crimson" | "mono";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "covida-the-19th",
    title: "Covida the 19th",
    arabicTitle: "كوفيدا التاسع عشر",
    category: "Short Mockumentary",
    duration: "8:05",
    role: "Writer · Producer · Actor",
    watchUrl: "https://youtu.be/BmEry4oxATw",
    synopsis:
      "From a living room to Netflix — a lockdown reimagined as a creative journey, shot on a simple camera with household objects.",
    overview:
      "What began as a small Eid project, made with a single camera and whatever the house had to offer, grew into a full mockumentary production. Asadullah contributed to the writing, produced, and starred in the film. It premiered at the Red Sea International Film Festival and was later selected for Netflix's New Saudi Voices series — a rare journey from a bedroom production to a global streaming platform.",
    awards: ["Red Sea International Film Festival — Official Selection", "Netflix — New Saudi Voices"],
    tone: "warm",
    featured: true,
  },
  {
    slug: "trip",
    title: "Trip",
    category: "Music Film",
    duration: "2:00",
    role: "Producer (Film & Song)",
    watchUrl: "https://www.youtube.com/watch?v=lC36UD7GkcQ",
    synopsis:
      "An unreleased short music film exploring addiction — dreamy, dark, and quietly unsettling.",
    overview:
      "Trip is a two-minute music film that explores addiction through a dreamlike, shadowed visual language. As producer of both the film and its accompanying song, Asadullah focused on intimate, vivid detail built from minimal elements — reflecting how easily reality can distort when everything is sacrificed for escape.",
    tone: "cool",
  },
  {
    slug: "okaz",
    title: "Okaz",
    category: "Short Documentary",
    duration: "2:51",
    client: "Souq Okaz",
    role: "Producer · Writer · Editor",
    watchUrl: "https://youtu.be/12ju3eQQM9I",
    synopsis:
      "A historic marketplace, seen through the eyes of a child — produced, co-written, and edited in under 24 hours.",
    overview:
      "Okaz captures the centuries-old Souq Okaz through the eyes of a young child leading a journey of discovery through the market. Made against a punishing 24-hour deadline, the film transformed a fast-paced challenge into a recognised achievement, taking First Place at the Okaz Film Competition. In under three minutes, it reflects a passion for turning fleeting moments into powerful visual stories.",
    awards: ["First Place — Okaz Film Competition"],
    tone: "crimson",
    featured: true,
  },
  {
    slug: "sarmadi-eternal",
    title: "Sarmadi (Eternal)",
    category: "Short Film",
    duration: "15:43",
    client: "Taif University",
    role: "Director of Photography · Lighting",
    watchUrl: "https://youtu.be/fegF0BkMvtc",
    synopsis:
      "A university's achievements, told not as statistics but as a dramatic story of a student confronting illness on the most important day of his life.",
    overview:
      "Sarmadi (Eternal) reframes institutional achievement as human drama — following a student facing illness on the day that matters most. Asadullah served as Director of Photography and Lighting, shaping a visual language dramatic enough to carry real emotional weight. The university president appeared in the film in support of the vision. Sarmadi screened at the graduation ceremony and was later selected for the Cefalù Film Festival (2018).",
    awards: ["Cefalù Film Festival — Official Selection (2018)"],
    tone: "mono",
    featured: true,
  },
  {
    slug: "code-up-series",
    title: "Code Up Series",
    category: "Documentary Series",
    role: "Concept · Director",
    watchUrl:
      "https://www.youtube.com/watch?v=IRoXUOiuq0s&list=PLl2hwUhi18A9Kk5iMFOUj9qKgCsPvRjO-",
    synopsis:
      "A documentary series on tech entrepreneurship, built around the human stories behind innovation.",
    overview:
      "Asadullah developed the concept and directed this series end to end, shaping a visual identity that reflects the initiative's innovative spirit and speaks directly to its target audience. The direction favours human stories over technical showcase, blending documentary observation with a modern creative approach. The completed series supports entrepreneurial projects and inspires a new generation of youth into tech entrepreneurship.",
    tone: "cool",
  },
  {
    slug: "national-day-repatriation",
    title: "National Day: Repatriation of Citizens During COVID-19",
    category: "Documentary Short",
    duration: "3:03",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Concept · Writer · Director · Cinematographer · Producer",
    watchUrl: "https://x.com/aalswaha/status/1308754661957144576",
    synopsis:
      "The true story of Saudi Arabia's effort to bring its citizens home when the world's airports closed.",
    overview:
      "Conceived, written, directed, filmed, and produced by Asadullah, this film was released exclusively on the Minister of Communications' account. It tells the true story of Saudi Arabia's national effort to repatriate citizens stranded abroad during the global closure of airports at the height of the COVID-19 pandemic — highlighting the Kingdom's crisis management and its values of solidarity and compassion, released to mark National Day.",
    tone: "crimson",
    featured: true,
  },
  {
    slug: "founding-day-project",
    title: "Founding Day Project",
    category: "Institutional Film",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Creative Supervisor",
    synopsis:
      "An official Founding Day production delivered in a single week, without compromise on craft.",
    overview:
      "As Creative Supervisor for the Ministry, Asadullah oversaw every artistic and technical detail to ensure the project was delivered at its best within a one-week window. Responsibilities spanned filming, lighting, and editing, coordinated closely with production teams to protect visual identity, quality, and delivery timelines.",
    tone: "mono",
  },
  {
    slug: "founding-day-song",
    title: "Founding Day Song",
    category: "Music Film",
    duration: "1:55",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Creative Supervisor",
    watchUrl: "https://x.com/McitGovSa/status/1628141063595769856",
    synopsis:
      "A national anthem of a different kind — from the soil to the skies.",
    overview:
      "As Creative Supervisor, Asadullah oversaw every artistic and production detail to ensure this Founding Day song conveyed a deep sense of national pride at exactly the right moment. Coordinating writing, music, filming, and editing teams, the result is a work that embodies national identity and pride, from the soil to the skies.",
    tone: "crimson",
  },
  {
    slug: "saudi-national-day-94",
    title: "Saudi National Day 94",
    category: "Institutional Film",
    duration: "1:58",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Creative Supervisor",
    watchUrl: "https://x.com/McitGovSa/status/1838001479430369673",
    synopsis:
      "Celebrating innovative minds and an ambitious, forward-looking future.",
    overview:
      "As Creative Supervisor, Asadullah oversaw the entire creative and technical process, ensuring the message celebrated innovative minds and the ambition of a forward-looking Kingdom. The film foregrounds the human element in technology, showcasing how Saudi talent creates solutions that shape the nation for the better — coordinated across content, design, filming, and editing teams into a single, unified production of national pride and achievement.",
    tone: "crimson",
    featured: true,
  },
  {
    slug: "saudi-national-day-93",
    title: "Saudi National Day 93",
    category: "Institutional Film",
    duration: "1:58",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Creative Supervisor",
    watchUrl: "https://x.com/McitGovSa/status/1704921291747193324",
    synopsis:
      "A new generation of youth as architects of the Kingdom's future.",
    overview:
      "Asadullah oversaw all creative and technical stages of this production to ensure it reflected the vision of an ambitious nation. The film highlights a new generation of youth as pioneers of leadership, showcasing how their creativity and innovation drive progress and development — with production coordination geared toward one goal: a piece that reinforces national pride.",
    tone: "crimson",
  },
  {
    slug: "ignite-launch",
    title: "Ignite Launch",
    category: "Campaign Film",
    duration: "1:09",
    client: "Saudi Digital Content Project",
    role: "Creative Supervisor",
    synopsis:
      "Launching a national platform for Saudi digital content and creative industry.",
    overview:
      "As Creative Supervisor for the Ignite launch, Asadullah oversaw every creative and technical stage to ensure best-in-class delivery. Focus centred on visual identity, supervising production to highlight the strength of Saudi digital content and align with the national vision of supporting and advancing the Kingdom's creative industries.",
    tone: "cool",
  },
  {
    slug: "minister-speech",
    title: "Minister of Communications — Speech",
    category: "Institutional Film",
    client: "Ministry of Communications and Information Technology (MCIT)",
    role: "Director · Cinematographer · Editor",
    synopsis:
      "A ministerial address, shaped with a visual style equal to its message.",
    overview:
      "Asadullah directed, filmed, and fully edited the Minister of Communications' address — building a professional visual style that reflected the gravity of the occasion and delivered its core messages with clarity and impact.",
    tone: "mono",
  },
  {
    slug: "minister-interview",
    title: "Interview with the Minister of Communications",
    category: "Institutional Film",
    client: "Fourth Industrial Revolution Center",
    role: "Director · Cinematographer · Editor",
    synopsis:
      "An exclusive interview, given a visual presence worthy of its significance.",
    overview:
      "Directing, filming, and editing this exclusive interview in full, Asadullah focused on a professional visual style that matched the significance of the event — giving the Minister's presence weight while ensuring every key message landed clearly.",
    tone: "cool",
  },
  {
    slug: "esports-world-cup",
    title: "Esports World Cup — 2024 & 2025 Campaigns",
    category: "Brand Campaign",
    client: "Esports World Cup (EWC)",
    role: "Creative Lead · Producer",
    synopsis:
      "Two consecutive campaigns for the world's largest esports event — 10 films, then 31.",
    overview:
      "Asadullah directed two consecutive campaigns for the Esports World Cup. The first year's campaign delivered ten films; the following year, a larger campaign delivered thirty-one. His role centred on building a cohesive creative timeline — from concept through execution — ensuring consistent messaging and high production quality throughout. The 2025 campaign reinforced the Kingdom's position as the global capital of esports, supported startups and young talent, and linked esports to the wider digital economy, achieving significant reach and engagement.",
    tone: "crimson",
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
