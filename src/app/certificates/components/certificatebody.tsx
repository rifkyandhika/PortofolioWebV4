// components/certificatebody.tsx
"use client";

import React, { useState, useEffect } from "react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  images?: { src: string; alt?: string }[];
};

export default function CertificateBody({ certificate }: { certificate: Certificate }) {
  // Ganti boolean dengan index gambar yang sedang aktif (null = lightbox tertutup)
  const [activeImage, setActiveImage] = useState<number | null>(null);

  // Fallback: Jika array images kosong/tidak ada, gunakan gambar utama sebagai satu-satunya item
  const gallery = certificate.images && certificate.images.length > 0 
    ? certificate.images 
    : [{ src: certificate.image, alt: certificate.title }];

  const lightboxOpen = activeImage !== null;

  function openLightbox(index: number) {
    setActiveImage(index);
  }

  function closeLightbox() {
    setActiveImage(null);
  }

  function goNext() {
    if (activeImage === null) return;
    setActiveImage((prev) => (prev! + 1) % gallery.length);
  }

  function goPrev() {
    if (activeImage === null) return;
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
        
        {/* Kolom Kiri: Gambar Sertifikat */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Document Preview</h2>
          
          {/* Main Cover (Selalu nampilin index ke-0) */}
          <button
            onClick={() => openLightbox(0)}
            className="w-full relative group overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 sm:p-8 transition-all hover:border-blue-400 dark:hover:border-blue-500 cursor-zoom-in"
            aria-label="View fullscreen certificate"
          >
            <div className="relative w-full aspect-auto min-h-[300px] flex items-center justify-center">
              <img
                src={gallery[0].src}
                alt={gallery[0].alt}
                className="max-h-[500px] w-auto h-auto object-contain rounded drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 dark:group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl transition-opacity translate-y-4 group-hover:translate-y-0">
                🔍 Click to enlarge
              </span>
            </div>
          </button>

          {/* Menampilkan deretan Thumbnail jika gambar lebih dari 1 */}
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 aspect-auto min-h-[80px] sm:min-h-[100px] flex items-center justify-center p-2 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain rounded drop-shadow-sm" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kolom Kanan: Detail Informasi */}
        <aside>
          <div className="sticky top-28">
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-5">
                Details
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Issuer</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{certificate.issuer}</div>
                </div>

                <div>
                  <div className="text-slate-500 dark:text-slate-400 mb-1">Issue Date</div>
                  <div className="font-semibold text-slate-900 dark:text-white">{certificate.date}</div>
                </div>

                {certificate.credentialId && certificate.credentialId !== "-" && (
                  <div>
                    <div className="text-slate-500 dark:text-slate-400 mb-1.5">Credential ID</div>
                    <div className="font-mono text-xs p-2.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-slate-300 break-all border border-slate-300 dark:border-slate-700">
                      {certificate.credentialId}
                    </div>
                  </div>
                )}
                
                {gallery.length > 1 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center">
                    Document contains {gallery.length} pages
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Lightbox Modal / Fullscreen View */}
      {lightboxOpen && (
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
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 md:-right-10 md:-top-0 z-30 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Prev & Next Buttons (Hanya muncul jika lebih dari 1 gambar) */}
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

            {/* Image Viewer */}
            <img
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Alt Text / Keterangan Dokumen */}
            {gallery[activeImage].alt && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm text-center">
                {gallery[activeImage].alt}
              </div>
            )}
            
            {/* Indikator Halaman */}
            {gallery.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-xs font-medium tracking-widest backdrop-blur-sm">
                {activeImage + 1} / {gallery.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}