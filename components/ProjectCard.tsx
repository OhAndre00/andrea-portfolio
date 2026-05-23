// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { ProjectModal } from "./ProjectModal";

type Props = {
  title: string;
  category?: string;
  impact?: string;
  image: string;
  alt: string;
  description: string;
  tech: string[];
  url: string;
  index?: number;
  delay?: number;
  featured?: boolean;
};

export function ProjectCard({
  title,
  category,
  impact,
  image,
  alt,
  description,
  tech,
  url,
  index = 0,
  delay = 0,
  featured = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const visibleTech = tech.slice(0, 4);
  const extraTechCount = Math.max(tech.length - visibleTech.length, 0);

  const projectData = { title, image, alt, description, tech, url };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className="h-full w-full"
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_18px_45px_rgba(3,8,16,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(62,199,162,0.6)]"
        >
          <div className="relative h-48 shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#060a11] via-[#060a11]/25 to-transparent" />

            {featured && (
              <div className="absolute right-3 top-3 z-10 rounded-full border border-[rgba(255,209,123,0.5)] bg-black/35 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-(--accent-c)">
                Featured
              </div>
            )}
          </div>

          <div className="flex grow flex-col p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/7 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-(--ink-2)">
                {category ?? "Digital Product"}
              </span>
              <span className="rounded-full border border-(--accent-b)/40 bg-(--accent-b)/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-white">
                Case Study
              </span>
            </div>

            <div className="mb-3">
              <h3 className="line-clamp-2 text-xl font-bold text-white sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-(--ink-1)">
                {description}
              </p>
            </div>

            {impact && (
              <div className="mb-4 rounded-xl border border-(--accent-a)/35 bg-(--accent-a)/10 p-3.5">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-(--accent-a)">
                  <Sparkles className="h-3.5 w-3.5" />
                  Impact
                </p>
                <p className="mt-1 text-sm text-(--ink-1)">{impact}</p>
              </div>
            )}

            <div className="mb-5 flex flex-wrap gap-2">
              {visibleTech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-(--ink-1) transition-all duration-300 hover:border-[rgba(107,184,255,0.6)] sm:text-sm"
                >
                  {item}
                </span>
              ))}
              {extraTechCount > 0 && (
                <span className="rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-xs font-medium text-(--ink-2)">
                  +{extraTechCount}
                </span>
              )}
            </div>

            <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex w-full items-center justify-between rounded-xl border border-[rgba(107,184,255,0.45)] bg-[rgba(107,184,255,0.14)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[rgba(62,199,162,0.75)] hover:bg-[rgba(62,199,162,0.18)]"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Project</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={projectData}
      />
    </>
  );
}
