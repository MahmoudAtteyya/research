"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const KEY_FINDINGS = [
  {
    icon: "❤️",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.14)",
    en: "All 5 vital signs — statistically significant increases (p < 0.001)",
    ar: "جميع العلامات الحيوية الخمس — ارتفاعات ذات دلالة إحصائية (p < 0.001)",
    tagEn: "Cardiovascular",
    tagAr: "قلبي وعائي",
  },
  {
    icon: "🧠",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.14)",
    en: "Significant improvements in working memory, mindfulness & processing speed",
    ar: "تحسّن ملحوظ في الذاكرة العاملة واليقظة الذهنية وسرعة المعالجة",
    tagEn: "Cognitive",
    tagAr: "معرفي",
  },
  {
    icon: "⚖️",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.14)",
    en: "Dual effect: transient cognitive enhancement + cardiovascular stimulation",
    ar: "تأثير مزدوج: تعزيز معرفي مؤقت + تحفيز قلبي وعائي",
    tagEn: "Dual Effect",
    tagAr: "تأثير مزدوج",
  },
  {
    icon: "🌍",
    color: "#10b981",
    glow: "rgba(16,185,129,0.14)",
    en: "First study documenting these effects in the Suez University population",
    ar: "أول دراسة توثّق هذه التأثيرات في مجتمع جامعة السويس",
    tagEn: "Novelty",
    tagAr: "أصالة",
  },
];

export default function ConclusionSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الخلاصة" : "Conclusion"}</div>
        <h2 className="pres-h1">
          {ar ? "ما " : "What We "}
          <em>{ar ? "توصّلنا إليه" : "Found"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Central statement ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.14, type: "spring", stiffness: 110 }}
        className="anim-border-glow"
        style={{
          marginBottom: "14px",
          padding: "16px 24px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.07) 100%)",
          border: "1px solid rgba(99,102,241,0.32)",
          borderRadius: "16px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative shimmer line */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)",
          borderRadius: "1px",
        }} />
        <p style={{ fontSize: "15px", color: "var(--c-text)", lineHeight: 1.7, margin: 0, fontWeight: 500, fontStyle: "italic" }}>
          {ar
            ? "«تُنتج مشروبات الطاقة تأثيراً مزدوجاً: تعزيز معرفي مؤقت مع تحفيز قلبي وعائي قابل للقياس — مما يستوجب الاعتدال وتوعية صحية أوسع.»"
            : "\"Energy drinks produce a dual effect: temporary cognitive enhancement alongside measurable cardiovascular stimulation — necessitating moderation and broader health education.\""}
        </p>
      </motion.div>

      {/* ── Key findings grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", flex: 1, alignContent: "center" }}>
        {KEY_FINDINGS.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 + i * 0.09, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.025, y: -2 }}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              padding: "12px 14px",
              background: f.glow,
              border: `1px solid ${f.color}44`,
              borderLeft: `3px solid ${f.color}`,
              borderRadius: "12px",
              boxShadow: `0 3px 14px ${f.glow}`,
            }}
          >
            <motion.span
              style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            >
              {f.icon}
            </motion.span>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "9px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: f.color,
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}44`,
                  borderRadius: "6px",
                  padding: "1px 7px",
                  marginBottom: "5px",
                }}
              >
                {ar ? f.tagAr : f.tagEn}
              </span>
              <p style={{ fontSize: "12.5px", color: "var(--c-text-muted)", lineHeight: 1.55, margin: 0, fontWeight: 450 }}>
                {ar ? f.ar : f.en}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
