import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import Reveal from "../components/Reveal";
import ArchCockpit from "../components/ArchCockpit";
import BiggerPicture from "../components/BiggerPicture";
import IdeasToLife from "../components/IdeasToLife";
import StuckInChaos from "../components/StuckInChaos";
import BuildTogether from "../components/BuildTogether";

const LINE1_TOKENS = [
  { text: "I started in ", className: "text-white" },
  { text: "programming", className: "text-accent font-semibold" },
  { text: ",", className: "text-white" },
];

const LINE2_TOKENS = [
  { text: "> ", className: "text-white/70 mr-2.5" },
  { text: "building ", className: "text-white" },
  { text: "interfaces", className: "text-accent font-semibold" },
  { text: " and solving ", className: "text-white" },
  { text: "logic.", className: "text-accent font-semibold" },
];

const LINE1_TOTAL = LINE1_TOKENS.reduce((acc, t) => acc + t.text.length, 0);
const LINE2_TOTAL = LINE2_TOKENS.reduce((acc, t) => acc + t.text.length, 0);

const terminalVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.85,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 260,
      mass: 0.85,
    },
  },
};

function TerminalSection() {
  const terminalRef = useRef(null);
  const isInView = useInView(terminalRef, { once: false, margin: "-20% 0px -20% 0px" });

  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [activeLine, setActiveLine] = useState(1);

  useEffect(() => {
    if (!isInView) return;

    let isCancelled = false;
    let timer;
    let startTimer;

    const runTypingLoop = () => {
      let line1Idx = 0;
      let line2Idx = 0;

      setActiveLine(1);
      setLine1Count(0);
      setLine2Count(0);

      const interval1 = setInterval(() => {
        if (isCancelled) return clearInterval(interval1);
        line1Idx += 1;
        setLine1Count(line1Idx);
        if (line1Idx >= LINE1_TOTAL) {
          clearInterval(interval1);

          timer = setTimeout(() => {
            if (isCancelled) return;
            setActiveLine(2);

            const interval2 = setInterval(() => {
              if (isCancelled) return clearInterval(interval2);
              line2Idx += 1;
              setLine2Count(line2Idx);

              if (line2Idx >= LINE2_TOTAL) {
                clearInterval(interval2);
                // Wait 5 seconds after full reveal, then loop
                timer = setTimeout(() => {
                  if (isCancelled) return;
                  runTypingLoop();
                }, 5000);
              }
            }, 35);
          }, 320);
        }
      }, 35);
    };

    startTimer = setTimeout(() => {
      if (!isCancelled) {
        runTypingLoop();
      }
    }, 280);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      clearTimeout(startTimer);
      setLine1Count(0);
      setLine2Count(0);
      setActiveLine(1);
    };
  }, [isInView]);

  const renderTokens = (tokens, charCount) => {
    let remaining = charCount;
    return tokens.map((token, i) => {
      if (remaining <= 0) return null;
      const slice = token.text.slice(0, remaining);
      remaining -= token.text.length;
      return (
        <span key={i} className={token.className}>
          {slice}
        </span>
      );
    });
  };

  return (
    <section
      className="h-screen min-h-screen w-full flex items-center justify-center bg-black px-4 sm:px-6 md:px-8 relative select-none overflow-hidden"
    >
      <motion.div
        ref={terminalRef}
        variants={terminalVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
        className="w-full max-w-xl md:max-w-2xl bg-black border border-white/15 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-black">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block" />
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block" />
          </div>

          {/* Terminal Title */}
          <div className="text-[11px] sm:text-xs font-mono text-white/50 tracking-wider">
            syrax@developer: ~
          </div>

          {/* New Tab Button */}
          <div className="text-white/40 text-xs sm:text-sm font-mono select-none px-1 leading-none">
            +
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-7 md:p-10 font-mono text-xs sm:text-base md:text-lg leading-relaxed bg-black whitespace-pre-wrap min-h-36 sm:min-h-45 flex flex-col justify-center">
          <div className="w-full text-left">
            {/* Line 1 */}
            <div className="flex flex-wrap items-baseline">
              <span className="text-accent font-semibold">syraxdev</span>
              <span className="text-white">@arch:~$ </span>
              {renderTokens(LINE1_TOKENS, line1Count)}
              {activeLine === 1 && (
                <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-5 bg-white ml-1 translate-y-0.5 animate-pulse" />
              )}
            </div>

            {/* Line 2 */}
            <div className="flex flex-wrap items-baseline mt-2 sm:mt-3 min-h-[1.5em]">
              {activeLine === 2 && renderTokens(LINE2_TOKENS, line2Count)}
              {activeLine === 2 && (
                <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-5 bg-white ml-1 translate-y-0.5 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroSection() {
  const [isPurple, setIsPurple] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--mouse-x", `${x}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerDown={() => setIsHovered(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-screen min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden select-none cursor-default"
    >
      {/* Interactive Grid: Central area is pure black, outer area reveals when cursor is on it */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse min(90vw, 680px) min(60vh, 420px) at 50% 50%, transparent 70%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse min(90vw, 680px) min(60vh, 420px) at 50% 50%, transparent 70%, black 100%)",
        }}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage:
              "radial-gradient(circle 380px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 25%, rgba(0, 0, 0, 0.45) 65%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle 380px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), black 25%, rgba(0, 0, 0, 0.45) 65%, transparent 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(189, 147, 249, 0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(189, 147, 249, 0.35) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>

      {/* 3. Hero Content with black cutout so grid does NOT render behind text */}
      <div className="container-edit flex items-center justify-center relative z-10">
        <div className="relative flex items-center justify-center">
          {/* Black cutout backing that blocks grid lines directly behind hello world */}
          <div
            className="absolute -inset-x-8 sm:-inset-x-16 -inset-y-6 sm:-inset-y-8 bg-black rounded-3xl pointer-events-none"
            style={{
              boxShadow: "0 0 48px 36px #000000",
            }}
          />

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setIsPurple((prev) => !prev)}
            className={`relative z-10 font-pixelify text-3xl sm:text-4xl md:text-5xl tracking-wide text-center select-none font-normal cursor-pointer transition-colors duration-300 ${
              isPurple ? "text-accent" : "text-white"
            }`}
            title="Click to toggle color"
          >
            hello world
            <span className="sr-only"> — Nayan Patel (SYRAX) | Full Stack Developer Portfolio</span>
          </motion.h1>
        </div>
      </div>

      {/* 4. Scroll Indicator UI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10"
      >
        <span className="text-[10px] tracking-[0.25em] text-muted uppercase font-medium">
          SCROLL
        </span>

        {/* Animated Scroll Line */}
        <motion.div
          className="w-px h-8 origin-top"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0))",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Terminal Showcase Section */}
      <TerminalSection />

      {/* The Bigger Picture Section */}
      <BiggerPicture />

      {/* Ideas to Life Section */}
      <IdeasToLife />

      {/* Stuck in Chaos Section */}
      <StuckInChaos />

      {/* Arch Cockpit */}
      <section className="min-h-screen py-16 sm:py-20 md:py-0 md:h-screen w-full flex items-center justify-center border-t border-line px-4 sm:px-6 md:px-8 relative overflow-visible md:overflow-hidden bg-black">
        <div className="container-edit w-full">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4 md:mb-5">
              <div>
                <p className="label uppercase mb-1 text-accent">Daily driver // Arch Linux</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-ink font-bold">
                  My Arch Cockpit.
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-muted max-w-sm hidden sm:block">
                Modular, keyboard-driven Wayland environment styled in Catppuccin Mocha.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ArchCockpit />
          </Reveal>
        </div>
      </section>

      {/* Section 7: Let's build something together */}
      <BuildTogether />
    </>
  );
}