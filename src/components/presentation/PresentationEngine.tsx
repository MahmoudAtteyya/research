"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePresentation } from "@/lib/presentation/usePresentation";
import { SLIDES, Lang } from "@/lib/presentation/slides-data";
import "./presentation.css";

// ── Slide Components ──
import Cover1Slide from "./slides/Cover1Slide";
import Cover2Slide from "./slides/Cover2Slide";

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
import ResultsVitalSlide from "./slides/ResultsVitalSlide";
import ResultsCognSlide from "./slides/ResultsCognSlide";
import DiscussionSlide from "./slides/DiscussionSlide";
import ConclusionSlide from "./slides/ConclusionSlide";
import RecoSlide from "./slides/RecoSlide";
import StatAnalysisSlide from "./slides/StatAnalysisSlide";
import EthicsSlide from "./slides/EthicsSlide";
import ThankYouSlide from "./slides/ThankYouSlide";
import LimitationsSlide from "./slides/LimitationsSlide";

const SLIDE_MAP: Record<string, React.ComponentType<{ lang: Lang }>> = {
  "cover-1":              Cover1Slide,
  "cover-2":              Cover2Slide,

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
  "results-vital":        ResultsVitalSlide,
  "results-cognitive":    ResultsCognSlide,
  discussion:             DiscussionSlide,
  conclusion:             ConclusionSlide,
  limitations:            LimitationsSlide,
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
  
  // Remote control state variables
  const [remoteEnabled, setRemoteEnabled] = useState(false);
  const [showRemoteConfig, setShowRemoteConfig] = useState(false);
  const [adminUrl, setAdminUrl] = useState("");
  const [remoteStatus, setRemoteStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");

  // Remote notification toasts
  const [notification, setNotification] = useState<{ message: string; duration: number } | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((message: string, duration = 2500) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    setNotification({ message, duration });
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, duration);
  }, []);

  // Cleanup notification timer on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
    };
  }, []);
  
  // Explicit scaling logic for mobile to avoid CSS container-query bugs
  const slideAreaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobileMode, setIsMobileMode] = useState(false);

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

  // ── Mobile detect & Precise Scaling ──
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 768);
      
      const isMob = w <= 1024;
      setIsMobileMode(isMob);

      if (isMob && slideAreaRef.current) {
        // Calculate exact scale to fit 1024x576 into the available area
        const { width, height } = slideAreaRef.current.getBoundingClientRect();
        const scaleW = width / 1024;
        const scaleH = height / 576;
        setScale(Math.min(scaleW, scaleH));
      } else {
        setScale(1);
      }
    };
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
        // Immediately hide header & footer when going fullscreen
        setChromeState(2);
        // Lock orientation to landscape on mobile devices (ignore errors if unsupported)
        try {
          if (
            "screen" in window &&
            (window.screen as unknown as { orientation?: { lock?: (o: string) => Promise<void> } }).orientation?.lock
          ) {
            await (window.screen as unknown as { orientation: { lock: (o: string) => Promise<void> } }).orientation.lock("landscape").catch(() => {});
          }
        } catch (e) {
          console.warn("Orientation lock failed or not supported:", e);
        }
        return true;
      } catch (err) {
        console.warn("Fullscreen request blocked:", err);
        throw err;
      }
    } else {
      try {
        await document.exitFullscreen();
        // Restore header & footer when exiting fullscreen
        setChromeState(0);
        if ((window.screen as unknown as { orientation?: { unlock?: () => void } }).orientation?.unlock) {
          (window.screen as unknown as { orientation: { unlock: () => void } }).orientation.unlock();
        }
        return true;
      } catch (err) {
        console.warn("Exit fullscreen failed:", err);
        throw err;
      }
    }
  }, []);

  // Determine admin URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminUrl(`${window.location.protocol}//${window.location.host}/admin`);
    }
  }, []);

  // Server-Sent Events (SSE) remote listener
  useEffect(() => {
    if (!remoteEnabled) {
      setRemoteStatus("disconnected");
      return;
    }

    let active = true;
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      if (!active) return;
      setRemoteStatus("connecting");
      console.log("[Remote] Connecting to SSE stream...");
      eventSource = new EventSource("/api/remote/stream");

      eventSource.onopen = () => {
        if (active) {
          setRemoteStatus("connected");
          showNotification(ar ? "اتصال التحكم النشط جاهز" : "Remote connection active");
        }
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("[Remote] Received command:", data);
          if (data.command === "NEXT") {
            pres.nextSlide();
            showNotification(ar ? "السلايد التالي" : "Next Slide");
          } else if (data.command === "PREV") {
            pres.prevSlide();
            showNotification(ar ? "السلايد السابق" : "Previous Slide");
          } else if (data.command === "FULLSCREEN") {
            handleFullscreen()
              .then(() => {
                showNotification(ar ? "شاشة كاملة" : "Fullscreen toggled");
              })
              .catch(() => {
                showNotification(
                  ar 
                    ? "⚠️ حظر المتصفح تكبير الشاشة تلقائياً. اضغط F على اللاب توب." 
                    : "⚠️ Fullscreen blocked by browser security. Press 'F' on laptop.",
                  4500
                );
              });
          } else if (data.command === "CHROME") {
            cycleChromeState();
            showNotification(ar ? "تغيير شريط الأدوات" : "Chrome UI toggled");
          }
        } catch (e) {
          console.error("[Remote] Error parsing SSE message:", e);
        }
      };

      eventSource.onerror = (err) => {
        console.error("[Remote] SSE connection error, reconnecting in 3s...", err);
        if (active) setRemoteStatus("connecting");
        if (eventSource) {
          eventSource.close();
        }
        setTimeout(connectSSE, 3000);
      };
    };

    connectSSE();

    return () => {
      active = false;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [remoteEnabled, pres.nextSlide, pres.prevSlide, handleFullscreen, cycleChromeState, ar, showNotification]);

  // ── Single unified keyboard handler ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't fire when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        // Navigation
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault();
          pres.nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          pres.prevSlide();
          break;
        case "Home":
          e.preventDefault();
          pres.goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          pres.goToSlide(pres.totalSlides - 1);
          break;

        // Toggle fullscreen
        case "f":
        case "F":
          e.preventDefault();
          handleFullscreen();
          break;

        // Toggle dark / projector theme
        case "t":
        case "T":
          e.preventDefault();
          toggleTheme();
          break;

        // Cycle chrome (header / footer visibility)
        case "h":
        case "H":
          e.preventDefault();
          cycleChromeState();
          break;

        // Speaker notes
        case "n":
        case "N":
          e.preventDefault();
          pres.setShowNotes(v => !v);
          break;

        // Exit fullscreen on Escape
        case "Escape":
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
            pres.setIsFullscreen(false);
          }
          setChromeState(0); // Ensure header/footer show up
          break;
      }
    };

    const onFsChange = () => {
      // @ts-ignore
      const isFs = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
      if (isFs) {
        setChromeState(2);
        pres.setIsFullscreen(true);
      } else {
        setChromeState(0);
        pres.setIsFullscreen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChromeState(0);
        pres.setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("mozfullscreenchange", onFsChange);
    document.addEventListener("MSFullscreenChange", onFsChange);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      document.removeEventListener("mozfullscreenchange", onFsChange);
      document.removeEventListener("MSFullscreenChange", onFsChange);
    };
  }, [pres, cycleChromeState, handleFullscreen, toggleTheme]);


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
      <div className="pres-slide-area" ref={slideAreaRef}>
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
            <div 
              className={isMobileMode ? "pres-mobile-scaler-active" : "pres-mobile-scaler-inactive"}
              style={isMobileMode ? { transform: `translate(-50%, -50%) scale(${scale})` } : undefined}
            >
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

              {/* Remote Control Toggle */}
              <button
                onClick={() => {
                  if (!remoteEnabled) {
                    setRemoteEnabled(true);
                    setShowRemoteConfig(true);
                  } else {
                    setShowRemoteConfig(c => !c);
                  }
                }}
                title={remoteEnabled 
                  ? (ar ? "إعدادات التحكم عن بعد" : "Remote Control settings") 
                  : (ar ? "تفعيل التحكم عن بعد" : "Enable Remote Control")}
                style={{
                  display: "flex", alignItems: "center", gap: isMobile ? "0" : "6px",
                  background: remoteEnabled
                    ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.25))"
                    : "transparent",
                  border: remoteEnabled 
                    ? "1px solid rgba(16, 185, 129, 0.4)" 
                    : "1px solid var(--c-border)",
                  borderRadius: "20px",
                  padding: isMobile ? "5px 8px" : "5px 12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontSize: "11px", fontWeight: 700,
                  color: remoteEnabled ? "#34d399" : "var(--c-text-muted)",
                  position: "relative"
                }}
              >
                {/* Glowing Status Dot */}
                {remoteEnabled && (
                  <span 
                    className={remoteStatus === "connected" ? "blink" : ""}
                    style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: remoteStatus === "connected" ? "#10b981" : "#f59e0b",
                      boxShadow: remoteStatus === "connected" 
                        ? "0 0 8px #10b981" 
                        : "0 0 8px #f59e0b",
                      display: "inline-block"
                    }}
                  />
                )}
                <span style={{ fontSize: "13px" }}>{remoteEnabled ? "📱" : "🔌"}</span>
                {!isMobile && (
                  <span>
                    {remoteEnabled 
                      ? (remoteStatus === "connected" 
                          ? (ar ? "تحكم نشط" : "REMOTE: ON") 
                          : (ar ? "جاري الاتصال..." : "CONNECTING..."))
                      : (ar ? "تحكم عن بعد" : "REMOTE")}
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

      {/* Remote Config Modal */}
      <AnimatePresence>
        {remoteEnabled && showRemoteConfig && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "74px",
              right: ar ? "auto" : "20px",
              left: ar ? "20px" : "auto",
              zIndex: 99999,
              width: "280px",
              background: "rgba(7, 10, 30, 0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(99, 102, 241, 0.35)",
              borderRadius: "16px",
              padding: "20px",
              color: "white",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Header */}
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.5px" }}>
                {ar ? "إعدادات التحكم عن بعد" : "REMOTE CONTROL"}
              </span>
              <button 
                onClick={() => setShowRemoteConfig(false)}
                style={{
                  background: "transparent", border: "none", color: "rgba(255,255,255,0.4)",
                  cursor: "pointer", fontSize: "14px", fontWeight: "bold"
                }}
              >✕</button>
            </div>
            
            {/* QR Code */}
            {adminUrl && (
              <div style={{
                background: "white", padding: "8px", borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=04071a&data=${encodeURIComponent(adminUrl)}`}
                  alt="Remote QR Code"
                  style={{ width: "130px", height: "130px", display: "block" }}
                />
              </div>
            )}

            {/* URL text */}
            <div style={{ textAlign: "center", width: "100%" }}>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
                {ar ? "امسح الرمز أو افتح الرابط التالي على موبايلك:" : "Scan QR or open this link on mobile:"}
              </div>
              <input
                type="text"
                readOnly
                value={adminUrl}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", padding: "6px 8px", fontSize: "10px", color: "#60a5fa",
                  textAlign: "center", outline: "none", cursor: "pointer"
                }}
              />
            </div>

            {/* SSE status badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: "6px", fontSize: "10px",
              color: "#34d399", background: "rgba(52, 211, 153, 0.1)",
              padding: "4px 10px", borderRadius: "20px", width: "100%", justifyContent: "center"
            }}>
              <span className="blink" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }}></span>
              {ar ? "نشط وينتظر الأوامر..." : "Active & listening..."}
            </div>

            {/* Deactivate Button */}
            <button
              onClick={() => {
                setRemoteEnabled(false);
                setShowRemoteConfig(false);
              }}
              style={{
                width: "100%", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.25)",
                borderRadius: "8px", padding: "6px 8px", fontSize: "11px", color: "#f87171",
                cursor: "pointer", fontWeight: 600, transition: "all 0.2s"
              }}
            >
              {ar ? "إيقاف التشغيل" : "Deactivate Remote"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Remote Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999999,
              background: "rgba(7, 16, 46, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(99, 102, 241, 0.2)",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "13px",
              fontWeight: 600,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              pointerEvents: "none"
            }}
          >
            <span>📱</span> {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

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
          <span>T {ar ? "تبديل الوضع" : "Toggle Theme"}</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>H {ar ? "إخفاء الشريط" : "Hide UI"}</span>
        </>
      )}
    </motion.div>
  );
}
