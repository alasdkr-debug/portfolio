import Hero from "@/components/sections/Hero";
import FeaturedDocumentary from "@/components/sections/FeaturedDocumentary";
import About from "@/components/sections/About";
import SelectedWork from "@/components/sections/SelectedWork";
import CreativeProcess from "@/components/sections/CreativeProcess";
import Awards from "@/components/sections/Awards";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import BehindTheScenes from "@/components/sections/BehindTheScenes";
import MediaCoverage from "@/components/sections/MediaCoverage";
import Contact from "@/components/sections/Contact";

// Section order paces a first visit like an opening title sequence: hook
// (Hero), proof in motion (Featured Documentary), story (About), catalog
// (Selected Work), craft (Creative Process), credibility (Awards), trust
// (Clients), social proof (Testimonials), texture (Behind the Scenes),
// press (Media Coverage), close (Contact).
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDocumentary />
      <About />
      <SelectedWork />
      <CreativeProcess />
      <Awards />
      <Clients />
      <Testimonials />
      <BehindTheScenes />
      <MediaCoverage />
      <Contact />
    </>
  );
}
