import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillCategories } from "../data/skills";

export default function TechStack() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const active = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];

  return (
    <div className="grid md:grid-cols-[minmax(0,280px)_1px_1fr] gap-8 md:gap-0">
      <ul className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible -mx-1 px-1 md:mx-0 md:px-0">
        {skillCategories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <li key={cat.id} className="shrink-0 md:shrink">
              <button
                type="button"
                onMouseEnter={() => setActiveId(cat.id)}
                onFocus={() => setActiveId(cat.id)}
                onClick={() => setActiveId(cat.id)}
                className={`w-full text-left px-4 py-3 md:px-0 md:py-3 border md:border-0 md:border-l-2 rounded-md md:rounded-none transition-colors duration-200 ${
                  isActive
                    ? "border-accent bg-accent-soft md:bg-transparent md:pl-4 text-ink"
                    : "border-line text-muted hover:text-ink md:pl-4"
                }`}
              >
                <span className="text-sm md:text-base tracking-tight whitespace-nowrap md:whitespace-normal">
                  {cat.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block bg-line" />

      <div className="md:pl-10 pt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="text-base md:text-lg text-muted max-w-md leading-relaxed">
              {active.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {active.items.map((item) => (
                <li key={item} className="text-ink text-sm md:text-base border-b border-transparent hover:border-accent hover:text-accent transition-colors duration-200">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
