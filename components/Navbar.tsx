"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

type ThemeMode = "dark" | "light";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("andrea-theme") as ThemeMode | null;
    const resolvedTheme = savedTheme ?? "dark";

    document.documentElement.dataset.theme = resolvedTheme;
    setTheme(resolvedTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("andrea-theme", nextTheme);
  };

  const handleNavigate = (href: string) => {
    if (!href.startsWith("#")) {
      router.push(href);
      setIsOpen(false);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      setIsOpen(false);
      return;
    }

    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-60 px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto w-full max-w-6xl rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          isLight
            ? isScrolled
              ? "border-[rgba(15,23,42,0.14)] bg-[rgba(255,255,255,0.78)] shadow-[0_14px_30px_rgba(15,23,42,0.14)] backdrop-blur-xl"
              : "border-[rgba(15,23,42,0.12)] bg-[rgba(255,255,255,0.58)] backdrop-blur-md"
            : isScrolled
              ? "border-white/25 bg-[rgba(5,10,18,0.8)] shadow-[0_14px_34px_rgba(3,8,16,0.5)] backdrop-blur-xl"
              : "border-white/15 bg-[rgba(5,10,18,0.45)] backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => handleNavigate("#home")}
            className="inline-flex items-center gap-2 rounded-xl text-left"
            aria-label="Go to home"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-(--accent-a)" />
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-(--ink-0)">
              Portfolio
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-(--ink-1) transition-colors duration-300 hover:bg-white/10 hover:text-(--ink-0)"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className={`ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border text-(--ink-0) transition-all duration-200 hover:border-[rgba(62,199,162,0.7)] ${
                isLight
                  ? "border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.82)]"
                  : "border-white/25 bg-white/6 hover:bg-white/12"
              }`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => handleNavigate("#contact")}
              className={`ml-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 hover:border-[rgba(62,199,162,0.7)] ${
                isLight
                  ? "border-[rgba(49,116,184,0.35)] bg-[rgba(107,184,255,0.24)] text-[rgba(10,22,40,0.95)] hover:bg-[rgba(62,199,162,0.2)]"
                  : "border-[rgba(107,184,255,0.45)] bg-[rgba(107,184,255,0.12)] text-white hover:bg-[rgba(62,199,162,0.16)]"
              }`}
            >
              Contact
            </button>
          </nav>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden ${
              isLight
                ? "border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.58)] text-(--ink-0)"
                : "border-white/20 bg-white/5 text-white"
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`mt-3 space-y-1 border-t pt-3 md:hidden ${
                isLight ? "border-[rgba(15,23,42,0.14)]" : "border-white/15"
              }`}
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigate(item.href)}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-(--ink-1) transition-colors duration-300 hover:bg-white/10 hover:text-(--ink-0)"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-(--ink-0) transition-all duration-200 ${
                  isLight
                    ? "border-[rgba(15,23,42,0.16)] bg-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.82)]"
                    : "border-white/20 bg-white/6 hover:bg-white/12"
                }`}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <button
                onClick={() => handleNavigate("#contact")}
                className={`mt-2 block rounded-xl border px-3 py-2 text-center text-sm font-semibold transition-all duration-200 hover:border-[rgba(62,199,162,0.7)] ${
                  isLight
                    ? "border-[rgba(49,116,184,0.35)] bg-[rgba(107,184,255,0.24)] text-[rgba(10,22,40,0.95)] hover:bg-[rgba(62,199,162,0.2)]"
                    : "border-[rgba(107,184,255,0.45)] bg-[rgba(107,184,255,0.12)] text-white hover:bg-[rgba(62,199,162,0.16)]"
                }`}
              >
                Contact
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
