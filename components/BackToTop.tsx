"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

// Font per coerenza
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile once
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.querySelector("#about");
      if (!about) return;

      const rect = about.getBoundingClientRect();

      if (isMobile) {
        // MOBILE → show only after About ends
        setVisible(rect.bottom < window.innerHeight * 0.3);
      } else {
        // DESKTOP → normal behavior
        setVisible(window.scrollY > 300); // Aumentato da 250 a 300
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
      className="
        fixed bottom-6 right-6 z-50
        h-12 w-12 rounded-full flex items-center justify-center
        cursor-pointer backdrop-blur-lg
        group
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-500/50
      "
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300 blur-md" />

      {/* Main button */}
      <div
        className="
        relative w-full h-full rounded-full
        bg-gradient-to-br from-white/5 to-black/5
        border border-white/20 group-hover:border-purple-400/40
        flex items-center justify-center
        shadow-lg shadow-black/20
        transition-all duration-300
      "
      >
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full shadow-inner shadow-white/5" />

        {/* Icon */}
        <ArrowUp
          size={20}
          className="
            text-purple-300 group-hover:text-purple-200
            transition-all duration-300
            group-hover:scale-110
          "
        />
      </div>

      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-purple-400/30"
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
