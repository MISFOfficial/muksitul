"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Star {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
  depth: number; // For parallax
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
  angle: number;
}

export const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsMounted(true);

    // Generate star data
    const generatedStars = [...Array(180)].map((_, i) => ({
      id: i,
      size: i % 15 === 0 ? 3 : i % 8 === 0 ? 2 : 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
      depth: 0.2 + Math.random() * 0.8, // Closer stars move more
    }));
    setStars(generatedStars);

    const generatedShootingStars = [...Array(3)].map((_, i) => ({
      id: i,
      top: Math.random() * 60,
      left: Math.random() * 100,
      delay: i * 5 + Math.random() * 10,
      duration: 0.4 + Math.random() * 0.3,
      angle: 25 + Math.random() * 20,
    }));
    setShootingStars(generatedShootingStars);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let ctx = gsap.context(() => {
      // 1. Twinkling Animation
      gsap.utils.toArray(".star").forEach((star: any) => {
        gsap.to(star, {
          opacity: 0.2,
          scale: 0.8,
          duration: "random(1.5, 4)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: "random(0, 5)",
        });
      });

      // 2. Shooting Stars Animation
      gsap.utils
        .toArray(".shooting-star-container")
        .forEach((container: any, i) => {
          const star = container.querySelector(".shooting-star");
          const head = container.querySelector(".shooting-star-head");

          const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 8 + Math.random() * 10,
            delay: i * 4,
          });

          tl.fromTo(
            [star, head],
            { x: "-100%", opacity: 0 },
            {
              x: "300%",
              opacity: 1,
              duration: shootingStars[i]?.duration || 0.6,
              ease: "linear",
              onComplete: () => {
                gsap.set([star, head], { opacity: 0 });
              },
            },
          );
        });

      // 3. Ambient Glows Pulsing
      gsap.to(".cosmic-glow", {
        scale: 1.2,
        opacity: 0.1,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 2,
          from: "random",
        },
      });

      // 4. Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        // Shift stars based on their depth
        gsap.utils.toArray(".star-wrapper").forEach((wrapper: any) => {
          const depth = parseFloat(wrapper.dataset.depth || "0.5");
          gsap.to(wrapper, {
            x: moveX * 30 * depth,
            y: moveY * 30 * depth,
            duration: 1.5,
            ease: "power2.out",
          });
        });

        // Shift glows even more subtly
        gsap.to(".cosmic-glow", {
          x: moveX * 15,
          y: moveY * 15,
          duration: 2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted, stars.length, shootingStars.length]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black/95"
    >
      {/* Background Static Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={`star-wrapper-${star.id}`}
            className="star-wrapper absolute"
            data-depth={star.depth}
            style={{ left: `${star.left}%`, top: `${star.top}%` }}
          >
            <div
              className="star rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{
                width: star.size,
                height: star.size,
              }}
            />
          </div>
        ))}
      </div>

      {/* Realistic Shooting Stars (Refactored for GSAP) */}
      <div className="absolute inset-0">
        {shootingStars.map((star) => (
          <div
            key={`shooting-container-${star.id}`}
            className="shooting-star-container absolute overflow-hidden"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              transform: `rotate(${star.angle}deg)`,
            }}
          >
            <div className="shooting-star h-[1px] w-[250px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0" />
            {/* Tapered Head glow */}
            <div className="shooting-star-head absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[2px] opacity-0" />
          </div>
        ))}
      </div>

      {/* Ambient Cosmic Glows */}
      {/* <div className="cosmic-glow absolute -top-1/4 -left-1/4 w-full h-full bg-[#FF0055]/10 blur-[180px] rounded-full" />
      <div className="cosmic-glow absolute -bottom-1/4 -right-1/4 w-full h-full bg-[#20255e]/10 blur-[180px] rounded-full" /> */}
    </div>
  );
};

export default StarField;
