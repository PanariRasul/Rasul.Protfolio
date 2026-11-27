import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHubActivity from "@/components/GitHubActivity";
import Education from "@/components/Education";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import { useSeo } from "@/lib/seo";

export default function Home() {
  useSeo();
  return (
    <main>
      <Hero />
      <TechStack />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <GitHubActivity />
      <Education />
      <BlogPreview />
      <Contact />
    </main>
  );
}
