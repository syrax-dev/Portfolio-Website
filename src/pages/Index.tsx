import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { DevEnvironmentSection } from "@/components/sections/DevEnvironmentSection";
import { UIComponentsSection } from "@/components/sections/UIComponentsSection";
import { BackendReadinessSection } from "@/components/sections/BackendReadinessSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <DevEnvironmentSection />
          <UIComponentsSection />
          <BackendReadinessSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
