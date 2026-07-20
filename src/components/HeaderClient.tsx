import { useState, useEffect } from "react";
import AboutOverlay from "./AboutOverlay";

interface Props {
  /** Background colour of the inline header band. Defaults to the homepage hero band. */
  bandColor?: string;
  /** Nav contrast on the band: "light" = white text/borders (dark band), "dark" = black. */
  variant?: "light" | "dark";
  /** CSS selector for the element whose scroll-out reveals the sticky nav. */
  sentinelSelector?: string;
}

export default function HeaderClient({
  bandColor = "#D5E3F2",
  variant = "dark",
  sentinelSelector = "section",
}: Props) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sentinel = document.querySelector(sentinelSelector);
      if (sentinel) {
        const bottom = sentinel.getBoundingClientRect().bottom;
        setScrolledPastHero(bottom <= 0);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sentinelSelector]);

  const renderNav = (navVariant: "light" | "dark") => {
    const textColor = navVariant === "light" ? "text-white" : "text-text";
    const btnClass =
      navVariant === "light"
        ? "px-5 py-2.5 text-base max-[440px]:px-3.5 max-[440px]:py-1.5 max-[440px]:text-sm border border-white text-white rounded-full hover:bg-white hover:text-black transition-colors"
        : "px-5 py-2.5 text-base max-[440px]:px-3.5 max-[440px]:py-1.5 max-[440px]:text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors";

    return (
      <>
        <a
          href="/"
          className={`font-geist font-medium text-[20px] md:text-[25px] tracking-tight ${textColor}`}
        >
          Célia Valette
        </a>
        <nav className="flex items-center gap-3 max-[440px]:gap-2">
          <button onClick={() => setAboutOpen(true)} className={btnClass}>
            About
          </button>
          <a href="#contact" className={btnClass}>
            Get in touch
          </a>
        </nav>
      </>
    );
  };

  return (
    <>
      <header
        className="flex items-center justify-between px-4 md:px-8 py-4 md:py-8 relative z-10"
        style={{ backgroundColor: bandColor }}
      >
        {renderNav(variant)}
      </header>

      <header
        aria-hidden={!scrolledPastHero}
        className={`flex items-center justify-between px-4 md:px-8 py-4 md:py-8 fixed top-0 left-0 right-0 z-30 bg-white/60 backdrop-blur-md transition-all duration-500 ease-out ${
          scrolledPastHero
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {renderNav("dark")}
      </header>

      <AboutOverlay isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
