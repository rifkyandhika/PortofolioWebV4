"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl tracking-tight transition-opacity hover:opacity-80">
            <span className="text-slate-400 dark:text-slate-500">&lt;</span>
            <span className="text-blue-600 dark:text-blue-400">Rifky</span>
            <span className="text-slate-400 dark:text-slate-500"> /&gt;</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
              <Link href="/#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Experience</Link>
              <Link href="/#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</Link>
              {/* <Link href="/#certificates" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Certificates</Link> */}
            </nav>

            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                aria-label="Toggle Dark Mode"
              >
                {currentTheme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}