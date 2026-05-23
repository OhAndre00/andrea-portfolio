import type { Metadata } from "next";
import "./globals.css";
import GradientMeshBackground from "@/components/GradientMeshBackground";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import { JetBrains_Mono, Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Andrea Seidita — Full-Stack Developer",
  description: "Building the future, one line of code at a time",
  keywords: [
    "developer",
    "portfolio",
    "web3",
    "full-stack",
    "design",
    "react",
    "nextjs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-white overflow-x-hidden antialiased">
        <div className="noise-overlay" />
        <GradientMeshBackground />
        <Navbar />
        <BackToTop />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
