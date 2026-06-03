"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, TEAM_MEMBERS } from "@/lib/presentation/slides-data";

const Symposium = "The Fourth Student Symposium for Research Projects, 2026";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 120, damping: 14 } },
};

export default function Cover2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

      {/* ── Ambient Glow Background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <motion.div animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "0%", left: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle, #6366f160, transparent 65%)" }} />
        <motion.div animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, #8b5cf660, transparent 65%)" }} />
      </div>

      {/* ── Symposium banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
          borderBottom: "1px solid rgba(99,102,241,0.25)",
          padding: "8px 40px", textAlign: "center",
          flexShrink: 0, zIndex: 2, position: "relative",
        }}
      >
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.8)", marginRight: "8px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </span>
        <span style={{ fontSize: "clamp(11px, 1.4vw, 14px)", fontWeight: 800, color: "var(--c-text)" }}>{Symposium}</span>
      </motion.div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "clamp(16px, 3vh, 32px) 56px", gap: "clamp(16px, 3vh, 24px)", zIndex: 2, position: "relative" }}>

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}
        >
          <div>
            <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "4px", textTransform: "uppercase", color: "#6366f1", marginBottom: "8px" }}>
              {ar ? "أعضاء الفريق البحثي" : "Research Team Members"}
            </div>
            <h2 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "var(--c-text)", lineHeight: 1 }}>
              {ar ? "المجموعة " : "Group "}<span style={{ color: "#8b5cf6" }}>6</span>
            </h2>
          </div>

          <div style={{ textAlign: ar ? "left" : "right" }}>
            <div style={{ fontSize: "clamp(32px, 4vw, 46px)", fontWeight: 900, color: "#6366f1", lineHeight: 0.9 }}>{TEAM_MEMBERS.length}</div>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "var(--c-text-muted)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>
              {ar ? "عضواً" : "Members"}
            </div>
          </div>
        </motion.div>

        {/* ── Names Grid (Clean Typographic Layout) ── */}
        <motion.div
          variants={container} initial="hidden" animate="show"
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(12px, 3vh, 24px) clamp(16px, 2vw, 32px)",
            alignContent: "center"
          }}
        >
          {TEAM_MEMBERS.map((name, idx) => {
            const num = idx + 1;
            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ x: ar ? -6 : 6, scale: 1.015 }}
                style={{
                  display: "flex", alignItems: "center", gap: "16px",
                  padding: "14px 20px",
                  background: `linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: ar ? "1px solid rgba(255,255,255,0.08)" : "4px solid #6366f1",
                  borderRight: ar ? "4px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  cursor: "default",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)`,
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Number */}
                <div style={{
                  fontSize: "clamp(14px, 1.6vw, 18px)", fontWeight: 900,
                  color: "#6366f1", opacity: 0.85,
                  minWidth: "22px", textAlign: ar ? "right" : "left",
                  fontFamily: "monospace"
                }}>
                  {String(num).padStart(2, "0")}
                </div>

                {/* Divider */}
                <div style={{ width: "1px", height: "24px", background: "rgba(99,102,241,0.3)" }} />

                {/* Name */}
                <div style={{
                  fontSize: "clamp(14px, 1.6vw, 20px)",
                  fontWeight: 700,
                  color: "var(--c-text)",
                  lineHeight: 1.2,
                  letterSpacing: "0.5px"
                }}>
                  {name}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Footer note ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{
            textAlign: "center", fontSize: "11px", fontWeight: 500, color: "var(--c-text-muted)",
            letterSpacing: "1px", flexShrink: 0,
            paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {ar
            ? "طلاب السنة الدراسية الخامسة — كلية الطب — جامعة السويس"
            : "5th Year Medical Students  ·  Faculty of Medicine  ·  Suez University"}
        </motion.div>

      </div>
    </div>
  );
}
