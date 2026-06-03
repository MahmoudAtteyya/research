"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, SIDE_EFFECTS, SYMPTOM_ONSET } from "@/lib/presentation/slides-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export default function ResultsSideEffectsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const effectsData = SIDE_EFFECTS.map(s => ({
    name: ar ? s.effectAr : s.effect,
    count: s.count,
    color: s.color,
  }));

  const onsetData = SYMPTOM_ONSET.map(o => ({
    name: ar ? o.timingAr : o.timing,
    value: o.percent,
    color: o.color,
  }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "الآثار الجانبية" : "Side Effects"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.8vw, 33px)", marginBottom: "4px" }}>
          {ar ? "الأعراض الجانبية و" : "Reported Symptoms &"} <em>{ar ? "وقت الظهور" : "Onset Timing"}</em>
        </h2>
        <div className="pres-divider" style={{ marginBottom: "12px" }} />
      </motion.div>

      {/* Info strip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
        style={{ flexShrink: 0, display: "flex", gap: "10px", marginBottom: "12px" }}>
        <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px", padding: "6px 12px", fontSize: "clamp(11px, 1.5vw, 20px)", color: "#a5b4fc", fontWeight: 600 }}>
          ℹ️ {ar ? "نحو 30.4% لم يُبلّغوا عن أي أعراض." : "Nearly 30.4% reported no adverse symptoms."}
        </div>
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "6px 12px", fontSize: "clamp(11px, 1.5vw, 20px)", color: "#6ee7b7", fontWeight: 600 }}>
          ✅ {ar ? "75% من الأعراض ظهرت خلال الساعة الأولى." : "75% of symptoms occurred within the first hour."}
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", flex: 1, minHeight: 0 }}>

        {/* Left: Bar Chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
            {ar ? "الآثار الجانبية المبلّغ عنها" : "Reported Side Effects (n = 33)"}
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={effectsData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "var(--c-text-dim)", fontSize: 18 }} axisLine={false} tickLine={false} domain={[0, 16]} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--c-text-muted)", fontSize: 18, fontWeight: 700 }} axisLine={false} tickLine={false} width={240} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "clamp(12px, 1.7vw, 21px)" }}
                    formatter={(v: any) => [`n = ${v}`, ar ? "العدد" : "Count"]}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 18, fontWeight: 700, fill: "var(--c-text-muted)", formatter: (v: any) => `n=${v}` }}>
                    {effectsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Right: Pie Chart */}
        <motion.div className="pres-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
            {ar ? "توقيت ظهور الأعراض (n=33)" : "Timing of Symptom Onset (n=33)"}
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={onsetData}
                    cx="50%"
                    cy="48%"
                    outerRadius="70%"
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text x={x} y={y} fill="white" fontSize="11" fontWeight="800" textAnchor="middle" dominantBaseline="central">
                          {value}%
                        </text>
                      );
                    }}
                  >
                    {onsetData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "clamp(12px, 1.7vw, 21px)" }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "clamp(11px, 1.5vw, 20px)", paddingTop: "0px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
