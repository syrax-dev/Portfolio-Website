import { Code, Server, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "text-primary",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "jQuery"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-teal",
    skills: ["Node.js", "Express.js", "REST APIs", "Postman", "JSON"],
  },
  {
    title: "Tools & Environment",
    icon: Wrench,
    color: "text-peach",
    skills: [
      "Git & GitHub",
      "Linux (Arch Linux)",
      "Hyprland (Wayland)",
      "VS Codium",
      "Browser DevTools",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="glass rounded-2xl p-8 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`p-3 rounded-xl bg-muted ${category.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-primary/50 rounded-full" />
                        <span className="font-mono text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
