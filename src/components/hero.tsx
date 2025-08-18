// components/Hero.tsx
"use client";

import React from "react";
import Image from "next/image";
import Typewriter from "./typewriter";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image penuh */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/foto.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Opsional overlay gelap tipis agar teks putih terbaca di berbagai foto */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Konten hero: teks putih */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-3xl px-6">
          <h1 className="text-white text-4xl sm:text-6xl font-bold leading-tight drop-shadow-md">
            Hi, I&apos;m Rifky
          </h1>

          <p className="mt-4 text-white/90 text-lg sm:text-xl drop-shadow">
            <Typewriter
              words={[
                "I build delightful web experiences.",
                "Frontend developer • React / Next.js",
                "Design-driven & performance-minded",
              ]}
              typingSpeed={70}
              deletingSpeed={35}
              pauseBetween={1600}
              loop
              className="text-white"
            />
          </p>

          {/* Tombol contoh (opsional) */}
          <div className="mt-8">
            <a
              href="#about"
              className="inline-block rounded-md bg-white/10 backdrop-blur-sm text-white px-5 py-2 hover:bg-white/20 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      <div id="hero-sentinel" className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none" />
    </section>
  );
}
