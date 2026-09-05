import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const META = {
  "/": {
    title: "SYRAX — Nayan Patel | Full Stack Developer",
    description:
      "Portfolio of Nayan Patel (SYRAX), Full Stack Developer specializing in React, Node.js, Express, Linux environments, and responsive web applications.",
    keywords:
      "Nayan Patel, Syrax, syraxdev, Full Stack Developer, React Developer, Node.js, Express, JavaScript, TypeScript, Linux, Arch Linux, Hyprland, Hyderabad, Portfolio",
  },
  "/work": {
    title: "Work & Projects — Nayan Patel (SYRAX)",
    description:
      "Selected engineering projects by Nayan Patel (SYRAX), including Airomotion, BACKLY, Arch Linux Hyprland dotfiles, and full-stack web applications.",
    keywords:
      "Nayan Patel Projects, Syrax Work, Airomotion, BACKLY, Full Stack Projects, React Apps, Node.js APIs, Arch Hyprland Dotfiles",
  },
  "/resume": {
    title: "Resume & Experience — Nayan Patel (SYRAX)",
    description:
      "Professional resume of Nayan Patel (SYRAX). Full Stack Developer experienced in React, Node.js, Express, SQL/NoSQL databases, and Linux environments.",
    keywords:
      "Nayan Patel Resume, Syrax Skills, Full Stack Developer CV, React Developer, Backend Engineer, Node.js Developer",
  },
  "/contact": {
    title: "Contact & Collaboration — Nayan Patel (SYRAX)",
    description:
      "Get in touch with Nayan Patel (SYRAX) for full stack engineering roles, freelance projects, and software collaborations.",
    keywords:
      "Contact Nayan Patel, Hire Full Stack Developer, Syrax Email, Software Developer Contact Hyderabad",
  },
};

function useDocumentMeta() {
  const location = useLocation();

  useEffect(() => {
    const meta = META[location.pathname] ?? {
      title: "Page Not Found — Nayan Patel (SYRAX)",
      description: "This page could not be found on syraxdev.vercel.app.",
      keywords: "Nayan Patel, 404, Not Found",
    };
    document.title = meta.title;

    const setMetaTag = (attrName, attrVal, content) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setCanonical = (href) => {
      let el = document.querySelector('link[rel="canonical"]');
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    const canonicalUrl = `https://syraxdev.vercel.app${location.pathname === "/" ? "" : location.pathname}`;

    // Standard Meta
    setMetaTag("name", "title", meta.title);
    setMetaTag("name", "description", meta.description);
    if (meta.keywords) setMetaTag("name", "keywords", meta.keywords);
    setCanonical(canonicalUrl);

    // Open Graph
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", canonicalUrl);

    // Twitter
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);
    setMetaTag("name", "twitter:url", canonicalUrl);

    window.scrollTo(0, 0);
  }, [location.pathname]);
}

export default function App() {
  const location = useLocation();
  useDocumentMeta();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show mascot loading screen on refresh / initial boot for a clean, consistent entrance
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {initialLoading && <LoadingScreen key="initial-loading-screen" />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingScreen />}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="/work"
                  element={
                    <PageTransition>
                      <Work />
                    </PageTransition>
                  }
                />
                <Route
                  path="/resume"
                  element={
                    <PageTransition>
                      <Resume />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  }
                />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}
