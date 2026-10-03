"use client";

import React, { useMemo, useState, useRef } from "react";
import Link from "next/link";
import certData from "@/app/data/certificates.json";

type CertificateItem = {
  id: number | string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  image: string;
};

export default function Certificates({ pageSize = 6 }: { pageSize?: number }) {
  const [allCerts] = useState<CertificateItem[]>(certData);
  const total = allCerts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(1);

  // 1. Buat referensi ke elemen atas (section)
  const sectionRef = useRef<HTMLElement>(null);

  // 2. Buat fungsi khusus untuk ganti halaman + auto scroll
  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    // Proses scroll ke atas dengan jarak aman dari Navbar (offset)
    if (sectionRef.current) {
      // Kita beri jeda sedikit (timeout 100ms) agar DOM sempat me-render data baru
      setTimeout(() => {
        const yOffset = -80; // Minus 80px agar judul tidak tertutup Navbar fixed
        const y = sectionRef.current!.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  };

  const current = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allCerts.slice(start, start + pageSize);
  }, [allCerts, page, pageSize]);

  return (
    // 3. Pasang ref pada section utama
    <section id="certificates" ref={sectionRef} className="w-full bg-slate-50 dark:bg-slate-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Certificates & Awards
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Recognitions, achievements, and professional certifications I have earned.
            </p>
          </div>

          {total === 0 ? (
            <div className="text-center text-slate-600 dark:text-slate-300">No certificates found.</div>
          ) : (
            <>
              {/* Grid Layout untuk Sertifikat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {current.map((cert) => (
                  <Link
                    key={cert.id}
                    href={`/certificates/${cert.id}`}
                    className="group block rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain rounded drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {cert.title}
                      </h3>
                      <div className="mt-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                        {cert.issuer}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{cert.date}</span>
                        {cert.credentialId && cert.credentialId !== "-" && (
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-10">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} certificates
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 4. Panggil handlePageChange di tombol Prev */}
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Prev
                    </button>

                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 px-2">
                      {page} / {totalPages}
                    </div>

                    {/* 5. Panggil handlePageChange di tombol Next */}
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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