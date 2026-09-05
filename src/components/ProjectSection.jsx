import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectSection({ project, featured = false }) {
  const { number, name, type, stack, description, github, site, credentials } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-line py-8 sm:py-10 md:py-14"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-2 sm:gap-4 md:gap-10">
        <span className="text-xs sm:text-sm text-faint tracking-tight font-mono">{number}</span>

        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 gap-y-1">
              <h3
                className={`tracking-tight text-ink transition-colors duration-200 group-hover:text-accent font-semibold ${
                  featured ? "text-2xl sm:text-3xl md:text-5xl" : "text-xl sm:text-2xl md:text-4xl"
                }`}
              >
                {name}
              </h3>
              <span className="label uppercase">{type}</span>
            </div>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">{description}</p>

            {credentials && (
              <div className="mt-3 sm:mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
                <span className="text-accent font-medium">Demo:</span>
                <span className="text-[#8a8a8f] font-mono">
                  ID: <span className="text-white select-all">{credentials.id}</span>
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#8a8a8f] font-mono">
                  Pass: <span className="text-white select-all">{credentials.pass}</span>
                </span>
              </div>
            )}

            <ul className="mt-4 sm:mt-5 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2">
              {stack.map((tech) => (
                <li key={tech} className="text-[11px] sm:text-xs text-faint">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2.5">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 text-sm text-ink hover:text-accent transition-colors duration-200 group/link"
                >
                  Repo
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              )}
              {site && (
                <a
                  href={site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 py-1 text-sm text-ink hover:text-accent transition-colors duration-200 group/link"
                >
                  Website
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
