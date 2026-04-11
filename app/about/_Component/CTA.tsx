"use client";

import React, { useState } from "react";
import Link from "next/link";
import ContactModal from "@/app/Global/ContactModal";

function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="py-48 text-center relative z-10  ">
      <div
        className="ratio px-6"
      >
        <h2 className="text-5xl md:text-8xl font-black mb-12 leading-none">
          Ready to <span className="primary-text2">Collaborate?</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 primary-color cursor-pointer text-white font-black uppercase tracking-widest hover:scale-105 transition-transform primary-rounded "
          >
            Get in Touch
          </button>
          <Link
            href="/resume"
            className="px-6 py-3  font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all primary-rounded"
          >
            View Resume
          </Link>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default CTA;
