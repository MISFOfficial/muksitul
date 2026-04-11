import React from "react";
import { User } from "lucide-react";

export default function BioPage() {
  return (
    <div className="flex flex-col items-center justify-center  text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 primary-rounded border primary-border primary-text mb-6 shadow-[0_0_30px_rgba(10,186,181,0.1)]">
        <User size={48} />
      </div>
      <h2 className="text-3xl font-bold mb-2 tracking-tight">Bio Management</h2>
      <p className="text-white/40 max-w-md mx-auto font-medium">
        This module is currently being prepared. Soon you'll be able to manage
        your biography here with our dynamic CMS.
      </p>
      <button className="mt-8 px-10 py-3.5 border primary-border hover:primary-border hover:bg-white/5 primary-rounded font-bold transition-all uppercase tracking-widest text-sm primary-text4 hover:text-white">
        Coming Soon
      </button>
    </div>
  );
}
