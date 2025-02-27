import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  children: ReactNode;
}

interface SparkleTrailProps {
  children: ReactNode;
}

const SparkleTrail: React.FC<SparkleTrailProps> = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const newSparkle: Sparkle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        children: null,
      };

      setSparkles((prev) => [...prev, newSparkle].slice(-50));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <motion.div
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          position: "absolute",
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          mass: 0.1,
        }}
      ></motion.div>

      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              position: "absolute",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 2000 2000"
              width="150"
              height="150"
            >
              <g>
                <g fill="#ffcc00" strokeWidth="15" stroke="#4b116f" id="star">
                  <path
                    d="M 500 500 C 1000 1000 1000 1000 2000 0 C 1000 1000 1000 1000 1500 1500 C 1000 1000 1000 1000 0 2000 C 1000 1000 1000 1000 500 500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </g>
            </svg>
          </motion.div>
        ))}
        {children}
      </AnimatePresence>
    </div>
  );
};

export default SparkleTrail;
