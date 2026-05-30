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
  title: "Apex Learning // Next-Gen Student Dashboard",
  description: "A highly immersive, hardware-accelerated educational hub for managing courses, tracking daily streaks, and visualizing learning velocity.",
  keywords: ["Next-Gen Learning", "EdTech Dashboard", "Framer Motion", "Supabase", "React Server Components"],
  authors: [{ name: "Next-Gen Developer" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full bg-[#06060c] text-slate-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Dynamic visual backgrounds */}
        <div className="grid-overlay" />
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        
        {/* App content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
