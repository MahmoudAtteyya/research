"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

/* ─── Data ──────────────────────────────────────────────────────── */
const TOOLS = [
  {
    icon: "📋",
    titleEn: "Structured Questionnaire",
    titleAr: "الاستبيان المنظّم",
    colorVar: "var(--c-indigo)",
    glowColor: "rgba(99,102,241,0.18)",
    borderColor: "#6366f1",
    items: [
      { en: "Demographic data (age, sex, occupation, smoking)", ar: "بيانات ديموغرافية (عمر، جنس، مهنة، تدخين)" },
      { en: "Medical history & current medications", ar: "التاريخ الطبي والأدوية الحالية" },
      { en: "Energy drink & caffeine consumption patterns", ar: "أنماط استهلاك مشروبات الطاقة والكافيين" }
    ],
  },
  {
    icon: "🩺",
    titleEn: "Vital Signs Measurement",
    titleAr: "قياس العلامات الحيوية",
    colorVar: "var(--c-rose)",
    glowColor: "rgba(244,63,94,0.18)",
    borderColor: "#f43f5e",
    items: [
      { en: "Blood pressure — mercury sphygmomanometer", ar: "ضغط الدم — جهاز ضغط الزئبق" },
      { en: "Heart rate — pulse monitoring", ar: "معدل ضربات القلب — رصد النبض" },
      { en: "Respiratory rate — direct observation", ar: "معدل التنفس — الملاحظة المباشرة" },
      { en: "Body temperature — mercury thermometer", ar: "درجة حرارة الجسم — ميزان حرارة زئبقي" },
    ],
    note: { en: "Measured pre- & post-consumption", ar: "قياسات قبل وبعد الاستهلاك" },
  },
  {
    icon: "🧠",
    titleEn: "Cognitive Assessment",
    titleAr: "التقييم المعرفي",
    colorVar: "var(--c-emerald)",
    glowColor: "rgba(16,185,129,0.18)",
    borderColor: "#10b981",
    items: [
      { en: "Mindfulness Scale — awareness & attention", ar: "مقياس اليقظة الذهنية — الوعي والانتباه" },
      { en: "Digit Span Test — working memory", ar: "اختبار امتداد الأرقام — الذاكرة العاملة" },
      { en: "Processing Speed Index", ar: "مؤشر سرعة المعالجة" },
      { en: "Quiet, distraction-free environment", ar: "بيئة هادئة خالية من المشتتات" },
    ],
    note: { en: "Standardized conditions, pre- & post-", ar: "شروط موحّدة، قبل وبعد" },
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export default function DataToolsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 3 / 3</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(20px, 2.8vw, 32px)" }}>
          {ar ? "أدوات " : "Data Collection "}
          <em>{ar ? "جمع البيانات" : "Tools"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "14px",
          flex: 1,
          alignContent: "center",
          direction: ar ? "rtl" : "ltr",
        }}
      >
        {TOOLS.map((tool, i) => (
          <motion.div
            key={i}
            className="pres-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.12, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.025, y: -3 }}
            style={{
              borderTop: `3px solid ${tool.borderColor}`,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: `0 4px 24px ${tool.glowColor}`,
            }}
          >
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <motion.span
                style={{ fontSize: "24px" }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.3 }}
              >
                {tool.icon}
              </motion.span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: tool.colorVar,
                  letterSpacing: "0.2px",
                  lineHeight: 1.3,
                }}
              >
                {ar ? tool.titleAr : tool.titleEn}
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background: `linear-gradient(90deg, ${tool.borderColor}55, transparent)`,
              }}
            />

            {/* Items */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
              {tool.items.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: ar ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 + j * 0.06 }}
                  style={{ display: "flex", gap: "7px", alignItems: "flex-start" }}
                >
                  <span style={{ color: tool.borderColor, fontSize: "10px", marginTop: "4px", flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: "11.5px", color: "var(--c-text-muted)", lineHeight: 1.5 }}>
                    {ar ? item.ar : item.en}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Optional note badge */}
            {tool.note && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.12 }}
                style={{
                  marginTop: "auto",
                  background: `${tool.borderColor}18`,
                  border: `1px solid ${tool.borderColor}44`,
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "10.5px",
                  color: tool.colorVar,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                🔄 {ar ? tool.note.ar : tool.note.en}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom info strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "var(--c-text-muted)",
          marginTop: "6px",
          letterSpacing: "0.3px",
        }}
      >
        {ar
          ? "جُمعت البيانات بواسطة فريق البحث من جميع المشاركين • تقييمات منظمة وفيزيولوجية ومعرفية مدمجة"
          : "Data collected by the research team from all participants • Structured, physiological & cognitive assessments combined"}
      </motion.div>
    </div>
  );
}
