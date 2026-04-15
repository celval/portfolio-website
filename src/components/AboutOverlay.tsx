import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import logoEnnismore from "../assets/images/logos/ennismore.png";
import logoBttr from "../assets/images/logos/bttr.png";
import logoWimbledon from "../assets/images/logos/wimbledon.png";

const serviceColors: Record<string, string> = {
  "Product Design": "#ffdf48",
  "Visual Design": "#6ed4e0",
  "Brand Identity": "#e5bbe3",
  "Prototyping": "#FFAD31",
  "Design System": "#dcd400",
  "Art Direction": "#ffd631",
  "Brand Guidelines": "#e5bbe3",
  "Mixpanel": "#dcd400",
  "Framer": "#6ed4e0",
  "Shopify": "#fcb1c4",
};

const services = [
  "Product Design",
  "Visual Design",
  "Brand Identity",
  "Prototyping",
  "Design System",
  "Art Direction",
  "Brand Guidelines",
  "Mixpanel",
  "Framer",
  "Shopify",
];

const testimonials = [
  {
    quote:
      "Working with Célia was a fantastic experience. Célia consistently delivered designs that perfectly aligned with the brief, showcasing her creativity and attention to detail. Célia also has great time management skills and was able to create 7 website designs within an 8-week timeframe, demonstrating her ability to deliver high quality work under pressure.",
    name: "Mia M.",
    role: "Product Owner at Ennismore",
    logo: logoEnnismore,
  },
  {
    quote:
      "Celia joined our fast growing team at an early stage, with a focus on Product Design she proved capable working on complex global projects, navigating multiple stakeholders, a large internal team and a heavily distributed dev team.",
    name: "Chris J.",
    role: "Partner at Bttr",
    logo: logoBttr,
  },
  {
    quote:
      "Célia has a good eye for design and excellent ability to capture the essence and personality of each brand quickly. She was able to turn problems into design solutions with a positive attitude — it was an absolute delight to work with her.",
    name: "Meiji I.",
    role: "Lead Product Designer at Ennismore",
    logo: logoEnnismore,
  },
  {
    quote:
      "Célia brought a fresh perspective to our brand and delivered exceptional work across visual identity and web design. Her attention to detail and collaborative approach made the whole process seamless.",
    name: "Fenella R.",
    role: "Senior Designer at Wimbledon",
    logo: logoWimbledon,
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOverlay({ isOpen, onClose }: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet on mobile, Centered Popup on desktop */}
          <motion.aside
            initial={isDesktop ? { opacity: 0, scale: 0.95 } : { y: "100%" }}
            animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.95 } : { y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={
              isDesktop
                ? "fixed inset-0 m-auto w-[calc(100%-64px)] max-w-[742px] h-[calc(100%-64px)] max-h-[90vh] bg-white z-50 overflow-y-auto rounded-2xl"
                : "fixed bottom-0 left-0 right-0 max-h-[90vh] bg-white z-50 overflow-y-auto rounded-t-2xl"
            }
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-6 right-6 w-10 h-10 items-center justify-center rounded-full border border-black hover:bg-black hover:text-white transition-colors z-10"
              aria-label="Close about panel"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 4L12 12M12 4L4 12" />
              </svg>
            </button>

            <div className="px-6 pt-12 pb-6 md:px-12 md:py-16">
              {/* About section */}
              <section className="pb-8 border-b border-gray-200">
                <h2 className="font-editorial text-[28px] leading-[1.2] mb-8 md:mb-5">
                  About
                </h2>
                <div className="space-y-4 text-base md:text-[15px] leading-[1.6] md:leading-[24px] text-[var(--color-text)]">
                  <p>
                    I'm Célia, a freelance Product and Visual Designer based in
                    London, with 8 years of experience across product, brand,
                    and UI.
                  </p>
                  <p>
                    My work focuses on product experiences, interfaces and visual
                    identity with a particular interest in where product and
                    brand design overlap.
                  </p>
                  <p>
                    I collaborate with design studios, e-commerce brands and
                    startups in lifestyle, food, health and hospitality to refine
                    existing products, launch new features and evolve brands and
                    digital experiences.
                  </p>
                  <p>
                    I work closely with founders, product, and engineering teams
                    — either as part of a team or independently from start to
                    finish.
                  </p>
                  <p>
                    If you have a project in mind or are looking for design
                    support, I'd love to hear from you.
                  </p>
                </div>
              </section>

              {/* Services */}
              <section className="py-8 border-b border-gray-200">
                <h2 className="font-editorial text-[28px] leading-[1.2] mb-8 md:mb-5">
                  Services
                </h2>
                <div className="flex flex-wrap gap-1">
                  {services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 text-xs rounded-sm text-black"
                      style={{ backgroundColor: serviceColors[service] || '#e0e0e0' }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </section>

              {/* Testimonials */}
              <section className="pt-8">
                <h2 className="font-editorial text-[28px] leading-[1.2] mb-8 md:mb-5">
                  Testimonials
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {testimonials.map((t, i) => (
                    <blockquote key={i}>
                      <p className="text-base md:text-[15px] leading-[24px] mb-4">
                        {t.quote}
                      </p>
                      <footer className="flex items-center gap-3">
                        <img
                          src={t.logo.src}
                          alt={`${t.name} company logo`}
                          className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          <span className="font-medium text-[14px] leading-none text-[var(--color-text)]">
                            {t.name}
                          </span>
                          <span className="text-[14px] leading-none text-[var(--color-text-light)]">
                            {t.role}
                          </span>
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
