// components/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  const labels = ["Web App", "Web3", "SaaS", "Product Design"];

  return (
    <section
      id="projects"
      className="section-shell relative min-h-screen scroll-mt-24 overflow-hidden px-4 py-20 sm:px-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-(--ink-2)">
              Portfolio / Selected Work
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="text-accent-gradient">Projects</span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm text-(--ink-1) sm:text-base">
              From strategy to deployment, each project is built around real
              goals, fast execution, and obsessive attention to user experience.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {labels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/20 bg-white/7 px-3 py-1 text-xs uppercase tracking-[0.12em] text-(--ink-1)"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="mx-auto mt-6 h-px w-40 bg-linear-to-r from-transparent via-(--accent-b)/70 to-transparent" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={i}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
