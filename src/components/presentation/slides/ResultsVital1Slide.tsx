"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, VITAL_SIGNS_DATA } from "@/lib/presentation/slides-data";

// Only show BP and HR on this slide
const VS = VITAL_SIGNS_DATA.slice(0, 3);

export default function ResultsVital1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "النتائج — العلامات الحيوية" : "Results — Vital Signs"} · 1 / 2</div>
        <h2 className="pres-h1">
          <span className="anim-heartbeat" style={{ display: "inline-block" }}>❤️</span>{" "}
          <em>{ar ? "الضغط ومعدل القلب" : "Blood Pressure & Heart Rate"}</em>
        </h2>
        <div className="pres-divider" />
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1, justifyContent: "center" }}>
        {VS.map((vs, i) => (
          <motion.div
            key={vs.name}
            className="pres-compare-row"
            initial={{ opacity: 0, x: ar ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            style={{ padding: "16px 20px", borderLeft: `3px solid ${vs.color}` }}
          >
            {/* Name */}
            <div style={{ width: "160px", flexShrink: 0 }}>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text)" }}>{ar ? vs.nameAr : vs.name}</div>
              <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{vs.unit}</div>
            </div>

            {/* Before */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "var(--c-text-dim)", marginBottom: "2px" }}>{ar ? "قبل" : "Before"}</div>
              <div className="pres-before-val" style={{ fontSize: "20px" }}>{vs.pre}</div>
            </div>

            {/* Arrow */}
            <div style={{ fontSize: "20px", color: vs.color }}>→</div>

            {/* After */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "10px", color: "var(--c-text-dim)", marginBottom: "2px" }}>{ar ? "بعد" : "After"}</div>
              <div className="pres-after-val" style={{ fontSize: "20px" }}>{vs.post}</div>
            </div>

            {/* Diff */}
            <div className="pres-diff-badge">+{vs.diff} {vs.unit}</div>

            {/* P-value */}
            <span className="pres-sig">p {vs.pValue}</span>
          </motion.div>
        ))}

        {/* Mini bar chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ padding: "14px 18px" }}>
          <div style={{ fontSize: "11px", color: "var(--c-text-dim)", marginBottom: "10px", letterSpacing: "1px", textTransform: "uppercase" }}>
            {ar ? "حجم التغيير (Paired T-Test)" : "Change Magnitude (Paired T-Test)"}
          </div>
          {VS.map((vs, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "7px" }}>
              <span style={{ fontSize: "11px", color: "var(--c-text-muted)", width: "110px", flexShrink: 0 }}>{ar ? vs.nameAr : vs.name}</span>
              <div className="pres-bar-track" style={{ flex: 1 }}>
                <motion.div
                  className="pres-bar-fill"
                  style={{ background: vs.color, boxShadow: `0 0 8px ${vs.color}66` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(vs.diff / 4) * 100}%` }}
                  transition={{ delay: 0.65 + i * 0.1, duration: 0.8 }}
                />
              </div>
              <span style={{ fontSize: "12px", color: vs.color, fontWeight: 700, width: "50px" }}>+{vs.diff}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          style={{ padding: "10px 14px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", fontSize: "12px", color: "#6ee7b7" }}>
          ✅ {ar ? "جميع التغيرات ذات دلالة إحصائية عالية (p < 0.001) — Paired T-Test" : "All changes are highly statistically significant (p < 0.001) — Paired T-Test"}
        </motion.div>
      </div>
    </div>
  );
}
