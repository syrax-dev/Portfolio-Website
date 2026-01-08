import { Moon, Square, Menu, Search, Database, LayoutGrid } from "lucide-react";

const components = [
  { icon: Moon, label: "Dark / Light mode toggle", color: "text-lavender" },
  { icon: Square, label: "Modal components", color: "text-pink" },
  { icon: Menu, label: "Responsive navbar", color: "text-teal" },
  { icon: Search, label: "Search & filter logic", color: "text-peach" },
  { icon: Database, label: "LocalStorage-based features", color: "text-green" },
  { icon: LayoutGrid, label: "Responsive card layouts", color: "text-sky" },
];

export function UIComponentsSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My Expertise
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4">
              Skills & Implementations
            </p>
          </div>

          {/* Components grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((component, index) => {
              const Icon = component.icon;
              return (
                <div
                  key={component.label}
                  className="glass rounded-xl p-6 hover-lift group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg bg-muted ${component.color} group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">
                      {component.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
