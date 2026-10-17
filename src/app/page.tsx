import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Story } from "@/components/Story";
import { Gallery } from "@/components/Gallery";
import { Opinions } from "@/components/Opinions";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Story />
        <Gallery />
        <Opinions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
