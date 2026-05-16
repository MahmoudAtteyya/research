"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun, Moon, FlaskConical, Presentation } from "lucide-react";

const navItems = [
  { href: "#abstract", en: "Abstract", ar: "الملخص" },
  { href: "#results", en: "Results", ar: "النتائج" },
  { href: "#methodology", en: "Methods", ar: "المنهجية" },
  { href: "#simulator", en: "Simulator", ar: "المحاكاة" },
  { href: "#discussion", en: "Discussion", ar: "المناقشة" },
  { href: "#quiz", en: "Quiz", ar: "اختبار" },
  { href: "#team", en: "Team", ar: "الفريق" },
];

export default function Navbar({ lang, onLangChange }: { lang: "en" | "ar"; onLangChange: () => void }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isAr = lang === "ar";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = navItems.map(n => n.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      dir={isAr ? "rtl" : "ltr"}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Scan line effect when scrolled */}
      {scrolled && <div className="scan-line" />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))", boxShadow: "0 0 20px var(--glow-cyan)" }}
            >
              <FlaskConical className="w-5 h-5 text-white" />
            </motion.div>
            <span className="hidden sm:block">
              <span className="font-black text-sm gradient-text">{isAr ? "بحث الطاقة" : "Energy Study"}</span>
              <span className="block text-[10px] text-[var(--text-muted)] -mt-0.5">{isAr ? "جامعة السويس" : "Suez University"}</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navItems.map(item => (
              <a key={item.href} href={item.href}
                className="relative px-3 py-1.5 rounded-lg text-sm transition-all duration-200 font-medium"
                style={{
                  color: activeSection === item.href.slice(1) ? "var(--accent-cyan)" : "var(--text-muted)",
                  background: activeSection === item.href.slice(1) ? "rgba(0,212,255,0.08)" : "transparent",
                }}
                onMouseEnter={e => { if (activeSection !== item.href.slice(1)) (e.target as HTMLElement).style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { if (activeSection !== item.href.slice(1)) (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                {isAr ? item.ar : item.en}
                {activeSection === item.href.slice(1) && (
                  <motion.div layoutId="activeNav" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
                )}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language */}
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onLangChange}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all btn-press"
              style={{ border: "1px solid var(--border-accent)", color: "var(--accent-cyan)", background: "rgba(0,212,255,0.05)" }}
            >
              <Globe className="w-3.5 h-3.5" />
              {isAr ? "EN" : "عربي"}
            </motion.button>

            {/* Theme toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all btn-press overflow-hidden"
                style={{ border: "1px solid var(--border)", background: "var(--bg-surface-2)" }}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4" style={{ color: "var(--accent-gold)" }} />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4" style={{ color: "var(--accent-purple)" }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Mobile menu */}
            <button className="xl:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition-all"
              style={{ border: "1px solid var(--border)", background: "var(--bg-surface-2)" }}
              onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}>
            <div className="px-4 py-3 grid grid-cols-2 gap-2">
              {navItems.map(item => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-center"
                  style={{ background: "var(--bg-surface-2)", color: "var(--text-secondary)" }}>
                  {isAr ? item.ar : item.en}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
