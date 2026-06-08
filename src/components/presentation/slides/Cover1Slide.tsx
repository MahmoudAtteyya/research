"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const Symposium = "The 4th Annual Student Symposium for Research Projects • 9 Jun 2026";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { 
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" }, 
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } 
};

export default function Cover1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Premium Background Elements ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Subtle Mesh / Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
        }} />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "70%", borderRadius: "50%", background: "radial-gradient(circle, #6366f160, transparent 70%)" }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "50%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, #ec489950, transparent 70%)" }} />
      </div>

      {/* ── Symposium Banner ── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(90deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))",
          borderBottom: "1px solid rgba(99,102,241,0.3)",
          padding: "10px 40px", textAlign: "center",
          backdropFilter: "blur(12px)", flexShrink: 0, position: "relative", zIndex: 2,
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--c-gold)", marginRight: "8px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </span>
        <span style={{ fontSize: "clamp(12px, 1.5vw, 15px)", fontWeight: 800, color: "var(--c-text)" }}>
          {Symposium}
        </span>
      </motion.div>

      {/* ── Main Content ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "clamp(20px, 4vh, 60px) 48px", textAlign: "center", position: "relative", zIndex: 2,
        }}
      >
        {/* Logos Container - Glass Pill */}
        <motion.div variants={item}
          style={{
            display: "flex", alignItems: "center", gap: "24px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "60px",
            padding: "12px 32px",
            marginBottom: "clamp(20px, 4vh, 32px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)"
          }}
        >
          <img src="/university.svg" alt="Suez University" style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(251,191,36,0.3))" }} />
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
          <img src="/symposium-logo.png" alt="Symposium" style={{ width: 72, height: 72, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(236,72,153,0.3))" }} />
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }} />
          <img src="/faculty.svg" alt="Faculty" style={{ width: 64, height: 64, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.3))" }} />
        </motion.div>

        {/* University & Faculty */}
        <motion.div variants={item} style={{ marginBottom: "clamp(16px, 3vh, 24px)" }}>
          <div style={{ fontSize: "clamp(14px, 1.8vw, 18px)", fontWeight: 900, color: "var(--c-gold)", letterSpacing: "5px", textTransform: "uppercase", marginBottom: 6 }}>
            {ar ? "جامعة السويس" : "Suez University"}
          </div>
          <div style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 600, color: "var(--c-text-muted)", letterSpacing: "2px", textTransform: "uppercase" }}>
            {ar ? "كلية الطب" : "Faculty of Medicine"}
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={item}
          style={{
            fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 900,
            background: "linear-gradient(180deg, var(--c-text) 0%, var(--c-indigo) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            lineHeight: 1.15, maxWidth: "1000px", letterSpacing: "-0.5px", marginBottom: "clamp(16px, 3vh, 24px)",
            filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.2))",
          }}
        >
          {ar
            ? "التأثيرات الحادة لاستهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي"
            : "Acute Effects of Energy Drinks Consumption on Vital Signs and Cognitive Performance"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={item}
          style={{
            fontSize: "clamp(14px, 1.8vw, 20px)", fontWeight: 500, color: "var(--c-text-muted)",
            maxWidth: "800px", marginBottom: "clamp(24px, 4vh, 40px)", lineHeight: 1.6,
          }}
        >
          {ar
            ? "دراسة تجريبية قبلية-بعدية بين البالغين في جامعة السويس والمرضى المترددين على مستشفى جامعة السويس"
            : "A Pre-Post Experimental Study among adults at Suez University and patients attending Suez University hospital"}
        </motion.p>

        {/* Badges */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.div whileHover={{ scale: 1.05, y: -2 }}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
              border: "1px solid rgba(99,102,241,0.3)", borderRadius: "40px", padding: "10px 24px",
              boxShadow: "0 8px 20px rgba(99,102,241,0.1)",
            }}>
            <span style={{ fontSize: "16px" }}>🎓</span>
            <span style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 800, color: "#a5b4fc", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              {ar ? "طلاب السنة الخامسة" : "5th Year Students"}
            </span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
              border: "1px solid rgba(251,191,36,0.3)", borderRadius: "40px", padding: "10px 24px",
              boxShadow: "0 8px 20px rgba(251,191,36,0.1)",
            }}>
            <span style={{ fontSize: "16px" }}>📅</span>
            <span style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 800, color: "var(--c-gold)", letterSpacing: "1px" }}>
              2021 / 2026
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
