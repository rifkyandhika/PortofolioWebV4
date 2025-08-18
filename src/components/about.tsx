// components/About.tsx
"use client";

import React from "react";
import Link from "next/link";

interface AboutProps {
  illustrationSrc?: string;
}

export default function About({ illustrationSrc = "/images/about_illustration.png" }: AboutProps) {
  return (
    <section id="about" className="w-full bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
          {/* Text Column */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Hi, I’m <span className="text-indigo-600">Rifky Andhika Maulana</span> 👋
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
              I’m Rifky Andhika Maulana — a dedicated web developer with over <strong>3 years</strong> of hands-on experience. I specialize in building fast, maintainable, and secure web applications using <strong>PHP</strong>, <strong>JavaScript</strong>, and <strong>SQL</strong>.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">
              I enjoy turning ideas into polished, user-friendly solutions and collaborating across the stack to deliver real impact. Always learning and ready for new challenges — <strong>let’s build something great together</strong>.
            </p>

            <p className="text-gray-700 dark:text-gray-300 italic mb-4">
              Professional, detail-oriented, and focused on results.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`#contactme`}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow"
              >
                Contact Me
              </Link>
              <a
                href="/documents/CV_Rifky Andhika Maulana.pdf"
                target="_blank"
                className="inline-block border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 px-4 py-2 rounded-md"
              >
                View Resume
              </a>
              <Link
                href={`#projects`}
                className="inline-block text-sm text-gray-600 dark:text-gray-300 px-3 py-2 rounded-md hover:underline"
                scroll={true}
              >
                See My Projects →
              </Link>
            </div>
          </div>

          {/* Illustration / Card Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="max-w-md w-full bg-gradient-to-tr from-white/60 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-102">
              <div className="relative w-full h-72 sm:h-80">
                <img
                  src={illustrationSrc}
                  alt="Developer illustration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-black/40 rounded-full px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-100 shadow">
                  Web Developer • PHP · JS · SQL
                </div>
              </div>
              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Me</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Professional, meticulous, and results-focused. I build scalable solutions that solve real problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
