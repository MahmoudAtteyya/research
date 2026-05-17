"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const PIPELINE = [
  { icon: "📋", color: "#6366f1", en: "Data collected, coded and entered into the computer", ar: "تم جمع البيانات وترميزها وإدخالها إلى الحاسوب" },
  { icon: "💻", color: "#8b5cf6", en: "SPSS version 26 (IBM) used for statistical analysis", ar: "تم استخدام SPSS 26 (IBM) لتحليل البيانات إحصائياً" },
  { icon: "📊", color: "#06b6d4", en: "Data analyzed and presented using tables and graphs", ar: "تم تحليل البيانات وعرضها بالجداول والرسوم البيانية" },
];

const TESTS = [
  { icon: "📐", en: "Descriptive statistics: mean ± SD, frequency & percentage", ar: "إحصاء وصفي: متوسط ± انحراف معياري، تكرارات ونسب" },
  { icon: "⚖️", en: "Paired Sample T-Test for pre / post comparisons", ar: "اختبار T للعينات المزدوجة للمقارنة القبلية / البعدية" },
  { icon: "📈", en: "Level of significance set at p < 0.05", ar: "مستوى الدلالة الإحصائية: p < 0.05" },
];

export default function StatAnalysisSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المناهج — التحليل" : "Methods — Analysis"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}>
          {ar ? "خطة " : "Statistical "}<em>{ar ? "التحليل الإحصائي" : "Analysis Plan"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {PIPELINE.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            whileHover={{ scale: 1.01 }}
            style={{
              display: "flex", gap: 12, alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${step.color}30`,
              borderLeft: `4px solid ${step.color}`,
              borderRadius: 10, padding: "10px 14px",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: `${step.color}1a`, border: `1px solid ${step.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>
              {step.icon}
            </motion.div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                background: `${step.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 800, color: step.color,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "14px", color: "var(--c-text)", fontWeight: 500 }}>
                {ar ? step.ar : step.en}
              </span>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
          className="anim-border-glow"
          style={{
            background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.22)",
            borderRadius: 10, padding: "12px 15px", marginTop: "4px",
          }}
        >
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: 8 }}>
            📐 {ar ? "الاختبارات الإحصائية" : "Statistical Tests Used"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TESTS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 + i * 0.08 }}
                style={{ display: "flex", gap: 10, alignItems: "center" }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontSize: "13px", color: "var(--c-text-muted)" }}>{ar ? t.ar : t.en}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
