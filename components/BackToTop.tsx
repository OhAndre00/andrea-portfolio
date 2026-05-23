"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.querySelector("#about");
      if (!about) return;

      const rect = about.getBoundingClientRect();

      if (isMobile) {
        setVisible(rect.bottom < window.innerHeight * 0.3);
      } else {
        setVisible(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 350,
        damping: 8,
        mass: 0.5,
      }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(130deg,rgba(255,255,255,0.12),rgba(255,255,255,0.06))] backdrop-blur-xl transition-all duration-300 group hover:border-[rgba(62,199,162,0.8)] focus:outline-none"
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(62,199,162,0.45),transparent_70%)] opacity-70 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

      <ArrowUp
        size={20}
        className="relative transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
        style={{ color: "var(--accent-b)" }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border border-[rgba(107,184,255,0.35)]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
