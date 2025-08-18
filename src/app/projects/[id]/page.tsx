// app/projects/[id]/page.tsx
import React from "react";
import Link from "next/link";
import { readProjectsJson } from '@/lib/read-projects';
import ProjectDetail from "../components/projectdetail";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  views: number;
  year: number;
  image: string;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const projects: Project[] = await readProjectsJson();

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-white dark:bg-gray-900">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Project not found</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">Project dengan ID <strong>{id}</strong> tidak ditemukan.</p>
          <div className="mt-6">
            <Link href={`/#projects`} className="inline-block px-4 py-2 rounded bg-indigo-600 text-white">
              Kembali ke Projects
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}
