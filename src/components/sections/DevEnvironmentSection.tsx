import { Terminal, Github } from "lucide-react";

const highlights = [
  "Custom Hyprland configuration",
  "Wayland-based workflow",
  "Keybindings and scripts",
  "Minimal distraction-free UI",
];

const techStack = [
  "Arch Linux",
  "Hyprland",
  "Wayland",
  "Zsh/Shell",
  "Dotfiles",
  "NeoVim",
];

export function DevEnvironmentSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Cockpit</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Content card */}
          <div className="glass rounded-2xl overflow-hidden">
            {/* Header with terminal aesthetic */}
            <div className="bg-card p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow" />
                <div className="w-3 h-3 rounded-full bg-green" />
                <span className="ml-4 font-mono text-sm text-muted-foreground">
                  ~/dotfiles
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-muted text-lavender">
                  <Terminal className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Arch Linux + Hyprland
                  </h3>
                  <p className="text-muted-foreground">Custom Setup</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 text-lg">
                A fully customized Arch Linux setup using the Hyprland Wayland
                compositor, focused on performance, minimal UI, and an efficient
                development workflow.
              </p>

              {/* Highlights */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Key Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-muted-foreground bg-muted/50 p-3 rounded-lg"
                    >
                      <span className="w-2 h-2 bg-lavender rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-muted text-foreground rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <a
                href="https://github.com/syrax-dev/Arch-Hyprland-Dotfiles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-lift"
              >
                <Github className="w-5 h-5" />
                View Dotfiles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
