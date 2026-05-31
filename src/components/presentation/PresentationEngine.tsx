"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePresentation } from "@/lib/presentation/usePresentation";
import { SLIDES, Lang } from "@/lib/presentation/slides-data";
import "./presentation.css";

// ── Slide Components ──
import Cover1Slide from "./slides/Cover1Slide";
import Cover2Slide from "./slides/Cover2Slide";
import Cover3Slide from "./slides/Cover3Slide";
import TOCSlide from "./slides/TOCSlide";
import Intro1Slide from "./slides/Intro1Slide";
import Intro2Slide from "./slides/Intro2Slide";
import Intro3Slide from "./slides/Intro3Slide";
import AimSlide from "./slides/AimSlide";
import HypothesisSlide from "./slides/HypothesisSlide";
import Literature1Slide from "./slides/Literature1Slide";
import Literature2Slide from "./slides/Literature2Slide";
import Methods1Slide from "./slides/Methods1Slide";
import Methods2Slide from "./slides/Methods2Slide";
import DataToolsSlide from "./slides/DataToolsSlide";
import SampleSizeSlide from "./slides/SampleSizeSlide";
import ResultsIntroSlide from "./slides/ResultsIntroSlide";
import ResultsDemoSlide from "./slides/ResultsDemoSlide";
import ResultsHabitsSlide from "./slides/ResultsHabitsSlide";
import ResultsSideEffectsSlide from "./slides/ResultsSideEffectsSlide";
import ResultsVital1Slide from "./slides/ResultsVital1Slide";
import ResultsVital2Slide from "./slides/ResultsVital2Slide";
import ResultsCognSlide from "./slides/ResultsCognSlide";
import DiscussionSlide from "./slides/DiscussionSlide";
import ConclusionSlide from "./slides/ConclusionSlide";
import RecoSlide from "./slides/RecoSlide";
import StatAnalysisSlide from "./slides/StatAnalysisSlide";
import EthicsSlide from "./slides/EthicsSlide";
import ThankYouSlide from "./slides/ThankYouSlide";

const SLIDE_MAP: Record<string, React.ComponentType<{ lang: Lang }>> = {
  "cover-1":              Cover1Slide,
  "cover-2":              Cover2Slide,
  "cover-3":              Cover3Slide,
  toc:                    TOCSlide,
  "intro-1":              Intro1Slide,
  "intro-2":              Intro2Slide,
  "intro-3":              Intro3Slide,
  aim:                    AimSlide,
  hypothesis:             HypothesisSlide,
  "literature-1":         Literature1Slide,
  "literature-2":         Literature2Slide,
  "methods-1":            Methods1Slide,
  "methods-2":            Methods2Slide,
  "data-tools":           DataToolsSlide,
  "sample-size":          SampleSizeSlide,
  "stat-analysis":        StatAnalysisSlide,
  ethics:                 EthicsSlide,
  "results-intro":        ResultsIntroSlide,
  "results-demo":         ResultsDemoSlide,
  "results-habits":       ResultsHabitsSlide,
  "results-side-effects": ResultsSideEffectsSlide,
  "results-vital-1":      ResultsVital1Slide,
  "results-vital-2":      ResultsVital2Slide,
  "results-cognitive":    ResultsCognSlide,
  discussion:             DiscussionSlide,
  conclusion:             ConclusionSlide,
  recommendations:        RecoSlide,
  thankyou:               ThankYouSlide,
};

const slideVariants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ?  60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 :  60 }),
};

// Chrome state: 0 = both visible, 1 = header hidden, 2 = both hidden, 3 = footer hidden
type ChromeState = 0 | 1 | 2 | 3;

interface Props { lang: Lang; onLangChange: () => void; }

