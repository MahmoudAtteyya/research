"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const COMPARISONS = [
  { topicEn: "Cardiovascular Stimulation", topicAr: "التحفيز القلبي الوعائي", color: "var(--c-rose)",
    ourEn: "Significant ↑ in HR, SBP, DBP, RR, Temp (all p<0.001)", ourAr: "ارتفاع معنوي في HR، SBP، DBP، RR، الحرارة (كل p<0.001)",
    litEn: "Consistent with Grasser et al. 2014, Shah et al. 2019", litAr: "متوافق مع Grasser et al. 2014، Shah et al. 2019" },
  { topicEn: "Cognitive Enhancement",      topicAr: "التعزيز المعرفي",         color: "var(--c-indigo)",
    ourEn: "↑ Mindfulness, working memory, processing speed",       ourAr: "↑ اليقظة الذهنية، الذاكرة العاملة، سرعة المعالجة",
    litEn: "Consistent with Kennedy & Scholey 2004, Haskell et al.", litAr: "متوافق مع Kennedy & Scholey 2004، Haskell et al." },
  { topicEn: "Attention / Concentration",  topicAr: "الانتباه والتركيز",        color: "var(--c-amber)",
    ourEn: "Limited significant change in attention scores",         ourAr: "تغيير معنوي محدود في درجات الانتباه",
    litEn: "Consistent with inverted-U arousal curve (Einother)", litAr: "متوافق مع منحنى الاستثارة المقلوب-U (Einother)" },
];

export default function DiscussionSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المناقشة" : "Discussion"}</div>
        <h2 className="pres-h1">{ar ? "مقارنة مع " : "Comparison with "}<em>{ar ? "الأدبيات" : "Literature"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Header row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "6px", padding: "0 0 0 120px" }}>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-text-dim)" }}>
          {ar ? "نتائجنا" : "Our Findings"}
        </div>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--c-text-dim)" }}>
          {ar ? "الأدبيات السابقة" : "Previous Literature"}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {COMPARISONS.map((c, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.13 }}
            style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: "14px", alignItems: "center", padding: "14px 18px", borderLeft: `3px solid ${c.color}` }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-text)" }}>{ar ? c.topicAr : c.topicEn}</div>
            <div style={{ fontSize: "12px", color: "var(--c-text-muted)", lineHeight: 1.5 }}>{ar ? c.ourAr : c.ourEn}</div>
            <div style={{ fontSize: "12px", color: "#6ee7b7", lineHeight: 1.5 }}>✓ {ar ? c.litAr : c.litEn}</div>
          </motion.div>
        ))}
      </div>

      {/* Strengths + Limitations */}
      <div className="pres-grid-2" style={{ gap: "10px", marginTop: "12px" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
          style={{ padding: "10px 14px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#6ee7b7", letterSpacing: "1px", marginBottom: "5px" }}>✅ {ar ? "نقاط القوة" : "Strengths"}</div>
          <p style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
            {ar ? "أول دراسة إقليمية — تقييم مزدوج فسيولوجي ومعرفي — بيئة مُوحَّدة" : "First regional study · Dual physiological & cognitive assessment · Standardized conditions"}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ padding: "10px 14px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px" }}>
          <div style={{ fontSize: "10px", fontWeight: 700, color: "#fcd34d", letterSpacing: "1px", marginBottom: "5px" }}>⚠️ {ar ? "القيود" : "Limitations"}</div>
          <p style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
            {ar ? "حجم عينة محدود — غياب مجموعة ضابطة — متابعة قصيرة المدى" : "Limited sample size · No control group · Short-term follow-up"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
