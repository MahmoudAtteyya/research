"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, VITAL_SIGNS_DATA } from "@/lib/presentation/slides-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VS = VITAL_SIGNS_DATA.slice(3); // RR and Temp

export default function ResultsVital2Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const allChartData = VITAL_SIGNS_DATA.map(vs => ({
    name: ar ? vs.nameAr.split(" ")[0] : vs.name.split(" ")[0],
    [ar ? "قبل" : "Before"]: vs.pre,
    [ar ? "بعد"  : "After"]:  vs.post,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="pres-label">{ar ? "النتائج — العلامات الحيوية" : "Results — Vital Signs"} · 2 / 2</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}><em>{ar ? "التنفس والحرارة" : "RR & Temperature"}</em></h2>
        <div className="pres-divider" />
      </motion.div>

      <div className="pres-grid-2" style={{ flex: 1, gap: "14px", alignContent: "center" }}>
        {/* RR & Temp cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
          {VS.map((vs, i) => (
            <motion.div
              key={vs.name}
              className="pres-card"
              initial={{ opacity: 0, x: ar ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              style={{ padding: "14px 18px", borderLeft: `3px solid ${vs.color}` }}
            >
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--c-text)", marginBottom: "8px" }}>
                {ar ? vs.nameAr : vs.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{ar ? "قبل" : "Before"}</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#93c5fd" }}>{vs.pre}</div>
                  <div style={{ fontSize: "10px", color: "var(--c-text-dim)" }}>{vs.unit}</div>
                </div>
                <motion.div
                  style={{ fontSize: "20px", color: vs.color }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >→</motion.div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "11px", color: "var(--c-text-dim)" }}>{ar ? "بعد" : "After"}</div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: "#fca5a5" }}>{vs.post}</div>
                  <div style={{ fontSize: "10px", color: "var(--c-text-dim)" }}>{vs.unit}</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
                  <div className="pres-diff-badge">+{vs.diff} {vs.unit}</div>
                  <span className="pres-sig">p {vs.pValue}</span>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="anim-border-glow"
            style={{ padding: "10px 14px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px" }}
          >
            <p style={{ fontSize: "13px", color: "#6ee7b7" }}>
              🔑 {ar
                ? "جميع العلامات الحيوية الخمس أظهرت زيادات معنوية — تأثير شامل"
                : "All 5 vital signs showed significant increases — comprehensive effect"}
            </p>
          </motion.div>
        </div>

        {/* Bar chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "12px", color: "var(--c-text-dim)", marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>
            {ar ? "جميع العلامات الحيوية — نظرة شاملة" : "All Vital Signs — Overview"}
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={allChartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#07102e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }} />
                <Bar dataKey={ar ? "قبل" : "Before"} fill="#3b82f6" fillOpacity={0.7} radius={[4,4,0,0]} />
                <Bar dataKey={ar ? "بعد"  : "After"}  fill="#f43f5e" fillOpacity={0.7} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
