"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const STATS = [
  { val: "$45.8B", labelEn: "Global market (2020)", labelAr: "السوق العالمي (2020)", color: "#6366f1", icon: "💹" },
  { val: "7.5%",  labelEn: "Annual growth rate",   labelAr: "معدل النمو السنوي",     color: "#06b6d4", icon: "📈" },
  { val: "55%",   labelEn: "University students",   labelAr: "من طلاب الجامعات",     color: "#f59e0b", icon: "🎓" },
  { val: "#1",    labelEn: "Red Bull — world leader", labelAr: "Red Bull — رائد السوق", color: "#f43f5e", icon: "🏆" },
];

const HIGHLIGHTS = [
  {
    en: "Sales doubled in the last decade across all age groups",
    ar: "تضاعفت المبيعات في العقد الماضي عبر جميع الفئات العمرية",
    icon: "📊", color: "#6366f1",
  },
  {
    en: "Middle East & North Africa: fastest-growing regional market",
    ar: "الشرق الأوسط وشمال أفريقيا: المنطقة الأسرع نمواً في السوق",
    icon: "🌍", color: "#06b6d4",
  },
  {
    en: "Limited data available from Egyptian / Suez population",
    ar: "بيانات محدودة متاحة عن المجتمع المصري / سكان السويس",
    icon: "🔍", color: "#10b981",
  },
];

export default function Intro2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            borderRadius: "10px", padding: "6px 10px",
            fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "المقدمة" : "Introduction"} · 2 / 3
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.8vw, 34px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "حجم " : "The "}
          <span style={{
            background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {ar ? "السوق العالمي" : "Global Market"}
          </span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #6366f1, #06b6d4)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }}
        />
      </motion.div>

      {/* ── Stats Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "14px", flexShrink: 0 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            whileHover={{ scale: 1.06, y: -4 }}
            style={{
              background: `linear-gradient(145deg, ${s.color}14, ${s.color}06)`,
              border: `1px solid ${s.color}30`,
              borderTop: `3px solid ${s.color}`,
              borderRadius: "14px",
              padding: "14px 10px",
              textAlign: "center",
              cursor: "default",
              boxShadow: `0 4px 20px ${s.color}10`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glow blob */}
            <div style={{
              position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)",
              width: "40px", height: "40px", borderRadius: "50%",
              background: `radial-gradient(${s.color}40, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
            <motion.div
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              style={{
                fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900,
                background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                lineHeight: 1.1,
              }}
            >
              {s.val}
            </motion.div>
            <div style={{ fontSize: "10.5px", color: "var(--c-text-muted)", marginTop: "4px", fontWeight: 500, lineHeight: 1.3 }}>
              {ar ? s.labelAr : s.labelEn}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Highlights ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            whileHover={{ x: ar ? -4 : 4 }}
            style={{
              background: `linear-gradient(135deg, ${h.color}10, ${h.color}04)`,
              border: `1px solid ${h.color}22`,
              borderRadius: "12px",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              [ar ? "right" : "left"]: 0,
              top: 0, bottom: 0, width: "3px",
              background: h.color,
              borderRadius: ar ? "3px 0 0 3px" : "0 3px 3px 0",
            }} />
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
              background: `${h.color}18`, border: `1px solid ${h.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
            }}>
              {h.icon}
            </div>
            <p style={{ fontSize: "13.5px", color: "var(--c-text)", margin: 0, fontWeight: 500, lineHeight: 1.5, flex: 1 }}>
              {ar ? h.ar : h.en}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Research Gap callout ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        style={{
          marginTop: "12px", padding: "10px 16px", flexShrink: 0,
          background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(245,158,11,0.05))",
          border: "1px solid rgba(251,191,36,0.3)",
          borderRadius: "12px",
          display: "flex", gap: "12px", alignItems: "center",
          boxShadow: "0 4px 16px rgba(251,191,36,0.08)",
        }}
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: "20px", flexShrink: 0 }}
        >
          💡
        </motion.span>
        <div>
          <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "1.5px", color: "#fbbf24", textTransform: "uppercase", marginBottom: "2px" }}>
            {ar ? "الفجوة البحثية" : "Research Gap"}
          </div>
          <span style={{ fontSize: "13px", color: "#fde68a", fontWeight: 500 }}>
            {ar
              ? "نقص الدراسات الإقليمية يجعل هذا البحث ذا أهمية استثنائية للمجتمع المصري"
              : "Lack of regional data makes this study particularly valuable for the Egyptian population"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
