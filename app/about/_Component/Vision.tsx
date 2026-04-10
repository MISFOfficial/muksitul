import React from "react";
import { Zap } from "lucide-react";

export default function Vision() {
  return (
    <section className="py-48 primary-color text-black relative z-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent" />

      <div className="ratio px-6">
        <div className="">
          <h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl text-white font-black tracking-tighter mb-16 leading-[0.8]"
          >
            THE <br /> FUTURE <br />
            <span className="primary-text2">BEYOND</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-2xl primary-text4 font-bold mb-6 border-l-4 primary-border pl-6">
                Mastering AI Systems
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                I am moving toward bridging the gap between traditional system
                architecture and autonomous AI-driven applications. The goal is
                predictable, resilient, and intelligent systems.
              </p>
            </div>
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-2xl primary-text4 font-bold mb-6 border-l-4 primary-border pl-6">
                Building Open Legacies
              </h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Contributing more to the open-source ecosystem is a priority. I
                want to build tools that empower the next generation of
                engineers in Bangladesh and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Visual for Future */}
      <div className="absolute right-0 bottom-0 p-10 opacity-5 pointer-events-none">
        <Zap size={600} />
      </div>
    </section>
  );
}
