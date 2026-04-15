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

  return (
    <>
      <header
        className={`flex items-center justify-between px-4 md:px-8 py-4 md:py-8 sticky top-0 z-30 md:relative transition-colors duration-300 ${
          scrolledPastHero ? "bg-white" : "bg-[#DCE3F9]"
        }`}
      >
        <a
          href="/"
          className="font-geist font-medium text-[20px] md:text-[25px] tracking-tight text-text"
        >
          Célia Valette
        </a>
        <nav className="flex items-center gap-3 max-[440px]:gap-2">
          <button
            onClick={() => setAboutOpen(true)}
            className="px-5 py-2.5 text-base max-[440px]:px-3.5 max-[440px]:py-1.5 max-[440px]:text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors"
          >
            About
          </button>
          <a
            href="#contact"
            className="px-5 py-2.5 text-base max-[440px]:px-3.5 max-[440px]:py-1.5 max-[440px]:text-sm border border-black rounded-full hover:bg-black hover:text-white transition-colors"
          >
            Get in touch
          </a>
        </nav>
      </header>

      <AboutOverlay isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
