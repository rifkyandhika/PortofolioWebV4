// projectheader.tsx
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
  tech?: string[]; // optional
};

type Props = {
  project: Project;
};

export default function ProjectHeader({ project }: Props) {
  return (
    <header className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <nav className="text-sm text-indigo-100/80 mb-4">
          <Link
            href={`/`}
            className="hover:underline"
          >
            Home
          </Link>
          <span className="px-2">/</span>
          <Link
            href={`/#projects`}
            className="hover:underline"
          >
            Projects
          </Link>
          <span className="px-2">/</span>
          <span className="font-medium">{project.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {project.title}
            </h1>

            {project.short && (
              <p className="mt-3 text-indigo-50/90 max-w-3xl">
                {project.short}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {project.role && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm">
                  {project.role}
                </span>
              )}
              {project.date && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm">
                  {project.date}
                </span>
              )}
              {project.tech && project.tech.length > 0 && (
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm">
                  {project.tech.slice(0, 3).join(", ")}{project.tech.length > 3 ? "…" : ""}
                </span>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 flex gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md bg-white text-indigo-700 font-medium shadow-sm hover:opacity-95"
              >
                Lihat Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md border border-white/20 text-white hover:bg-white/10"
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
