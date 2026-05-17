"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePresentation } from "@/lib/presentation/usePresentation";
import { SLIDES, Lang } from "@/lib/presentation/slides-data";
import "./presentation.css";

// ── Slide Components ──
import Cover1Slide        from "./slides/Cover1Slide";
import Cover2Slide        from "./slides/Cover2Slide";
import Cover3Slide        from "./slides/Cover3Slide";
import TOCSlide           from "./slides/TOCSlide";
import Intro1Slide        from "./slides/Intro1Slide";
import Intro2Slide        from "./slides/Intro2Slide";
import Intro3Slide        from "./slides/Intro3Slide";
import AimSlide           from "./slides/AimSlide";
import HypothesisSlide    from "./slides/HypothesisSlide";
import Literature1Slide   from "./slides/Literature1Slide";
import Literature2Slide   from "./slides/Literature2Slide";
import Methods1Slide      from "./slides/Methods1Slide";
import Methods2Slide      from "./slides/Methods2Slide";
import ResultsDemoSlide   from "./slides/ResultsDemoSlide";
import ResultsVital1Slide from "./slides/ResultsVital1Slide";
import ResultsVital2Slide from "./slides/ResultsVital2Slide";
import ResultsCognSlide   from "./slides/ResultsCognSlide";
import DiscussionSlide    from "./slides/DiscussionSlide";
import ConclusionSlide    from "./slides/ConclusionSlide";
import RecoSlide          from "./slides/RecoSlide";
import StatAnalysisSlide  from "./slides/StatAnalysisSlide";
import EthicsSlide        from "./slides/EthicsSlide";
import ThankYouSlide      from "./slides/ThankYouSlide";

const SLIDE_MAP: Record<string, React.ComponentType<{ lang: Lang }>> = {
  "cover-1":          Cover1Slide,
  "cover-2":          Cover2Slide,
  "cover-3":          Cover3Slide,
  toc:                TOCSlide,
  "intro-1":          Intro1Slide,
  "intro-2":          Intro2Slide,
  "intro-3":          Intro3Slide,
  aim:                AimSlide,
  hypothesis:         HypothesisSlide,
  "literature-1":     Literature1Slide,
  "literature-2":     Literature2Slide,
  "methods-1":        Methods1Slide,
  "methods-2":        Methods2Slide,
  "stat-analysis":    StatAnalysisSlide,
  ethics:             EthicsSlide,
  "results-demo":     ResultsDemoSlide,
  "results-vital-1":  ResultsVital1Slide,
  "results-vital-2":  ResultsVital2Slide,
  "results-cognitive":ResultsCognSlide,
  discussion:         DiscussionSlide,
  conclusion:         ConclusionSlide,
  recommendations:    RecoSlide,
  thankyou:           ThankYouSlide,
};

const slideVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

interface Props { lang: Lang; onLangChange: () => void; }

