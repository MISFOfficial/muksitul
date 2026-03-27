import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function CTA() {
  return (
    <section className="py-48 text-center relative z-10  ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="ratio px-6"
      >
        <h2 className="text-5xl md:text-8xl font-black mb-12 leading-none">
          Ready to <span className="primary-text2">Collaborate?</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <Link
            href="mailto:muksitul44@gmail.com"
            target="_blank"
            className="px-6 py-3 primary-color  text-white font-black uppercase tracking-widest hover:scale-105 transition-transform primary-rounded "
          >
            Get in Touch
          </Link>
          <Link
            href="/resume"
            className="px-6 py-3  font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all primary-rounded"
          >
            View Resume
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
