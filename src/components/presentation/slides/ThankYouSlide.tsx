"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";
import { Stethoscope, Award, Heart, GraduationCap } from "lucide-react";

// Map supervisor name → image file
const PHOTO_MAP: Record<string, string> = {
  "Prof Dr. Maysa Ibrahim": "/images/maysa.jpeg",
  "Dr. Mohammed Wagih Saleh": "/images/wagih.jpeg",
  "Dr. Nanees Kamel Hussein": "/images/nanees.jpeg",
  "Dr. Yosra Saeed Abdalla": "/images/yosra.jpeg",
};

/** Animated sparkle particles */
function Sparkles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    dur: 3 + Math.random() * 3,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ opacity: [0, 0.8, 0], scale: [0.4, 1.3, 0.4] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: "rgba(251, 191, 36, 0.55)",
            boxShadow: "0 0 10px rgba(251, 191, 36, 0.4)",
          }}
        />
      ))}
    </div>
  );
}

/** Animated moving ECG line */
function ECGLine() {
  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] w-full opacity-10 pointer-events-none z-0">
      <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 L400,50 L415,35 L430,65 L445,10 L460,90 L475,45 L485,55 L500,50 L800,50 L815,25 L830,75 L845,0 L860,100 L875,40 L885,60 L900,50 L1200,50"
          fill="none"
          stroke="url(#ecg-grad)"
          strokeWidth="2.5"
          initial={{ strokeDasharray: "1200", strokeDashoffset: "1200" }}
          animate={{ strokeDashoffset: ["1200", "0"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function ThankYouSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIcon(c => (c + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  const icons = [
    <GraduationCap key="g" style={{ width: 52, height: 52, color: "#818cf8" }} />,
    <Stethoscope key="s" style={{ width: 52, height: 52, color: "#22d3ee" }} />,
    <Award key="a" style={{ width: 52, height: 52, color: "#fbbf24" }} />,
    <Heart key="h" style={{ width: 52, height: 52, color: "#fb7185" }} />,
  ];

  return (
    <div
      className="pres-slide-inner relative flex flex-col justify-between items-center text-center overflow-hidden select-none"
      style={{ background: "var(--c-bg)", minHeight: "100%", width: "100%", padding: "28px 40px 20px" }}
    >
      {/* Background Graphics */}
      <Sparkles />
      <ECGLine />

      {/* Subtle radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Top: Logos ── */}
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", alignItems: "center", gap: 20, zIndex: 10 }}
      >
        <img
          src="/university.svg"
          alt="Suez University"
          style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 4px 14px rgba(251,191,36,0.2))" }}
        />
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(148,163,184,0.5), transparent)" }} />
        <img
          src="/faculty.svg"
          alt="Faculty"
          style={{ width: 64, height: 64, objectFit: "contain", borderRadius: "50%", background: "white", padding: 3, filter: "drop-shadow(0 4px 14px rgba(99,102,241,0.2))" }}
        />
      </motion.div>

      {/* ── Centre: Icon + Title + Subtitle ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 10, flex: 1, justifyContent: "center" }}>

        {/* Animated icon ring */}
        <motion.div
          animate={{ boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 32px rgba(99,102,241,0.35)", "0 0 0px rgba(99,102,241,0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            width: 110, height: 110, borderRadius: "50%",
            background: "var(--c-surface)",
            border: "1.5px solid var(--c-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
            marginBottom: 6,
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.05))" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIcon}
              initial={{ scale: 0.4, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {icons[activeIcon]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thank You */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            margin: 0,
            fontSize: "clamp(42px, 7vw, 96px)",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, var(--c-text) 30%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {ar ? "شكراً لكم" : "Thank You"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
          style={{
            margin: 0,
            fontSize: "clamp(14px, 2vw, 26px)",
            color: "var(--c-text-muted)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {ar ? "نحن مستعدون للإجابة على أسئلتكم ومناقشاتكم" : "We are ready for your questions and discussions"}
        </motion.p>

        {/* Gradient divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          style={{ height: 2, background: "linear-gradient(90deg, transparent, #06b6d4, transparent)", marginTop: 6 }}
        />
      </div>

      {/* ── Supervisors ── */}
      <div style={{ width: "100%", zIndex: 10 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{
            margin: "0 0 12px",
            fontSize: "clamp(11px, 1.4vw, 18px)",
            fontWeight: 800,
            color: "var(--c-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          {ar ? "تحت إشراف" : "Heartfelt Thanks To Our Supervisors"}
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {SUPERVISORS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
              whileHover={{ y: -5, borderColor: "rgba(251,191,36,0.5)", boxShadow: "0 12px 32px rgba(251,191,36,0.18)" }}
              style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: 20,
                padding: "20px 16px",
                textAlign: "center",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                transition: "all 0.3s ease",
              }}
            >
              {/* Subtle top gradient accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, #6366f1, #06b6d4, #8b5cf6)`,
                borderRadius: "20px 20px 0 0",
              }} />

              {/* Photo */}
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                border: "2.5px solid rgba(99,102,241,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--c-bg2)", margin: "0 auto 14px",
                overflow: "hidden",
                boxShadow: "0 0 20px rgba(99,102,241,0.25)",
              }}>
                {PHOTO_MAP[s.name] ? (
                  <img src={PHOTO_MAP[s.name]} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                ) : (
                  <Stethoscope style={{ width: 28, height: 28, color: "#818cf8" }} />
                )}
              </div>

              <h3 style={{
                margin: "0 0 6px",
                fontSize: "clamp(12px, 1.4vw, 18px)",
                fontWeight: 700,
                color: "var(--c-text)",
                lineHeight: 1.3,
              }}>
                {s.name}
              </h3>
              <p style={{
                margin: 0,
                fontSize: "clamp(10px, 1.1vw, 14px)",
                color: "var(--c-text-dim)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                lineHeight: 1.4,
              }}>
                {ar ? s.roleAr : s.roleEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        style={{
          width: "100%",
          borderTop: "1px solid var(--c-border)",
          paddingTop: 14,
          marginTop: 18,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: "clamp(11px, 1.3vw, 16px)", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "0.12em" }}>
          {ar ? "المجموعة السادسة — الدفعة الخامسة" : "GROUP 6 • 5TH YEAR BATCH"}
        </span>
        <span style={{ fontSize: "clamp(10px, 1.2vw, 15px)", color: "var(--c-text-dim)", letterSpacing: "0.08em" }}>
          {ar ? "كلية الطب — جامعة السويس — 2021/2026" : "FACULTY OF MEDICINE • SUEZ UNIVERSITY • 2021 / 2026"}
        </span>
      </motion.div>
    </div>
  );
}
