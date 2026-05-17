"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";

/** Animated sparkle particles */
function Sparkles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 4,
    delay: Math.random() * 4,
    dur: 2 + Math.random() * 3,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          style={{
            position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: "50%",
            background: `radial-gradient(circle, rgba(251,191,36,0.8), rgba(99,102,241,0.4))`,
            boxShadow: "0 0 6px rgba(251,191,36,0.4)",
          }}
        />
      ))}
    </div>
  );
}

/** Animated expanding rings */
function PulseRings() {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
          style={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            width: 120, height: 120, borderRadius: "50%",
            border: "2px solid rgba(99,102,241,0.3)",
          }}
        />
      ))}
    </div>
  );
}

export default function ThankYouSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => (c + 1) % 4), 2500);
    return () => clearInterval(t);
  }, []);

  const emojis = ["🙏", "🎓", "💡", "⭐"];

  return (
    <div className="pres-slide-inner pres-cover" style={{ justifyContent: "center", position: "relative" }}>
      {/* Animated background effects */}
      <Sparkles />
      <PulseRings />

      {/* Animated gradient orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none",
        }}
      />

      {/* Logos */}
      <motion.div
        className="pres-cover-logos"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{ marginBottom: "16px", position: "relative", zIndex: 2 }}
      >
        <motion.img
          src="/university.svg" alt="Suez University" className="pres-cover-logo"
          style={{ width: 60, height: 60 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="pres-cover-sep" style={{ height: 45 }} />
        <motion.img
          src="/faculty.svg" alt="Faculty" className="pres-cover-logo"
          style={{ width: 60, height: 60 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>

      {/* Animated emoji */}
      <motion.div
        key={count}
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ fontSize: "52px", marginBottom: "8px", position: "relative", zIndex: 2 }}
      >{emojis[count]}</motion.div>

      {/* Gradient animated title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: "clamp(36px,6vw,60px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: "6px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #f59e0b, #6366f1)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "gradientShift 4s ease infinite",
          position: "relative", zIndex: 2,
        }}
      >
        {ar ? "شكراً لكم" : "Thank You"}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        style={{ fontSize: "16px", color: "var(--c-text-muted)", marginBottom: "20px", position: "relative", zIndex: 2 }}
      >
        {ar ? "نحن مستعدون للإجابة على أسئلتكم" : "We are ready for your questions"}
      </motion.div>

      {/* Animated separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ width: 160, height: 2, background: "linear-gradient(90deg, transparent, var(--c-indigo), var(--c-violet), transparent)", margin: "0 auto 16px", position: "relative", zIndex: 2 }}
      />

      {/* Group info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        style={{ textAlign: "center", marginBottom: "14px", position: "relative", zIndex: 2 }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "3px" }}>
          {ar ? "المجموعة السادسة — الدفعة الخامسة" : "Group 6 · 5th Year Batch"}
        </div>
        <div style={{ fontSize: "12px", color: "var(--c-text-dim)" }}>
          {ar ? "كلية الطب — جامعة السويس — 2021/2026" : "Faculty of Medicine · Suez University · 2021 / 2026"}
        </div>
      </motion.div>

      {/* Supervisors with stagger */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: "11px", color: "var(--c-text-dim)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", textAlign: "center" }}>
          {ar ? "تحت إشراف" : "Supervised by"}
        </div>
        <div className="pres-cover-sups">
          {SUPERVISORS.map((s, i) => (
            <motion.div
              key={i}
              className="pres-sup-chip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              style={{ fontSize: "11px" }}
            >{s.name}</motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
