// components/certificateheader.tsx
import React from "react";
import Link from "next/link";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  url?: string;
};

export default function CertificateHeader({ certificate }: { certificate: Certificate }) {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <nav className="text-sm text-slate-400 mb-6 flex gap-2 items-center">
          <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/#certificates`} className="hover:text-white transition-colors">Certificates</Link>
          <span>/</span>
          <span className="font-medium text-slate-200 truncate">{certificate.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {certificate.title}
            </h1>
            
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                {certificate.issuer}
              </span>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                {certificate.date}
              </span>
            </div>
          </div>

          {/* Tombol verifikasi hanya muncul jika URL tidak kosong atau '#' */}
          {certificate.url && certificate.url !== "#" && (
            <div className="flex-shrink-0">
              <a
                href={certificate.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg transition-all hover:-translate-y-0.5"
              >
                Verify Credential
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}