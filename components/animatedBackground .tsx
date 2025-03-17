'use client';
import React, { ReactNode } from 'react';
import { Children, useEffect, useRef } from 'react';

type AnimatedBackgroundProps = {
  children: ReactNode;
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 100;
    const colors = ['#ffffff', '#FFD700', '#e81cff']; // לבן, זהב, תכלת, ורוד
    const particles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      blur: boolean;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + Math.random() * 2.5; // חלק קטנים, חלק גדולים יותר
      const blur = radius > 3; // רק הגדולים יהיו עם blur
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        blur,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        // גבולות
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.blur) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
      {children}
    </>
  );
};

export default AnimatedBackground;
