"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
const item      = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export default function Cover1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* Decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          top: "-100px", right: "-100px", pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -90, -180, -270, -360] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
          bottom: "-80px", left: "-80px", pointerEvents: "none",
        }}
      />

      {/* Conference Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "10px 40px", textAlign: "center",
          backdropFilter: "blur(10px)", flexShrink: 0, position: "relative", zIndex: 2,
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "2px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div style={{ fontSize: "clamp(12px, 1.5vw, 15px)", fontWeight: 800, color: "var(--c-text)" }}>
          {CONFERENCE}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "20px 48px", textAlign: "center", position: "relative", zIndex: 2,
        }}
      >
        {/* Logos — bigger, with glow */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 36, marginBottom: 20 }}>
          <motion.div
            style={{ position: "relative" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(251,191,36,0.2), transparent 70%)",
              }}
            />
            <img
              src="/university.svg" alt="Suez University"
              style={{ width: 82, height: 82, objectFit: "contain", filter: "drop-shadow(0 6px 24px rgba(251,191,36,0.32))", position: "relative" }}
            />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ width: 1.5, height: 55, background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)" }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: "10px", color: "var(--c-indigo)", opacity: 0.6 }}
            >✦</motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
              style={{ width: 1.5, height: 55, background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)" }}
            />
          </div>

          <motion.div
            style={{ position: "relative" }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              style={{
                position: "absolute", inset: -8, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
              }}
            />
            <img
              src="/faculty.svg" alt="Faculty"
              style={{ width: 82, height: 82, objectFit: "contain", filter: "drop-shadow(0 6px 24px rgba(99,102,241,0.32))", position: "relative" }}
            />
          </motion.div>
        </motion.div>

        {/* University & Faculty names */}
        <motion.div variants={item} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: "14px", fontWeight: 800, color: "var(--c-gold)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: 4 }}>
            {ar ? "جامعة السويس" : "Suez University"}
          </div>
          <div style={{ fontSize: "13px", color: "var(--c-text-muted)", letterSpacing: "1px" }}>
            {ar ? "كلية الطب" : "Faculty of Medicine"}
          </div>
        </motion.div>

        {/* Animated separator */}
        <motion.div variants={item} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 60, height: 1.5, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6))" }}
          />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: "12px", color: "var(--c-indigo)", opacity: 0.7 }}
          >✦</motion.span>
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ width: 60, height: 1.5, background: "linear-gradient(90deg, rgba(99,102,241,0.6), transparent)" }}
          />
        </motion.div>

        {/* Study Title */}
        <motion.h1
          variants={item}
          style={{
            fontSize: "clamp(18px, 2.4vw, 29px)", fontWeight: 800, color: "var(--c-text)",
            lineHeight: 1.3, maxWidth: 820, letterSpacing: "-0.2px", marginBottom: 20,
          }}
        >
          {ar
            ? "تأثير استهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي لدى البالغين"
            : "Effect of Energy Drinks Consumption on Vital Signs and Cognitive Performance Among Adults"}
        </motion.h1>

        {/* Badges */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))",
              border: "1px solid rgba(99,102,241,0.4)", borderRadius: 30, padding: "9px 22px",
              fontSize: "13px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.5px",
            }}>
            🎓 {ar ? "طلاب السنة الخامسة · المجموعة السادسة" : "5th Year Students · Group 6"}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.35)",
              borderRadius: 30, padding: "9px 18px", fontSize: "13px", fontWeight: 700, color: "var(--c-gold)",
            }}>
            2021 / 2026
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
