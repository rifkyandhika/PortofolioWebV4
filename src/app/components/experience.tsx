// File: components/Experience.tsx
"use client";

import React from "react";
import experiencesData from "../data/experiences.json"; // Assuming you have a JSON file with experience data

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  logoSrc?: string;
};

export default function Experience({
  items = experiencesData as ExperienceItem[],
  showLogos = false,
}: {
  items?: ExperienceItem[];
  showLogos?: boolean;
}) {
  return (
    <section id="experience" className="w-full bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Work Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Roles & responsibilities — from current to earlier roles.
            </p>
          </div>

          <div className="space-y-6">
            {items.map((exp, idx) => (
              <article
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow"
              >
                <div className="w-full sm:w-40 flex-shrink-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{exp.period}</div>
                  {exp.location && (
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{exp.location}</div>
                  )}
                </div>

                <div className="hidden sm:block h-full border-l border-gray-200 dark:border-gray-700 mx-4" />

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {showLogos && exp.logoSrc ? (
                        // Jika pakai Next.js Image, ganti <img> dengan <Image> dan import Image dari "next/image"
                        <img src={exp.logoSrc} alt={`${exp.company} logo`} className="w-12 h-12 rounded-md object-cover" />
                      ) : null}

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                        <div className="text-sm text-blue-600 font-medium">{exp.company}</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400 italic hidden sm:block">#{idx + 1}</div>
                  </div>

                  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{exp.description}</p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                      {exp.period.split(" - ")[0]}
                    </span>
                    <a
                      href="#contactme"
                      className="text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
                    >
                      Contact about role
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}