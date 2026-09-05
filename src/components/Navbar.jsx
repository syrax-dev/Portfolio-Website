import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import archMascot from "../assets/arch-mascot.png";

const links = [
  { to: "/work", label: "Work" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on resize to desktop or on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
      <nav className="w-full px-4 sm:px-8 md:px-14 lg:px-16 flex items-center justify-between h-16 sm:h-20 md:h-24 transition-all duration-200">
        <NavLink
          to="/"
          className="inline-flex items-center hover:opacity-85 transition-opacity select-none"
          onClick={() => setOpen(false)}
          aria-label="SYRAX Home"
        >
          <img
            src={archMascot}
            alt="SYRAX"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
          <span className="sr-only">SYRAX</span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-14">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm md:text-base transition-colors duration-200 ${
                    isActive ? "text-white font-medium" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="md:hidden text-white p-2.5 -mr-2 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <ul className="px-5 py-5 flex flex-col gap-1.5">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 text-base sm:text-lg rounded-lg tracking-tight transition-colors duration-200 ${
                        isActive
                          ? "text-accent bg-accent/10 font-medium"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
