// components/ProjectModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    image: string;
    alt: string;
    description: string;
    tech: string[];
    url: string;
  };
};

export function ProjectModal({ isOpen, onClose, project }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Blocca lo scroll quando il modal è aperto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Chiudi con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Gestione click fuori dal modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay oscurato */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      >
        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Immagine */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-2xl">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Contenuto */}
        <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-sm">
          {/* Titolo */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>

          {/* Descrizione completa */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-2">
              Descrizione
            </h4>
            <p className="text-gray-200/90 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tecnologie complete */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-3">
              Tecnologie
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm rounded-full font-medium
                    bg-white/15 border border-white/20
                    text-gray-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Pulsante View Project */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white
              bg-purple-600/90 hover:bg-purple-600
              transition-all duration-300 shadow-lg"
          >
            <span>View Project</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
