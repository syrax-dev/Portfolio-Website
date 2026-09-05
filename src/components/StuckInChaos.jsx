import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Clean Dracula / Modern Dev syntax highlighting palette
const C_PINK = "#ff79c6";
const C_YELLOW = "#f1fa8c";
const C_GREEN = "#50fa7b";
const C_CYAN = "#8be9fd";
const C_PURPLE = "#bd93f9";
const C_WHITE = "#f8f8f2";

// Ultra-compact full-stack code snippets (minimized length, <= 28 chars)
// Positioned exclusively in the outer top (7%-18%) and bottom (7%-18%) margins
// leaving the entire middle band (20%-80%) 100% clear so no code EVER overlaps the main text!
const SNIPPETS = [
  // 0. Far Top-Left (23 chars)
  {
    id: "rate-limit",
    lines: [
      [["rateLimit", C_PURPLE], ["({ ", C_WHITE], ["max", C_CYAN], [": ", C_WHITE], ["100", C_PURPLE], [" })", C_WHITE]],
    ],
    pos: { top: "4%", left: "3%" },
    vis: "block",
    baseOpacity: 0.72,
    minOp: 0.03,
  },

  // 1. Far Bottom-Right (26 chars)
  {
    id: "socket-sync",
    lines: [
      [["socket.", C_CYAN], ["emit", C_GREEN], ["(", C_WHITE], ['"sync"', C_YELLOW], [", ", C_WHITE], ["state", C_PURPLE], [")", C_WHITE]],
    ],
    pos: { bottom: "4%", right: "3%" },
    vis: "block",
    baseOpacity: 0.7,
    minOp: 0.03,
  },

  // 2. Upper-Left (13 chars)
  {
    id: "use-server",
    lines: [
      [['"use server"', C_YELLOW], [";", C_WHITE]],
    ],
    pos: { top: "16%", left: "4%" },
    vis: "hidden sm:block",
    baseOpacity: 0.72,
    minOp: 0.03,
  },

  // 3. Far Top-Right (28 chars)
  {
    id: "type-role",
    lines: [
      [["type ", C_PINK], ["Role", C_CYAN], [" = ", C_WHITE], ['"admin"', C_YELLOW], [" | ", C_WHITE], ['"dev"', C_YELLOW], [";", C_WHITE]],
    ],
    pos: { top: "4%", right: "3%" },
    vis: "hidden sm:block",
    baseOpacity: 0.7,
    minOp: 0.03,
  },

  // 4. Far Bottom-Left (23 chars)
  {
    id: "revalidate",
    lines: [
      [["revalidatePath", C_GREEN], ["(", C_WHITE], ['"/work"', C_YELLOW], [");", C_WHITE]],
    ],
    pos: { bottom: "4%", left: "3%" },
    vis: "hidden sm:block",
    baseOpacity: 0.68,
    minOp: 0.03,
  },

  // 5. Lower-Right (25 chars)
  {
    id: "jwt-verify",
    lines: [
      [["jwt.", C_CYAN], ["verify", C_GREEN], ["(token, ", C_WHITE], ["secret", C_YELLOW], [")", C_WHITE]],
    ],
    pos: { bottom: "16%", right: "4%" },
    vis: "hidden sm:block",
    baseOpacity: 0.72,
    minOp: 0.03,
  },

  // 6. Top-Center-Left (20 chars)
  {
    id: "redis-get",
    lines: [
      [["redis.", C_CYAN], ["get", C_GREEN], ["(", C_WHITE], ['"cache:user"', C_YELLOW], [")", C_WHITE]],
    ],
    pos: { top: "11%", left: "24%" },
    vis: "hidden md:block",
    baseOpacity: 0.65,
    minOp: 0.03,
  },

  // 7. Bottom-Center-Right (27 chars)
  {
    id: "prisma-find",
    lines: [
      [["await ", C_PINK], ["prisma.", C_CYAN], ["user.", C_PURPLE], ["findMany", C_GREEN], ["()", C_WHITE]],
    ],
    pos: { bottom: "11%", right: "24%" },
    vis: "hidden md:block",
    baseOpacity: 0.65,
    minOp: 0.03,
  },

  // 8. Lower-Left (29 chars)
  {
    id: "animate-presence",
    lines: [
      [["<", C_WHITE], ["AnimatePresence ", C_PINK], ["mode", C_CYAN], ["=", C_WHITE], ['"wait"', C_YELLOW], [">", C_WHITE]],
    ],
    pos: { bottom: "18%", left: "4%" },
    vis: "hidden md:block",
    baseOpacity: 0.68,
    minOp: 0.03,
  },

  // 9. Upper-Right (25 chars)
  {
    id: "hyprland-bind",
    lines: [
      [["bind ", C_PINK], ["= $mod, Return, ", C_WHITE], ["exec", C_GREEN]],
    ],
    pos: { top: "18%", right: "4%" },
    vis: "hidden md:block",
    baseOpacity: 0.62,
    minOp: 0.03,
  },
];

