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
};

export function ProjectCard({
  title,
  image,
  alt,
  description,
  tech,
  url,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col h-full rounded-2xl overflow-hidden backdrop-blur-xl
    bg-white/5 border border-white/10
    shadow-[0_0_25px_rgba(139,92,246,0.15)]
    hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
    transition-all duration-300"
      >
        {/* IMAGE */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={image}
            alt={alt}
            width={1000}
            height={300}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
        </div>

        {/* CONTENT + STACK + CTA */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          {/* titolo e descrizione */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          {/* STACK */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
            {tech.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 text-xs rounded-full font-medium
            bg-white/5 border border-white/10
            text-gray-300
            group-hover:text-white group-hover:border-purple-500/30
            transition-all duration-300 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <motion.span
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-start gap-2
      w-full px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white
      bg-purple-500/25 backdrop-blur-sm
      hover:bg-purple-500/40
      transition-colors transition-transform duration-300
      text-sm sm:text-base cursor-pointer"
            >
              <span>View Website</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
