"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const STATS = [
  { val: "$45.8B", labelEn: "Global market value (2020)", labelAr: "قيمة السوق العالمي (2020)", color: "var(--c-indigo)" },
  { val: "7.5%",  labelEn: "Projected annual growth rate", labelAr: "معدل النمو السنوي المتوقع",  color: "var(--c-cyan)" },
  { val: "55%",   labelEn: "University students who consumed EDs", labelAr: "من طلاب الجامعات تناولوا مشروبات الطاقة", color: "var(--c-amber)" },
  { val: "#1",    labelEn: "Red Bull — global market leader", labelAr: "Red Bull — رائد السوق العالمي",  color: "var(--c-rose)" },
];

const HIGHLIGHTS = [
  { en: "Sales doubled in the last decade across all age groups", ar: "تضاعفت المبيعات في العقد الماضي عبر جميع الفئات العمرية" },
  { en: "Middle East & North Africa: fastest-growing region", ar: "الشرق الأوسط وشمال أفريقيا: المنطقة الأسرع نمواً" },
  { en: "Limited data available from Egyptian / Suez population", ar: "بيانات محدودة متاحة عن المجتمع المصري / سكان السويس" },
];

export default function Intro2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المقدمة" : "Introduction"} · 2 / 3</div>
        <h2 className="pres-h1">{ar ? "حجم " : "The "}<em>{ar ? "السوق العالمي" : "Global Market"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Stats grid */}
      <div className="pres-grid-4" style={{ marginBottom: "20px" }}>
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            className="pres-stat"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.09 }}
            style={{ borderTop: `3px solid ${s.color}` }}
          >
            <div className="pres-stat-val">{s.val}</div>
            <div className="pres-stat-unit">{ar ? s.labelAr : s.labelEn}</div>
          </motion.div>
        ))}
      </div>

      {/* Highlight points */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "center" }}>
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="pres-card pres-card-accent-l"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.36 + i * 0.1 }}
            style={{ padding: "13px 18px" }}
          >
            <p className="pres-body-text">{ar ? h.ar : h.en}</p>
          </motion.div>
        ))}
      </div>

      {/* Research gap callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        style={{
          marginTop: "14px", padding: "12px 18px",
          background: "rgba(251,191,36,0.07)", borderRadius: "10px",
          border: "1px solid rgba(251,191,36,0.2)", display: "flex", gap: "10px", alignItems: "center"
        }}
      >
        <span style={{ fontSize: "20px" }}>💡</span>
        <span style={{ fontSize: "13px", color: "var(--c-gold-light)", fontWeight: 500 }}>
          {ar
            ? "فجوة بحثية: نقص الدراسات الإقليمية يجعل هذا البحث ذا أهمية استثنائية"
            : "Research Gap: Lack of regional data makes this study particularly valuable"}
        </span>
      </motion.div>
    </div>
  );
}
