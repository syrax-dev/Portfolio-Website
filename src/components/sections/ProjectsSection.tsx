import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "TODO List App",
    description:
      "A task management application built using Vanilla JavaScript. Users can add, edit, delete, and persist tasks using browser localStorage.",
    highlights: ["CRUD operations", "LocalStorage persistence", "Input validation", "Responsive UI"],
    github: "https://github.com/syrax-dev/TODO-App-Vanilla-JS",
    color: "from-primary/20 to-teal/20",
  },
  {
    title: "Weather App",
    description:
      "A weather application that fetches real-time data from a public API. Includes city-based search, temperature details, and error handling.",
    highlights: ["API integration", "Async / fetch", "Error handling", "Responsive layout"],
    github: "https://github.com/syrax-dev/Weather-App-Vanilla-JS",
    color: "from-teal/20 to-sky/20",
  },
  {
    title: "Expense Tracker",
    description:
      "An expense tracker that allows users to manage income and expenses with real-time balance calculation and persistent storage.",
    highlights: [
      "Income vs expense logic",
      "Real-time calculations",
      "State management with JavaScript",
      "LocalStorage persistence",
    ],
    github: "https://github.com/syrax-dev/Expense-Tracker-Vanila-JS",
    color: "from-peach/20 to-pink/20",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              A collection of projects showcasing my frontend development skills
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="glass rounded-2xl overflow-hidden hover-lift group"
              >
                {/* Gradient header */}
                <div className={`h-32 bg-gradient-to-br ${project.color} p-6 flex items-end`}>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="text-xs font-mono px-2 py-1 bg-muted rounded-md text-muted-foreground"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
