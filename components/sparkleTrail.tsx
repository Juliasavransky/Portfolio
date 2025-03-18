import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

interface SparkleTrailProps {
  children: ReactNode;
}

const SparkleTrail: React.FC<SparkleTrailProps> = ({ children }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const updateSparkles = (x: number, y: number) => {
      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(() => {
          setSparkles((prev) => {
            const newSparkle: Sparkle = {
              id: Date.now() + Math.random(),
              x,
              y,
            };
            return [...prev.slice(-29), newSparkle];
          });
          animationFrame.current = null;
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateSparkles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateSparkles(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw" }}>
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              position: "absolute",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2000 2000"
              width="50"
              height="50"
            >
              <g fill="#ffcc00" strokeWidth="8" stroke="#4b116f">
                <path
                  d="M 500 500 C 1000 1000 1000 1000 2000 0 C 1000 1000 1000 1000 1500 1500 C 1000 1000 1000 1000 0 2000 C 1000 1000 1000 1000 500 500"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default SparkleTrail;
