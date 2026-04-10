import {
 motion,
 useScroll,
 useTransform,
 useSpring,
 useMotionValue,
} from "framer-motion";
import graduate from "@/public/graduate.svg";
import Link from "next/link";
import {
 ArrowLeft,
 Zap,
 Code,
 Server,
 Compass,
 Database,
 Layers,
 Cpu,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
export default function HeroBanner({
 ref,
 heroRef,
 handleMouseMove,
 parallaxY,
 parallaxX,
 springX,
 springY,
 scrollProgress,
}: any) {
 const bgY = useTransform(scrollProgress, [0, 1], [0, 200]);

 return (
 <div>
 {/* Ambient Background Blobs */}
 <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
 <div
 }
 }
 className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#20255e]/20 blur-[150px] rounded-full"
 />
 <div
 }
 }
 className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-[#FF0055]/10 blur-[120px] rounded-full"
 />
 </div>

 {/* Navigation */}
 <div className="fixed top-6 left-6 z-50">
 <Link
 href="/"
 className="text-white cursor-pointer font-bold flex items-center gap-2 hover:scale-105 transition-transform backdrop-blur-md px-6 py-3 rounded-full border primary-border group "
 >
 <ArrowLeft
 size={20}
 className="group-hover:-translate-x-1 transition-transform"
 />
 Back to World
 </Link>
 </div>

 {/* Ultra-Unique Interactive Hero Section */}
 <section
 ref={heroRef}
 onMouseMove={handleMouseMove}
 className="relative h-screen flex items-center justify-center overflow-hidden"
 >
 {/* Parallax Background Layer */}
 <div
 style={{
 y: useTransform([bgY, parallaxY], ([s, m]: any) => s + m),
 x: parallaxX,
 }}
 className="absolute inset-x-[-10%] inset-y-[-10%] z-0"
 >
 <Image
 src={graduate}
 alt="Hero Background"
 fill
 className="object-cover opacity-20 grayscale"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
 </div>

 {/* Mouse-Reactive Spotlight Overlay */}
 <div
 className="absolute inset-0 z-10 pointer-events-none opacity-40 mix-blend-soft-light"
 style={{
 background: useTransform(
 [springX, springY],
 ([x, y]) =>
 `radial-gradient(600px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(255, 0, 85, 0.4), transparent 80%)`,
 ),
 }}
 />

 {/* Floating Tech Stack Cards */}
 <div className="absolute inset-0 z-20 pointer-events-none">
 {[
 { text: "Next.js", x: "28%", y: "-12%", delay: 0.1 },
 { text: "React", x: "35%", y: "15%", delay: 0.2 },
 { text: "Nest", x: "-22%", y: "22%", delay: 0.3 },
 { text: "MongoDB", x: "-18%", y: "-30%", delay: 0.4 },
 { text: "Express", x: "18%", y: "32%", delay: 0.6 },
 ].map((card, i) => (
 <div
 key={i}
 }
 }
 style={{
 left: `calc(50% + ${card.x})`,
 top: `calc(50% + ${card.y})`,
 x: useTransform(springX, (val: any) => val * (0.015 * (i + 1))),
 y: useTransform(springY, (val: any) => val * (0.015 * (i + 1))),
 }}
 }
 className="absolute hidden md:flex items-center gap-3 px-5 py-2.5 primary-text4 backdrop-blur-xl border primary-border primary-rounded shadow-2xl"
 >
 <span className="text-[9px] font-black uppercase tracking-[0.2em]">
 {card.text}
 </span>
 </div>
 ))}
 </div>

 <div className="relative z-30 text-center px-6 pointer-events-none">
 <div } }>
 <div className="relative inline-block mb-12">
 <span
 }
 }
 }
 className="absolute -inset-x-8 -bottom-2 h-[2px] bg-[#FF0055] origin-left"
 />
 <span className="primary-text4 font-black uppercase tracking-[0.6em] text-[10px] block">
 Life of Mine
 </span>
 </div>

 <h1 className="text-7xl md:text-[12rem] font-black mb-12 leading-[0.8] tracking-tighter perspective-1000">
 <div className="block overflow-hidden">
 {"MUKSITUL".split("").map((char, i) => (
 <span
 key={`m-${i}`}
 }
 }
 }
 className="inline-block text-white"
 >
 {char}
 </span>
 ))}
 </div>
 <div className="block overflow-hidden">
 {"ISLAM".split("").map((char, i) => (
 <span
 key={`i-${i}`}
 }
 }
 }
 className="inline-block text-outline-red"
 >
 {char}
 </span>
 ))}
 </div>
 </h1>

 <div
 }
 }
 }
 className="flex flex-col md:flex-row items-center justify-center gap-6 text-xl md:text-2xl font-bold tracking-widest text-white/40"
 >
 <span className="hidden md:block w-20 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
 Known as my nick name{" "}
 <span className="text-white font-black italic">Jahin</span>
 <span className="hidden md:block w-20 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
 </div>
 </div>
 </div>

 {/* Interactive Scanlines Overlay */}
 <div className="absolute inset-0 z-40 bg-scanlines opacity-[0.03] pointer-events-none" />

 <div
 }
 }
 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
 >
 <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#FF0055] to-transparent mx-auto" />
 <span className="text-[10px] uppercase font-black tracking-[0.3em] mt-4 block primary-text2">
 Dive In
 </span>
 </div>
 </section>
 </div>
 );
}
