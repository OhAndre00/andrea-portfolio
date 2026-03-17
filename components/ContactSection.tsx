"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle, Sparkles } from "lucide-react";
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
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden"
      style={{ fontFamily: jetbrainsMono.style.fontFamily }}
    >
      {/* Background Effects migliorati */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl" />

        {/* Griglia decorativa */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* TITLE con lo stesso stile delle altre sezioni */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
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
            GET IN TOUCH
          </h2>

          <p className="text-gray-400/80 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? Let's build something amazing together.
          </p>

          <div className="h-[2px] w-32 mx-auto mt-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
        </motion.div>

        {/* Grid principale */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form - Stile card come i progetti */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-purple-500/30 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.1)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <Send className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Send a Message</h3>
                  <p className="text-sm text-gray-400">
                    I'll respond within 24h
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-gray-300 text-sm">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
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
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focusedField === "name"
                            ? "rgba(139, 92, 246, 0.5)"
                            : "",
                        boxShadow:
                          focusedField === "name"
                            ? "0 0 20px rgba(139, 92, 246, 0.2)"
                            : "",
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="relative">
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
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focusedField === "email"
                            ? "rgba(59, 130, 246, 0.5)"
                            : "",
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 20px rgba(59, 130, 246, 0.2)"
                            : "",
                      }}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="relative">
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
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none transition-all duration-300 resize-none"
                      style={{
                        borderColor:
                          focusedField === "message"
                            ? "rgba(139, 92, 246, 0.5)"
                            : "",
                        boxShadow:
                          focusedField === "message"
                            ? "0 0 20px rgba(139, 92, 246, 0.2)"
                            : "",
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-xl font-semibold cursor-pointer text-white bg-purple-600 hover:bg-purple-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info - Stile migliorato */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid gap-6">
              {/* Email Card */}
              <motion.a
                href="mailto:andrea.seidita00@gmail.com"
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <h4 className="font-medium text-white group-hover:text-purple-300 transition-colors break-all">
                      andrea.seidita00@gmail.com
                    </h4>
                  </div>
                </div>
              </motion.a>

              {/* Phone Card */}
              <motion.a
                href="tel:+393388727725"
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <h4 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                      +39 338 872 7725
                    </h4>
                  </div>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div className="group bg-white/5 cursor-pointer backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <h4 className="font-medium text-white">Based in Italy</h4>
                    <p className="text-sm text-gray-400">Open to remote work</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Response Badge - senza animazioni hover */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 backdrop-blur-lg">
              <h4 className="font-semibold text-lg mb-2">Quick Response</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
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
