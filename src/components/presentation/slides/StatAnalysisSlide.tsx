"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const PIPELINE = [
  { icon: "📋", color: "#6366f1", step: "01", en: "Data collected, coded and entered into the computer", ar: "تم جمع البيانات وترميزها وإدخالها إلى الحاسوب", badge: "Collection", badgeAr: "جمع البيانات" },
  { icon: "💻", color: "#8b5cf6", step: "02", en: "SPSS version 26 (IBM) used for statistical analysis", ar: "تم استخدام SPSS 26 (IBM) لتحليل البيانات إحصائياً", badge: "Analysis Tool", badgeAr: "أداة التحليل" },
  { icon: "📊", color: "#06b6d4", step: "03", en: "Data analyzed and presented using tables and graphs", ar: "تم تحليل البيانات وعرضها بالجداول والرسوم البيانية", badge: "Presentation", badgeAr: "عرض النتائج" },
];

const TESTS = [
  { icon: "Σ", color: "#6366f1", en: "Descriptive statistics — Mean ± SD, frequency & percentage", ar: "إحصاء وصفي: متوسط ± انحراف معياري، تكرارات ونسب" },
  { icon: "T", color: "#10b981", en: "Paired Sample T-Test for pre / post comparisons", ar: "اختبار T للعينات المزدوجة للمقارنة القبلية / البعدية" },
  { icon: "P", color: "#f43f5e", en: "Level of significance set at p < 0.05", ar: "مستوى الدلالة الإحصائية: p < 0.05" },
];

export default function StatAnalysisSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: "10px", padding: "5px 12px",
            fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "المناهج — التحليل" : "Methods — Analysis"}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "خطة " : "Statistical "}
          <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {ar ? "التحليل الإحصائي" : "Analysis Plan"}
          </span>
        </h2>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", flex: 1, minHeight: 0 }}>

        {/* Left: Pipeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
          <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "2px", color: "#94a3b8", textTransform: "uppercase", marginBottom: "4px" }}>
            {ar ? "مراحل التحليل" : "Analysis Pipeline"}
          </div>
          {PIPELINE.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: ar ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              whileHover={{ scale: 1.02, x: ar ? -4 : 4 }}
              style={{
                background: `linear-gradient(135deg, ${step.color}10, ${step.color}04)`,
                border: `1px solid ${step.color}25`,
                borderRadius: "14px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Step number */}
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                background: `linear-gradient(135deg, ${step.color}, ${step.color}99)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px", fontWeight: 900, color: "#fff",
                boxShadow: `0 4px 14px ${step.color}44`,
              }}>
                {step.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <span style={{ fontSize: "9px", fontWeight: 800, color: step.color, letterSpacing: "1px" }}>
                    {step.step}
                  </span>
                  <span style={{
                    fontSize: "9px", fontWeight: 800, letterSpacing: "0.6px",
                    background: `${step.color}18`, border: `1px solid ${step.color}35`,
                    borderRadius: "20px", padding: "1px 7px", color: step.color,
                    textTransform: "uppercase",
                  }}>
                    {ar ? step.badgeAr : step.badge}
                  </span>
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--c-text)", fontWeight: 500, lineHeight: 1.4 }}>
                  {ar ? step.ar : step.en}
                </div>
              </div>

              {/* Connector line */}
              {i < PIPELINE.length - 1 && (
                <div style={{
                  position: "absolute",
                  bottom: "-11px", left: "50%", transform: "translateX(-50%)",
                  width: "2px", height: "12px",
                  background: `linear-gradient(to bottom, ${step.color}60, transparent)`,
                  zIndex: 2,
                }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Right: Statistical Tests */}
        <motion.div
          initial={{ opacity: 0, x: ar ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}
        >
          <div style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "2px", color: "#94a3b8", textTransform: "uppercase", marginBottom: "4px" }}>
            {ar ? "الاختبارات الإحصائية" : "Statistical Tests"}
          </div>

          {TESTS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              whileHover={{ scale: 1.025, y: -2 }}
              style={{
                background: `linear-gradient(135deg, ${t.color}12, ${t.color}04)`,
                border: `1px solid ${t.color}25`,
                borderRadius: "14px",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flex: 1,
              }}
            >
              {/* Math symbol badge */}
              <div style={{
                width: "44px", height: "44px", borderRadius: "12px", flexShrink: 0,
                background: `linear-gradient(135deg, ${t.color}22, ${t.color}0a)`,
                border: `1px solid ${t.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px", fontWeight: 900, color: t.color,
                fontFamily: "Georgia, serif",
                boxShadow: `0 4px 14px ${t.color}20`,
              }}>
                {t.icon}
              </div>
              <div style={{ flex: 1, fontSize: "13px", color: "var(--c-text)", fontWeight: 500, lineHeight: 1.45 }}>
                {ar ? t.ar : t.en}
              </div>
            </motion.div>
          ))}

          {/* SPSS badge */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.04))",
              border: "1px solid rgba(6,182,212,0.25)",
              borderRadius: "12px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div style={{
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              borderRadius: "8px", padding: "6px 10px",
              fontSize: "13px", fontWeight: 900, color: "#fff",
              letterSpacing: "-0.5px",
            }}>
              SPSS
            </div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 800, color: "#06b6d4" }}>IBM SPSS Statistics</div>
              <div style={{ fontSize: "10px", color: "var(--c-text-muted)", marginTop: "1px" }}>Version 26 — {ar ? "تحليل إحصائي متقدم" : "Advanced Statistical Analysis"}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
