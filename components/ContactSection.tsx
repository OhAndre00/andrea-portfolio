"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react";

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
      className="section-shell relative flex min-h-screen scroll-mt-24 items-center justify-center overflow-hidden px-4 py-20 sm:px-6"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-(--ink-2)">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="text-accent-gradient">Get In Touch</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-(--ink-1) sm:text-base">
            If you want to build a project with strong identity and real
            performance, let&apos;s talk.
          </p>

          <div className="mx-auto mt-6 h-px w-40 bg-linear-to-r from-transparent via-(--accent-a)/70 to-transparent" />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="group"
          >
            <div className="glass-panel rounded-3xl p-6 shadow-[0_16px_36px_rgba(4,8,16,0.42)] sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/8">
                  <Send className="h-6 w-6 text-(--accent-b)" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Send a Message
                  </h3>
                  <p className="text-sm text-(--ink-2)">
                    Average response: 24h
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-green-400/35 bg-green-500/15">
                    <CheckCircle className="h-10 w-10 text-green-300" />
                  </div>
                  <h4 className="mb-2 text-xl font-semibold text-white">
                    Message sent
                  </h4>
                  <p className="text-sm text-(--ink-1)">
                    I&apos;ll get back to you as soon as possible with all the
                    details.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-(--ink-1)"
                    >
                      Name
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
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focusedField === "name"
                            ? "rgba(62, 199, 162, 0.6)"
                            : "",
                        boxShadow:
                          focusedField === "name"
                            ? "0 0 0 1px rgba(62, 199, 162, 0.5), 0 0 24px rgba(62, 199, 162, 0.18)"
                            : "",
                      }}
                      placeholder="Andrea"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-(--ink-1)"
                    >
                      Email
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
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focusedField === "email"
                            ? "rgba(107, 184, 255, 0.65)"
                            : "",
                        boxShadow:
                          focusedField === "email"
                            ? "0 0 0 1px rgba(107, 184, 255, 0.55), 0 0 24px rgba(107, 184, 255, 0.2)"
                            : "",
                      }}
                      placeholder="name@email.com"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-(--ink-1)"
                    >
                      Message
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
                      className="w-full resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focusedField === "message"
                            ? "rgba(255, 209, 123, 0.7)"
                            : "",
                        boxShadow:
                          focusedField === "message"
                            ? "0 0 0 1px rgba(255, 209, 123, 0.5), 0 0 24px rgba(255, 209, 123, 0.18)"
                            : "",
                      }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(62,199,162,0.55)] bg-[rgba(62,199,162,0.2)] px-6 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[rgba(107,184,255,0.75)] hover:bg-[rgba(107,184,255,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="space-y-5"
          >
            <motion.a
              href="mailto:andrea.seidita00@gmail.com"
              className="glass-panel group block rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(62,199,162,0.6)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/8">
                  <Mail className="h-6 w-6 text-(--accent-a)" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-(--ink-2)">Email</p>
                  <h4 className="break-all font-medium text-white">
                    andrea.seidita00@gmail.com
                  </h4>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+393388727725"
              className="glass-panel group block rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(107,184,255,0.65)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/8">
                  <Phone className="h-6 w-6 text-(--accent-b)" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-(--ink-2)">Phone</p>
                  <h4 className="font-medium text-white">+39 338 872 7725</h4>
                </div>
              </div>
            </motion.a>

            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 bg-white/8">
                  <MapPin className="h-6 w-6 text-(--accent-c)" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-(--ink-2)">Location</p>
                  <h4 className="font-medium text-white">Italy</h4>
                  <p className="text-sm text-(--ink-1)">Available remotely</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-[linear-gradient(130deg,rgba(107,184,255,0.16),rgba(62,199,162,0.14))] p-6 backdrop-blur-xl">
              <h4 className="mb-2 text-lg font-semibold text-white">
                Quick Response
              </h4>
              <p className="text-sm leading-relaxed text-(--ink-1)">
                For urgent requests, email or phone are the fastest channels.
                For long-term collaborations, we can schedule an initial call.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
