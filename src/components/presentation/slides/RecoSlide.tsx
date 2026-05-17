"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const RECS = [
  { icon: "📢", color: "var(--c-indigo)",  titleEn: "Public Awareness",   titleAr: "التوعية العامة",      textEn: "Educational programs on physiological risks and safe limits", textAr: "برامج توعوية بالمخاطر الفسيولوجية وحدود الاستهلاك الآمن" },
  { icon: "⚖️", color: "var(--c-emerald)", titleEn: "Moderation",         titleAr: "الاعتدال",            textEn: "Avoid high doses; respect the 400 mg/day caffeine limit", textAr: "تجنّب الجرعات العالية؛ احترام حد 400 ملغ كافيين/يوم" },
  { icon: "🩺", color: "var(--c-rose)",    titleEn: "Clinical Practice",  titleAr: "الممارسة السريرية",  textEn: "Ask about ED use in patients with cardiovascular risk", textAr: "الاستفسار عن الاستهلاك في مرضى القلب" },
  { icon: "🎓", color: "var(--c-amber)",   titleEn: "University Policy",  titleAr: "السياسات الجامعية",  textEn: "Promote healthy alternatives: sleep, nutrition, exercise", textAr: "تعزيز البدائل الصحية: النوم والتغذية والرياضة" },
  { icon: "🔬", color: "var(--c-violet)",  titleEn: "Future Research",    titleAr: "البحث المستقبلي",    textEn: "Larger samples, control groups, long-term follow-up", textAr: "عينات أكبر، مجموعات ضابطة، متابعة طويلة المدى" },
];

export default function RecoSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "التوصيات" : "Recommendations"}</div>
        <h2 className="pres-h1">{ar ? "ماذا " : "What We "}<em>{ar ? "نُوصي؟" : "Recommend"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "7px", flex: 1, justifyContent: "center" }}>
        {RECS.map((r, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.015, x: ar ? -4 : 4 }}
            style={{ display: "flex", gap: "14px", alignItems: "center", padding: "10px 16px", borderLeft: `3px solid ${r.color}` }}
          >
            <motion.span
              style={{ fontSize: "22px", flexShrink: 0 }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
            >{r.icon}</motion.span>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text)", marginBottom: "2px" }}>{ar ? r.titleAr : r.titleEn}</div>
              <div style={{ fontSize: "13px", color: "var(--c-text-muted)" }}>{ar ? r.textAr : r.textEn}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
