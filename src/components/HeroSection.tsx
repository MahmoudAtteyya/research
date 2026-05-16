"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Activity, Brain, ArrowRight } from "lucide-react";

function AnimatedECG() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "70px" }}>
      <svg viewBox="0 0 900 70" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ecgGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--accent-cyan)" />
            <stop offset="70%" stopColor="var(--accent-green)" />
            <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Main ECG path */}
        <path
          d="M0,35 L80,35 L90,35 L95,20 L105,50 L115,35 L140,35 L150,35 L155,10 L165,60 L175,35 L200,35
             L280,35 L290,35 L295,20 L305,50 L315,35 L340,35 L350,35 L355,10 L365,60 L375,35 L400,35
             L480,35 L490,35 L495,20 L505,50 L515,35 L540,35 L550,35 L555,10 L565,60 L575,35 L600,35
             L680,35 L690,35 L695,20 L705,50 L715,35 L740,35 L750,35 L755,10 L765,60 L775,35 L900,35"
          fill="none"
          stroke="url(#ecgGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          className="ecg-animate"
          style={{ strokeDasharray: 1800, strokeDashoffset: 1800, animation: "ecg 3s ease-in-out infinite" }}
        />
        {/* Shadow path */}
        <path
          d="M0,35 L80,35 L90,35 L95,20 L105,50 L115,35 L140,35 L150,35 L155,10 L165,60 L175,35 L200,35
             L280,35 L290,35 L295,20 L305,50 L315,35 L340,35 L350,35 L355,10 L365,60 L375,35 L400,35
             L480,35 L490,35 L495,20 L505,50 L515,35 L540,35 L550,35 L555,10 L565,60 L575,35 L600,35
             L680,35 L690,35 L695,20 L705,50 L715,35 L740,35 L750,35 L755,10 L765,60 L775,35 L900,35"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeLinecap="round"
        />
      </svg>
      {/* Gradient masks */}
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--bg-primary), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none"
        style={{ background: "linear-gradient(-90deg, var(--bg-primary), transparent)" }} />
    </div>
  );
}

function CountUp({ end, suffix = "", decimals = 0 }: { end: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const dur = 2000;
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setVal(parseFloat((ease * end).toFixed(decimals)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, decimals]);

  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

export default function HeroSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";

  const stats = [
    { value: 47, suffix: "", label: "Participants", labelAr: "مشاركاً", icon: "👥", colorVar: "--accent-cyan" },
    { value: 5, suffix: "", label: "Vital Signs", labelAr: "علامة حيوية", icon: "💓", colorVar: "--accent-red" },
    { value: 5, suffix: "", label: "Cognitive Tests", labelAr: "اختبار معرفي", icon: "🧠", colorVar: "--accent-green" },
    { value: 93.5, suffix: "%", decimals: 1, label: "ED Consumers", labelAr: "مستهلكو مشروبات الطاقة", icon: "⚡", colorVar: "--accent-gold" },
  ];

  const tags = isAr
    ? ["مشروبات الطاقة", "العلامات الحيوية", "الأداء المعرفي", "الكافيين"]
    : ["Energy Drinks", "Vital Signs", "Cognitive Performance", "Caffeine"];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-16" dir={isAr ? "rtl" : "ltr"}>
      {/* Radial background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-20 float-slow"
          style={{ background: "radial-gradient(circle, var(--accent-cyan), transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 float"
          style={{ background: "radial-gradient(circle, var(--accent-green), transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, var(--accent-purple), transparent 70%)", filter: "blur(100px)" }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(var(--accent-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--accent-cyan) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center w-full">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 text-sm font-medium"
          style={{ background: "rgba(212,144,10,0.1)", border: "1px solid rgba(212,144,10,0.3)", color: "var(--accent-gold)" }}>
          <span className="text-base">🏛️</span>
          {isAr ? "كلية الطب البشري – جامعة السويس | الفرقة الخامسة ٢٠٢١–٢٠٢٦" : "Faculty of Medicine – Suez University | Fifth Year 2021–2026"}
          <span className="w-2 h-2 rounded-full blink" style={{ background: "var(--accent-gold)" }} />
        </motion.div>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 2 }}>
              <Zap className="w-10 h-10" style={{ color: "var(--accent-cyan)", filter: "drop-shadow(0 0 12px var(--accent-cyan))" }} />
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight gradient-text">
              {isAr ? "مشروبات الطاقة" : "Energy Drinks"}
            </h1>
            <motion.div className="heartbeat">
              <Activity className="w-10 h-10" style={{ color: "var(--accent-red)", filter: "drop-shadow(0 0 12px var(--accent-red))" }} />
            </motion.div>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-3" style={{ color: "var(--text-secondary)" }}>
            {isAr ? "التأثير على العلامات الحيوية والأداء المعرفي" : "Impact on Vital Signs & Cognitive Performance"}
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: "var(--text-muted)" }}>
            {isAr
              ? "دراسة تجريبية قبل وبعد • 47 بالغاً • جامعة السويس ومستشفى جامعة السويس • 2026"
              : "Pre-post Experimental Study • 47 Adults • Suez University & Suez University Hospital • 2026"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tags.map((t, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "var(--bg-surface-2)", border: "1px solid var(--border-accent)", color: "var(--text-secondary)" }}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ECG */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
          className="my-8 max-w-3xl mx-auto">
          <AnimatedECG />
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-2xl p-5 text-center relative overflow-hidden group cursor-default">
              {/* Shimmer */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: `var(${s.colorVar})` }}>
                <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {isAr ? s.labelAr : s.label}
              </div>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, var(${s.colorVar}), transparent)` }} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a href="#results" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all btn-press text-sm"
            style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))", boxShadow: "0 0 30px var(--glow-cyan)" }}>
            {isAr ? "استعرض النتائج" : "Explore Results"}
            <ArrowRight className="w-4 h-4" />
          </motion.a>
          <motion.a href="#simulator" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all btn-press text-sm border"
            style={{ border: "1px solid var(--border-accent)", color: "var(--accent-cyan)", background: "var(--glow-cyan)" }}>
            <Zap className="w-4 h-4" />
            {isAr ? "جرب المحاكاة" : "Try Simulator"}
          </motion.a>
          <motion.a href="#quiz" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all btn-press text-sm border"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)", background: "var(--bg-surface-2)" }}>
            <Brain className="w-4 h-4" />
            {isAr ? "اختبر معلوماتك" : "Take Quiz"}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "var(--text-muted)" }}>
        <span className="text-xs">{isAr ? "اسحب للأسفل" : "Scroll down"}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
