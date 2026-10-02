import { MotionConfig } from "motion/react";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Education } from "@/sections/Education";
import { Experience } from "@/sections/Experience";
import { GithubSection } from "@/sections/GithubSection";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <MotionConfig reducedMotion="user">
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GithubSection />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </MotionConfig>
  );
}
