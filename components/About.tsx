// components/About.tsx
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Languages,
} from "lucide-react";

const coreStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Fastify",
  "PostgreSQL",
  "Redis",
  "REST API",
  "Web3 Integrations",
  "Git + Agile",
  "Supabase",
];

const timeline = [
  {
    period: "2021",
    title: "Technical Diploma in Computer Science",
    subtitle: "I.T.I.S. Vittorio Emanuele III",
    detail:
      "Graduated with a score of 85/100, including a full-stack final project covering frontend, backend, and networking systems.",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    period: "Oct 2024 - Apr 2025",
    title: "Full-Stack Development Program",
    subtitle: "Develhope",
    detail:
      "Hands-on training in end-to-end web development through both individual and team-based projects.",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  {
    period: "Sep 2025 - Present",
    title: "Full-Stack Developer",
    subtitle: "OOBE Protocol",
    detail:
      "Building frontend applications in React/Next.js and backend services in Node.js/Fastify with PostgreSQL and Redis. Delivering advanced features and Web3 integrations in an Agile workflow.",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  },
  {
    period: "Feb 2026 - Present",
    title: "Full-Stack Developer",
    subtitle: "GestioMed",
    detail:
      "Developing frontend features in React/Next.js, backend services in Node.js, and Python microservices, with data management on Supabase/PostgreSQL.",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-shell relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-4 py-20 sm:px-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-(--ink-2)">
            About
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <span className="text-accent-gradient">
              From UX to backend in one flow
            </span>
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-(--ink-1) sm:text-lg">
            I build complete digital products with a practical approach: clear
            interfaces, solid backend architecture, and clean integrations.
          </p>
        </motion.div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="glass-panel rounded-3xl p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-(--ink-2)">
                Profile Snapshot
              </p>

              <p className="mt-4 text-sm leading-relaxed text-(--ink-1) sm:text-base">
                Full-Stack Developer with a frontend-first mindset and strong
                backend and database skills. I collaborate in teams on real
                products, working across both visual and application layers,
                with strong attention to code quality and maintainability.
              </p>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/6 p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-(--ink-2)">
                  <Languages className="h-3.5 w-3.5 text-(--accent-b)" />
                  Soft Skills
                </p>
                <p className="mt-2 text-sm leading-relaxed text-(--ink-1)">
                  Problem solving, teamwork, autonomous task ownership, and
                  effective communication.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="glass-panel rounded-3xl p-6 sm:p-8"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-(--ink-2)">
                Stack & Workflow
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {coreStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-xs font-medium text-(--ink-1)"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 pt-1 sm:flex-row">
                <motion.button
                  onClick={() => {
                    document.querySelector("#projects")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-[rgba(62,199,162,0.8)]"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 text-(--accent-a) transition-transform group-hover:translate-x-0.5" />
                </motion.button>

                <motion.button
                  onClick={() => {
                    document.querySelector("#contact")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-(--ink-1) transition-all duration-300 hover:border-[rgba(107,184,255,0.7)] hover:text-white"
                >
                  Contact Me
                  <ArrowRight className="h-4 w-4 text-(--accent-b) transition-transform group-hover:translate-x-0.5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 sm:p-8"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-(--ink-2)">
              Timeline
            </p>
            <div className="mt-6 space-y-5">
              {timeline.map((item, index) => (
                <div key={item.period + item.title} className="relative pl-7">
                  <span className="absolute left-0 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/8 text-(--accent-b)">
                    {item.icon}
                  </span>
                  {index < timeline.length - 1 && (
                    <span className="absolute left-2.5 top-7 h-[calc(100%-0.25rem)] w-px bg-linear-to-b from-(--accent-b)/70 to-white/10" />
                  )}

                  <p className="text-[11px] uppercase tracking-[0.14em] text-(--ink-2)">
                    {item.period}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-(--accent-a)">
                    {item.subtitle}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-(--ink-1)">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
