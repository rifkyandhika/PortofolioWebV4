// app/projects/[id]/page.tsx
import React from "react";
import Link from "next/link";
import ProjectDetail from "../components/projectdetail";

// Gunakan path alias @/ untuk langsung menunjuk ke folder src/
// Ini jauh lebih aman daripada menggunakan fungsi readProjectsJson
import projectData from "@/app/data/projects.json";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  views: number;
  year: number;
  image: string;
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;
  
  // Langsung gunakan data JSON yang di-import, cast ke tipe Project[]
  const projects = projectData as unknown as Project[];

  // Cari proyek berdasarkan ID
  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-slate-900">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Project not found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Project dengan ID <strong>{id}</strong> tidak ditemukan.</p>
          <div className="mt-6">
            <Link href={`/#projects`} className="inline-block px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Kembali ke Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl mt-16">
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}