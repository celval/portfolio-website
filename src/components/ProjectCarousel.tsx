import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";

interface Props {
  images: string[];
  title: string;
  hint?: "none" | "cursor" | "caption" | "nudge";
  imageStyles?: Record<number, { objectPosition?: string; transform?: string }>;
}

export default function ProjectCarousel({ images, title, hint = "none", imageStyles }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const [setWidth, setSetWidth] = useState(0);

  // Cursor hint state
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (!setRef.current) return;
      setSetWidth(setRef.current.scrollWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [images.length]);

  useEffect(() => {
    if (!setWidth) return;
    const unsub = x.on("change", (v) => {
      if (isDraggingRef.current) return;
      if (v <= -setWidth) x.set(v + setWidth);
      else if (v > 0) x.set(v - setWidth);
    });
    return () => unsub();
  }, [x, setWidth]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !setWidth) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 1) return;
      e.preventDefault();
      animate(x, x.get() - e.deltaX, { type: "tween", duration: 0.2, ease: "easeOut" });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [x, setWidth]);

  // Nudge hint: trigger once when carousel enters viewport
  useEffect(() => {
    if (hint !== "nudge" || !containerRef.current || !setWidth) return;
    const el = containerRef.current;
    let triggered = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            setTimeout(() => {
              animate(x, -100, {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                onComplete: () => {
                  animate(x, 0, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
                },
              });
            }, 400);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hint, setWidth, x]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hint !== "cursor") return;
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onMouseEnter={(e) => {
          if (hint !== "cursor") return;
          cursorX.set(e.clientX);
          cursorY.set(e.clientY);
          setHovering(true);
        }}
        onMouseLeave={() => hint === "cursor" && setHovering(false)}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden -mx-4 md:-mx-8 ${
          hint === "cursor" && hovering
            ? isDragging
              ? "cursor-none"
              : "cursor-none"
            : isDragging
            ? "cursor-grabbing"
            : "cursor-grab"
        }`}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-2 pl-4 md:pl-8 touch-pan-y"
          style={{ x }}
          drag="x"
          dragMomentum={true}
          dragTransition={{ power: 0.6, timeConstant: 350 }}
          whileTap={{ cursor: hint === "cursor" ? "none" : "grabbing" }}
          onDragStart={() => {
            isDraggingRef.current = true;
            setIsDragging(true);
          }}
          onDragEnd={() => {
            isDraggingRef.current = false;
            setIsDragging(false);
            const v = x.get();
            if (setWidth) {
              if (v <= -setWidth) x.set(v + setWidth);
              else if (v > 0) x.set(v - setWidth);
            }
          }}
        >
          <div ref={setRef} className="flex gap-2 pr-2 shrink-0">
            {images.map((src, i) => (
              <div
                key={`a-${i}`}
                className="shrink-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={src}
                  alt={`${title} — project image ${i + 1}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  style={imageStyles?.[i]}
                  draggable={false}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 pr-2 shrink-0" aria-hidden="true">
            {images.map((src, i) => (
              <div
                key={`b-${i}`}
                className="shrink-0 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  style={imageStyles?.[i]}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Cursor hint pill — rendered outside overflow-hidden so it isn't clipped */}
      {hint === "cursor" && (
        <motion.div
          style={{ x: cursorX, y: cursorY, opacity: hovering ? 1 : 0 }}
          transition={{ opacity: { duration: 0.2 } }}
          className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full px-4 py-2 text-sm font-geist flex items-center gap-2 shadow-lg"
        >
          <span aria-hidden="true">←</span>
          <span>Drag</span>
          <span aria-hidden="true">→</span>
        </motion.div>
      )}

      {/* Caption hint */}
      {hint === "caption" && (
        <p className="mt-4 font-geist text-xs uppercase tracking-[0.15em] text-text-light flex items-center gap-2">
          <span aria-hidden="true">←</span>
          Drag to explore
          <span aria-hidden="true">→</span>
        </p>
      )}
    </div>
  );
}
