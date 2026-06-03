"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

/* ─── Data ──────────────────────────────────────────────────────── */
type TableRow = { colAEn: string; colAAr: string; colBEn: string; colBAr: string };

const TOOLS = [
  {
    icon: "📋",
    titleEn: "Structured Questionnaire",
    titleAr: "الاستبيان المنظّم",
    colorVar: "var(--c-indigo)",
    glowColor: "rgba(99,102,241,0.18)",
    borderColor: "#6366f1",
    colAHeaderEn: "Category", colAHeaderAr: "الفئة",
    colBHeaderEn: "Data Collected", colBHeaderAr: "البيانات المجمّعة",
    table: [
      { colAEn: "Demographics",       colAAr: "ديموغرافيا",        colBEn: "Age, sex, occupation, smoking",        colBAr: "العمر، الجنس، المهنة، التدخين" },
      { colAEn: "Medical History",    colAAr: "التاريخ الطبي",    colBEn: "History & current medications",        colBAr: "التاريخ الطبي والأدوية الحالية" },
      { colAEn: "ED Consumption",     colAAr: "استهلاك مشروبات الطاقة", colBEn: "Frequency, patterns & caffeine",  colBAr: "التكرار والأنماط والكافيين" },
    ],
  },
  {
    icon: "🩺",
    titleEn: "Vital Signs Measurement",
    titleAr: "قياس العلامات الحيوية",
    colorVar: "var(--c-rose)",
    glowColor: "rgba(244,63,94,0.18)",
    borderColor: "#f43f5e",
    colAHeaderEn: "Parameter", colAHeaderAr: "المعلمة",
    colBHeaderEn: "Instrument", colBHeaderAr: "الأداة",
    table: [
      { colAEn: "Blood Pressure",    colAAr: "ضغط الدم",        colBEn: "Mercury Sphygmomanometer",     colBAr: "جهاز ضغط الزئبق" },
      { colAEn: "Heart Rate",        colAAr: "معدل القلب",      colBEn: "Pulse Monitoring",             colBAr: "رصد النبض" },
      { colAEn: "Respiratory Rate",  colAAr: "معدل التنفس",     colBEn: "Direct Observation",           colBAr: "الملاحظة المباشرة" },
      { colAEn: "Body Temperature",  colAAr: "درجة الحرارة",    colBEn: "Mercury Thermometer",          colBAr: "ميزان حرارة زئبقي" },
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
    colAHeaderEn: "Domain", colAHeaderAr: "المجال",
    colBHeaderEn: "Tool", colBHeaderAr: "الأداة",
    table: [
      { colAEn: "Mindfulness",                              colAAr: "اليقظة الذهنية",           colBEn: "Mindfulness Scale",                     colBAr: "مقياس اليقظة الذهنية" },
      { colAEn: "Short-term Memory & Processing Speed",    colAAr: "ذاكرة قصيرة وسرعة معالجة", colBEn: "Working Memory Cognitive Test Battery",  colBAr: "بطارية اختبار الذاكرة العاملة" },
      { colAEn: "Attention",                               colAAr: "الانتباه",                  colBEn: "Digit Span Test",                       colBAr: "اختبار امتداد الأرقام" },
      { colAEn: "Concentration",                           colAAr: "التركيز",                   colBEn: "Digit Subtraction Test",                colBAr: "اختبار طرح الأرقام" },
    ],
    note: { en: "Standardized conditions, pre- & post-", ar: "شروط موحّدة، قبل وبعد" },
  },
];

/* ─── Reusable MiniTable ─────────────────────────────────────────── */
function MiniTable({
  tool, i, ar,
}: {
  tool: typeof TOOLS[0]; i: number; ar: boolean;
}) {
  const colAHeaderEn = tool.colAHeaderEn;
  const colAHeaderAr = tool.colAHeaderAr;
  const colBHeaderEn = tool.colBHeaderEn;
  const colBHeaderAr = tool.colBHeaderAr;
  const rows = tool.table as TableRow[];
  const color = tool.borderColor;
  const colorVar = tool.colorVar;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
      {/* Header row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "6px",
        padding: "5px 8px",
        background: `${color}22`,
        borderRadius: "7px",
      }}>
        <span style={{ fontSize: "clamp(9px, 1.2vw, 15px)", fontWeight: 800, color, letterSpacing: "1px", textTransform: "uppercase" }}>
          {ar ? colAHeaderAr : colAHeaderEn}
        </span>
        <span style={{ fontSize: "clamp(9px, 1.2vw, 15px)", fontWeight: 800, color, letterSpacing: "1px", textTransform: "uppercase" }}>
          {ar ? colBHeaderAr : colBHeaderEn}
        </span>
      </div>
      {/* Data rows */}
      {rows.map((row, j) => (
        <motion.div
          key={j}
          initial={{ opacity: 0, x: ar ? 8 : -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28 + i * 0.12 + j * 0.065 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "6px",
            padding: "6px 8px",
            borderRadius: "7px",
            background: j % 2 === 0 ? `${color}09` : "transparent",
            border: `1px solid ${j % 2 === 0 ? color + "1e" : "transparent"}`,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: color, flexShrink: 0, display: "inline-block",
            }} />
            <span style={{ fontSize: "clamp(11px, 1.5vw, 20px)", fontWeight: 600, color: "var(--c-text)", lineHeight: 1.3 }}>
              {ar ? row.colAAr : row.colAEn}
            </span>
          </div>
          <span style={{
            fontSize: "clamp(11px, 1.5vw, 20px)", fontWeight: 700,
            color: colorVar, lineHeight: 1.3, fontStyle: "italic",
          }}>
            {ar ? row.colBAr : row.colBEn}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function DataToolsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 4 / 4</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(20px, 3.1vw, 38px)" }}>
          {ar ? "أدوات " : "Data Collection "}
          <em>{ar ? "جمع البيانات" : "Tools"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* Cards stack */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
          flex: 1,
          minHeight: 0,
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
            whileHover={{ scale: 1.02, y: -3 }}
            style={{
              borderTop: `3px solid ${tool.borderColor}`,
              padding: "12px 14px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: `0 6px 28px ${tool.glowColor}`,
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <motion.span
                style={{ fontSize: "clamp(20px, 3.5vw, 42px)" }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.3 }}
              >
                {tool.icon}
              </motion.span>
              <span style={{
                fontSize: "clamp(13px, 1.8vw, 24px)",
                fontWeight: 800,
                color: tool.colorVar,
                letterSpacing: "0.2px",
                lineHeight: 1.3,
              }}>
                {ar ? tool.titleAr : tool.titleEn}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${tool.borderColor}55, transparent)`, flexShrink: 0 }} />

            {/* Unified MiniTable for all three cards */}
            <MiniTable tool={tool} i={i} ar={ar} />

            {/* Optional note badge */}
            {"note" in tool && tool.note && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 + i * 0.12 }}
                style={{
                  flexShrink: 0,
                  background: `${tool.borderColor}18`,
                  border: `1px solid ${tool.borderColor}44`,
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "clamp(12px, 1.6vw, 20px)",
                  color: tool.colorVar,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                🔄 {ar ? (tool.note as { en: string; ar: string }).ar : (tool.note as { en: string; ar: string }).en}
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
          fontSize: "clamp(11px, 1.5vw, 20px)",
          color: "var(--c-text-muted)",
          marginTop: "6px",
          letterSpacing: "0.3px",
          flexShrink: 0,
        }}
      >
        {ar
          ? "جُمعت البيانات بواسطة فريق البحث من جميع المشاركين • تقييمات منظمة وفيزيولوجية ومعرفية مدمجة"
          : "Data collected by the research team from all participants • Structured, physiological & cognitive assessments combined"}
      </motion.div>
    </div>
  );
}
