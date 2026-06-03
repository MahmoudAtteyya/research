"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const OBJECTIVES = [
  {
    en: "Measure changes in vital signs (BP, HR, RR, Temp) before and after consumption",
    ar: "قياس تغيرات العلامات الحيوية (ضغط الدم، معدل القلب، التنفس، الحرارة) قبل الاستهلاك وبعده",
    icon: "❤️",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.15)",
    tag: "Physiological",
    tagAr: "فسيولوجي",
  },
  {
    en: "Assess the effect on attention, mindfulness and alertness levels",
    ar: "تقييم التأثير على الانتباه واليقظة الذهنية ومستويات التيقظ",
    icon: "🧠",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.15)",
    tag: "Cognitive",
    tagAr: "معرفي",
  },
  {
    en: "Evaluate changes in short-term and working memory performance",
    ar: "تقييم التغيرات في أداء الذاكرة قصيرة المدى والذاكرة العاملة",
    icon: "📝",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    tag: "Memory",
    tagAr: "ذاكرة",
  },
  {
    en: "Assess cognitive flexibility and information processing speed",
    ar: "تقييم المرونة المعرفية وسرعة معالجة المعلومات",
    icon: "⚡",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
    tag: "Processing",
    tagAr: "معالجة",
  },
];

export default function AimSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الهدف والأهداف" : "Aim & Objectives"}</div>
        <h2 className="pres-h1">
          {ar ? "لماذا هذه " : "Why this "}
          <em>{ar ? "الدراسة؟" : "Study?"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Primary aim ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 110 }}
        className="anim-border-glow"
        style={{
          marginBottom: "16px",
          padding: "18px 24px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.07) 100%)",
          border: "1px solid rgba(99,102,241,0.3)",
          borderLeft: "6px solid var(--c-indigo)",
          borderRadius: "16px",
          display: "flex",
          gap: "18px",
          alignItems: "center",
        }}
      >
        <motion.span
          style={{ fontSize: "clamp(32px, 4.5vw, 60px)", flexShrink: 0 }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          🎯
        </motion.span>
        <div>
          <div style={{ fontSize: "clamp(12px, 1.8vw, 20px)", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: "6px" }}>
            {ar ? "الهدف الرئيسي" : "Primary Aim"}
          </div>
          <p style={{ fontSize: "clamp(16px, 2.2vw, 28px)", color: "var(--c-text)", lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
            {ar
              ? " تقييم التأثيرات الحادة لاستهلاك مشروبات الطاقة على المؤشرات الفسيولوجية والأداء المعرفي لدى البالغين في جامعة السويس ومستشفى جامعة السويس."
              : "Evaluate the acute effects of energy drink consumption on physiological parameters and cognitive performance in healthy adults at Suez University and Suez University Hospital."}
          </p>
        </div>
      </motion.div>

      {/* ── Secondary objectives label ── */}
      <div style={{ fontSize: "clamp(12px, 1.8vw, 20px)", letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--c-text-dim)", marginBottom: "12px", fontWeight: 700 }}>
        {ar ? "الأهداف الفرعية" : "Secondary Objectives"}
      </div>

      {/* ── Objective cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", flex: 1, alignContent: "center" }}>
        {OBJECTIVES.map((obj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 + i * 0.09, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.025, y: -2 }}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              padding: "16px 20px",
              background: obj.glow,
              border: `1px solid ${obj.color}44`,
              borderLeft: `4px solid ${obj.color}`,
              borderRadius: "16px",
              boxShadow: `0 6px 24px ${obj.glow}`,
            }}
          >
            <motion.span
              style={{ fontSize: "clamp(24px, 3.5vw, 50px)", flexShrink: 0, marginTop: "2px" }}
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
            >
              {obj.icon}
            </motion.span>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "clamp(10px, 1.4vw, 16px)",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: obj.color,
                  background: `${obj.color}18`,
                  border: `1px solid ${obj.color}44`,
                  borderRadius: "8px",
                  padding: "2px 10px",
                  marginBottom: "6px",
                }}
              >
                {ar ? obj.tagAr : obj.tag}
              </span>
              <p style={{ fontSize: "clamp(14px, 1.8vw, 20px)", color: "var(--c-text-muted)", lineHeight: 1.45, margin: 0, fontWeight: 500 }}>
                {ar ? obj.ar : obj.en}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
