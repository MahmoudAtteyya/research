"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const OBJECTIVES = [
  { en: "Measure changes in vital signs (BP, HR, RR, Temperature) before and after consumption", ar: "قياس تغيرات العلامات الحيوية (ضغط الدم، القلب، التنفس، الحرارة) قبل الاستهلاك وبعده", icon: "❤️", color: "var(--c-rose)" },
  { en: "Assess the effect on attention, mindfulness and alertness levels",                       ar: "تقييم التأثير على مستوى الانتباه واليقظة الذهنية",                                       icon: "🧠", color: "var(--c-indigo)" },
  { en: "Evaluate changes in short-term memory performance",                                     ar: "تقييم التغيرات في أداء الذاكرة قصيرة المدى",                                             icon: "📝", color: "var(--c-violet)" },
  { en: "Assess cognitive flexibility and processing speed",                                     ar: "تقييم المرونة المعرفية وسرعة المعالجة",                                                  icon: "⚡", color: "var(--c-cyan)" },
];

export default function AimSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الهدف" : "Aim & Objectives"}</div>
        <h2 className="pres-h1">{ar ? "لماذا هذا " : "Why this "}<em>{ar ? "البحث؟" : "Study?"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Primary aim */}
      <motion.div
        className="pres-card pres-card-glow"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ marginBottom: "16px", padding: "18px 22px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)" }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: "8px" }}>
          🎯 {ar ? "الهدف الرئيسي" : "Primary Aim"}
        </div>
        <p className="pres-body-text" style={{ fontSize: "15px", color: "var(--c-text)" }}>
          {ar
            ? "تقييم التأثيرات الحادة لاستهلاك مشروبات الطاقة على المؤشرات الفسيولوجية والأداء المعرفي لدى البالغين."
            : "Evaluate the acute effects of energy drink consumption on physiological parameters and cognitive performance in adults."}
        </p>
      </motion.div>

      {/* Secondary objectives */}
      <div style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-text-dim)", marginBottom: "10px" }}>
        {ar ? "الأهداف الفرعية" : "Secondary Objectives"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {OBJECTIVES.map((obj, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.09 }}
            style={{ display: "flex", gap: "12px", alignItems: "center", padding: "11px 16px", borderLeft: `3px solid ${obj.color}` }}
          >
            <span style={{ fontSize: "20px", flexShrink: 0 }}>{obj.icon}</span>
            <span className="pres-body-text" style={{ fontSize: "14px" }}>{ar ? obj.ar : obj.en}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
