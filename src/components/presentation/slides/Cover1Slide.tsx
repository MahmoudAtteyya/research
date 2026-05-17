"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export default function Cover1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Conference Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "13px 40px", textAlign: "center",
          backdropFilter: "blur(10px)", flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "3px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div className="pres-conf-title" style={{ fontSize: "clamp(12px, 1.5vw, 16px)", fontWeight: 800 }}>
          {CONFERENCE}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 48px", textAlign: "center" }}
      >
        {/* Logos */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 18 }}>
          <img src="/university.svg" alt="Suez University" style={{ width: 68, height: 68, objectFit: "contain", filter: "drop-shadow(0 4px 20px rgba(251,191,36,0.28))" }} />
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)" }} />
          <img src="/faculty.svg" alt="Faculty" style={{ width: 68, height: 68, objectFit: "contain", filter: "drop-shadow(0 4px 20px rgba(251,191,36,0.28))" }} />
        </motion.div>

        {/* University & Faculty */}
        <motion.div variants={item} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--c-gold)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 3 }}>
            {ar ? "جامعة السويس" : "Suez University"}
          </div>
          <div style={{ fontSize: "12px", color: "var(--c-text-muted)" }}>
            {ar ? "كلية الطب" : "Faculty of Medicine"}
          </div>
        </motion.div>

        <motion.div variants={item} style={{ width: 100, height: 1, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)", margin: "0 auto 16px" }} />

        {/* Study Title */}
        <motion.h1 variants={item} style={{
          fontSize: "clamp(17px, 2.3vw, 30px)", fontWeight: 800, color: "var(--c-text)",
          lineHeight: 1.28, maxWidth: 800, letterSpacing: "-0.3px", marginBottom: 18,
        }}>
          {ar
            ? "تأثير استهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي لدى البالغين"
            : "Effect of Energy Drinks Consumption on Vital Signs and Cognitive Performance Among Adults"}
        </motion.h1>

        {/* Badges */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))",
            border: "1px solid rgba(99,102,241,0.4)", borderRadius: 30, padding: "9px 22px",
            fontSize: "12px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.5px",
          }}>
            🎓 {ar ? "طلاب السنة الخامسة · المجموعة السادسة" : "5th Year Students · Group 6"}
          </div>
          <div style={{
            background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)",
            borderRadius: 30, padding: "9px 18px", fontSize: "12px", fontWeight: 600, color: "var(--c-gold)",
          }}>
            2021 / 2026
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
