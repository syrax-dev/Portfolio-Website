import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, CodeXml, Rocket } from "lucide-react";

const textContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TABS = [
  {
    id: "ideas",
    label: "Ideas",
    icon: (
      <div className="relative inline-flex items-center justify-center">
        <Lightbulb size={24} strokeWidth={1.9} />
        <svg
          className="absolute -top-1 -right-2 w-3 h-3 text-current"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z" />
        </svg>
      </div>
    ),
  },
  {
    id: "code",
    label: "Code",
    icon: <CodeXml size={24} strokeWidth={2} />,
  },
  {
    id: "life",
    label: "Life",
    icon: <Rocket size={24} strokeWidth={1.9} />,
  },
];

export default function IdeasToLife() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  // Automatically cycle through tabs every 3 seconds while section is in view
  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isInView, activeTab]);

  return (
    <section
      ref={sectionRef}
      className="h-screen min-h-screen w-full flex items-center justify-center bg-black px-4 sm:px-6 md:px-8 relative select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto translate-y-0 sm:-translate-y-6 md:-translate-y-12">
        {/* ============================================================ */}
        {/* 1. ANIMATED TAB PILL COMPONENT                                */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center bg-[#0d0d10] border border-white/10 rounded-2xl p-1.5 sm:p-2 shadow-2xl relative mb-8 sm:mb-10 md:mb-12"
        >
          {TABS.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative z-10 w-14 h-11 sm:w-20 sm:h-14 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#c084fc]"
                    : "text-white/40 hover:text-white/70"
                }`}
                aria-label={tab.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 rounded-xl border border-[#a855f7]/40 bg-[#a855f7]/10 shadow-[0_0_8px_rgba(168,85,247,0.12)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 scale-90 sm:scale-100">{tab.icon}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ============================================================ */}
        {/* 2. REAL SELECTABLE CENTER HEADLINE                           */}
        {/* ============================================================ */}
        <motion.h2
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px] font-bold text-white tracking-tight leading-[1.18] text-center select-text cursor-text max-w-4xl flex flex-col items-center px-2"
        >
          <motion.span variants={lineVariants} className="block">
            I started bringing
          </motion.span>
          <motion.span variants={lineVariants} className="block mt-1.5 sm:mt-2.5">
            <span
              className={`transition-colors duration-300 font-bold ${
                activeTab === 0
                  ? "text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                  : "text-white"
              }`}
            >
              ideas
            </span>{" "}
            from{" "}
            <span
              className={`transition-colors duration-300 font-bold ${
                activeTab === 1
                  ? "text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                  : "text-white"
              }`}
            >
              code
            </span>{" "}
            to{" "}
            <span
              className={`transition-colors duration-300 font-bold ${
                activeTab === 2
                  ? "text-[#a855f7] drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                  : "text-white"
              }`}
            >
              life.
            </span>
          </motion.span>
        </motion.h2>
      </div>
    </section>
  );
}
