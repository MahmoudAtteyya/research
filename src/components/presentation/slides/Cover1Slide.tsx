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

      {/* Main Content */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "32px 56px", textAlign: "center", position: "relative", zIndex: 2,
        }}
      >
        {/* Logos — bigger, with glow */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 48, marginBottom: 28 }}>
          <motion.div
            style={{ position: "relative" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                position: "absolute", inset: -12, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(251,191,36,0.25), transparent 70%)",
              }}
            />
            <img
              src="/university.svg" alt="Suez University"
              style={{ width: 108, height: 108, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(251,191,36,0.38))", position: "relative" }}
            />
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ width: 2, height: 70, background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)" }}
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ fontSize: "14px", color: "var(--c-indigo)", opacity: 0.7 }}
            >✦</motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
              style={{ width: 2, height: 70, background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)" }}
            />
          </div>

          <motion.div
            style={{ position: "relative" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              style={{
                position: "absolute", inset: -12, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
              }}
            />
            <img
              src="/faculty.svg" alt="Faculty"
              style={{ width: 108, height: 108, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(99,102,241,0.38))", position: "relative" }}
            />
          </motion.div>
        </motion.div>

        {/* University & Faculty names */}
        <motion.div variants={item} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: "17px", fontWeight: 800, color: "var(--c-gold)", letterSpacing: "4px", textTransform: "uppercase", marginBottom: 6 }}>
            {ar ? "جامعة السويس" : "Suez University"}
          </div>
          <div style={{ fontSize: "15px", color: "var(--c-text-muted)", letterSpacing: "1.5px" }}>
            {ar ? "كلية الطب" : "Faculty of Medicine"}
          </div>
        </motion.div>

        {/* Animated separator */}
        <motion.div variants={item} style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 14 }}>
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 80, height: 1.5, background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.7))" }}
          />
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: "15px", color: "var(--c-indigo)", opacity: 0.8 }}
          >✦</motion.span>
          <motion.div
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            style={{ width: 80, height: 1.5, background: "linear-gradient(90deg, rgba(99,102,241,0.7), transparent)" }}
          />
        </motion.div>

        {/* Study Title */}
        <motion.h1
          variants={item}
          style={{
            fontSize: "clamp(20px, 2.8vw, 34px)", fontWeight: 800, color: "var(--c-text)",
            lineHeight: 1.35, maxWidth: 860, letterSpacing: "-0.3px", marginBottom: 28,
          }}
        >
          {ar
            ? "تأثير استهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي لدى البالغين"
            : "Effect of Energy Drinks Consumption on Vital Signs and Cognitive Performance Among Adults"}
        </motion.h1>

        {/* Badges */}
        <motion.div variants={item} style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.22), rgba(139,92,246,0.17))",
              border: "1px solid rgba(99,102,241,0.45)", borderRadius: 30, padding: "11px 28px",
              fontSize: "14px", fontWeight: 700, color: "#a5b4fc", letterSpacing: "0.5px",
            }}>
            🎓 {ar ? "طلاب السنة الخامسة · المجموعة السادسة" : "5th Year Students · Group 6"}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            style={{
              background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.4)",
              borderRadius: 30, padding: "11px 24px", fontSize: "14px", fontWeight: 700, color: "var(--c-gold)",
            }}>
            2021 / 2026
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
