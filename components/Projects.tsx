// components/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
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
            PROJECTS
          </h2>

          <p className="text-gray-400/80 max-w-xl mx-auto text-sm sm:text-base">
            A selection of real-world products and experiments built with modern
            web and Web3 technologies.
          </p>

          <div className="h-[2px] w-32 mx-auto mt-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} {...project} delay={i * 0.1} />
          ))}
        </div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-gray-500/70 text-sm"
        >
          More projects coming soon ✦
        </motion.p>
      </div>
    </section>
  );
}
