// components/About.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 relative overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-0" />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto w-full relative z-10 py-8 sm:py-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-5"
            style={{
              background:
                "linear-gradient(135deg, var(--purple-neon-strong) 0%, var(--blue-neon) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            ABOUT ME
          </h2>

          {/* Underline gradient */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] w-28 sm:w-36 md:w-40 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4 sm:space-y-5 md:space-y-6 text-center mb-8 sm:mb-10 md:mb-12"
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed sm:leading-relaxed font-light tracking-wide px-2">
            I'm a{" "}
            <span
              className="font-semibold"
              style={{
                background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              full-stack developer
            </span>{" "}
            who loves mixing creativity with technology. I enjoy building
            futuristic, fast and intuitive interfaces that feel alive — blending
            design, animations and performance.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-300/90 leading-relaxed sm:leading-relaxed font-light tracking-wide px-2">
            I work across the full stack, from backend architectures and APIs to
            clean, reactive frontends. I'm passionate about crafting digital
            experiences with personality, identity and strong aesthetics.
          </p>
        </motion.div>

        {/* Tech Stack Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2"
        >
          {[
            "React/Next.js",
            "TypeScript",
            "Node.js",
            "MongoDB",
            "PostgreSQL",
            "Tailwind CSS",
            "Docker",
            "Web3.js",
          ].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium
                       bg-white/5 border border-white/10
                       text-gray-300 hover:text-white
                       hover:border-purple-500/30 hover:bg-white/10
                       transition-all duration-300 cursor-default
                       backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 px-2"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-6">
            <motion.button
              onClick={() => {
                document.querySelector("#projects")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-7 sm:px-8 md:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl cursor-pointer font-semibold overflow-hidden transition-all duration-300 w-full sm:w-auto"
              style={{
                letterSpacing: "0.08em",
                fontWeight: 500,
                maxWidth: "280px",
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300" />

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-inner shadow-black/20" />

              <span className="relative z-10 text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                VIEW PROJECTS
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
            </motion.button>

            <motion.a
              href="/MyCV.pdf"
              download
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-7 sm:px-8 md:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl cursor-pointer font-semibold overflow-hidden transition-all duration-300 w-full sm:w-auto"
              style={{
                letterSpacing: "0.08em",
                fontWeight: 500,
                maxWidth: "280px",
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300" />

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-inner shadow-black/20" />

              <span className="relative z-10 text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                DOWNLOAD CV
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
            </motion.a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-6">
            <motion.button
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-7 sm:px-8 md:px-9 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl cursor-pointer font-semibold overflow-hidden transition-all duration-300 w-full sm:w-auto"
              style={{
                letterSpacing: "0.08em",
                fontWeight: 500,
                maxWidth: "280px",
              }}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

              {/* Border gradient */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300" />

              {/* Inner shadow */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl shadow-inner shadow-black/20" />

              <span className="relative z-10 w-full text-white flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-base">
                CONTACT ME
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Hover effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
