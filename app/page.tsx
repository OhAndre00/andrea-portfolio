"use client";

import { useRef } from "react";
import HeroSection from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ContactSection from "@/components/ContactSection";
import { useSafeViewportHeight } from "@/app/hooks/useSafeViewportHeight";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLowHeight = useSafeViewportHeight();

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <HeroSection isLowHeight={isLowHeight} />
      <About />
      <Projects />
      <ContactSection />
    </div>
  );
}
