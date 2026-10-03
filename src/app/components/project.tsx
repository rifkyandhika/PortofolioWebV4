"use client";
import React, { useMemo, useState, useRef } from "react";
import Link from "next/link";
import projectData from "../data/projects.json"; // Pastikan path ini benar sesuai struktur projectmu

type ProjectItem = {
  id?: string | number;
  title: string;
  summary?: string;
  tech?: string[];
  url?: string;
  image?: string;
  views?: number;
};

export default function Projects({ pageSize = 5 }: { pageSize?: number }) {
  const [allProjects] = useState<ProjectItem[]>(projectData);
  const total = allProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(1);

  // Referensi untuk auto-scroll
  const sectionRef = useRef<HTMLElement>(null);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (sectionRef.current) {
      setTimeout(() => {
        const yOffset = -80; // Jarak aman dari Navbar
        const y = sectionRef.current!.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  };

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allProjects.slice(start, start + pageSize);
  }, [allProjects, page, pageSize]);

  return (
    <section id="projects" ref={sectionRef} className="w-full bg-slate-50 dark:bg-slate-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Selected projects — showing latest first. Browse & view details.
            </p>
          </div>

          {total === 0 ? (
            <div className="text-center text-slate-600 dark:text-slate-300">No projects found.</div>
          ) : (
            <>
              <div className="space-y-6">
                {current.map((p, idx) => (
                  <Link
                    key={String(p.id ?? `project-${idx}`)}
                    href={`/projects/${p.id}`}
                    className="block group"
                    aria-label={`Open project ${p.title}`}
                  >
                    <article className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      {/* Left: cover image (Selalu ambil image utama pertama) */}
                      {p.image ? (
                        <div className="w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-32 sm:h-28 object-cover border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-40 flex-shrink-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg h-32 sm:h-28 border border-slate-200 dark:border-slate-700">
                          <span className="text-sm text-slate-400">No image</span>
                        </div>
                      )}

                      {/* Right: content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between">
                          <div className="pr-4">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h3>
                            {p.summary && (
                              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {p.summary}
                              </p>
                            )}

                            {p.tech && p.tech.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {p.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                              {p.views ?? 0} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-10">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} projects
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                    >
                      Prev
                    </button>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 px-2">
                      {page} / {totalPages}
                    </div>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}