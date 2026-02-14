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
    { name: "GSAP", logo: "https://cdn.simpleicons.org/gsap/339933" },
    { name: "TanStack Query", logo: "https://cdn.simpleicons.org/reactquery/FF4154" },
    { name: "Axios", logo: "https://cdn.simpleicons.org/axios/white" },
];

const row2 = [
    { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Express.js", logo: "https://cdn.simpleicons.org/express/white" },
    { name: "Nest.js", logo: "https://cdn.simpleicons.org/nestjs/ff5e5e" },
    { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Mongoose", logo: "https://cdn.simpleicons.org/mongoose/ff5e5e" },
    { name: "Axios", logo: "https://cdn.simpleicons.org/axios/white" },
    { name: "Redux", logo: "https://cdn.simpleicons.org/redux/764ABC" },
    { name: "Zustand", logo: "https://cdn.simpleicons.org/zustand/764ABC" },
    { name: "TanStack Query", logo: "https://cdn.simpleicons.org/reactquery/FF4154" },
    { name: "Postman", logo: "https://cdn.simpleicons.org/postman/2496ED" },
    { name: "Swagger UI", logo: "https://cdn.simpleicons.org/swagger/339933" },

];

const row3 = [
    { name: "Modern UI/UX", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "Adobe XD", logo: "https://cdn.simpleicons.org/adobexd/white" },
    { name: "Figma Design", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
    { name: "Pixso", logo: "https://cdn.simpleicons.org/pixso/white" },
    { name: "Google Analytics", logo: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
    { name: "Git", logo: "https://cdn.simpleicons.org/git/2496ED" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/2496ED" },
    { name: "Jira", logo: "https://cdn.simpleicons.org/jira/2496ED" },
    { name: "Mermaid", logo: "https://cdn.simpleicons.org/mermaid/2496ED" },
    { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/2496ED" },
    { name: "Parplexity", logo: "https://cdn.simpleicons.org/parplexity/2496ED" },
    { name: "Cloudinary", logo: "https://cdn.simpleicons.org/cloudinary/2496ED" },
    { name: "cloudflare", logo: "https://cdn.simpleicons.org/cloudflare/f6821f" },
    { name: "VSCode", logo: "https://cdn.simpleicons.org/vscode/2496ED" },
    { name: "Antigravity", logo: "https://cdn.simpleicons.org/antigravity/2496ED" },


];

const TagRow = ({ items, speed = 100, direction = "left" }: { items: typeof row1, speed?: number, direction?: "left" | "right" }) => {
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
                        className="flex items-center gap-3 py-2  border-white/150 rounded-md whitespace-nowrap  hover:shadow-lg dark:hover:shadow-[#FF5C58]/5 transition-all duration-300 group cursor-pointer"
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
            <TagRow items={row1} speed={90} direction="left" />
            <TagRow items={row2} speed={90} direction="right" />
            <TagRow items={row3} speed={90} direction="left" />
        </section>
    );
}
