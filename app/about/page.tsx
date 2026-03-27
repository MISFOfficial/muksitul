"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  BookOpen,
  Code,
  MapPin,
  Briefcase,
  GraduationCap,
  Coffee,
  Moon,
  Zap,
  Target,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import HeroBanner from "./_Component/HeroBanner";
import Facts from "./_Component/Facts";
import Journey from "./_Component/Journey";
import WrokingStyle from "./_Component/WrokingStyle";
import DailyRotin from "./_Component/DailyRotin";
import Vision from "./_Component/Vision";
import CTA from "./_Component/CTA";
import Travel from "./_Component/Travel";
import Philosophy from "./_Component/Philosophy";
import Beyond from "./_Component/Beyond";
import VideoResume from "../_Component/VideoResume/VideoResume";

export default function AboutPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mouse Tracking for Interactive Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const parallaxY = useTransform(springY, [-500, 500], [20, -20]);
  const parallaxX = useTransform(springX, [-500, 500], [20, -20]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const journeyEvents = [
    {
      year: "The Beginning",
      title: "Roots in Kishoreganj",
      description:
        "Born and raised in a small, humble family in Kishoreganj, a peaceful town in the Dhaka division. Growing up in a close-knit community, I was always the curious child, restless and eager to explore the world around me.",
      icon: <MapPin className="primary-text2" size={24} />,
      image: "/kg.jpg",
    },
    {
      year: "2020",
      title: "A Family's Strength",
      description:
        "Life took a profound turn in 2020 when we lost my eldest brother in a tragic bike accident. As the family shifted from four brothers to three, I stepped into the role of the eldest son. This moment defined my sense of responsibility and resilience.",
      icon: <Heart className="primary-text2" size={24} />,
      image: "/kg.jpg",
    },
    {
      year: "Education",
      title: "Academic Growth",
      description:
        "Completed my primary education locally, followed by SSC at Azimuddin and HSC at Gurudoyal. Since my high school days, I've felt a magnetic pull toward programming, though resources were scarce at the time.",
      icon: <BookOpen className="primary-text2" size={24} />,
      image: "/kg.jpg",
    },
    {
      year: "Present",
      title: "The Engineer's Path",
      description:
        "I fulfilled my dream by graduating with a Bachelor's in Computer Science and Engineering from Daffodil International University. Today, I am a professional Software Engineer, specializing in system architecture, full-stack development, and meticulous testing.",
      icon: <GraduationCap className="primary-text2" size={24} />,
      image: "/kg.jpg",
    },
  ];

  const quickFacts = [
    { icon: <Coffee />, label: "Fuel", value: "Dark Roast Coffee" },
    { icon: <Moon />, label: "Peak", value: "Late Night Coding" },
    { icon: <Zap />, label: "Mindset", value: "Continuous Learning" },
    { icon: <Target />, label: "Focus", value: "Scalable Architecture" },
  ];

  return (
    <main
      ref={containerRef}
      className="min-h-screen   text-white selection:bg-[#FF0055] selection:text-white overflow-hidden relative"
    >
      <HeroBanner
        ref={heroRef}
        handleMouseMove={handleMouseMove}
        scrollProgress={smoothProgress}
        parallaxY={parallaxY}
        parallaxX={parallaxX}
        springX={springX}
        springY={springY}
      />

      {/* Quick Facts Grid */}
      {/* <Facts quickFacts={quickFacts} /> */}

      {/* Journey Timeline with Parallax */}
      <Journey journeyEvents={journeyEvents} />

      {/* Life Philosophy Section - Bold Unique Design */}
      <Philosophy />

      {/* Beyond The Screen - Hobbies Section */}
      <Beyond />

      {/* The Sea is Calling - Emotional Poetic Section */}
      <Travel />
      {/* The Jahiin Way - Methodology */}
      <WrokingStyle />

      {/* A Day in the Life - Interactive Timeline */}
      <DailyRotin />

      {/* Future Vision - High Contrast Design */}
      <Vision />
      {/* Final CTA / Footer */}
      <CTA />
    </main>
  );
}
