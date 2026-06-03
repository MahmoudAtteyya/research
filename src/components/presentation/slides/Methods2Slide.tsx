"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

/* ─── Criteria data (from source document) ─────────────────────── */
const INCLUSION: { en: string; ar: string }[] = [
  {
    en: "Healthy adults aged 18–45 years",
    ar: "بالغون أصحاء تتراوح أعمارهم بين 18 و45 سنة",
  },
  {
    en: "Both males and females",
    ar: "ذكور وإناث",
  },
  {
    en: "Willing to participate and provide informed consent",
    ar: "الرغبة في المشاركة وتقديم الموافقة المستنيرة",
  },
  {
    en: "Not currently on any medications affecting cardiovascular or cognitive functions",
    ar: "عدم تناول أدوية تؤثر على وظائف القلب أو الإدراك",
  },
  {
    en: "No history of chronic diseases (e.g., cardiovascular, neurological, metabolic disorders)",
    ar: "لا يوجد تاريخ لأمراض مزمنة (قلبية وعائية، عصبية، استقلابية)",
  },
];

const EXCLUSION: { en: string; ar: string }[] = [
  {
    en: "Known cardiovascular diseases (e.g., hypertension, arrhythmias)",
    ar: "أمراض قلبية وعائية معروفة (ارتفاع الضغط، اضطراب النظم)",
  },
  {
    en: "History of neurological or psychiatric disorders",
    ar: "تاريخ من الاضطرابات العصبية أو النفسية",
  },
  {
    en: "Regular use of caffeine or stimulant medications in high doses",
    ar: "الاستخدام المنتظم للكافيين أو المنبهات بجرعات عالية",
  },
  {
    en: "Pregnant or breastfeeding females",
    ar: "الإناث الحوامل أو المرضعات",
  },
  {
    en: "Known hypersensitivity to caffeine or energy drink components",
    ar: "فرط حساسية معروف للكافيين أو مكوّنات مشروبات الطاقة",
  },
];

/* ─── Reusable criteria list ────────────────────────────────────── */
function CriteriaList({
  items,
  color,
  markerBg,
  ar,
  delay,
}: {
  items: { en: string; ar: string }[];
  color: string;
  markerBg: string;
  ar: boolean;
  delay: number;
}) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: ar ? 14 : -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + i * 0.07 }}
          style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}
        >
          {/* Numbered marker */}
          <span
            style={{
              minWidth: "22px",
              height: "22px",
              borderRadius: "50%",
              background: markerBg,
              border: `1.5px solid ${color}88`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(12px, 1.7vw, 20px)",
              color: color,
              fontWeight: 800,
              flexShrink: 0,
              marginTop: "1px",
            }}
          >
            {i + 1}
          </span>
          <span style={{ fontSize: "clamp(14px, 1.9vw, 24px)", color: "var(--c-text)", lineHeight: 1.6, fontWeight: 430 }}>
            {ar ? item.ar : item.en}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

/* ─── Main component ────────────────────────────────────────────── */
export default function Methods2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner">
      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "الطرق" : "Methods"} · 2 / 4</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(20px, 3.1vw, 38px)" }}>
          {ar ? "معايير " : "Eligibility "}
          <em>{ar ? "الاختيار" : "Criteria"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      {/* ── Two columns ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
          flex: 1,
          alignContent: "center",
          direction: ar ? "rtl" : "ltr",
        }}
      >
        {/* ── INCLUSION ── */}
        <motion.div
          initial={{ opacity: 0, x: ar ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 110 }}
          whileHover={{ scale: 1.015 }}
          style={{
            background: "linear-gradient(160deg, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.04) 100%)",
            border: "1px solid rgba(16,185,129,0.28)",
            borderTop: "3px solid #10b981",
            borderRadius: "16px",
            padding: "clamp(14px, 2vh, 30px) clamp(14px, 2vw, 24px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px, 1.5vh, 20px)",
            boxShadow: "0 6px 28px rgba(16,185,129,0.12)",
          }}
        >
          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <motion.span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(38px, 5vw, 60px)",
                height: "clamp(38px, 5vw, 60px)",
                borderRadius: "11px",
                background: "rgba(16,185,129,0.18)",
                fontSize: "clamp(20px, 3.1vw, 41px)",
                flexShrink: 0,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✅
            </motion.span>
            <div>
              <div
                style={{
                  fontSize: "clamp(12px, 1.7vw, 22px)",
                  fontWeight: 800,
                  color: "#6ee7b7",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {ar ? "معايير الإدراج" : "Inclusion Criteria"}
              </div>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "rgba(110,231,183,0.45)", marginTop: "2px" }}>
                {ar ? "شروط المشاركة" : "Who qualifies"}
              </div>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, #10b98166, transparent)",
            }}
          />

          <CriteriaList
            items={INCLUSION}
            color="#10b981"
            markerBg="rgba(16,185,129,0.18)"
            ar={ar}
            delay={0.22}
          />
        </motion.div>

        {/* ── EXCLUSION ── */}
        <motion.div
          initial={{ opacity: 0, x: ar ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 110 }}
          whileHover={{ scale: 1.015 }}
          style={{
            background: "linear-gradient(160deg, rgba(244,63,94,0.10) 0%, rgba(244,63,94,0.04) 100%)",
            border: "1px solid rgba(244,63,94,0.28)",
            borderTop: "3px solid #f43f5e",
            borderRadius: "16px",
            padding: "clamp(14px, 2vh, 30px) clamp(14px, 2vw, 24px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px, 1.5vh, 20px)",
            boxShadow: "0 6px 28px rgba(244,63,94,0.12)",
          }}
        >
          {/* Card header */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <motion.span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "clamp(38px, 5vw, 60px)",
                height: "clamp(38px, 5vw, 60px)",
                borderRadius: "11px",
                background: "rgba(244,63,94,0.18)",
                fontSize: "clamp(20px, 3.1vw, 41px)",
                flexShrink: 0,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              🚫
            </motion.span>
            <div>
              <div
                style={{
                  fontSize: "clamp(12px, 1.7vw, 22px)",
                  fontWeight: 800,
                  color: "#fca5a5",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                }}
              >
                {ar ? "معايير الاستبعاد" : "Exclusion Criteria"}
              </div>
              <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "rgba(252,165,165,0.45)", marginTop: "2px" }}>
                {ar ? "موانع المشاركة" : "Who is excluded"}
              </div>
            </div>
          </div>

          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, #f43f5e66, transparent)",
            }}
          />

          <CriteriaList
            items={EXCLUSION}
            color="#f43f5e"
            markerBg="rgba(244,63,94,0.18)"
            ar={ar}
            delay={0.32}
          />
        </motion.div>
      </div>

      {/* ── Bottom note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          textAlign: "center",
          fontSize: "clamp(14px, 2vw, 26px)",
          color: "var(--c-text-muted)",
          marginTop: "12px",
          letterSpacing: "0.3px",
        }}
      >
        {ar
          ? "طُبِّقت معايير الإدراج والاستبعاد على جميع المرشحين قبل الانتساب رسمياً للدراسة"
          : "All eligibility criteria were applied to every candidate prior to formal enrolment in the study"}
      </motion.div>
    </div>
  );
}
