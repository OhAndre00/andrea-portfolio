"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, FileDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

interface HeroSectionProps {
  isLowHeight: boolean;
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
  hoverColor: string;
  iconColor: string;
}

function SocialButton({
  href,
  icon,
  delay,
  color,
  hoverColor,
  iconColor,
}: SocialButtonProps) {
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
            : "Download CV"
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
    >
      {/* Background glow - fix per hover non desiderato durante scroll */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${color} transition-all duration-300 blur-md group-hover:opacity-100 opacity-0 group-hover:${hoverColor}`}
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
        group-hover:bg-white/10
      `}
      >
        <div
          className={`${iconColor} text-xl sm:text-2xl transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>
    </motion.a>
  );
}

export default function HeroSection({ isLowHeight }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    isLowHeight ? [1, 1] : [1, 0],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScrollStart = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };

    const handleScrollEnd = () => {
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScrollStart, { passive: true });
    window.addEventListener("scroll", handleScrollEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScrollStart);
      window.removeEventListener("scroll", handleScrollEnd);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleExploreJourney = () => {
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Disabilita gli effetti hover durante lo scroll
  const hoverProps = isScrolling
    ? {}
    : {
        whileHover: { scale: 1.05 },
      };

  return (
    <>
      {/* Cursor glow effect - disabilitato durante scroll per performance */}
      {!isScrolling && (
        <motion.div
          className="fixed -z-10 w-[400px] h-[400px] rounded-full pointer-events-none"
          animate={{ x: mousePosition.x - 200, y: mousePosition.y - 200 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            mass: 0.5,
          }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)",
            filter: "blur(120px)",
            willChange: "transform",
          }}
        />
      )}

      {/* Main content */}
      <motion.section
        ref={heroRef}
        style={!isLowHeight ? { opacity } : undefined}
        className="
          relative
          min-h-screen
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        <div className="max-w-6xl w-full text-center relative z-10 px-4">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            {...hoverProps}
            className="flex justify-center relative mb-2 md:mb-4"
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
                  className="rounded-full object-cover w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]"
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
            className="mb-6 md:mb-10"
          >
            <h1
              className="cursor-default text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
              style={{
                fontFamily: jetbrainsMono.style.fontFamily,
                background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              ANDREA
            </h1>

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
            className="flex justify-center gap-6 sm:gap-8 mb-8 md:mb-12"
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
              href="https://www.linkedin.com/in/andrea-marchese-979354253/"
              icon={<Linkedin />}
              color="from-blue-500/20 to-blue-600/20"
              hoverColor="from-blue-500/40 to-blue-600/40"
              iconColor="text-blue-300"
              delay={0.1}
            />
            <SocialButton
              href="/MyCV.pdf"
              icon={<FileDown />}
              color="from-pink-500/20 to-rose-600/20"
              hoverColor="from-pink-500/40 to-rose-600/40"
              iconColor="text-pink-300"
              delay={0.2}
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            whileHover={isScrolling ? {} : { scale: 1.03 }}
            whileTap={isScrolling ? {} : { scale: 0.98 }}
          >
            <button
              onClick={handleExploreJourney}
              className="group relative px-10 sm:px-12 py-4 sm:py-5 rounded-2xl cursor-pointer font-semibold overflow-hidden transition-all duration-300 mx-auto block focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{
                fontFamily: jetbrainsMono.style.fontFamily,
                letterSpacing: "0.08em",
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-2xl border border-purple-500/30 transition-all duration-300 group-hover:border-purple-400/50" />

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-2xl shadow-inner shadow-black/20" />

              <span className="relative z-10 text-white flex items-center justify-center gap-3 text-base sm:text-lg">
                EXPLORE MY JOURNEY
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" />
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5 group-hover:opacity-100" />
            </button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
