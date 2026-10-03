"use client";

import React from "react";
import Image from "next/image";
import Typewriter from "./typewriter";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 pb-16 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">

      {/* Background Ornaments (Efek blur estetis) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl dark:bg-blue-900/20 pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl dark:bg-indigo-900/20 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 max-w-6xl mx-auto">

          {/* Kolom Kiri: Teks & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-300">
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
              Hi, I&apos;m <span className="text-blue-600 dark:text-blue-500">Rifky</span>
            </h1>

            {/* Kontainer fix-height agar layout tidak melompat saat mesin ketik berjalan */}
            <div className="h-16 sm:h-12 md:h-14 mb-4 flex items-center justify-center lg:justify-start">
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                <Typewriter
                  words={[
                    "Full-Stack Web Developer.",
                    "React / Next.js / Node.js / PostgreSQL.",
                    "Building scalable & impactful solutions."
                  ]}
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseBetween={2000}
                  loop
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 max-w-lg text-base sm:text-lg leading-relaxed">
              I design and build high-performance web applications, focusing on intuitive user experiences and efficient system architectures.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                More About Me
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Foto Profil Elegan */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px]">

              {/* Ornamen Frame (Kotak Miring di Belakang Gambar) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl rotate-6 opacity-20 dark:opacity-40 scale-105 transition-transform duration-500 hover:rotate-12"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 dark:border-blue-400/20 rounded-3xl -rotate-3 scale-105"></div>

              {/* Kontainer Utama Gambar */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl z-10 group">
                <Image
                  src="/images/foto.jpg"
                  alt="Rifky Andhika Maulana"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Efek tint tipis yang hilang saat di hover */}
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}