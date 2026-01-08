import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type NavLink = {
  href: string;
  label: string;
  type: "scroll" | "download";
};

const navLinks: NavLink[] = [
  { href: "#about", label: "About", type: "scroll" },
  { href: "#experience", label: "Experience", type: "scroll" },
  { href: "#skills", label: "Skills", type: "scroll" },
  { href: "#projects", label: "Projects", type: "scroll" },
  { href: "#contact", label: "Contact", type: "scroll" },
  {
    href: "/Nayan_Patel_Resume.pdf",
    label: "Resume",
    type: "download",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);

    // Resume download
    if (link.type === "download") {
      const a = document.createElement("a");
      a.href = link.href;
      a.download = "Nayan_Patel_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    // Smooth scroll
    const element = document.querySelector(link.href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-mono font-bold text-lg text-primary hover:text-accent transition-colors"
          >
            ./SyraxDev
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors relative group ${
                  link.type === "download"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {link.type === "scroll" && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-lavender" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-lavender" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-muted hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
