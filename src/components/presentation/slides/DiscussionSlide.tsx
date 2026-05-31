"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const COMPARISONS = [
  { topicEn: "Cardiovascular", topicAr: "القلب والأوعية", color: "var(--c-rose)",
    ourEn: "Significant ↑ in HR, SBP, DBP, RR, Temp (all p<0.001)", ourAr: "ارتفاع معنوي في HR، SBP، DBP، RR، الحرارة",
    litEn: "Consistent with Grasser 2014, Shah 2019", litAr: "متوافق مع Grasser 2014، Shah 2019" },
  { topicEn: "Cognitive Enhancement", topicAr: "التعزيز المعرفي", color: "var(--c-indigo)",
    ourEn: "↑ Mindfulness, working memory, processing speed", ourAr: "↑ اليقظة الذهنية، الذاكرة العاملة، سرعة المعالجة",
    litEn: "Consistent with Kennedy & Scholey 2004", litAr: "متوافق مع Kennedy & Scholey 2004" },
  { topicEn: "Attention", topicAr: "الانتباه والتركيز", color: "var(--c-amber)",
    ourEn: "Limited significant change in attention scores", ourAr: "تغيير معنوي محدود في درجات الانتباه",
    litEn: "Consistent with inverted-U arousal curve", litAr: "متوافق مع منحنى الاستثارة المقلوب-U" },
];

export default function DiscussionSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "المناقشة" : "Discussion"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>{ar ? "مقارنة مع " : "Comparison with "}<em>{ar ? "الأدبيات" : "Literature"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
        {COMPARISONS.map((c, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.13 }}
            whileHover={{ scale: 1.01 }}
            style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: "12px", alignItems: "center", padding: "12px 16px", borderLeft: `3px solid ${c.color}` }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-text)" }}>{ar ? c.topicAr : c.topicEn}</div>
            <div style={{ fontSize: "13px", color: "var(--c-text-muted)", lineHeight: 1.5 }}>{ar ? c.ourAr : c.ourEn}</div>
            <div style={{ fontSize: "13px", color: "#6ee7b7", lineHeight: 1.5 }}>✓ {ar ? c.litAr : c.litEn}</div>
          </motion.div>
        ))}

        <div className="pres-grid-2" style={{ gap: "8px", marginTop: "6px" }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            whileHover={{ scale: 1.02 }}
            style={{ padding: "10px 14px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#6ee7b7", letterSpacing: "1px", marginBottom: "4px" }}>✅ {ar ? "نقاط القوة" : "Strengths"}</div>
            <p style={{ fontSize: "13px", color: "var(--c-text-muted)" }}>
              {ar ? "أول دراسة إقليمية — تقييم مزدوج فسيولوجي ومعرفي — بيئة مُوحَّدة" : "First regional study · Dual physiological & cognitive assessment · Standardized conditions"}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.02 }}
            style={{ padding: "10px 14px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fcd34d", letterSpacing: "1px", marginBottom: "4px" }}>⚠️ {ar ? "القيود" : "Limitations"}</div>
            <div style={{ fontSize: "12px", color: "var(--c-text-muted)", display: "flex", flexDirection: "column", gap: "4px", lineHeight: 1.4 }}>
              <div>• {ar ? "حجم العينة الصغير نسبياً قد يحد من إمكانية تعميم النتائج." : "The relatively small sample size may limit the generalizability of the findings."}</div>
              <div>• {ar ? "قامت الدراسة بتقييم التأثيرات الفورية لاستهلاك مشروبات الطاقة فقط." : "The study assessed only the immediate effects of energy drink consumption."}</div>
              <div>• {ar ? "لم يتم تقييم النشاط الكهربائي للقلب؛ لذا تعذر تقييم التأثيرات الكهروفسيولوجية المرتبطة بالخفقان." : "Cardiac electrical activity was not evaluated; therefore, potential electrophysiological effects associated with palpitations could not be assessed."}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
