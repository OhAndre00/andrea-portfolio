"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ContactSection from "@/components/ContactSection";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Hook per l'altezza della viewport (puoi mantenerlo inline o spostarlo in un file separato)
function useSafeViewportHeight(limit = 700) {
  const [isLow, setIsLow] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsLow(window.innerHeight < limit);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [limit]);

  return isLow;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLowHeight = useSafeViewportHeight();

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-dark"
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      <AnimatePresence mode="wait">
        <HeroSection isLowHeight={isLowHeight} />
        <About />
        <Projects />
        <ContactSection />
      </AnimatePresence>
    </div>
  );
}
