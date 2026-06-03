"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, VITAL_SIGNS_DATA } from "@/lib/presentation/slides-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

const VS = VITAL_SIGNS_DATA.slice(0, 3); // SBP, DBP, HR

export default function ResultsVital1Slide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const chartData = VS.map(vs => ({
    name: ar ? vs.nameAr.split(" ")[0] : vs.name.split(" ")[0],
    [ar ? "قبل" : "Pre"]: vs.pre,
    [ar ? "بعد" : "Post"]: vs.post,
    color: vs.color,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج — العلامات الحيوية" : "Results — Vital Signs"} · 1 / 2</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.8vw, 33px)", marginBottom: "4px" }}>
          <span className="anim-heartbeat" style={{ display: "inline-block" }}>❤️</span>{" "}
          <em>{ar ? "ضغط الدم ومعدل القلب" : "Blood Pressure & Heart Rate"}</em>
        </h2>
        <div className="pres-divider" style={{ marginBottom: "10px" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "14px", flex: 1, minHeight: 0 }}>

        {/* ═══ Left: Professional Table ═══ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.04)",
          }}>
            {/* Table Caption */}
            <div style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.25) 0%, rgba(16,185,129,0.15) 100%)",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(6,182,212,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              <span style={{ fontSize: "clamp(16px, 2.5vw, 31px)" }}>📋</span>
              <div>
                <div style={{ fontSize: "clamp(12px, 1.7vw, 21px)", fontWeight: 800, color: "var(--c-text)", letterSpacing: "0.3px" }}>
                  {ar ? "جدول 1. مقارنة العلامات الحيوية (ن=47)" : "Table 1. Vital Signs Comparison (n=47)"}
                </div>
                <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", color: "rgba(6,182,212,0.8)", fontWeight: 600, marginTop: "1px" }}>
                  {ar ? "اختبار T المزدوج — كل القيم ذات دلالة إحصائية" : "Paired T-Test — All values statistically significant"}
                </div>
              </div>
            </div>

            {/* Column Headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr 0.85fr",
              background: "rgba(255,255,255,0.04)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              {[
                ar ? "المؤشر" : "PARAMETER",
                ar ? "قبل (MEAN±SD)" : "PRE (MEAN±SD)",
                ar ? "بعد (MEAN±SD)" : "POST (MEAN±SD)",
                ar ? "متوسط الفرق" : "MEAN DIFF.",
                ar ? "p-value" : "p-value",
              ].map((h, hi) => (
                <div key={hi} style={{
                  padding: "8px 6px",
                  fontSize: "8.5px",
                  fontWeight: 800,
                  color: "#94a3b8",
                  textAlign: hi === 0 ? "left" : "center",
                  letterSpacing: "0.6px",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: hi === 0 ? "flex-start" : "center",
                  paddingLeft: hi === 0 ? "14px" : "6px",
                }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {VS.map((vs, i) => {
                const increase = vs.post > vs.pre;
                const pct = Math.abs(((vs.post - vs.pre) / vs.pre) * 100).toFixed(1);
                return (
                  <motion.div
                    key={vs.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.4fr 1fr 1fr 1fr 0.85fr",
                      borderBottom: i < VS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      flex: 1,
                      alignItems: "center",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    {/* Parameter name */}
                    <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: vs.color,
                        flexShrink: 0,
                        boxShadow: `0 0 6px ${vs.color}88`,
                      }} />
                      <div>
                        <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.2 }}>
                          {ar ? vs.nameAr : vs.name}
                        </div>
                        <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", color: "var(--c-text-muted)", marginTop: "1px" }}>{vs.unit}</div>
                      </div>
                    </div>

                    {/* Pre */}
                    <div style={{ padding: "6px", textAlign: "center" }}>
                      <div style={{ fontSize: "clamp(13px, 1.8vw, 24px)", fontWeight: 700, color: "#64748b", lineHeight: 1 }}>{vs.pre}</div>
                      <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", color: "#475569", marginTop: "2px" }}>±{vs.preSD}</div>
                    </div>

                    {/* Post */}
                    <div style={{ padding: "6px", textAlign: "center" }}>
                      <div style={{ fontSize: "clamp(13px, 1.8vw, 24px)", fontWeight: 700, color: "#10b981", lineHeight: 1 }}>{vs.post}</div>
                      <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", color: "#6ee7b7", marginTop: "2px" }}>±{vs.postSD}</div>
                    </div>

                    {/* Mean Diff */}
                    <div style={{ padding: "6px", textAlign: "center" }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "3px",
                        background: increase ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
                        border: `1px solid ${increase ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
                        borderRadius: "6px",
                        padding: "2px 6px",
                        fontSize: "clamp(10px, 1.4vw, 18px)",
                        fontWeight: 700,
                        color: increase ? "#10b981" : "#ef4444",
                      }}>
                        {increase ? "↑" : "↓"} {Math.abs(vs.diff)} <span style={{ fontSize: "8px", opacity: 0.7 }}>±{vs.diffSD}</span>
                      </div>
                      <div style={{ fontSize: "8.5px", color: "var(--c-text-dim)", marginTop: "2px" }}>({pct}%)</div>
                    </div>

                    {/* P-Value */}
                    <div style={{ padding: "6px", textAlign: "center" }}>
                      <div style={{
                        display: "inline-block",
                        background: "rgba(244,63,94,0.15)",
                        border: "1px solid rgba(244,63,94,0.3)",
                        borderRadius: "6px",
                        padding: "3px 7px",
                        fontSize: "clamp(10px, 1.4vw, 18px)",
                        fontWeight: 800,
                        color: "#f43f5e",
                      }}>
                        {vs.pValue}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{
              padding: "6px 14px",
              background: "rgba(16,185,129,0.06)",
              borderTop: "1px solid rgba(16,185,129,0.15)",
              fontSize: "9.5px",
              color: "#6ee7b7",
              fontWeight: 600,
              textAlign: "center",
            }}>
              ✅ {ar ? "جميع التغيرات ذات دلالة إحصائية عالية (p < 0.001)" : "All changes are highly statistically significant (p < 0.001)"}
            </div>
          </div>
        </motion.div>

        {/* ═══ Right: Bar Chart ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minHeight: 0,
          }}
        >
          <div style={{
            flex: 1,
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "14px",
            background: "rgba(255,255,255,0.02)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <span style={{ fontSize: "clamp(14px, 2.0vw, 26px)" }}>📊</span>
              <div style={{ fontSize: "clamp(12px, 1.7vw, 21px)", fontWeight: 700, color: "#06b6d4" }}>
                {ar ? "مقارنة القيم: قبل / بعد" : "Pre vs Post Comparison"}
              </div>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "var(--c-text-muted)", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "var(--c-text-dim)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      contentStyle={{ background: "rgba(15,23,42,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "clamp(12px, 1.7vw, 21px)" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "clamp(11px, 1.5vw, 20px)", paddingTop: "4px" }} />
                    <Bar dataKey={ar ? "قبل" : "Pre"} fill="#64748b" radius={[5, 5, 0, 0]} />
                    <Bar dataKey={ar ? "بعد" : "Post"} fill="#10b981" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
