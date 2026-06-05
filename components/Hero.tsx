"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  FileDown,
  ArrowDownRight,
  Activity,
  Clock3,
  MapPin,
} from "lucide-react";

interface HeroSectionProps {
  isLowHeight: boolean;
}

interface SocialButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ href, icon, label }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4 }}
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-[rgba(107,184,255,0.6)] hover:bg-white/10"
    >
      <div className="text-(--accent-b) transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <span className="tracking-wide">{label}</span>
    </motion.a>
  );
}

export default function HeroSection({ isLowHeight }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    isLowHeight ? [1, 1] : [1, 0],
  );

  const handleExploreJourney = () => {
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewProjects = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.section
      id="home"
      ref={heroRef}
      style={!isLowHeight ? { opacity } : undefined}
      className="section-shell relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.24em] text-white/80"
          >
            Full-Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-balance text-5xl font-extrabold leading-[0.92] sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white">Andrea Seidita</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-(--ink-1) sm:text-lg"
          >
            I build digital experiences around one clear rule: real performance,
            strong visual identity, and clean UX. From backend to interactions,
            I craft products that convert and stay memorable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <SocialButton
              href="https://github.com/OhAndre00"
              icon={<Github size={18} />}
              label="GitHub"
            />
            <SocialButton
              href="https://www.linkedin.com/in/andrea-maria-seidita-9b513922b/"
              icon={<Linkedin size={18} />}
              label="LinkedIn"
            />
            <SocialButton
              href="/MyCV.pdf"
              icon={<FileDown size={18} />}
              label="CV"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.44 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExploreJourney}
            className="mt-10 inline-flex items-center gap-3 cursor-pointer rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-[rgba(62,199,162,0.7)] hover:bg-white/15"
          >
            Explore My Journey
            <ArrowDownRight size={18} className="text-(--accent-a)" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="glass-panel overflow-hidden rounded-[2.2rem] p-5 shadow-[0_20px_50px_rgba(4,8,16,0.45)]">
            <div
              className="relative overflow-hidden rounded-[1.8rem] border border-white/20 p-5"
              style={{
                backgroundColor: "var(--hero-panel-bg)",
                backgroundImage:
                  "radial-gradient(circle at -10% -10%, rgba(62, 199, 162, 0.35), transparent 45%), radial-gradient(circle at 110% 110%, rgba(107, 184, 255, 0.35), transparent 45%)",
              }}
            >
              <div className="relative z-10">
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
                  Fast, reliable, and memorable digital experiences.
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-(--ink-1)">
                  I work with startups and teams to turn ideas into real
                  products, with a strong focus on UI/UX, performance, and
                  conversion.
                </p>

                <div className="mt-6 space-y-2.5 text-sm text-(--ink-1)">
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5">
                    <MapPin size={16} className="text-(--accent-b)" />
                    <span>Italy · Remote Friendly</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5">
                    <Clock3 size={16} className="text-(--accent-a)" />
                    <span>Available for new projects</span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#projects"
              onClick={handleViewProjects}
              className="mt-4 inline-flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/7 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-[rgba(107,184,255,0.55)] hover:bg-white/12"
            >
              View Projects
              <ArrowDownRight size={16} className="text-(--accent-b)" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
