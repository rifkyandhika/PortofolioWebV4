import React from "react";
import Link from "next/link";

type Project = {
  id?: string | number;
  title: string;
  short?: string;
  role?: string;
  date?: string;
  url?: string;
  repo?: string;
  tech?: string[];
};

type Props = {
  project: Project;
};

export default function ProjectHeader({ project }: Props) {
  return (
    <header className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <nav className="text-sm text-slate-400 mb-6 flex gap-2 items-center">
          <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/#projects`} className="hover:text-white transition-colors">Projects</Link>
          <span>/</span>
          <span className="font-medium text-slate-200 truncate">{project.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {project.title}
            </h1>

            {project.short && (
              <p className="mt-4 text-slate-300 max-w-3xl text-lg">
                {project.short}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.role && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                  {project.role}
                </span>
              )}
              {project.date && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm backdrop-blur-sm">
                  {project.date}
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg transition-all hover:-translate-y-0.5"
              >
                Lihat Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-5 py-2.5 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                View Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}