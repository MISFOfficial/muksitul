"use client";

import React, { useLayoutEffect, useRef } from "react";
import {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  MoveRight,
  Youtube,
  Github,
} from "lucide-react";
import jahin from "@/public/profile.png";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgSoftwareRef = useRef<HTMLHeadingElement>(null);
  const bgEngineerRef = useRef<HTMLHeadingElement>(null);
  const fgSoftwareRef = useRef<HTMLHeadingElement>(null);
  const fgEngineerRef = useRef<HTMLHeadingElement>(null);

  // Refs for entry animations
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.from(greetingRef.current, { opacity: 0, x: -20 })
        .from(nameRef.current, { opacity: 0, x: -20 }, "-=0.6")
        .from(ctaRef.current, { opacity: 0, y: 20 }, "-=0.6")
        .from(
          imageContainerRef.current,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
            duration: 1.2,
            ease: "power4.out",
          },
          0
        )
        .from(aboutMeRef.current, { opacity: 0, x: 20 }, "-=1")
        .from(socialsRef.current, { opacity: 0, x: 20 }, "-=0.6");

      // Background Text Animations (Parallax)
      gsap.to(bgSoftwareRef.current, {
        x: -150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(bgEngineerRef.current, {
        x: 150,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Foreground Text Animations - software (behind)
      gsap.to(fgSoftwareRef.current, {
        x: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Foreground Text Animations - engineer (front)
      gsap.to(fgEngineerRef.current, {
        x: 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative lg:mt-32 overflow-hidden flex items-center justify-center"
    >
      {/* 1. Background Typography Layer (The large gray outlines) */}
      <div className="absolute inset-0 flex lg:hidden flex-col items-center justify-center pointer-events-none select-none z-0">
        <h2
          ref={bgSoftwareRef}
          className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline opacity-40 leading-none"
        >
          Software
        </h2>
        <h2
          ref={bgEngineerRef}
          className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline opacity-40 leading-none -mt-4 md:-mt-8 lg:-mt-12"
        >
          Engineer
        </h2>
      </div>
      <div className="relative z-10 w-full   grid grid-cols-1 lg:grid-cols-12  items-center">
        {/* Left Column (Greeting, Name, CTA) */}
        <div className="lg:col-span-3 flex flex-col items-start text-left gap-4 order-2 lg:order-1 relative z-50">
          <p
            ref={greetingRef}
            className="text-sm font-bold tracking-widest uppercase primary-text4"
          >
            Assalamualaikum/Greetings
          </p>
          <h1
            ref={nameRef}
            className="text-6xl md:text-7xl font-black leading-[0.9] text-black dark:text-white tracking-tighter"
          >
            I'm <br />
            Muksitul <br />
            Islam
          </h1>
          <div ref={ctaRef} className="mt-6">
            <Link
              href="/about"
              className="px-10 py-5 relative primary-color text-white primary-rounded font-bold flex items-center gap-2 transition-all cursor-pointer group"
            >
              My Journey
              <span
                ref={ctaArrowRef}
                className="inline-block transition-transform duration-300 group-hover:translate-x-2"
              >
                <MoveRight size={20} />
              </span>
            </Link>
          </div>
        </div>

        {/* Center Column (Image & Dynamic Text Layering) */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 ">
          {/* 1. Software (Red Outline) - Responsive Layering (Hidden on Mobile, Behind on Desktop) */}
          <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none z-20 lg:z-5">
            <h2
              ref={fgSoftwareRef}
              className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline-red leading-none"
            >
              Software
            </h2>
            {/* Invisble spacer to maintain layout for Software */}
            <h2 className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter opacity-0 leading-none -mt-4 md:-mt-8 lg:-mt-12">
              Engineer
            </h2>
          </div>

          {/* Blue Glow Effect */}
          {/* <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[80px] -z-10 pointer-events-none mix-blend-screen" /> */}

          {/* 2. User Image - (z-10) */}
          <div
            ref={imageContainerRef}
            className="relative z-10 w-full h-[80vh] flex items-end justify-center "
          >
            <Image
              src={jahin}
              alt="Jahin"
              width={600}
              height={800}
              priority
              className="h-full w-auto object-contain pointer-events-none select-none drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 80%, transparent 100%)",
              }}
            />
          </div>

          {/* 3. Engineer (Red Outline) - IN FRONT OF IMAGE (z-20) */}
          <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center pointer-events-none z-20">
            {/* Invisble spacer to maintain layout for Engineer */}
            <h2 className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter opacity-0 leading-none">
              Software
            </h2>
            <h2
              ref={fgEngineerRef}
              className="text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] font-black uppercase tracking-tighter text-outline-red leading-none -mt-4 md:-mt-8 lg:-mt-12"
            >
              Engineer
            </h2>
          </div>
        </div>

        {/* Right Column (About Me & Socials) */}
        <div className="lg:col-span-3 flex flex-col gap-12 text-left order-3 relative z-30 mt-10 lg:mt-0">
          <div
            ref={aboutMeRef}
            className="space-y-4"
          >
            <h3 className="font-bold text-2xl dark:text-white">About Me.</h3>
            <p className="text-neutral-200 leading-relaxed font-black">
              As a{" "}
              <span className="primary-text2 font-bold text-xl">
                Professional Software Engineer
              </span>
              , I craft high-performance applications where{" "}
              <span className="primary-text2">innovative solutions</span> meet
              architectural excellence to drive meaningful impact.
            </p>
          </div>

          {/* Social Icons */}
          <div
            ref={socialsRef}
            className="space-y-4"
          >
            <h3 className="font-bold text-lg dark:text-white">Find me on</h3>
            <div className="flex gap-4">
              {[
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/msfofficial/",
                },
                { Icon: Github, href: "https://github.com/MISFOfficial" },
                { Icon: Youtube, href: "https://www.youtube.com/" },
              ].map(({ Icon, href }, idx) => (
                <Link
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full primary-color text-white transition-all transform hover:scale-110"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
