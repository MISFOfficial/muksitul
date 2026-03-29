"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
}

interface ShootingStar {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  opacity: number;
  active: boolean;
  cooldown: number;
  timer: number;
}

export const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const timeRef = useRef(0);

  const initStars = useCallback((width: number, height: number) => {
    // Generate 180 static stars
    const stars: Star[] = [];
    for (let i = 0; i < 180; i++) {
      const size = i % 15 === 0 ? 3 : i % 8 === 0 ? 2 : 1;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        baseOpacity: 0.4 + Math.random() * 0.6,
        twinkleSpeed: 0.5 + Math.random() * 1.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        depth: 0.2 + Math.random() * 0.8,
      });
    }
    starsRef.current = stars;

    // Generate 3 shooting stars
    const shooters: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      shooters.push({
        x: -100,
        y: Math.random() * height * 0.6,
        angle: (25 + Math.random() * 20) * (Math.PI / 180),
        speed: 8 + Math.random() * 6,
        length: 120 + Math.random() * 130,
        opacity: 0,
        active: false,
        cooldown: 5000 + Math.random() * 10000,
        timer: i * 4000 + Math.random() * 3000,
      });
    }
    shootingStarsRef.current = shooters;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - centerX) / centerX;
      mouseRef.current.targetY = (e.clientY - centerY) / centerY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap delta
      lastTime = now;
      timeRef.current += dt;
      const t = timeRef.current;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Clear with near-black
      ctx.fillStyle = "rgba(0, 0, 0, 0.97)";
      ctx.fillRect(0, 0, w, h);

      // Draw stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Twinkling
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.5 + 0.5 * twinkle);

        // Parallax offset
        const px = mouse.x * 30 * star.depth;
        const py = mouse.y * 30 * star.depth;

        const sx = star.x + px;
        const sy = star.y + py;

        // Glow for bigger stars
        if (star.size >= 2) {
          const gradient = ctx.createRadialGradient(
            sx,
            sy,
            0,
            sx,
            sy,
            star.size * 4,
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.4})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star dot
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw shooting stars
      const shooters = shootingStarsRef.current;
      for (let i = 0; i < shooters.length; i++) {
        const s = shooters[i];

        if (!s.active) {
          s.timer -= dt * 1000;
          if (s.timer <= 0) {
            // Activate
            s.active = true;
            s.x = Math.random() * w * 0.5;
            s.y = Math.random() * h * 0.4;
            s.opacity = 1;
            s.angle = (25 + Math.random() * 20) * (Math.PI / 180);
          }
          continue;
        }

        // Move
        s.x += Math.cos(s.angle) * s.speed * dt * 60;
        s.y += Math.sin(s.angle) * s.speed * dt * 60;

        // Tail
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head glow
        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 4);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        headGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Check if off screen
        if (s.x > w + 100 || s.y > h + 100) {
          s.active = false;
          s.timer = 8000 + Math.random() * 10000;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#000" }}
    />
  );
};

export default StarField;
