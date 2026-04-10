"use client";
import React, { useState } from "react";
import { X, Play, Maximize2 } from "lucide-react";

function VideoResume() {
 const [isExpanded, setIsExpanded] = useState(false);
 const [isVideoReady, setIsVideoReady] = useState(false);

 // --- CONFIGURATION ---
 // Replace with your actual direct video link (e.g., .mp4, .webm)
 const videoUrl =
 "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34442-large.mp4";

 // Replace with your actual thumbnail/poster image link
 const posterUrl =
 "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop";
 // ---------------------

 const handleClose = (e?: React.MouseEvent) => {
 if (e) e.stopPropagation();
 setIsExpanded(false);
 setIsVideoReady(false);
 };

 return (
 <div className="fixed bottom-8 right-8 z-[9999]">
 
 {!isExpanded ? (
 <div
 
 onClick={() => setIsExpanded(true)}
 }
 }
 }
 }
 }
 }
 className="relative w-16 md:w-24 h-16 md:h-24 rounded-full overflow-hidden cursor-pointer shadow-2xl border-2 primary-border group bg-slate-900"
 >
 {/* Custom Thumbnail / Poster */}
 <div className="absolute inset-0 w-full h-full">
 <img
 src={posterUrl}
 alt="Video Resume Thumbnail"
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
 />
 {/* Play Icon Overlay */}
 <div className="absolute inset-0 flex items-center justify-center group-hover: transition-colors">
 <Play className="w-10 h-10 text-white fill-white drop-shadow-2xl translate-y-0 group-hover:-translate-y-1 transition-transform" />
 </div>
 </div>

 <div className="absolute inset-0 group-hover:bg-transparent transition-colors" />

 <div
 }
 }
 className="absolute bottom-3 right-3 p-1.5 primary-rounded backdrop-blur-sm"
 >
 <Maximize2 className="w-4 h-4 text-white" />
 </div>
 </div>
 ) : (
 <>
 <div
 
 className="fixed inset-0 backdrop-blur-lg flex items-center justify-center "
 }
 }
 }}
 }
 onAnimationComplete={() => setIsVideoReady(true)}
 >
 <div className="relative w-full max-w-4xl aspect-video primary-rounded overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border primary-border">
 {/* Close Button */}
 <button
 onClick={handleClose}
 className="absolute top-6 right-6 z-50 p-3 hover: rounded-full backdrop-blur-2xl transition-all border primary-border group"
 >
 <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-500" />
 </button>

 {/* Custom Video Player - Only loads after animation completes */}
 {isVideoReady ? (
 <motion.video
 }
 }
 src={videoUrl}
 poster={posterUrl}
 controls
 autoPlay
 className="w-full h-full object-contain"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center bg-slate-950">
 <div className="relative">
 <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-8 h-8 border-4 border-purple-500/10 border-t-purple-500 rounded-full animate-spin-reverse" />
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 </>
 )}
 
 </div>
 );
}

export default VideoResume;
