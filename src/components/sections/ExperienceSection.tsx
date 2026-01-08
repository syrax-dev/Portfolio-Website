import { Briefcase, Calendar } from "lucide-react";

const responsibilities = [
  "Developed responsive UI using HTML, CSS, JavaScript",
  "Worked on frontend logic and state handling",
  "Integrated backend APIs with frontend",
  "Assisted with authentication and data handling",
];

const techStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express.js",
  "Git",
  "Postman",
];

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Experience card */}
          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />

            <div className="pl-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold">
                      Full Stack Developer Intern
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    E-commerce Website Project
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span>3 Months</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                Worked as a Full Stack Developer Intern on an e-commerce
                platform. Contributed to both frontend and backend features,
                focusing on UI development, API integration, and application
                functionality.
              </p>

              {/* Responsibilities */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Key Responsibilities</h4>
                <ul className="space-y-3">
                  {responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="font-semibold mb-4">Technologies Used</h4>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
