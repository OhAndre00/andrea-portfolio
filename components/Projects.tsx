// components/Projects.tsx
"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden"
    >
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-0" />

      {/* Content Container */}
      <div className="max-w-6xl mx-auto w-full relative z-10 py-4 sm:py-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 sm:mb-4"
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

          {/* Underline gradient */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[2px] w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Synapse Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div
              className="relative rounded-2xl overflow-hidden backdrop-blur-xl
                bg-white/5 border border-white/10
                shadow-[0_0_25px_rgba(139,92,246,0.15)]
                hover:shadow-[0_0_35px_rgba(139,92,246,0.25)]
                transition-all duration-300 h-full flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src="/synapse.png"
                  alt="Synapse Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Synapse
                </h3>

                <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
                  A Web3 platform built around Solana, blockchain and a
                  futuristic React/Next.js portal. Features advanced analytics,
                  real-time data visualization, and seamless blockchain
                  integration.
                </p>

                {/* STACK */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Fastify",
                    "PostgreSQL",
                    "Solana Web3",
                    "Tailwind",
                  ].map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs rounded-full font-medium
                        bg-white/5 border border-white/10
                        text-gray-300 hover:text-white hover:border-purple-500/30
                        transition-all duration-300 cursor-default backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}
                <motion.a
                  href="https://SYNAPSE.oobeprotocol.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 
                    px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-white 
                    bg-gradient-to-r from-blue-500/10 to-purple-500/10
                    border border-blue-500/30 hover:border-blue-400/50
                    shadow-[0_0_15px_rgba(59,130,246,0.2)]
                    hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]
                    transition-all duration-300 w-full text-sm sm:text-base mt-auto"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* OOBE Protocol Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div
              className="relative rounded-2xl overflow-hidden backdrop-blur-xl
                bg-white/5 border border-white/10
                shadow-[0_0_25px_rgba(59,130,246,0.15)]
                hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]
                transition-all duration-300 h-full flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src="/oobe.PNG"
                  alt="OOBE Protocol Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  OOBE Protocol
                </h3>

                <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed mb-4 flex-grow">
                  A decentralized protocol for secure and efficient blockchain
                  operations. Built with cutting-edge technology to provide
                  seamless integration and optimal performance for Web3
                  applications.
                </p>

                {/* STACK */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {[
                    "React",
                    "Solidity",
                    "Web3.js",
                    "Ethers.js",
                    "Node.js",
                    "MongoDB",
                    "Docker",
                  ].map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs rounded-full font-medium
                        bg-white/5 border border-white/10
                        text-gray-300 hover:text-white hover:border-purple-500/30
                        transition-all duration-300 cursor-default backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* BUTTON */}
                <motion.a
                  href="https://oobeprotocol.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-2 
                    px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-white 
                    bg-gradient-to-r from-blue-500/10 to-purple-500/10
                    border border-blue-500/30 hover:border-blue-400/50
                    shadow-[0_0_15px_rgba(59,130,246,0.2)]
                    hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]
                    transition-all duration-300 w-full text-sm sm:text-base mt-auto"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* More projects coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10 text-center"
        >
          <p className="text-gray-500/70 text-sm sm:text-base font-light tracking-wide">
            More exciting projects coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
