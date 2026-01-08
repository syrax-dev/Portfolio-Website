import { Server, ArrowRight } from "lucide-react";

export function BackendReadinessSection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Backend Readiness</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Content */}
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="inline-flex p-4 rounded-2xl bg-muted mb-6">
              <Server className="w-12 h-12 text-teal" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Currently strengthening backend development skills using Node.js 
              and Express.js. Comfortable with building basic REST APIs and 
              testing endpoints using Postman.
            </p>

            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <span>Learning in progress</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
