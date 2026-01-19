"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Usa Formspree (gratuito e semplice)
    try {
      const response = await fetch("https://formspree.io/f/xkoobnbe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
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
            Get In Touch
          </h2>

          <p className="text-gray-400/80 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? Let's build something amazing together.
          </p>

          <div className="h-[2px] w-32 mx-auto mt-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send a Message
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                <p className="text-gray-300">
                  I'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2
      w-full px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-white
      bg-purple-500/40 backdrop-blur-sm
      hover:bg-purple-500/50
      transition-colors transition-transform duration-300
      text-sm sm:text-base cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            {/* Contact Info Cards */}
            <div className="flex flex-col h-full gap-6">
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-300" />
                  </div>
                  <h4 className="font-medium">Email</h4>
                </div>
                <a
                  href="mailto:andrea.seidita00@gmail.com"
                  className="block max-w-full break-all text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  andrea.seidita00@gmail.com
                </a>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-300" />
                  </div>
                  <h4 className="font-medium">Phone</h4>
                </div>
                <a
                  href="tel:+393388727725"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  +39 3388727725
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Based in Italy</h4>
                  <p className="text-gray-300 text-sm">Open to remote work</p>
                </div>
              </div>
            </div>

            {/* Quick Response Info */}
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-5">
              <h4 className="font-medium mb-2">Quick Response</h4>
              <p className="text-sm text-gray-300">
                I typically respond within 24 hours. For urgent matters, feel
                free to reach out directly via email or phone.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
