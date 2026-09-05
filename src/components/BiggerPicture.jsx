import React from "react";
import { motion } from "framer-motion";

import reactIcon from "../assets/React.webp";
import nodejsIcon from "../assets/Nodejs.webp";
import dbIcon from "../assets/Db.webp";

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

export default function BiggerPicture() {
  return (
    <section className="h-screen min-h-screen w-full flex items-center justify-center bg-black px-4 sm:px-6 md:px-8 relative overflow-hidden select-none">
      {/* Responsive Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[300px] xs:min-h-[340px] sm:min-h-0 sm:aspect-1024/576 -translate-y-2 sm:-translate-y-6 md:-translate-y-8"
      >
        {/* ============================================================ */}
        {/* 1. 3D ICON: UI (REACT) - TOP LEFT                            */}
        {/* ============================================================ */}
        <div className="absolute pointer-events-none select-none left-0 sm:left-0 top-[-3%] sm:top-[-8%] w-[20%] sm:w-[24%]">
          <motion.img
            src={reactIcon}
            alt="UI - React"
            className="w-full h-auto"
            draggable="false"
            animate={{
              y: [-8, 8, -8],
              rotate: [-1, 1.2, -1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* 2. 3D ICON: LOGIC (NODE.JS) - TOP RIGHT                      */}
        {/* ============================================================ */}
        <div className="absolute pointer-events-none select-none right-0 sm:right-0 top-[-3%] sm:top-[-8%] w-[18%] sm:w-[22%]">
          <motion.img
            src={nodejsIcon}
            alt="Logic - Node.js"
            className="w-full h-auto"
            draggable="false"
            animate={{
              y: [8, -8, 8],
              rotate: [1, -1.2, 1],
            }}
            transition={{
              duration: 5.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* 3. 3D ICON: DATA (DATABASE) - BOTTOM CENTER                  */}
        {/* ============================================================ */}
        <div className="absolute pointer-events-none select-none left-1/2 -translate-x-1/2 top-[76%] sm:top-[72%] w-[19%] sm:w-[23%]">
          <motion.img
            src={dbIcon}
            alt="Data - Database"
            className="w-full h-auto"
            draggable="false"
            animate={{
              y: [-7, 7, -7],
              rotate: [-0.8, 1, -0.8],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />
        </div>

        {/* ============================================================ */}
        {/* 4. REAL SELECTABLE HTML CENTER TEXT                          */}
        {/* ============================================================ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 sm:px-4 pointer-events-auto z-10">
          <motion.h2
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
            className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-[32px] xl:text-[34px] font-normal text-white tracking-tight leading-[1.32] select-text max-w-xs xs:max-w-md sm:max-w-2xl lg:max-w-3xl flex flex-col items-center"
          >
            <motion.span variants={lineVariants} className="block">
              Then I discovered the bigger picture —
            </motion.span>
            <motion.span variants={lineVariants} className="block mt-1.5 sm:mt-2">
              where <span className="text-[#00e1fa] font-medium">UI</span>,{" "}
              <span className="text-[#00fcb1] font-medium">logic</span>, and{" "}
              <span className="text-[#a256fa] font-medium">data</span> come together.
            </motion.span>
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
}
