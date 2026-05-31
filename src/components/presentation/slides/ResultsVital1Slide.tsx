"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, VITAL_SIGNS_DATA } from "@/lib/presentation/slides-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const VS = VITAL_SIGNS_DATA.slice(0, 3); // SBP, DBP, HR

export default function ResultsVital1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const chartData = VS.map(vs => ({
    name: ar ? vs.nameAr.split(" ")[0] : vs.name.split(" ")[0],
    [ar ? "قبل" : "Pre"]: vs.pre,
    [ar ? "بعد" : "Post"]: vs.post,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج — العلامات الحيوية" : "Results — Vital Signs"} · 1 / 2</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", marginBottom: "4px" }}>
          <span className="anim-heartbeat" style={{ display: "inline-block" }}>❤️</span>{" "}
          <em>{ar ? "ضغط الدم ومعدل القلب" : "Blood Pressure & Heart Rate"}</em>
        </h2>
        <div className="pres-divider" style={{ marginBottom: "12px" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", flex: 1, minHeight: 0 }}>

        {/* Left: Three cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minHeight: 0 }}>
          {VS.map((vs, i) => {
            const perc = (((vs.post - vs.pre) / vs.pre) * 100).toFixed(1);
            return (
              <motion.div
                key={vs.name}
                className="pres-card"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ padding: "10px 14px", position: "relative", overflow: "hidden", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, #06b6d4, #10b981)` }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--c-text)" }}>{ar ? vs.nameAr : vs.name}</div>
                    <div style={{ fontSize: "10px", color: "var(--c-text-dim)" }}>{vs.unit}</div>
                  </div>
                  <div style={{ background: "rgba(16,185,129,0.12)", color: "#10b981", padding: "2px 6px", borderRadius: "20px", fontSize: "10px", fontWeight: 800, border: "1px solid rgba(16,185,129,0.25)" }}>
                    ↑ +{perc}%
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "4px", alignItems: "center" }}>
                  <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: "8px", padding: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#06b6d4" }}>{ar ? "قبل" : "Pre"}</div>
                    <div style={{ fontSize: "18px", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.1 }}>{vs.pre}</div>
                  </div>
                  <div style={{ textAlign: "center", fontSize: "14px", color: "var(--c-text-dim)" }}>→</div>
                  <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "4px", textAlign: "center" }}>
                    <div style={{ fontSize: "9px", color: "#10b981" }}>{ar ? "بعد" : "Post"}</div>
                    <div style={{ fontSize: "18px", fontWeight: 900, color: "var(--c-text)", lineHeight: 1.1 }}>{vs.post}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Grouped bar chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <span style={{ fontSize: "14px" }}>📊</span>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#06b6d4" }}>
              {ar ? "العلامات الحيوية: قبل مقابل بعد" : "Vital Signs: Pre vs Post"}
            </div>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barCategoryGap="25%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "var(--c-text-muted)", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--c-text-dim)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "11px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "4px" }} />
                  <Bar dataKey={ar ? "قبل" : "Pre"} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={ar ? "بعد" : "Post"} fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ flexShrink: 0, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", color: "#6ee7b7", textAlign: "center", fontWeight: 600 }}>
            ✅ {ar ? "جميع التغيرات ذات دلالة إحصائية (p < 0.001)" : "All changes significant (p < 0.001)"}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
