"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const PIPELINE = [
  { icon: "📋", color: "#6366f1", en: "Data was collected, coded and entered into the computer", ar: "تم جمع البيانات وترميزها وإدخالها إلى الحاسوب" },
  { icon: "💻", color: "#8b5cf6", en: "SPSS version 26 (IBM) was used for statistical data analysis", ar: "تم استخدام برنامج SPSS الإصدار 26 (IBM) لتحليل البيانات إحصائياً" },
  { icon: "📊", color: "#06b6d4", en: "Data was analyzed and presented using tables and graphs", ar: "تم تحليل البيانات وعرضها باستخدام الجداول والرسوم البيانية" },
];

const TESTS = [
  { icon: "📐", en: "Descriptive statistics: mean ± SD, frequency & percentage", ar: "إحصاء وصفي: متوسط ± انحراف معياري، تكرارات ونسب مئوية" },
  { icon: "⚖️", en: "Paired Sample T-Test for pre / post comparisons", ar: "اختبار T للعينات المزدوجة للمقارنة القبلية / البعدية" },
  { icon: "📈", en: "Level of significance set at p < 0.05", ar: "مستوى الدلالة الإحصائية: p < 0.05" },
];

export default function StatAnalysisSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 12 }}>
        <div className="pres-label">{ar ? "المناهج — التحليل" : "Methods — Analysis"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}>
          {ar ? "خطة " : "Statistical "}<em>{ar ? "التحليل الإحصائي" : "Analysis Plan"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Pipeline — 3 steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 11 }}>
        {PIPELINE.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            style={{
              display: "flex", gap: 12, alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${step.color}30`,
              borderLeft: `4px solid ${step.color}`,
              borderRadius: 10, padding: "11px 16px",
            }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: `${step.color}1a`, border: `1px solid ${step.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17,
            }}>
              {step.icon}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1 }}>
              <div style={{
                width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                background: `${step.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: 800, color: step.color,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "13.5px", color: "var(--c-text)", fontWeight: 500 }}>
                {ar ? step.ar : step.en}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Statistical Tests box */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
        style={{
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.22)",
          borderRadius: 10, padding: "11px 15px",
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: 8 }}>
          📐 {ar ? "الاختبارات الإحصائية المستخدمة" : "Statistical Tests Used"}
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
  );
}
