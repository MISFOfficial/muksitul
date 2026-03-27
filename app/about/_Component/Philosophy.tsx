import { Code, Globe, Target } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function Philosophy() {
  return (
    <section className="py-48 bg-gradient-to-b from-black via-transparent to-black relative overflow-hidden backdrop-blur-3xl ">
      <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none ">
        <Code size={400} />
      </div>

      <div className="ratio px-6 text-center ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-sm font-black primary-text2 uppercase tracking-[0.5em] mb-12">
            Systemic Philosophy
          </h2>
          <blockquote className="text-4xl md:text-7xl font-black italic text-white leading-tight tracking-tight mb-16">
            "Building code is not just about logic; it's about{" "}
            <span className="text-outline">empathy</span> for the user and{" "}
            <span className="primary-text2">resilience</span> for the system."
          </blockquote>
          <div className="flex flex-wrap justify-center gap-12 text-left">
            <div className="flex-1 min-w-[300px] p-8 primary-rounded   border primary-border">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Globe className="primary-text2" /> Adaptability
              </h4>
              <p className="text-gray-400">
                Growing up in changing times taught me that the only constant is
                evolution. I build systems that grow with the world.
              </p>
            </div>
            <div className="flex-1 min-w-[300px] p-8 primary-rounded   border primary-border">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Target className="primary-text2" /> Precision
              </h4>
              <p className="text-gray-400">
                From SSC to my Bachelor's, I've learned that attention to detail
                is the difference between a tool and a masterpiece.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Philosophy;
