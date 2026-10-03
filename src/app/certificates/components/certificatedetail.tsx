// components/certificatedetail.tsx
"use client";

import React from "react";
import CertificateHeader from "./certificateheader";
import CertificateBody from "./certificatebody";

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

export default function CertificateDetail({ certificate }: { certificate: Certificate }) {
  return (
    <article className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300">
      <CertificateHeader certificate={certificate} />
      <CertificateBody certificate={certificate} />
    </article>
  );
}