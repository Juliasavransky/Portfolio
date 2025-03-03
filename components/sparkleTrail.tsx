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
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(() => {
          setSparkles((prev) => {
            // מגביל את כמות החלקיקים ל-30 בלבד
            const newSparkle: Sparkle = {
              id: Date.now() + Math.random(),
              x: e.clientX,
              y: e.clientY,
            };
            return [...prev.slice(-29), newSparkle];
          });
          animationFrame.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div style={{ position: "relative",  width: "100vw", height: "100vh" }}>
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
