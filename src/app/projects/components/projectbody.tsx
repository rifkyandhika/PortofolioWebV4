"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  title: string;
  description?: string;
  tech?: string[];
  images?: { src: string; alt?: string }[];
  role?: string;
  year?: string;
};

type Props = {
  project: Project;
};

export default function ProjectBody({ project }: Props) {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const gallery = project.images ?? [];
  const lightboxOpen = activeImage !== null;

  function openLightbox(index: number) {
    setActiveImage(index);
  }

  function closeLightbox() {
    setActiveImage(null);
  }

  function goNext() {
    if (activeImage === null || gallery.length === 0) return;
    setActiveImage((prev) => (prev! + 1) % gallery.length);
  }

  function goPrev() {
    if (activeImage === null || gallery.length === 0) return;
    setActiveImage((prev) => (prev! - 1 + gallery.length) % gallery.length);
  }

  useEffect(() => {
    if (lightboxOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, gallery.length]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Overview & Screenshots */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Project Overview
            </h2>
            <div className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {project.description ? (
                <p>{project.description}</p>
              ) : (
                <p className="text-slate-500 italic">No overview provided.</p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">
              Screenshots
            </h2>
            
            {gallery.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500">
                No screenshots available.
              </div>
            ) : (
              <>
                {/* Gambar Utama (Cover) */}
                <button
                  onClick={() => openLightbox(0)}
                  className="w-full relative group overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-400 dark:hover:border-blue-500 cursor-zoom-in aspect-video"
                >
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt ?? "Main Screenshot"}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl transition-all translate-y-4 group-hover:translate-y-0">
                      🔍 Enlarge Image
                    </span>
                  </div>
                </button>

                {/* Deretan Thumbnail */}
                {gallery.length > 1 && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className={`relative overflow-hidden rounded-lg border-2 transition-all aspect-video ${
                          activeImage === idx 
                            ? "border-blue-500 opacity-100" 
                            : "border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100 hover:border-blue-300 dark:hover:border-blue-600"
                        }`}
                      >
                        <Image src={img.src} alt={img.alt ?? `Thumbnail ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Kolom Kanan: Project Info Sidebar */}
        <aside>
          <div className="sticky top-28">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">
                Tech Stack & Info
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Role</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{project.role ?? "—"}</div>
                </div>

                <div>
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Year</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{project.year ?? "—"}</div>
                </div>

                <div>
                  <div className="text-slate-500 dark:text-slate-400 mb-2">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {(project.tech ?? []).length === 0 ? (
                      <span className="text-slate-500">Not specified</span>
                    ) : (
                      (project.tech ?? []).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                        >
                          {t}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Lightbox Modal / Fullscreen View */}
      {lightboxOpen && gallery.length > 0 && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="max-w-6xl w-full max-h-[90vh] relative flex flex-col items-center animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:-right-10 md:-top-0 z-30 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 sm:p-4 transition-colors"
                  aria-label="Previous image"
                >
                  ◀
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 hover:bg-black/90 text-white p-3 sm:p-4 transition-colors"
                  aria-label="Next image"
                >
                  ▶
                </button>
              </>
            )}

            <div className="relative w-full h-[75vh] sm:h-[85vh]">
              <Image
                src={gallery[activeImage!].src}
                alt={gallery[activeImage!].alt ?? `Screenshot ${activeImage! + 1}`}
                fill
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>
            
            {gallery[activeImage!].alt && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm text-center">
                {gallery[activeImage!].alt}
              </div>
            )}
            
            {gallery.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs font-medium tracking-widest backdrop-blur-sm">
                {activeImage! + 1} / {gallery.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}