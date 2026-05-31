"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const RECS = [
  {
    icon: "📢",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.13)",
    titleEn: "Public Awareness",
    titleAr: "التوعية العامة",
    textEn: "Educational programs on physiological risks and safe consumption limits",
    textAr: "برامج توعوية بالمخاطر الفسيولوجية وحدود الاستهلاك الآمن",
    tagEn: "Community",
    tagAr: "مجتمع",
  },
  {
    icon: "⚖️",
    color: "#10b981",
    glow: "rgba(16,185,129,0.13)",
    titleEn: "Moderation",
    titleAr: "الاعتدال في الاستهلاك",
    textEn: "Avoid high doses; respect the 400 mg/day caffeine safety limit",
    textAr: "تجنّب الجرعات العالية؛ احترام حد الأمان 400 ملغ كافيين يومياً",
    tagEn: "Safety",
    tagAr: "سلامة",
  },
  {
    icon: "🩺",
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.13)",
    titleEn: "Clinical Practice",
    titleAr: "الممارسة السريرية",
    textEn: "Routinely ask about energy drink use in patients with cardiovascular risk",
    textAr: "الاستفسار الروتيني عن الاستهلاك لدى مرضى القلب والأوعية الدموية",
    tagEn: "Clinical",
    tagAr: "سريري",
  },
  {
    icon: "🎓",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.13)",
    titleEn: "University Policy",
    titleAr: "السياسات الجامعية",
    textEn: "Promote healthy alternatives: adequate sleep, balanced nutrition, exercise",
    textAr: "تعزيز البدائل الصحية: النوم الكافي والتغذية المتوازنة والرياضة",
    tagEn: "Policy",
    tagAr: "سياسة",
  },
  {
    icon: "🔬",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.13)",
    titleEn: "Future Research",
    titleAr: "البحث المستقبلي",
    textEn: "Larger RCTs, control groups, sex-stratified analysis, long-term follow-up",
    textAr: "تجارب عشوائية أكبر، مجموعات ضابطة، تحليل تبعاً للجنس، متابعة طويلة المدى",
    tagEn: "Research",
    tagAr: "بحث",
  },
];

export default function RecoSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "التوصيات" : "Recommendations"}</div>
        <h2 className="pres-h1">
          {ar ? "ماذا " : "What We "}
          <em>{ar ? "نُوصي به؟" : "Recommend"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Recommendation cards ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: 1,
          justifyContent: "center",
          direction: ar ? "rtl" : "ltr",
        }}
      >
        {RECS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.09, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.015, x: ar ? -4 : 4 }}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              padding: "11px 16px",
              background: r.glow,
              border: `1px solid ${r.color}40`,
              borderLeft: `3px solid ${r.color}`,
              borderRadius: "12px",
              boxShadow: `0 2px 12px ${r.glow}`,
            }}
          >
            {/* Icon box */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.25 }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: `${r.color}1a`,
                border: `1px solid ${r.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              {r.icon}
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-text)" }}>
                  {ar ? r.titleAr : r.titleEn}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: r.color,
                    background: `${r.color}18`,
                    border: `1px solid ${r.color}44`,
                    borderRadius: "5px",
                    padding: "1px 6px",
                  }}
                >
                  {ar ? r.tagAr : r.tagEn}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--c-text-muted)", lineHeight: 1.5, fontWeight: 430 }}>
                {ar ? r.textAr : r.textEn}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
