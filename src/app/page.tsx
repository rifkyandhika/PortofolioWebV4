// app/page.tsx
import React from "react";
import Hero from "../components/hero";
import About from "../components/about";
import Experience from "../components/experience";
import Project from "../components/project";
import ContactMe from "../components/contactme";

export default function Page() {
  return (
    <main>
      {/* Hero full-screen (satu layar penuh) */}
      <Hero />

      {/* Konten setelah hero — minimal untuk demo */}
      <About />

      {/* Pengalaman kerja */}
      <Experience />

      {/* Projects */}
      <Project />

      {/* Contact Me */}
      <ContactMe />
    </main>
  );
}