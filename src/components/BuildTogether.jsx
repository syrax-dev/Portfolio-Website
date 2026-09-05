import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function BuildTogether() {
  return (
    <section className="min-h-screen py-20 md:py-0 md:h-screen w-full flex flex-col items-center justify-center bg-black px-4 sm:px-6 relative overflow-hidden select-none">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto z-10">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-tight select-text cursor-text px-2"
        >
          Let's build something <span className="text-accent font-bold">together.</span>
        </motion.h2>

        {/* Creative CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 sm:mt-12"
        >
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_8px_rgba(139,92,246,0.08)]"
          >
            {/* Infinite rotating border beam */}
            <motion.span
              className="absolute inset-[-150%] pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg 300deg, rgba(139,92,246,0.4) 335deg, rgba(255,255,255,0.5) 360deg)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner Dark Pill */}
            <span className="relative z-10 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-black text-sm sm:text-base font-medium text-white/90 group-hover:text-white transition-colors duration-200">
              <span>Get in touch</span>
              <ArrowUpRight
                size={16}
                className="text-accent transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

