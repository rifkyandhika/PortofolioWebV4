import React, { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  title: string;
  short?: string;
  description?: string;
  tech?: string[];
  url?: string;
  repo?: string;
  images?: { src: string; alt?: string }[];
  role?: string;
  year?: string;
};

type Props = {
  project: Project;
};

export default function ProjectBody({ project }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  function openLightbox(index: number) {
    setActiveImage(index);
    setLightboxOpen(true);
    // prevent body scroll when modal open
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }

  function closeLightbox() {
    setActiveImage(null);
    setLightboxOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }

  function goNext() {
    if (!project.images || project.images.length === 0 || activeImage === null) return;
    setActiveImage((curr) => {
      if (curr === null) return 0;
      return (curr + 1) % project.images!.length;
    });
  }

  function goPrev() {
    if (!project.images || project.images.length === 0 || activeImage === null) return;
    setActiveImage((curr) => {
      if (curr === null) return 0;
      return (curr - 1 + project.images!.length) % project.images!.length;
    });
  }

  // keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, activeImage, project.images]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-indigo-200">Overview</h2>
            <div className="mt-3 text-base text-slate-100/95 leading-relaxed">
              {project.description ? (
                <p>{project.description}</p>
              ) : (
                <p className="text-slate-300">No overview provided.</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-indigo-200">Sneak Peek</h3>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(project.images ?? []).length === 0 && (
                <div className="col-span-full text-slate-400">No images available.</div>
              )}

              {(project.images ?? []).map((img, idx) => (
                <button
                  key={img.src + "-" + idx}
                  onClick={() => openLightbox(idx)}
                  className="relative group overflow-hidden rounded-lg bg-slate-800/40 border border-slate-700 hover:scale-105 transition-transform"
                  aria-label={`Open image ${idx + 1}`}
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={img.src}
                      alt={img.alt ?? `${project.title} screenshot ${idx + 1}`}
                      fill
                      className="object-cover group-hover:brightness-90 transition-all"
                    />
                  </div>

                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs text-slate-200/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      View
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="sticky top-24">
            <div className="p-5 rounded-xl bg-slate-800/60 border border-slate-700 shadow-sm">
              <h4 className="text-sm font-medium text-indigo-100">Project Info</h4>

              <div className="mt-3 space-y-3 text-sm text-slate-200">
                <div>
                  <div className="text-xs text-slate-400">Role</div>
                  <div className="mt-1 font-semibold">{project.role ?? "—"}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Year</div>
                  <div className="mt-1">{project.year ?? "—"}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Tech</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(project.tech ?? []).length === 0 && (
                      <span className="text-slate-400">No tech listed</span>
                    )}
                    {(project.tech ?? []).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-slate-700/50 text-xs rounded-full text-slate-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Lightbox / modal with prev/next */}
      {lightboxOpen && activeImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="max-w-4xl w-full relative rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent backdrop click when interacting inside
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-20 rounded-full bg-black/50 text-white p-2 hover:bg-black/60"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev button */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 rounded-full bg-black/50 text-white p-2 hover:bg-black/60"
              aria-label="Previous image"
            >
              ◀
            </button>

            {/* Next button */}
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 rounded-full bg-black/50 text-white p-2 hover:bg-black/60"
              aria-label="Next image"
            >
              ▶
            </button>

            <div className="aspect-[16/10] relative bg-slate-900">
              <Image
                src={project.images?.[activeImage].src ?? ""}
                alt={project.images?.[activeImage].alt ?? `Image ${activeImage + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {project.images?.[activeImage].alt && (
              <div className="p-3 bg-slate-800/70 text-slate-200 text-sm">
                {project.images?.[activeImage].alt}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
