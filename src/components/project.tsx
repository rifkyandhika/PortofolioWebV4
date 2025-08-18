"use client";
import React, { useMemo, useState } from "react";
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
  // Inisialisasi langsung pakai data JSON tanpa fetch
  const [allProjects] = useState<ProjectItem[]>(projectData);

  const total = allProjects.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(1);

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allProjects.slice(start, start + pageSize);
  }, [allProjects, page, pageSize]);

  return (
    <section id="projects" className="w-full bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Selected projects — showing latest first. Browse & view details.
            </p>
          </div>

          {total === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300">No projects found.</div>
          ) : (
            <>
              <div className="space-y-6">
                {current.map((p, idx) => (
                  <Link
                    key={String(p.id ?? `project-${idx}`)}
                    href={`/projects/${p.id}`}
                    className="block"
                    aria-label={`Open project ${p.title}`}
                  >
                    <article
                      className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow hover:shadow-lg transition-shadow"
                    >
                      {/* Left: cover image */}
                      {p.image ? (
                        <div className="w-full sm:w-40 flex-shrink-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-28 sm:h-24 object-cover rounded-lg border border-gray-100 dark:border-gray-700"
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-40 flex-shrink-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg h-28 sm:h-24 border border-gray-100 dark:border-gray-700">
                          <span className="text-sm text-gray-400">No image</span>
                        </div>
                      )}

                      {/* Right: content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-start justify-between">
                          <div className="pr-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                            {p.summary && (
                              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {p.summary}
                              </p>
                            )}

                            {p.tech && p.tech.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {p.tech.map((t) => (
                                  <span
                                    key={t}
                                    className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{p.views ?? 0} views</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} projects
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border bg-white dark:bg-gray-800 dark:text-white disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Page {page} / {totalPages}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded border bg-white dark:bg-gray-800 dark:text-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
