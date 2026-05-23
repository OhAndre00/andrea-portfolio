// components/ProjectModal.tsx
"use client";

import { motion } from "framer-motion";
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
    <div
      className="project-modal fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className="project-modal-backdrop absolute inset-0 bg-[#010204]/75 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative max-h-[86vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-[linear-gradient(170deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] shadow-[0_26px_60px_rgba(3,8,16,0.7)] backdrop-blur-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 cursor-pointer rounded-full border border-white/20 bg-black/45 p-2 text-white/80 transition-all duration-200 hover:bg-black/75 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-52 w-full overflow-hidden rounded-t-3xl sm:h-60">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #05080f 0%, rgba(5,8,15,0.3) 40%, transparent 100%)",
            }}
          />
        </div>

        <div className="project-modal-content bg-black/35 p-6 backdrop-blur-sm sm:p-8">
          <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            {project.title}
          </h3>

          <div className="mb-6">
            <h4
              className="mb-2 text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--accent-b)" }}
            >
              Description
            </h4>
            <p className="leading-relaxed" style={{ color: "var(--ink-1)" }}>
              {project.description}
            </p>
          </div>

          <div className="mb-8">
            <h4
              className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--accent-a)" }}
            >
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="cursor-default rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-sm font-medium"
                  style={{ color: "var(--ink-1)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[rgba(62,199,162,0.55)] bg-[rgba(62,199,162,0.18)] px-6 py-3 font-semibold text-white transition-all duration-300 hover:border-[rgba(107,184,255,0.7)] hover:bg-[rgba(107,184,255,0.18)]"
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
