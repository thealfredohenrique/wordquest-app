import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WordQuest — Aprenda Inglês Jogando",
  description:
    "Quiz gamificado de vocabulário em inglês com IA generativa. Escolha um tema, teste seus conhecimentos e suba de nível!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="w-full border-b border-primary/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                <span className="text-2xl">🏆</span>
                <span>WordQuest</span>
              </a>
            </div>
          </header>
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="w-full border-t border-primary/10 py-4 text-center text-sm text-muted">
            WordQuest &copy; 2026 — FIAP Front-end Engineering
          </footer>
        </div>
      </body>
    </html>
  );
}
