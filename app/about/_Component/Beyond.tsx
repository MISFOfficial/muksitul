import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Beyond() {
  return (
    <section className="bg-black relative z-10">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-xl">
            <h2 className="text-6xl font-black tracking-tighter mb-6">
              Beyond the <span className="primary-text2">Screen</span>.
            </h2>
            <p className="text-xl text-gray-400">
              When the IDE is closed, I seek inspiration in the rhythms of
              nature and the mysteries of new places.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-8 py-4 rounded-full border primary-border font-bold hover:bg-white/5 transition-colors cursor-pointer">
              Explorer
            </div>
            <div className="px-8 py-4 rounded-full border primary-border font-bold hover:bg-white/5 transition-colors cursor-pointer">
              Thinker
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Kishoreganj Discovery",
              desc: "Exploring the hidden gems of my hometown.",
              image: "/kg.jpg",
            },
            {
              title: "Tech Reading",
              desc: "Diving deep into the latest in system design.",
              image: "/kg.jpg",
            },
            {
              title: "Photography",
              desc: "Capturing the golden moments of life.",
              image: "/kg.jpg",
            },
          ].map((hobby, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] primary-rounded overflow-hidden cursor-pointer"
            >
              <Image
                src={hobby.image}
                alt={hobby.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                <p className="text-sm text-gray-300 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {hobby.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Beyond;
