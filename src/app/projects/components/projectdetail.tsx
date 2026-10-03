"use client";

import React from "react";
import ProjectHeader from "./projectheader";
import ProjectBody from "./projectbody";

type Project = {
  id?: string | number;
  title: string;
  short?: string;
  description?: string;
  tech?: string[];
  url?: string;
  repo?: string;
  cover?: string;
  images?: { src: string; alt?: string }[]; // gallery images as objects
  views?: number;
  date?: string;
  role?: string;
};

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden">
      <ProjectHeader project={project} />
      <ProjectBody project={project} />
    </article>
  );
}