// Target sentence
const TARGET_TEXT = "and I am stuck in the chaos.";

// Container variant with character-by-character stagger (slowed down for a smooth, readable wave reveal)
const textContainerVariants = {
  hidden: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.2,
    },
  },
};

// Character-level sinusoidal wave elastic spring formula:
// y: 60 * Math.sin(0.8 * i)
// scale: 0.5 + 0.5 * Math.abs(Math.sin(0.8 * i))
const charVariants = {
  hidden: (i) => ({
    y: 60 * Math.sin(0.8 * i),
    scale: 0.5 + 0.5 * Math.abs(Math.sin(0.8 * i)),
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: [0.32, 0, 0.67, 0],
    },
  }),
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 115,
      damping: 14,
      mass: 0.95,
    },
  },
};

export default function StuckInChaos() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-15% 0px -15% 0px" });
  const [activeIdx, setActiveIdx] = useState(0);

  // Rotate through the alternating snippets (Left <-> Right, Top <-> Bottom)
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SNIPPETS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isInView]);

  // Pre-calculate words and characters with their global character index
  const wordsData = useMemo(() => {
    const words = TARGET_TEXT.split(" ");
    let runningIndex = 0;
    return words.map((word) => {
      const chars = word.split("").map((char) => {
        const idx = runningIndex++;
        return { char, idx };
      });
      runningIndex++; // Space counts towards wave progression
      return { chars };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden select-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }}
    >
      {/* ============================================================ */}
      {/* 1. UNIQUE CODE MATRIX - REVEALING FAR CODES ALTERNATIVELY    */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SNIPPETS.map((snippet, idx) => {
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={snippet.id}
              initial={{ opacity: snippet.minOp }}
              animate={{
                opacity: isActive ? snippet.baseOpacity : snippet.minOp,
              }}
              transition={{
                duration: isActive ? 0.9 : 1.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={`absolute font-mono select-none ${snippet.vis}`}
              style={{
                ...snippet.pos,
                fontSize: "clamp(10px, 0.95vw, 13px)",
                maxWidth: "280px",
                willChange: "opacity",
              }}
            >
              {snippet.lines.map((line, lIdx) => (
                <div key={lIdx} className="whitespace-nowrap leading-[1.75]">
                  {line.map(([text, color], tIdx) => (
                    <span key={tIdx} style={{ color }}>
                      {text}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 2. CENTER HEADLINE WITH SINE WAVE SPRING SPLIT-TEXT ANIMATION */}
      {/* ============================================================ */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto flex items-center justify-center text-center">
        <motion.h2
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight select-text cursor-text flex flex-wrap justify-center items-center"
        >
          {wordsData.map(({ chars }, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap">
              {chars.map(({ char, idx }) => (
                <motion.span
                  key={idx}
                  custom={idx}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              {wIdx < wordsData.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
