import { Code2, Layout, Server } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* About content */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a frontend-focused developer working with HTML, CSS, and JavaScript. 
                I enjoy building responsive user interfaces, managing application state 
                with vanilla JavaScript, and creating clean, minimal UI experiences.
              </p>
              <p>
                I also have hands-on experience working on a full-stack e-commerce 
                application and am currently strengthening my backend skills 
                using Node.js and Express.js.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="text-center p-6 rounded-xl bg-muted/50 hover-lift">
                <Layout className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Frontend Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Clean, responsive UI experiences
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-muted/50 hover-lift">
                <Code2 className="w-8 h-8 text-teal mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Vanilla JS</h3>
                <p className="text-sm text-muted-foreground">
                  State management & logic
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-muted/50 hover-lift">
                <Server className="w-8 h-8 text-peach mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Full Stack Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Learning Node.js & Express
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
