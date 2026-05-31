"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  {
    en: "Beverages marketed to boost energy, alertness & mental performance",
    ar: "مشروبات تُسوَّق لتعزيز الطاقة واليقظة والأداء الذهني",
    icon: "⚡",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.04))",
    border: "rgba(245,158,11,0.25)",
  },
  {
    en: "Commonly contain caffeine, taurine, B-vitamins & sugar",
    ar: "تحتوي شيوعاً على الكافيين والتورين وفيتامينات ب والسكر",
    icon: "🧪",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.04))",
    border: "rgba(99,102,241,0.25)",
  },
  {
    en: "Rapidly growing global phenomenon since the late 1980s",
    ar: "ظاهرة عالمية متنامية بسرعة منذ أواخر الثمانينيات",
    icon: "🌍",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.04))",
    border: "rgba(6,182,212,0.25)",
  },
  {
    en: "Particularly popular among university students and young adults",
    ar: "شائعة بشكل خاص بين طلاب الجامعات والشباب",
    icon: "🎓",
    color: "#10b981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.04))",
    border: "rgba(16,185,129,0.25)",
  },
  {
    en: "Growing public health concern due to reported adverse effects",
    ar: "مصدر قلق صحي عام متنامٍ بسبب الآثار الجانبية المُبلَّغ عنها",
    icon: "⚠️",
    color: "#f43f5e",
    gradient: "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.04))",
    border: "rgba(244,63,94,0.25)",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } } };

export default function Intro1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            borderRadius: "10px", padding: "6px 10px",
            fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "المقدمة" : "Introduction"} · 1 / 3
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.8vw, 34px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "ما هي " : "What Are "}
          <span style={{
            background: "linear-gradient(135deg, #f59e0b, #ef4444)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {ar ? "مشروبات الطاقة؟" : "Energy Drinks?"}
          </span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #f59e0b, #ef4444)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }}
        />
      </motion.div>

      {/* ── Points ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", gap: "9px", flex: 1, justifyContent: "center" }}
      >
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.015, x: ar ? -6 : 6 }}
            style={{
              background: p.gradient,
              border: `1px solid ${p.border}`,
              borderRadius: "14px",
              padding: "12px 18px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 2px 12px ${p.color}10`,
            }}
          >
            {/* Left accent */}
            <div style={{
              position: "absolute",
              [ar ? "right" : "left"]: 0,
              top: "15%", bottom: "15%", width: "4px",
              background: `linear-gradient(to bottom, transparent, ${p.color}, transparent)`,
              borderRadius: "0 4px 4px 0",
            }} />

            {/* Icon bubble */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              style={{
                width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`,
                border: `1px solid ${p.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px",
                boxShadow: `0 4px 14px ${p.color}20`,
              }}
            >
              {p.icon}
            </motion.div>

            {/* Text */}
            <span style={{
              fontSize: "14px",
              color: "var(--c-text)",
              fontWeight: 500,
              lineHeight: 1.5,
              flex: 1,
            }}>
              {ar ? p.ar : p.en}
            </span>

            {/* Number badge */}
            <div style={{
              width: "24px", height: "24px", borderRadius: "50%", flexShrink: 0,
              background: `${p.color}18`, border: `1px solid ${p.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 800, color: p.color,
            }}>
              {i + 1}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