export default function PresentationEngine({ lang, onLangChange }: Props) {
  const pres = usePresentation();

  const [showThumbs,    setShowThumbs]    = useState(false);
  const [dir,           setDir]           = useState(1);
  const [prevIdx,       setPrevIdx]       = useState(0);
  // 2 themes: dark (night) and projector (bright room / beamer)
  const [theme,         setTheme]         = useState<"dark" | "projector">("dark");
  const [isMobile,      setIsMobile]      = useState(false);
  const [chromeState,   setChromeState]   = useState<ChromeState>(0);

  const touchStartX = useRef<number | null>(null);
  const ar = lang === "ar";

  const headerVisible = chromeState !== 1 && chromeState !== 2;
  const footerVisible = chromeState !== 2 && chromeState !== 3;

  // ── Direction tracking ──
  useEffect(() => {
    setDir(pres.currentSlide >= prevIdx ? 1 : -1);
    setPrevIdx(pres.currentSlide);
  }, [pres.currentSlide]);

  // ── Apply theme ──
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ── Mobile detect ──
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === "dark" ? "projector" : "dark");
  }, []);

  // ── Chrome cycle (H key): both → header hidden → both hidden → footer hidden ──
  const cycleChromeState = useCallback(() => {
    setChromeState(s => ((s + 1) % 4) as ChromeState);
  }, []);

  // ── Fullscreen with landscape lock on mobile ──
  const handleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        // Lock orientation to landscape on mobile devices
        if (
          "screen" in window &&
          (window.screen as unknown as { orientation?: { lock?: (o: string) => Promise<void> } }).orientation?.lock
        ) {
          await (window.screen as unknown as { orientation: { lock: (o: string) => Promise<void> } }).orientation.lock("landscape");
        }
      } catch { /* orientation lock not available on all devices */ }
    } else {
      try {
        await document.exitFullscreen();
        if ((window.screen as unknown as { orientation?: { unlock?: () => void } }).orientation?.unlock) {
          (window.screen as unknown as { orientation: { unlock: () => void } }).orientation.unlock();
        }
      } catch { /* ignore */ }
    }
  }, []);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") { e.preventDefault(); cycleChromeState(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [cycleChromeState]);

  // ── Touch swipe ──
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (ar) { dx < 0 ? pres.prevSlide() : pres.nextSlide(); }
      else    { dx < 0 ? pres.nextSlide() : pres.prevSlide(); }
    }
    touchStartX.current = null;
  }, [ar, pres]);

  const SlideComponent = SLIDE_MAP[pres.slide.id] ?? Cover1Slide;
  const notes = ar ? pres.slide.speakerNotesAr : pres.slide.speakerNotesEn;

  // ── Chrome toggle meta ──
  const chromeIcons: Record<ChromeState, string> = { 0: "▣", 1: "⬒", 2: "□", 3: "⬓" };
  const chromeTitles: Record<ChromeState, string> = {
    0: ar ? "إخفاء الرأس" : "Hide header",
    1: ar ? "إخفاء الكل" : "Hide all",
    2: ar ? "إظهار الفوتر" : "Footer only",
    3: ar ? "إظهار الكل" : "Show all",
  };

  return (
    <div
      className="pres-root"
      dir={ar ? "rtl" : "ltr"}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated mesh background (dark only) */}
      <div className="pres-bg-mesh" />

      {/* ── HEADER ── */}
      <AnimatePresence>
        {headerVisible && (
          <motion.header
            className="pres-header"
            key="header"
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
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
                : "Acute Effects of Energy Drinks on Vital Signs & Cognitive Performance"}
            </div>
            <div className="pres-header-right">
              <div className="pres-group-badge">{ar ? "المجموعة 6 — 2026" : "Group 6 — 2026"}</div>
              <img src="/faculty.svg" alt="Faculty" className="pres-logo" style={{ borderRadius: "50%", objectFit: "cover", background: "white" }} />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

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
            <div className="pres-mobile-scaler">
              <SlideComponent lang={lang} />
            </div>
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
      <AnimatePresence>
        {footerVisible && (
          <motion.footer
            className="pres-footer"
            key="footer"
            initial={{ y: 54, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 54, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Left */}
            <div className="pres-footer-left">
              <span className="pres-slide-counter">{pres.currentSlide + 1} / {pres.totalSlides}</span>

              {!isMobile && (
                <button
                  className="pres-btn pres-btn-icon"
                  onClick={() => setShowThumbs(v => !v)}
                  title={ar ? "عرض المصغّرات" : "Thumbnails"}
                  style={{ background: showThumbs ? "rgba(99,102,241,0.2)" : undefined }}
                >⊞</button>
              )}

              {!isMobile && (
                <button
                  className="pres-btn pres-btn-icon"
                  onClick={() => pres.setShowNotes(v => !v)}
                  title={ar ? "ملاحظات (N)" : "Notes (N)"}
                  style={{ color: pres.showNotes ? "#fbbf24" : undefined }}
                >📝</button>
              )}
            </div>

            {/* Center nav */}
            <div className="pres-nav-row">
              <button className="pres-btn pres-btn-nav" onClick={pres.prevSlide} disabled={!pres.canPrev}>
                {ar ? "→" : "←"}
              </button>
              <span className="pres-slide-title-footer">{ar ? pres.slide.titleAr : pres.slide.titleEn}</span>
              <button className="pres-btn pres-btn-nav" onClick={pres.nextSlide} disabled={!pres.canNext}>
                {ar ? "←" : "→"}
              </button>
            </div>

            {/* Right */}
            <div className="pres-footer-right">
              {/* Theme toggle — dark ↔ projector/light */}
              <button
                onClick={toggleTheme}
                title={theme === "dark"
                  ? (ar ? "الوضع الفاتح (للبروجيكتور)" : "Light / Projector mode")
                  : (ar ? "الوضع الداكن" : "Dark mode")}
                style={{
                  display: "flex", alignItems: "center", gap: isMobile ? "0" : "6px",
                  background: theme === "dark"
                    ? "linear-gradient(135deg, rgba(30,27,75,0.9), rgba(49,46,129,0.7))"
                    : "linear-gradient(135deg, #e8ebff, #d6dcff)",
                  border: theme === "dark" ? "1px solid rgba(99,102,241,0.4)" : "2px solid #8088c0",
                  borderRadius: "20px",
                  padding: isMobile ? "5px 8px" : "5px 12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "11px", fontWeight: 700,
                  color: theme === "dark" ? "#a5b4fc" : "#3730a3",
                }}
              >
                <span style={{ fontSize: "13px" }}>{theme === "dark" ? "☀️" : "🌙"}</span>
                {!isMobile && (
                  <span className="pres-btn-theme-label">
                    {theme === "dark" ? "LIGHT" : "DARK"}
                  </span>
                )}
              </button>

              {/* Language toggle */}
              <button
                onClick={onLangChange}
                title={ar ? "Switch language" : "تبديل اللغة"}
                style={{
                  display: "flex", alignItems: "center", gap: "2px",
                  background: "transparent",
                  border: "1px solid var(--c-border)",
                  borderRadius: "20px",
                  padding: isMobile ? "5px 8px" : "5px 10px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontSize: "11px", fontWeight: 800, letterSpacing: "1px",
                  color: "var(--c-text-muted)",
                }}
              >
                <span style={{ color: ar ? "var(--c-indigo)" : "var(--c-text-dim)" }}>AR</span>
                <span style={{ color: "var(--c-text-dim)", margin: "0 2px", fontWeight: 400 }}>·</span>
                <span style={{ color: ar ? "var(--c-text-dim)" : "var(--c-indigo)" }}>EN</span>
              </button>

              {/* Fullscreen with orientation lock */}
              <button
                className="pres-btn pres-btn-primary"
                onClick={handleFullscreen}
                title={ar ? "ملء الشاشة (F)" : "Fullscreen (F)"}
                style={{ gap: "6px", fontSize: "12px" }}
              >
                {pres.isFullscreen ? "⊠ Exit" : "⛶ Full"}
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>

      {/* ── UNIFIED CHROME TOGGLE (H key) ── */}
      <motion.button
        onClick={cycleChromeState}
        title={`${chromeTitles[chromeState]} (H)`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={{
          bottom: footerVisible ? "68px" : "16px",
          background: chromeState === 0
            ? "rgba(255,255,255,0.07)"
            : "rgba(99,102,241,0.65)",
        }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "fixed",
          right: "16px",
          zIndex: 999999,
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "50%",
          width: "38px", height: "38px",
          display: "flex", justifyContent: "center", alignItems: "center",
          cursor: "pointer",
          color: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: chromeState !== 0
            ? "0 4px 20px rgba(99,102,241,0.4)"
            : "0 2px 12px rgba(0,0,0,0.25)",
          fontSize: "15px", fontWeight: 700, lineHeight: 1,
        }}
      >
        {chromeIcons[chromeState]}
      </motion.button>

      {/* ── KEYBOARD HINT ── */}
      <KeyboardHint ar={ar} isMobile={isMobile} />
    </div>
  );
}

function KeyboardHint({ ar, isMobile }: { ar: boolean; isMobile: boolean }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", bottom: 68, left: "50%", transform: "translateX(-50%)",
        background: "rgba(7,16,46,0.92)", border: "1px solid rgba(99,102,241,0.3)",
        borderRadius: "10px", padding: "8px 16px", fontSize: "11px",
        color: "rgba(255,255,255,0.6)", zIndex: 200, backdropFilter: "blur(12px)",
        display: "flex", gap: "10px", whiteSpace: "nowrap", alignItems: "center",
      }}
    >
      {isMobile ? (
        <span>👆 {ar ? "اسحب للتنقل · اضغط Full للأفقي" : "Swipe to navigate · Full = landscape"}</span>
      ) : (
        <>
          <span>← → {ar ? "تنقّل" : "Navigate"}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>F {ar ? "شاشة كاملة" : "Fullscreen"}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>H {ar ? "إخفاء الشريط" : "Chrome"}</span>
        </>
      )}
    </motion.div>
  );
}
