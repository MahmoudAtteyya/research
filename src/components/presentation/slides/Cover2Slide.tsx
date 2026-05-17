"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.035 } },
};
const item = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function Cover2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Conference Banner */}
      <motion.div
        initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "9px 40px", textAlign: "center",
          backdropFilter: "blur(10px)", flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "1px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div style={{ fontSize: "clamp(11px, 1.3vw, 14px)", fontWeight: 800, color: "var(--c-text)" }}>
          {CONFERENCE}
        </div>
      </motion.div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 40px 12px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "var(--c-indigo)", marginBottom: "3px" }}>
            {ar ? "أعضاء الفريق البحثي" : "Research Team Members"}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 800, color: "var(--c-text)" }}>
              {ar ? "المجموعة" : "Group"}
            </span>
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 900,
                background: "linear-gradient(135deg, var(--c-indigo), var(--c-cyan))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >6</motion.span>
            <span style={{ fontSize: "12px", color: "var(--c-text-dim)", fontWeight: 400 }}>
              — {TEAM_MEMBERS.length} {ar ? "عضواً" : "members"}
            </span>
          </div>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.25, duration: 0.55 }}
            style={{ width: 48, height: 3, borderRadius: 2, background: "linear-gradient(90deg, var(--c-indigo), var(--c-violet))", marginTop: "7px", transformOrigin: ar ? "right" : "left" }}
          />
        </motion.div>

        {/* Members grid — uniform cards */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", flex: 1, alignContent: "center" }}
        >
          {TEAM_MEMBERS.map((name, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.03, y: -2, borderColor: "rgba(99,102,241,0.4)" }}
              style={{
                background: "rgba(99,102,241,0.06)",
                border: "1px solid rgba(99,102,241,0.18)",
                borderRadius: "10px",
                padding: "11px 12px",
                display: "flex", alignItems: "center", gap: "9px",
                cursor: "default", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Initial avatar */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
                border: "1px solid rgba(99,102,241,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 800, color: "#a5b4fc",
              }}>
                {name.charAt(0)}
              </div>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--c-text-muted)", lineHeight: 1.3 }}>
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
