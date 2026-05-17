"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, scale: 0.88, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } } };

export default function Cover2Slide({ lang }: { lang: Lang }) {
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 44px 12px" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: 6 }}>
            {ar ? "أعضاء الفريق البحثي" : "Research Team Members"}
          </div>
          <div style={{ fontSize: "clamp(20px, 2.8vw, 32px)", fontWeight: 800, color: "var(--c-text)", display: "flex", alignItems: "center", gap: 10 }}>
            {ar ? "فريق المجموعة" : "Group"}&nbsp;
            <span style={{ background: "linear-gradient(135deg, var(--c-indigo), var(--c-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {ar ? "السادسة" : "6"}
            </span>
          </div>
          <div style={{ width: 48, height: 3, borderRadius: 2, background: "linear-gradient(90deg, var(--c-indigo), var(--c-violet))", marginTop: 10 }} />
        </motion.div>

        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "9px", flex: 1, alignContent: "center" }}
        >
          {TEAM_MEMBERS.map((name, i) => (
            <motion.div
              key={i} variants={item}
              style={{
                background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: 10, padding: "11px 10px", textAlign: "center",
                fontSize: "12px", color: "var(--c-text-muted)", fontWeight: 500,
                lineHeight: 1.35, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
              }}
            >
              <span style={{ fontSize: "9px", color: "var(--c-indigo)", fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
              <span>{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
