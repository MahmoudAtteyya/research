"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const RECS = [
  {
    icon: "📢", color: "#6366f1",
    titleEn: "Public Awareness", titleAr: "التوعية العامة",
    textEn: "Educational programs on physiological risks and safe consumption limits",
    textAr: "برامج توعوية بالمخاطر الفسيولوجية وحدود الاستهلاك الآمن",
    tagEn: "Community", tagAr: "مجتمع", priority: 1,
  },
  {
    icon: "⚖️", color: "#10b981",
    titleEn: "Moderation", titleAr: "الاعتدال في الاستهلاك",
    textEn: "Avoid high doses; respect the 400 mg/day caffeine safety limit",
    textAr: "تجنّب الجرعات العالية؛ احترام حد الأمان 400 ملغ كافيين يومياً",
    tagEn: "Safety", tagAr: "سلامة", priority: 1,
  },
  {
    icon: "🩺", color: "#f43f5e",
    titleEn: "Clinical Practice", titleAr: "الممارسة السريرية",
    textEn: "Routinely ask about energy drink use in patients with cardiovascular risk",
    textAr: "الاستفسار الروتيني عن الاستهلاك لدى مرضى القلب والأوعية الدموية",
    tagEn: "Clinical", tagAr: "سريري", priority: 2,
  },
  {
    icon: "🎓", color: "#f59e0b",
    titleEn: "University Policy", titleAr: "السياسات الجامعية",
    textEn: "Promote healthy alternatives: adequate sleep, balanced nutrition, exercise",
    textAr: "تعزيز البدائل الصحية: النوم الكافي والتغذية المتوازنة والرياضة",
    tagEn: "Policy", tagAr: "سياسة", priority: 2,
  },
  {
    icon: "🔬", color: "#8b5cf6",
    titleEn: "Future Research", titleAr: "البحث المستقبلي",
    textEn: "Larger RCTs, control groups, sex-stratified analysis, long-term follow-up",
    textAr: "تجارب عشوائية أكبر، مجموعات ضابطة، تحليل تبعاً للجنس، متابعة طويلة المدى",
    tagEn: "Research", tagAr: "بحث", priority: 3,
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } } };

export default function RecoSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

      {/* ── Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flexShrink: 0, marginBottom: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <div style={{
            background: "linear-gradient(135deg, #10b981, #6366f1)",
            borderRadius: "10px", padding: "5px 12px",
            fontSize: "10px", fontWeight: 800, letterSpacing: "2px",
            color: "#fff", textTransform: "uppercase",
          }}>
            {ar ? "التوصيات" : "Recommendations"}
          </div>
        </div>
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.15 }}>
          {ar ? "ماذا " : "What We "}
          <span style={{ background: "linear-gradient(135deg, #10b981, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {ar ? "نُوصي به؟" : "Recommend"}
          </span>
        </h2>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
          style={{ height: "3px", width: "60px", background: "linear-gradient(90deg, #10b981, #6366f1)", borderRadius: "2px", marginTop: "10px", transformOrigin: ar ? "right" : "left" }} />
      </motion.div>

      {/* ── Recommendation cards ── */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}
      >
        {RECS.map((r, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ scale: 1.015, x: ar ? -5 : 5 }}
            style={{
              background: `linear-gradient(135deg, ${r.color}10, ${r.color}04)`,
              border: `1px solid ${r.color}25`,
              borderRadius: "14px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 2px 12px ${r.color}0a`,
            }}
          >
            {/* Left accent */}
            <div style={{
              position: "absolute",
              [ar ? "right" : "left"]: 0,
              top: "15%", bottom: "15%", width: "3px",
              background: `linear-gradient(to bottom, transparent, ${r.color}, transparent)`,
              borderRadius: "0 3px 3px 0",
            }} />

            {/* Priority number */}
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
              background: `${r.color}18`, border: `1px solid ${r.color}35`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", fontWeight: 900, color: r.color,
            }}>
              {i + 1}
            </div>

            {/* Icon box */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
              style={{
                width: "38px", height: "38px", borderRadius: "11px", flexShrink: 0,
                background: `linear-gradient(135deg, ${r.color}22, ${r.color}0c)`,
                border: `1px solid ${r.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px",
                boxShadow: `0 4px 14px ${r.color}18`,
              }}
            >
              {r.icon}
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--c-text)" }}>
                  {ar ? r.titleAr : r.titleEn}
                </span>
                <span style={{
                  fontSize: "8.5px", fontWeight: 800, letterSpacing: "0.7px", textTransform: "uppercase",
                  background: `${r.color}18`, border: `1px solid ${r.color}35`,
                  borderRadius: "20px", padding: "1px 7px", color: r.color,
                }}>
                  {ar ? r.tagAr : r.tagEn}
                </span>
              </div>
              <div style={{ fontSize: "11.5px", color: "var(--c-text-muted)", lineHeight: 1.45, fontWeight: 450 }}>
                {ar ? r.textAr : r.textEn}
              </div>
            </div>

            {/* Arrow indicator */}
            <div style={{ fontSize: "16px", color: r.color, opacity: 0.5, flexShrink: 0 }}>
              {ar ? "←" : "→"}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
