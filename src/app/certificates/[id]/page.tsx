// app/certificates/[id]/page.tsx
import React from "react";
import Link from "next/link";
import certData from "@/app/data/certificates.json";
import CertificateDetail from "../components/certificatedetail";

type Certificate = {
  id: number | string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  image: string;
  images?: { src: string; alt?: string }[]; // <-- Tambahkan baris ini
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  
  // Ambil data JSON dan cari berdasarkan ID
  const certificates = certData as Certificate[];
  const certificate = certificates.find((c) => String(c.id) === id);

  // Fallback jika ID tidak ditemukan
  if (!certificate) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Certificate not found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Sertifikat dengan ID <strong>{id}</strong> tidak ditemukan.</p>
          <div className="mt-6">
            <Link href={`/#certificates`} className="inline-block px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Kembali ke Halaman Utama
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl mt-16">
        <CertificateDetail certificate={certificate} />
      </div>
    </main>
  );
}