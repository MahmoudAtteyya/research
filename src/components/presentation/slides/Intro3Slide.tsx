"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const COMPONENTS = [
  {
    name: "Caffeine", nameAr: "الكافيين",
    effect: "CNS Stimulant — Adenosine Receptor Antagonist",
    effectAr: "محفّز عصبي مركزي — مضاد لمستقبلات الأدينوزين",
    dose: "80–150 mg / can",
    color: "#e11d48", pct: 90, icon: "☕",
    tag: "Primary", tagAr: "رئيسي",
  },
  {
    name: "Taurine", nameAr: "التورين",
    effect: "Cardiac & Neural Modulation",
    effectAr: "تنظيم قلبي وعصبي",
    dose: "~1000 mg / can",
    color: "#6366f1", pct: 70, icon: "🫀",
    tag: "Synergist", tagAr: "معزِّز",
  },
  {
    name: "Sugar", nameAr: "السكر",
    effect: "Rapid Energy Substrate — Glycemic spike",
    effectAr: "مصدر طاقة سريع — ارتفاع نسبة السكر في الدم",
    dose: "25–39 g / can",
    color: "#f59e0b", pct: 80, icon: "🍬",
    tag: "Fuel", tagAr: "وقود",
  },
  {
    name: "B-Vitamins", nameAr: "فيتامينات ب",
    effect: "Metabolic Co-factors (B3, B6, B12)",
    effectAr: "عوامل مساعدة أيضية (ب3، ب6، ب12)",
    dose: "B3 · B6 · B12",
    color: "#10b981", pct: 55, icon: "💊",
    tag: "Support", tagAr: "داعم",
  },
  {
    name: "Guarana", nameAr: "جوارانا",
    effect: "Additional Caffeine Source — Synergistic effect",
    effectAr: "مصدر كافيين إضافي — تأثير تآزري مع الكافيين",
    dose: "Synergistic",
    color: "#8b5cf6", pct: 45, icon: "🌿",
    tag: "Amplifier", tagAr: "مضخِّم",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemV = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Intro3Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #10b981, #06b6d4)",
            borderRadius: "10px", padding: "6px 10px",
            fontSize: "clamp(10px, 1.4vw, 18px)", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "المقدمة" : "Introduction"} · 3 / 3
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.1vw, 41px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "المكوّنات " : "Active "}
          <span style={{
            background: "linear-gradient(135deg, #10b981, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {ar ? "الفعّالة" : "Ingredients"}
          </span>
        </h2>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #10b981, #06b6d4)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }}
        />
      </motion.div>

      {/* ── Ingredient Cards ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}
      >
        {COMPONENTS.map((c, i) => (
          <motion.div
            key={i}
            variants={itemV}
            whileHover={{ scale: 1.015, x: ar ? -5 : 5 }}
            style={{
              background: `linear-gradient(135deg, ${c.color}12, ${c.color}04)`,
              border: `1px solid ${c.color}28`,
              borderRadius: "14px",
              padding: "10px 16px",
              display: "grid",
              gridTemplateColumns: "44px 1fr auto",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 2px 12px ${c.color}0a`,
            }}
          >
            {/* Left accent */}
            <div style={{
              position: "absolute",
              [ar ? "right" : "left"]: 0,
              top: "15%", bottom: "15%", width: "3px",
              background: `linear-gradient(to bottom, transparent, ${c.color}, transparent)`,
              borderRadius: "0 3px 3px 0",
            }} />

            {/* Icon */}
            <motion.div
              animate={{ boxShadow: [`0 0 8px ${c.color}33`, `0 0 18px ${c.color}66`, `0 0 8px ${c.color}33`] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              style={{
                width: "44px", height: "44px", borderRadius: "12px",
                background: `linear-gradient(135deg, ${c.color}28, ${c.color}0e)`,
                border: `1px solid ${c.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "22px", flexShrink: 0,
              }}
            >
              {c.icon}
            </motion.div>

            {/* Info */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span style={{ fontSize: "clamp(14px, 2.0vw, 26px)", fontWeight: 800, color: "var(--c-text)" }}>
                  {ar ? c.nameAr : c.name}
                </span>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 15px)", fontWeight: 800, letterSpacing: "0.8px",
                  background: `${c.color}20`, border: `1px solid ${c.color}40`,
                  borderRadius: "20px", padding: "1px 7px", color: c.color,
                }}>
                  {ar ? c.tagAr : c.tag}
                </span>
                <span style={{ fontSize: "clamp(10px, 1.4vw, 18px)", color: "var(--c-text-muted)", marginLeft: "auto" }}>
                  {c.dose}
                </span>
              </div>
              {/* Effect text */}
              <div style={{ fontSize: "11.5px", color: "var(--c-text-muted)", marginBottom: "5px", lineHeight: 1.3 }}>
                {ar ? c.effectAr : c.effect}
              </div>
              {/* Progress bar */}
              <div style={{
                height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: "3px",
                    background: `linear-gradient(90deg, ${c.color}aa, ${c.color})`,
                    boxShadow: `0 0 6px ${c.color}66`,
                  }}
                />
              </div>
            </div>

            {/* Percentage */}
            <div style={{
              fontSize: "clamp(18px, 2.8vw, 36px)", fontWeight: 900, color: c.color,
              opacity: 0.8, flexShrink: 0, minWidth: "40px", textAlign: "center",
            }}>
              {c.pct}%
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Footer Note ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          marginTop: "12px",
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(251, 191, 36, 0.3)",
          borderRadius: "12px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}
      >
        <span style={{ fontSize: "clamp(24px, 3.5vw, 36px)" }}>💡</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: ar ? "flex-start" : "flex-start", gap: "2px" }}>
          <span style={{ fontSize: "clamp(9px, 1.1vw, 14px)", fontWeight: 800, color: "#fbbf24", letterSpacing: "1px", textTransform: "uppercase" }}>
            {ar ? "تحليل السوق" : "Market Analysis"}
          </span>
          <span style={{ fontSize: "clamp(12px, 1.5vw, 19px)", color: "#f8fafc", fontWeight: 500 }}>
            {ar 
              ? "النسب المئوية أعلاه تعبر عن انتشار المكون في منتجات الطاقة التجارية، وليس التركيز داخل العبوة الواحدة" 
              : "Percentages indicate the prevalence of each ingredient across commercial energy drinks, not the concentration"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
