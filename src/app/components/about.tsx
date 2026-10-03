"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AboutProps {
  illustrationSrc?: string;
}

export default function About({ illustrationSrc = "/images/about_illustration.png" }: AboutProps) {
  return (
    <section id="about" className="w-full bg-slate-50 dark:bg-slate-900 py-20 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Kolom Kiri: Teks & Informasi */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider mb-2">
              About Me
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              A brief look into my <br className="hidden lg:block" />
              <span className="text-blue-600 dark:text-blue-500">professional journey.</span>
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-4">
              I’m <strong className="text-slate-900 dark:text-white font-semibold">Rifky Andhika Maulana</strong>, a Full-Stack Software Developer currently working at PT Jurnalindo Aksara Grafika. I specialize in architecting scalable enterprise applications, from robust backend infrastructures to highly interactive user interfaces.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
              My expertise lies in modern web ecosystems including <strong>React, Next.js, Node.js, Express,</strong> and <strong>PostgreSQL</strong>. I have a strong track record of developing complex business solutions such as comprehensive HRIS systems, dynamic job portals, and automated document generation utilities.
            </p>

            <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

            <p className="text-slate-500 dark:text-slate-400 italic text-sm mt-4 mb-8">
              "Dedicated to writing clean code, solving complex architectural challenges, and delivering real business value."
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href={`#contactme`}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
              >
                Contact Me
              </Link>
              <a
                href="/documents/CV_Rifky Andhika Maulana.pdf"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                View Resume
              </a>
              <Link
                href={`#projects`}
                className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                scroll={true}
              >
                See My Projects →
              </Link>
            </div>
          </div>

          {/* Kolom Kanan: Visual Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="max-w-md w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
              <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-100 dark:bg-slate-900">
                {/* Fallback image using standard HTML img tag for simplicity, swap to next/image if you prefer */}
                <img
                  src={illustrationSrc}
                  alt="Developer workspace"
                  className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700">
                  Full-Stack Dev
                </div>
              </div>
              
              <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/90">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Core Tech Stack</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                  Proficient in modern web technologies, building everything from robust APIs to seamless user interfaces.
                </p>
                
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Tailwind"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}