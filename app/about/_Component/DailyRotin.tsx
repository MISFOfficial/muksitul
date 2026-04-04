import { BookOpen, Briefcase, Globe, Heart, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function DailyRotin() {
  return (
    <section className="   bg-[#050505] relative z-10 overflow-hidden">
      <div className="ratio px-6">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3 sticky top-32 h-fit">
            <h2 className="text-6xl font-black tracking-tighter mb-8 leading-none">
              Rhythm of a <br />
              <span className="primary-text">Mine.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              My day is a carefully curated sequence of rituals that fuel both
              technical precision and creative exploration.
            </p>
          </div>

          <div className="md:w-2/3 space-y-12 mt-30 md:mt-0">
            {[
              {
                task: "Mindful Reset & Planning",
                icon: <Globe size={18} />,
                detail:
                  "Morning coffee accompanied by setting the day's architectural goals.",
              },
              {
                task: "Deep System Design",
                icon: <Briefcase size={18} />,
                detail:
                  "Peak cognitive hours dedicated to complex logic and system mapping.",
              },
              {
                task: "Vibrant Collaboration",
                icon: <Heart size={18} />,
                detail:
                  "Syncing with the team, code reviews, and mentoring sessions.",
              },
              {
                task: "The Lab & Learning",
                icon: <BookOpen size={18} />,
                detail:
                  "Experimenting with new stacks and diving into technical literature.",
              },
              {
                task: "The Midnight Oil",
                icon: <Zap size={18} />,
                detail:
                  "Pure creation. When the world goes quiet, the most brilliant code flows.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-8 group"
              >
                <div className="flex flex-col items-center">
                  <div className="p-1.5 rounded-full primary-color border primary-border flex items-center justify-center text-white group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="w-[1px] h-full bg-white/10 mt-4 group-last:hidden" />
                </div>
                <div className="pb-12">
                  <h4 className="text-2xl font-bold mb-3">{item.task}</h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DailyRotin;
