import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const services = [
  "Product Design",
  "Visual Design",
  "Brand Identity",
  "Web Design",
  "Marketing Design",
  "Design System",
  "No-Code Development",
  "Prototyping",
  "Art Direction",
  "Brand Guidelines",
  "Mixpanel",
  "Framer",
  "Shopify",
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
                : "fixed bottom-0 left-0 right-0 h-[80vh] bg-white z-50 overflow-y-auto rounded-t-2xl"
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

            <div className="md:hidden sticky top-0 bg-white pt-2 pb-1 flex justify-center z-10">
              <div className="w-10 h-1 rounded-full bg-black/20" />
            </div>
            <div className="px-6 pt-4 pb-6 md:px-12 md:py-16 md:pt-12">
              {/* About section */}
              <section className="pb-8 border-b border-gray-200">
                <h2 className="font-editorial text-[28px] leading-[1.2] mb-8 md:mb-5">
                  About
                </h2>
                <div className="space-y-4 text-base md:text-[15px] leading-[1.6] md:leading-[24px] text-[var(--color-text)]">
                  <p>
                    I'm Célia, a Product and Visual Designer based in London with
                    8 years of experience.
                  </p>
                  <p>
                    I work with design studios, startups and e-commerce brands,
                    mostly in lifestyle, food, health and hospitality. I help them
                    launch new products, evolve their brand and get the small
                    details right. Along the way I've restructured e-commerce
                    journeys, lifted conversion, launched full websites for
                    hospitality and lifestyle brands and helped early-stage teams
                    find their visual voice.
                  </p>
                  <p>
                    I partner closely with founders and small teams, whether I'm
                    embedded for a few months or running a project end to end. If
                    you're building
                    something and need a designer who moves easily between product
                    and brand, I'd love to hear from you.
                  </p>
                </div>
              </section>

              {/* Services */}
              <section className="pt-8">
                <h2 className="font-editorial text-[28px] leading-[1.2] mb-8 md:mb-5">
                  Services
                </h2>
                <div className="flex flex-wrap gap-1">
                  {services.map((service) => (
                    <span
                      key={service}
                      className="rounded-[2px] bg-[#eef2fc] px-2 py-1 font-geist text-xs text-black"
                    >
                      {service}
                    </span>
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
