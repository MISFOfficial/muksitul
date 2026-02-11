"use client";

import React from 'react';
import { motion } from 'framer-motion';

const row1 = [
    { name: "HTML5", logo: "https://cdn.simpleicons.org/html5/E34F26" },
    { name: "CSS3", logo: "https://cdn.simpleicons.org/css3/1572B6" },
    { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" },
    { name: "React Js", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
    { name: "React Native", logo: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28" },
    { name: "Custom Auth", logo: "https://cdn.simpleicons.org/clerk/6C47FF" },
    { name: "Next Auth", logo: "https://next-auth.js.org/img/logo/logo-sm.png" },
    { name: "Redux", logo: "https://cdn.simpleicons.org/redux/764ABC" },
    { name: "Zustand", logo: "https://raw.githubusercontent.com/pmndrs/zustand/main/docs/zustand-logo.png" },
    { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/0055FF" },
    { name: "TanStack Query", logo: "https://cdn.simpleicons.org/reactquery/FF4154" },
    { name: "Axios", logo: "https://cdn.simpleicons.org/axios/white" },
];

const row2 = [
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Express.js", logo: "https://cdn.simpleicons.org/express/white" },
    { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Prisma ORM", logo: "https://cdn.simpleicons.org/prisma/white" },
    { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Redux", logo: "https://cdn.simpleicons.org/redux/764ABC" },


    { name: "TanStack Query", logo: "https://cdn.simpleicons.org/reactquery/FF4154" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white" },
];

const row3 = [
    { name: "Modern UI/UX", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "Figma Design", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "Pixel Perfect", logo: "https://cdn.simpleicons.org/adobephotoshop/31A8FF" },
    { name: "SEO Expert", logo: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "Clean Code", logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC" },
    { name: "Mobile First", logo: "https://cdn.simpleicons.org/apple/white" },
    { name: "Unit Testing", logo: "https://cdn.simpleicons.org/jest/C21325" },
    { name: "Dockerize", logo: "https://cdn.simpleicons.org/docker/2496ED" },
];

const TagRow = ({ items, speed = 10, direction = "left" }: { items: typeof row1, speed?: number, direction?: "left" | "right" }) => {
    return (
        <div className="flex overflow-hidden w-full relative group-mask">
            {/* Edge Fading Mask (Dynamic to Theme) */}
            <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

            <motion.div
                animate={{
                    x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex flex-nowrap gap-6 min-w-max py-2"
            >
                {/* Quadruple the items for perfect continuity */}
                {[...items, ...items, ...items, ...items].map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 px-6 py-2 border border-white/50 rounded-md whitespace-nowrap hover:border-[#FF5C58]/30 hover:shadow-lg dark:hover:shadow-[#FF5C58]/5 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all transform group-hover:scale-125 duration-300">
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="w-full h-full object-contain dark:invert-[0.1]"
                                loading="lazy"
                            />
                        </div>
                        <span className="text-[var(--text-muted)] text-sm font-bold tracking-widest uppercase group-hover:text-[var(--foreground)] transition-colors">
                            {item.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function Skill() {
    return (
        <section className="  flex flex-col overflow-hidden">
            <TagRow items={row1} speed={0} direction="left" />
            <TagRow items={row2} speed={0} direction="right" />
            <TagRow items={row3} speed={0} direction="left" />
        </section>
    );
}
