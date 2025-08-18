// app/src/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rifkyandhikam.my.id/'),
  icons: {
    icon: [
      { url: '/images/icon.png' },
      new URL('/images/icon.png', 'https://www.rifkyandhikam.my.id/'),
    ],
    shortcut: '/images/icon.png',
    apple: '/images/icon.png',
    other: {
      rel: 'icon',
      url: '/images/icon.png',
    },
  },
  title: 'Rifky Andhika Maulana | Web Developer Portfolio',
  description: "Explore my web development portfolio showcasing innovative projects and cutting-edge solutions. With expertise in creating responsive, user-friendly websites, I am dedicated to bringing your digital vision to life. Discover my work and let's collaborate to build something exceptional!",
  keywords: ["web developer, portfolio, responsive design, user-friendly websites, digital solutions, Rifky Andhika Maulana, front-end developer, back-end developer, full-stack developer"],
  authors: [{ name: "Rifky Andhika Maulana", url: "https://www.rifkyandhikam.my.id/" }],
  creator: "Rifky Andhika Maulana",
  openGraph: {
    title: "Rifky Andhika Maulana | Web Developer Portfolio",
    description: "Explore my web development portfolio showcasing innovative projects and cutting-edge solutions.",
    images: ["/images/icon.png"],
    type: "website",
    url: "https://www.rifkyandhikam.my.id/",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
