import React from "react";
import { Briefcase, Code, Target, Zap } from "lucide-react";

function WrokingStyle() {
  return (
    <section className="  relative z-10 ">
      <div className="">
        <div className="text-center mb-24">
          <span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="primary-text2 font-black uppercase tracking-[0.4em] text-xs mb-4 block"
          >
            Process
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter">
            <span className="text-outline">My</span> Way.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            {
              step: "01",
              title: "Analysis",
              desc: "Diving deep into requirements, understanding the 'why' before the 'how'.",
              icon: <Target size={20} />,
            },
            {
              step: "02",
              title: "Architecting",
              desc: "Writing clean, efficient, and well-documented code with precision.",
              icon: <Code size={20} />,
            },
            {
              step: "03",
              title: "Design",
              desc: "Drafting scalable blueprints that balance performance and flexibility.",
              icon: <Briefcase size={20} />,
            },
            {
              step: "04",
              title: "Development",
              desc: "Development and optimization to ensure absolute system integrity.",
              icon: <Zap size={20} />,
            },
            {
              step: "05",
              title: "Testing",
              desc: "Testing and optimization to ensure absolute system integrity.",
              icon: <Zap size={20} />,
            },
            {
              step: "06",
              title: "Delivery",
              desc: "Delivering the final product with confidence and pride.",
              icon: <Zap size={20} />,
            },
          ].map((m, i) => (
            <div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[2.5rem] primary-text4  primary-color  transition-all duration-500 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] min-w-[300px]"
            >
              <span className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors block mb-6">
                {m.step}
              </span>
              <div className="primary-text2 group-hover:text-white mb-4 transition-colors">
                {m.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                {m.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white/80 transition-colors leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WrokingStyle;
