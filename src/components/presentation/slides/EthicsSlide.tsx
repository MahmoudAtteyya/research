"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const POINTS = [
  {
    icon: "🤝", color: "#10b981",
    titleEn: "Informed Consent", titleAr: "الموافقة المستنيرة",
    textEn: "Informed consent was obtained from all participants prior to participation.",
    textAr: "موافقة خطية مستنيرة من جميع المشاركين؛ طوعية تمامًا",
    badge: "ETHICS", badgeColor: "#10b981",
  },
  {
    icon: "🔒", color: "#8b5cf6",
    titleEn: "Data Confidentiality", titleAr: "سرية البيانات",
    textEn: "All data coded with strict confidentiality; participant identities remain fully anonymous",
    textAr: "جميع البيانات مُرمَّزة بسرية تامة؛ الهويات مجهولة",
    badge: "Privacy", badgeColor: "#8b5cf6",
  },
  {
    icon: "🚪", color: "#06b6d4",
    titleEn: "Right to Withdraw", titleAr: "حق الانسحاب",
    textEn: "Participants retained the right to withdraw at any time without consequences",
    textAr: "حق الانسحاب في أي وقت دون أي عواقب",
    badge: "Autonomy", badgeColor: "#06b6d4",
  },
  {
    icon: "⚕️", color: "#f43f5e",
    titleEn: "Safety Monitoring", titleAr: "مراقبة السلامة",
    textEn: "Vital signs monitored continuously; adverse reactions managed immediately",
    textAr: "مراقبة مستمرة للعلامات الحيوية؛ التعامل الفوري مع التفاعلات السلبية",
    badge: "Safety", badgeColor: "#f43f5e",
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export default function EthicsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #10b981, #06b6d4)",
            borderRadius: "10px", padding: "5px 12px",
            fontSize: "clamp(10px, 1.4vw, 18px)", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "الاعتبارات الأخلاقية" : "Ethical Considerations"}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.1vw, 38px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "الاعتبارات " : "Ethical "}
          <span style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {ar ? "الأخلاقية" : "Safeguards"}
          </span>
        </h2>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #10b981, #06b6d4)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }} />
      </motion.div>

      {/* Ethics pillars */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}
      >
        {POINTS.map((p, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.015, x: ar ? -6 : 6 }}
            style={{
              background: `linear-gradient(135deg, ${p.color}10, ${p.color}04)`,
              border: `1px solid ${p.color}28`,
              borderRadius: "16px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 3px 16px ${p.color}0c`,
            }}
          >
            {/* Accent line */}
            <div style={{
              position: "absolute",
              [ar ? "right" : "left"]: 0,
              top: 0, bottom: 0, width: "4px",
              background: `linear-gradient(to bottom, ${p.color}00, ${p.color}, ${p.color}00)`,
            }} />

            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
              style={{
                width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                background: `linear-gradient(135deg, ${p.color}28, ${p.color}0e)`,
                border: `1px solid ${p.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "clamp(24px, 3.7vw, 43px)",
                boxShadow: `0 6px 20px ${p.color}20`,
              }}
            >
              {p.icon}
            </motion.div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <span style={{ fontSize: "clamp(15px, 2.2vw, 29px)", fontWeight: 800, color: "var(--c-text)" }}>
                  {ar ? p.titleAr : p.titleEn}
                </span>
                <span style={{
                  fontSize: "clamp(9px, 1.2vw, 15px)", fontWeight: 800, letterSpacing: "0.8px", textTransform: "uppercase",
                  background: `${p.badgeColor}18`, border: `1px solid ${p.badgeColor}35`,
                  borderRadius: "20px", padding: "2px 8px", color: p.badgeColor,
                }}>
                  {p.badge}
                </span>
              </div>
              <div style={{ fontSize: "clamp(13px, 1.8vw, 24px)", color: "var(--c-text-muted)", lineHeight: 1.55, fontWeight: 450 }}>
                {ar ? p.textAr : p.textEn}
              </div>
            </div>

            {/* Checkmark */}
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
              background: `${p.color}18`, border: `1px solid ${p.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(14px, 2.0vw, 26px)",
            }}>
              ✓
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer declaration */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        style={{
          marginTop: "12px", padding: "10px 16px", flexShrink: 0,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          textAlign: "center",
          fontSize: "clamp(11px, 1.5vw, 20px)", color: "#64748b", fontStyle: "italic",
        }}
      >
        🏛️ {ar
          ? "الدراسة تمت وفقاً لمبادئ إعلان هلسنكي وأخلاقيات البحث العلمي الطبي"
          : "Study conducted in accordance with the Declaration of Helsinki and medical research ethics guidelines"}
      </motion.div>
    </div>
  );
}
