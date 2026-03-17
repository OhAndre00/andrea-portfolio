// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  image: string;
  alt: string;
  description: string;
  tech: string[];
  url: string;
  delay?: number;
  featured?: boolean; // Rendo opzionale il badge featured
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
  // Limita la descrizione a 100 caratteri per mantenere le card uniformi
  const truncatedDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col h-full rounded-xl overflow-hidden backdrop-blur-xl
          bg-white/5 border border-white/10
          shadow-[0_0_20px_rgba(139,92,246,0.1)]
          hover:border-purple-500/50
          transition-all duration-300"
      >
        {/* IMAGE */}
        <div className="relative h-32 sm:h-40 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            width={1000}
            height={200}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

          {/* Badge opzionale per progetto in evidenza */}
          {featured && (
            <div className="absolute top-2 right-2 px-2 py-1 text-[10px] font-medium bg-purple-500/20 backdrop-blur-md border border-purple-500/30 rounded-full text-purple-300">
              Featured
            </div>
          )}
        </div>

        {/* CONTENT + STACK + CTA */}
        <div className="flex flex-col flex-grow p-4 sm:p-5">
          {/* Titolo e descrizione compatta */}
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-300/80 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {truncatedDescription}
            </p>
          </div>

          {/* STACK */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tech.slice(0, 4).map((item) => (
              <span
                key={item}
                className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-medium
                  bg-white/10 border border-white/15
                  text-gray-300
                  transition-all duration-300"
              >
                {item}
              </span>
            ))}
            {tech.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full font-medium bg-white/5 text-gray-400">
                +{tech.length - 4}
              </span>
            )}
          </div>

          {/* CTA - senza effetti di scale, solo cambio colore */}
          <div className="mt-auto">
            <span
              className="inline-flex items-center justify-between
                w-full px-4 py-2 rounded-lg font-medium text-white
                bg-purple-600/90
                group-hover:bg-purple-600
                transition-colors duration-300
                text-xs sm:text-sm"
            >
              <span>View Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
