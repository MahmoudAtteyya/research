"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, ED_CONSUMPTION_FREQ, ED_CONSUMPTION_REASONS } from "@/lib/presentation/slides-data";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ResultsHabitsSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const yesNoData = [
    { name: ar ? "نعم / Yes" : "Yes (93.5%)", value: 93.5, color: "#3b82f6" },
    { name: ar ? "لا / No" : "No (6.5%)", value: 6.5, color: "#64748b" }
  ];

  const freqData = ED_CONSUMPTION_FREQ.map(f => ({ name: ar ? f.labelAr : f.label, value: f.percent, color: f.color }));
  const reasonsData = ED_CONSUMPTION_REASONS.map(r => ({ name: ar ? r.reasonAr : r.reason, value: r.percent, color: r.color }));

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "عادات الاستهلاك" : "Consumption Habits"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.8vw, 33px)", marginBottom: "4px" }}>
          {ar ? "معدل وأسباب " : "Frequency & "}<em>{ar ? "استهلاك مشروبات الطاقة" : "Motives"}</em>
        </h2>
        <div className="pres-divider" style={{ marginBottom: "12px" }} />
      </motion.div>

      {/* 3-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1.6fr", gap: "12px", flex: 1, minHeight: 0 }}>

        {/* Col 1 */}
        <motion.div className="pres-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
            {ar ? "المستهلكون" : "Consumers"}
          </div>
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ fontSize: "clamp(42px, 5.8vw, 75px)", fontWeight: 900, color: "#3b82f6", lineHeight: 1 }}>93.5%</div>
            <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-muted)", marginTop: "4px" }}>
              {ar ? "سبق لهم استهلاك مشروبات الطاقة" : "Had consumed energy drinks"}
            </div>
          </div>
          <div style={{ flex: 1, position: "relative", minHeight: "120px" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={yesNoData} cx="50%" cy="50%" innerRadius="55%" outerRadius="80%" dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                    {yesNoData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "clamp(12px, 1.7vw, 21px)" }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "clamp(11px, 1.5vw, 20px)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Col 2 */}
        <motion.div className="pres-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
            {ar ? "معدل الاستهلاك" : "Consumption Frequency"}
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={freqData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "var(--c-text-dim)", fontSize: 18 }} axisLine={false} tickLine={false} domain={[0, 50]} unit="%" />
                  <YAxis type="category" dataKey="name" tick={{ fill: "var(--c-text-muted)", fontSize: 18, fontWeight: 600 }} axisLine={false} tickLine={false} width={240} />
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "clamp(12px, 1.7vw, 21px)" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: "right", fontSize: 18, fontWeight: 700, fill: "var(--c-text-muted)", formatter: (v: any) => `${v}%` }}>
                    {freqData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Col 3 */}
        <motion.div className="pres-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontSize: "clamp(11px, 1.5vw, 20px)", color: "var(--c-text-dim)", textTransform: "uppercase", fontWeight: 700 }}>
            {ar ? "دوافع الاستهلاك" : "Motives for Consumption"}
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", inset: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={reasonsData} cx="50%" cy="45%" outerRadius="65%" dataKey="value" stroke="none"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return value >= 10 ? (
                        <text x={x} y={y} fill="white" fontSize="10" fontWeight="700" textAnchor="middle" dominantBaseline="central">
                          {value}%
                        </text>
                      ) : null;
                    }}>
                    {reasonsData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "var(--c-bg2)", border: "1px solid var(--c-border)", borderRadius: "8px", fontSize: "clamp(12px, 1.7vw, 21px)" }} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "clamp(10px, 1.4vw, 18px)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
