import { motion } from "framer-motion";
import archMascot from "../assets/arch-mascot.png";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-black flex items-center justify-center select-none"
    >
      <img
        src={archMascot}
        alt="Loading"
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain pointer-events-none animate-pulse drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
      />
    </motion.div>
  );
}

