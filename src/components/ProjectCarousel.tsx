import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface Props {
  images: string[];
  title: string;
}

export default function ProjectCarousel({ images, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || isDragging) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const progress = mouseX / rect.width;

      const totalWidth = images.length * 358; // 350px card + 8px gap
      const overflow = totalWidth - rect.width;
      if (overflow > 0) {
        x.set(-progress * overflow);
      }
    },
    [images.length, x, isDragging]
  );

  const getMaxDrag = useCallback(() => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const totalWidth = images.length * 288; // 280px card + 8px gap on mobile
    return -(totalWidth - rect.width + 16);
  }, [images.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-pointer -mx-4 md:-mx-8"
      onMouseEnter={() => setIsDragging(false)}
      onMouseLeave={() => {
        setIsDragging(false);
        x.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="flex gap-2 pl-4 md:pl-8"
        style={{ x: springX }}
        drag="x"
        dragConstraints={{ left: getMaxDrag(), right: 0 }}
        dragElastic={0.05}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30, power: 0.5, timeConstant: 200 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={src}
              alt={`${title} — project image ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
