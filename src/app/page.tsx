// app/page.tsx
import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Experience from "./components/experience";
import Project from "./components/project";
import ContactMe from "./components/contactme";
import Certificates from "./components/certificates";

export default function Page() {
  return (
    <main>
      <Navbar /> {/* <-- Tambahkan ini */}
      <Hero />
      <About />
      <Experience />
      <Project />
      {/* <Certificates /> */}
      <ContactMe />
    </main>
  );
}