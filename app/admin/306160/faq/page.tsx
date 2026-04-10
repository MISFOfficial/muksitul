import React from "react";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="flex flex-col items-center justify-center    text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 rounded-full border border-[#0abab5]/20 text-[#0abab5] mb-6 shadow-[0_0_30px_rgba(10,186,181,0.1)]">
        <HelpCircle size={48} />
      </div>
      <h2 className="text-3xl font-bold mb-2 tracking-tight">FAQ Management</h2>
      <p className="text-white/40 max-w-md mx-auto font-medium">
        This module is currently being prepared. Soon you'll be able to manage
        your FAQs here with our dynamic CMS.
      </p>
      <button className="mt-8 px-10 py-3.5 border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl font-bold transition-all uppercase tracking-widest text-sm primary-text4 hover:text-white">
        Coming Soon
      </button>
    </div>
  );
}
