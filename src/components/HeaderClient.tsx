import { useState, useEffect } from "react";
import AboutOverlay from "./AboutOverlay";

export default function HeaderClient() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector("section");
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setScrolledPastHero(heroBottom <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNav = (variant: "light" | "dark") => {
    const textColor = variant === "light" ? "text-white" : "text-text";
    const btnClass =
      variant === "light"
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
      <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-8 relative z-10" style={{ backgroundColor: "#D5E3F2" }}>
        {renderNav("dark")}
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
