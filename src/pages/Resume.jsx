import Reveal from "../components/Reveal";
import { profile } from "../data/profile";
import { skillCategories } from "../data/skills";
import { experience } from "../data/experience";

function SectionRow({ label, children }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-3 sm:gap-4 md:gap-12 py-6 sm:py-8 md:py-10 border-t border-line">
      <h2 className="text-xs uppercase tracking-[0.2em] text-[#8a8a8f] font-medium select-none">
        {label}
      </h2>
      <div>{children}</div>
    </div>
  );
}

export default function Resume() {
  return (
    <section className="pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 md:pb-32">
      <div className="container-edit max-w-4xl">
        {/* Top Header / Intro */}
        <div className="pb-8 sm:pb-10 md:pb-12">
          <Reveal>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="mt-3 sm:mt-5 text-xs sm:text-[15px] leading-relaxed text-[#9ca3af] max-w-3xl">
              {profile.summary}
            </p>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal>
          <SectionRow label="Skills">
            <div className="flex flex-col gap-3 sm:gap-3.5 text-xs sm:text-sm">
              {skillCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="grid grid-cols-1 sm:grid-cols-[160px_1fr] md:grid-cols-[180px_1fr] gap-1 sm:gap-4 items-baseline"
                >
                  <span className="text-accent font-medium">{cat.name}</span>
                  <span className="text-[#d1d5db] leading-relaxed">
                    {cat.items.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </SectionRow>
        </Reveal>

        {/* Experience */}
        <Reveal>
          <SectionRow label="Experience">
            <div className="flex flex-col gap-6 sm:gap-10">
              {experience.map((job) => (
                <div key={job.org + job.dates}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 sm:gap-x-4 gap-y-1">
                    <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">
                      {job.org}
                    </h3>
                    <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#8a8a8f]">
                      {job.dates}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-accent mt-0.5">{job.role}</p>
                  <ul className="mt-2.5 sm:mt-3 flex flex-col gap-1.5 text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                    {job.points?.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SectionRow>
        </Reveal>
      </div>
    </section>
  );
}
