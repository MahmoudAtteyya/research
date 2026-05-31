"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const KEY_FINDINGS = [
  {
    icon: "❤️", color: "#f43f5e",
    en: "All 5 vital signs — statistically significant increases (p < 0.001)",
    ar: "جميع العلامات الحيوية الخمس — ارتفاعات ذات دلالة إحصائية (p < 0.001)",
    tagEn: "Cardiovascular", tagAr: "قلبي وعائي",
    stat: "p < 0.001",
  },
  {
    icon: "🧠", color: "#6366f1",
    en: "Significant improvements in working memory, mindfulness & processing speed",
    ar: "تحسّن ملحوظ في الذاكرة العاملة واليقظة الذهنية وسرعة المعالجة",
    tagEn: "Cognitive", tagAr: "معرفي",
    stat: "3/5 sig.",
  },
  {
    icon: "⚖️", color: "#8b5cf6",
    en: "Dual effect: transient cognitive enhancement + cardiovascular stimulation",
    ar: "تأثير مزدوج: تعزيز معرفي مؤقت + تحفيز قلبي وعائي",
    tagEn: "Dual Effect", tagAr: "تأثير مزدوج",
    stat: "Key finding",
  },
  {
    icon: "🌍", color: "#10b981",
    en: "First study documenting these effects in the Suez University population",
    ar: "أول دراسة توثّق هذه التأثيرات في مجتمع جامعة السويس",
    tagEn: "Novelty", tagAr: "أصالة",
    stat: "Novel",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } } };

export default function ConclusionSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            borderRadius: "10px", padding: "5px 12px",
            fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "الخلاصة" : "Conclusion"}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "ما " : "What We "}
          <span style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {ar ? "توصّلنا إليه" : "Found"}
          </span>
        </h2>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #8b5cf6, #6366f1)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }} />
      </motion.div>

      {/* ── Central statement ── */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.5 }}
        style={{
          marginBottom: "14px", flexShrink: 0,
          padding: "14px 22px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.07))",
          border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer top */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.7), transparent)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px", flexShrink: 0 }}>💬</span>
          <p style={{ fontSize: "14px", color: "var(--c-text)", lineHeight: 1.7, margin: 0, fontWeight: 500, fontStyle: "italic" }}>
            {ar
              ? "«تُنتج مشروبات الطاقة تأثيراً مزدوجاً: تعزيز معرفي مؤقت مع تحفيز قلبي وعائي قابل للقياس — مما يستوجب الاعتدال وتوعية صحية أوسع.»"
              : "\"Energy drinks produce a dual effect: temporary cognitive enhancement alongside measurable cardiovascular stimulation — necessitating moderation and broader health education.\""}
          </p>
        </div>
      </motion.div>

      {/* ── Key findings grid ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flex: 1, alignContent: "center" }}
      >
        {KEY_FINDINGS.map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.03, y: -3 }}
            style={{
              background: `linear-gradient(145deg, ${f.color}10, ${f.color}04)`,
              border: `1px solid ${f.color}28`,
              borderRadius: "14px",
              padding: "12px 14px",
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 4px 16px ${f.color}0a`,
            }}
          >
            {/* Accent corner */}
            <div style={{ position: "absolute", [ar ? "left" : "right"]: 0, top: 0, width: "50px", height: "50px", background: `radial-gradient(${f.color}15, transparent 70%)`, pointerEvents: "none" }} />

            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              style={{
                width: "40px", height: "40px", borderRadius: "12px", flexShrink: 0,
                background: `linear-gradient(135deg, ${f.color}28, ${f.color}0e)`,
                border: `1px solid ${f.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px",
              }}
            >
              {f.icon}
            </motion.div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                <span style={{
                  fontSize: "8.5px", fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase",
                  background: `${f.color}18`, border: `1px solid ${f.color}35`,
                  borderRadius: "20px", padding: "2px 7px", color: f.color,
                }}>
                  {ar ? f.tagAr : f.tagEn}
                </span>
                <span style={{
                  fontSize: "8.5px", fontWeight: 800,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px", padding: "2px 7px", color: "#94a3b8",
                }}>
                  {f.stat}
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--c-text)", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>
                {ar ? f.ar : f.en}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
