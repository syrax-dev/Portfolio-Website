import { Github, ArrowDown } from "lucide-react";
import { AnimatedName } from "../AnimatedName";

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto container-padding text-center">
        <div className="max-w-3xl mx-auto">
          {/* Greeting */}
          <p className="text-muted-foreground font-mono text-sm md:text-base mb-4 animate-fade-in-up opacity-0 stagger-1">
            Hello, World! 👋
          </p>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 animate-fade-in-up opacity-0 stagger-2">
            Hi, I'm <AnimatedName />
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-xl text-muted-foreground mb-8 animate-fade-in-up opacity-0 stagger-3">
            Frontend Developer building clean, responsive web applications
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 stagger-4">
            <button
              onClick={scrollToProjects}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-lift flex items-center gap-2 group"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="https://github.com/syrax-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
