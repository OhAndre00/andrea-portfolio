// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { ProjectModal } from "./ProjectModal";

type Props = {
  title: string;
  image: string;
  alt: string;
  description: string;
  tech: string[];
  url: string;
  delay?: number;
  featured?: boolean;
};

export function ProjectCard({
  title,
  image,
  alt,
  description,
  tech,
  url,
  delay = 0,
  featured = false,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectData = { title, image, alt, description, tech, url };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className="w-full"
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-col md:flex-row w-full rounded-xl overflow-hidden backdrop-blur-xl
            bg-white/5 border border-white/10
            shadow-[0_0_20px_rgba(139,92,246,0.1)]
            hover:border-purple-500/50
            hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]
            transition-all duration-300 cursor-pointer"
        >
          {/* IMAGE - su mobile sopra, su desktop a sinistra */}
          <div className="relative md:w-2/5 lg:w-1/3 h-48 sm:h-56 md:h-auto min-h-[200px] overflow-hidden shrink-0">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent md:bg-gradient-to-r md:from-dark/90 md:via-dark/30 md:to-transparent" />

            {/* Badge opzionale per progetto in evidenza */}
            {featured && (
              <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-full text-purple-300 z-10">
                Featured
              </div>
            )}
          </div>

          {/* CONTENT + STACK + CTA */}
          <div className="flex flex-col flex-grow p-5 sm:p-6 md:p-8">
            {/* Titolo */}
            <div className="mb-3 md:mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-1">
                {title}
              </h3>
              <p className="text-gray-300/80 text-sm sm:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                {description}
              </p>
            </div>

            {/* STACK */}
            <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
              {tech.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-xs sm:text-sm rounded-full font-medium
                    bg-white/10 border border-white/15
                    text-gray-300
                    transition-all duration-300
                    hover:bg-white/20 hover:border-white/30"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between
                  w-full md:w-auto md:min-w-[180px]
                  px-5 py-2.5 rounded-lg font-medium text-white
                  bg-purple-600/90
                  hover:bg-purple-600
                  transition-all duration-300
                  text-sm sm:text-base
                  group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Project</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
