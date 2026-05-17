"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SUPERVISORS } from "@/lib/presentation/slides-data";

const CONFERENCE = "The Fourth Student Conference for Research Projects, 2026";

const ROLE_CONFIG: Record<string, { icon: string; color: string }> = {
  "Direct Research Project Supervisor":   { icon: "🔬", color: "#6366f1" },
  "Research Year Supervisor":             { icon: "📚", color: "#8b5cf6" },
  "General Research Projects Supervisor": { icon: "🏛️", color: "#fbbf24" },
};

export default function Cover3Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── Conference Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.35)",
          padding: "11px 40px", textAlign: "center",
          backdropFilter: "blur(10px)", flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(165,180,252,0.7)", marginBottom: "2px" }}>
          🎓 {ar ? "يُقدَّم في" : "Presented at"}
        </div>
        <div className="pres-conf-title" style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 800 }}>
          {CONFERENCE}
        </div>
      </motion.div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 52px 10px" }}>

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--c-gold)", marginBottom: 4 }}>
            {ar ? "تحت إشراف" : "Under the Supervision of"}
          </div>
          <div style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "var(--c-text)" }}>
            {ar ? "المشرفون" : "Supervisors"}
          </div>
          <div style={{ width: 52, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #fbbf24, #fde68a)", marginTop: 8 }} />
        </motion.div>

        {/* Supervisor Cards — 2 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1, alignContent: "center" }}>
          {SUPERVISORS.map((s, i) => {
            const cfg = ROLE_CONFIG[s.roleEn] ?? { icon: "🎓", color: "#6366f1" };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${cfg.color}33`,
                  borderLeft: `4px solid ${cfg.color}`,
                  borderRadius: 12, padding: "16px 18px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: `${cfg.color}1a`, border: `1px solid ${cfg.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text)", marginBottom: 3, lineHeight: 1.3 }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: cfg.color, letterSpacing: "0.3px", textTransform: "uppercase", lineHeight: 1.4 }}>
                    {ar ? s.roleAr : s.roleEn}
                  </div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color, boxShadow: `0 0 8px ${cfg.color}90`, flexShrink: 0 }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
