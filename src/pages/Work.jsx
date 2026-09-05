import Reveal from "../components/Reveal";
import ProjectSection from "../components/ProjectSection";
import { featuredProject, otherProjects } from "../data/projects";

export default function Work() {
  return (
    <section className="pt-28 sm:pt-40 md:pt-52 pb-16 sm:pb-24 md:pb-32">
      <div className="container-edit">
        <Reveal>
          <p className="label uppercase mb-3 sm:mb-4">Selected work</p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl tracking-tight text-ink max-w-3xl">
            The things that made me, <span className="text-accent font-bold">Syrax.</span>
          </h1>
        </Reveal>

        <div className="mt-10 sm:mt-16 md:mt-24">
          <ProjectSection project={featuredProject} featured />
          {otherProjects.map((project) => (
            <ProjectSection key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
