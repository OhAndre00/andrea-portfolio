"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import Image from "next/image";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

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
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const isLowHeight = useSafeViewportHeight();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isLowHeight ? [0, 20] : [0, 60],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    isLowHeight ? [1, 1] : [1, 0],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-dark"
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      {/* Cursor glow effect */}
      <motion.div
        className="fixed -z-10 w-[400px] h-[400px] rounded-full pointer-events-none"
        animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.5 }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)",
          filter: "blur(120px)",
          willChange: "transform",
        }}
      />

      {/* Main content */}
      <motion.section
        ref={heroRef}
        style={!isLowHeight ? { y, opacity } : undefined}
        className="
    relative
    min-h-screen
    flex
    items-center
    justify-center
    px-4 sm:px-6
    py-24
  "
      >
        <div className="max-w-6xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="flex justify-center relative mb-12 md:mb-16"
          >
            <div className="relative">
              {/* Outline glow */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30 blur-sm" />

              {/* Outline principale */}
              <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />

              <div className="relative rounded-full overflow-hidden border-4 border-dark">
                <Image
                  src="/ohandre.jpg"
                  width={200}
                  height={200}
                  alt="Andrea Icon"
                  className="rounded-full cursor-pointer object-cover w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <div className="relative mb-6 md:mb-8">
              <h1
                className="cursor-default text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
                style={{
                  fontFamily: jetbrainsMono.style.fontFamily,
                  background:
                    "linear-gradient(135deg, var(--purple-neon-strong) 0%, var(--blue-neon) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                  letterSpacing: "-0.02em",
                }}
              >
                ANDREA
              </h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="text-lg cursor-default sm:text-xl md:text-2xl font-light px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                fontFamily: jetbrainsMono.style.fontFamily,
                color: "rgba(209, 213, 219, 0.8)",
                letterSpacing: "0.03em",
                fontWeight: 300,
                lineHeight: 1.5,
              }}
            >
              BUILDING THE FUTURE, ONE LINE OF CODE AT A TIME
            </motion.p>
          </motion.div>

          {/* Social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center gap-6 sm:gap-8 mb-12 md:mb-16"
          >
            <SocialButton
              href="https://github.com/OhAndre00"
              icon={<Github />}
              color="from-purple-500/20 to-purple-600/20"
              hoverColor="from-purple-500/40 to-purple-600/40"
              iconColor="text-purple-300"
              delay={0}
            />
            <SocialButton
              href="https://www.linkedin.com"
              icon={<Linkedin />}
              color="from-blue-500/20 to-blue-600/20"
              hoverColor="from-blue-500/40 to-blue-600/40"
              iconColor="text-blue-300"
              delay={0}
            />
            <SocialButton
              href="mailto:andrea.seidita00@gmail.com"
              icon={<Mail />}
              color="from-pink-500/20 to-rose-600/20"
              hoverColor="from-pink-500/40 to-rose-600/40"
              iconColor="text-pink-300"
              delay={0}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mb-20 md:mb-24"
          >
            <button
              onClick={() => {
                document.querySelector("#about")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="group relative px-10 sm:px-12 py-4 sm:py-5 rounded-2xl cursor-pointer font-semibold overflow-hidden transition-all duration-300 mx-auto block"
              style={{
                fontFamily: jetbrainsMono.style.fontFamily,
                letterSpacing: "0.08em",
                fontWeight: 500,
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300" />

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-2xl shadow-inner shadow-black/20" />

              <span className="relative z-10 text-white flex items-center justify-center gap-3 text-base sm:text-lg">
                EXPLORE MY JOURNEY
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {!isLowHeight && (
          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20">
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-xs cursor-default sm:text-sm font-light mb-1">
                SCROLL
              </span>
              <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-purple-500/50 via-purple-400/30 to-transparent" />
            </motion.div>
          </div>
        )}
      </motion.section>

      <About />
      <Projects />
    </div>
  );
}

function SocialButton({
  href,
  icon,
  delay,
  color,
  hoverColor,
  iconColor,
}: any) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        href.includes("github")
          ? "GitHub"
          : href.includes("linkedin")
            ? "LinkedIn"
            : "Email"
      }
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.15, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="relative group"
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      {/* Background glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} group-hover:${hoverColor} transition-all duration-300 blur-md`}
      />

      {/* Button */}
      <div
        className={`
        relative w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-lg
        bg-white/5
        border border-white/20
        flex items-center justify-center
        group-hover:border-white/40
        shadow-xl
        transition-all duration-300
      `}
      >
        <div
          className={`${iconColor} text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>
    </motion.a>
  );
}