export default function PresentationEngine({ lang, onLangChange }: Props) {
  const pres = usePresentation();
  const [showThumbs, setShowThumbs] = useState(false);
  const [dir, setDir] = useState(1);
  const [prevIdx, setPrevIdx] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const ar = lang === "ar";

  // Track direction for slide animation
  useEffect(() => {
    setDir(pres.currentSlide >= prevIdx ? 1 : -1);
    setPrevIdx(pres.currentSlide);
  }, [pres.currentSlide]);

  // Apply theme to root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === "dark" ? "light" : "dark");
  }, []);

  const SlideComponent = SLIDE_MAP[pres.slide.id] ?? Cover1Slide;
  const notes = ar ? pres.slide.speakerNotesAr : pres.slide.speakerNotesEn;

  return (
    <div className="pres-root" dir={ar ? "rtl" : "ltr"}>
      {/* Animated mesh background */}
      <div className="pres-bg-mesh" />

      {/* ── HEADER ── */}
      <header className="pres-header">
        <div className="pres-header-logo-group">
          <img src="/university.svg" alt="Suez University" className="pres-logo" />
          <div>
            <div className="pres-uni-name">{ar ? "جامعة السويس" : "Suez University"}</div>
            <div className="pres-fac-name">{ar ? "كلية الطب" : "Faculty of Medicine"}</div>
          </div>
        </div>

        <div className="pres-header-center">
          {ar
            ? "تأثير مشروبات الطاقة على العلامات الحيوية والأداء المعرفي"
            : "Effect of Energy Drinks on Vital Signs & Cognitive Performance"}
        </div>

        <div className="pres-header-right">
          <div className="pres-group-badge">{ar ? "المجموعة 6 — 2026" : "Group 6 — 2026"}</div>
          <img src="/faculty.svg" alt="Faculty" className="pres-logo" />
        </div>
      </header>

      {/* ── PROGRESS ── */}
      <div className="pres-progress">
        <motion.div
          className="pres-progress-fill"
          animate={{ width: `${pres.progress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* ── SLIDE AREA ── */}
      <div className="pres-slide-area">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={pres.slide.id}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}
          >
            <SlideComponent lang={lang} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      {showThumbs && (
        <div className="pres-thumb-strip">
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className={`pres-thumb ${i === pres.currentSlide ? "active" : ""}`}
              onClick={() => pres.goToSlide(i)}
            >
              <span style={{ fontSize: "9px", fontWeight: 700, color: "inherit" }}>{i + 1}</span>
              <span style={{ lineHeight: 1.2 }}>{ar ? s.titleAr : s.titleEn}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── SPEAKER NOTES ── */}
      {pres.showNotes && notes && (
        <div className="pres-notes">
          <div className="pres-notes-label">📝 {ar ? "ملاحظات المقدم" : "Speaker Notes"}</div>
          <p>{notes}</p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="pres-footer">
        {/* Left controls */}
        <div className="pres-footer-left">
          <span className="pres-slide-counter">{pres.currentSlide + 1} / {pres.totalSlides}</span>

          <button
            className="pres-btn pres-btn-icon"
            onClick={() => setShowThumbs(v => !v)}
            title={ar ? "عرض الصور المصغّرة" : "Slide thumbnails"}
            style={{ background: showThumbs ? "rgba(99,102,241,0.2)" : undefined }}
          >⊞</button>

          <button
            className="pres-btn pres-btn-icon"
            onClick={() => pres.setShowNotes(v => !v)}
            title={ar ? "ملاحظات المقدم (N)" : "Speaker notes (N)"}
            style={{ color: pres.showNotes ? "#fbbf24" : undefined }}
          >📝</button>
        </div>

        {/* Center navigation */}
        <div className="pres-nav-row">
          <button className="pres-btn pres-btn-nav" onClick={pres.prevSlide} disabled={!pres.canPrev} title="← Previous">
            {ar ? "→" : "←"}
          </button>
          <span className="pres-slide-title-footer">{ar ? pres.slide.titleAr : pres.slide.titleEn}</span>
          <button className="pres-btn pres-btn-nav" onClick={pres.nextSlide} disabled={!pres.canNext} title="Next →">
            {ar ? "←" : "→"}
          </button>
        </div>

        {/* Right controls */}
        <div className="pres-footer-right">
          {/* Theme toggle — premium pill */}
          <button
            onClick={toggleTheme}
            title={ar ? "تبديل المظهر" : "Toggle theme"}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: theme === "dark"
                ? "linear-gradient(135deg, rgba(30,27,75,0.9), rgba(49,46,129,0.7))"
                : "linear-gradient(135deg, rgba(224,231,255,0.9), rgba(199,210,254,0.7))",
              border: theme === "dark" ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(99,102,241,0.3)",
              borderRadius: "20px", padding: "5px 10px",
              cursor: "pointer", transition: "all 0.3s ease",
              fontSize: "11px", fontWeight: 700,
              color: theme === "dark" ? "#a5b4fc" : "#4f46e5",
              letterSpacing: "0.5px",
            }}
          >
            <span style={{ fontSize: "13px" }}>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "LIGHT" : "DARK"}</span>
          </button>

          {/* Language toggle — AR / EN */}
          <button
            onClick={onLangChange}
            title={ar ? "Switch language" : "تبديل اللغة"}
            style={{
              display: "flex", alignItems: "center", gap: "2px",
              background: "transparent",
              border: "1px solid var(--c-border)",
              borderRadius: "20px", padding: "5px 10px",
              cursor: "pointer", transition: "all 0.25s ease",
              fontSize: "11px", fontWeight: 800, letterSpacing: "1px",
              color: "var(--c-text-muted)",
            }}
          >
            <span style={{ color: ar ? "var(--c-indigo)" : "var(--c-text-dim)" }}>AR</span>
            <span style={{ color: "var(--c-text-dim)", margin: "0 2px", fontWeight: 400 }}>·</span>
            <span style={{ color: ar ? "var(--c-text-dim)" : "var(--c-indigo)" }}>EN</span>
          </button>

          {/* Fullscreen — prominent */}
          <button
            className="pres-btn pres-btn-primary"
            onClick={pres.toggleFullscreen}
            title={ar ? "ملء الشاشة (F)" : "Fullscreen (F)"}
            style={{ gap: "6px", fontSize: "12px" }}
          >
            {pres.isFullscreen ? "⊠ Exit" : "⛶ Fullscreen"}
          </button>
        </div>
      </footer>

      {/* Keyboard hint overlay — shows once */}
      <KeyboardHint ar={ar} />
    </div>
  );
}

/** One-time keyboard hint that fades after 3s */
function KeyboardHint({ ar }: { ar: boolean }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", bottom: 70, left: "50%", transform: "translateX(-50%)",
        background: "rgba(7,16,46,0.9)", border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: "10px", padding: "8px 16px", fontSize: "11px",
        color: "rgba(255,255,255,0.6)", zIndex: 200, backdropFilter: "blur(12px)",
        display: "flex", gap: "12px", whiteSpace: "nowrap",
      }}
    >
      <span>← → {ar ? "للتنقل" : "Navigate"}</span>
      <span>·</span>
      <span>F {ar ? "ملء الشاشة" : "Fullscreen"}</span>
      <span>·</span>
      <span>N {ar ? "ملاحظات" : "Notes"}</span>
      <span>·</span>
      <span>Space {ar ? "التالي" : "Next"}</span>
    </motion.div>
  );
}
