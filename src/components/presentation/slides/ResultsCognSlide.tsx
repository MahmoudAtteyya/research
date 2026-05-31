"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang, COGNITIVE_DATA } from "@/lib/presentation/slides-data";

export default function ResultsCognSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  const significantItems = COGNITIVE_DATA.filter(cd => cd.improvement);
  const notSignificantItems = COGNITIVE_DATA.filter(cd => !cd.improvement);

  return (
    <div className="pres-slide-inner">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
        <div className="pres-label">{ar ? "النتائج" : "Results"} · {ar ? "الأداء المعرفي" : "Cognitive Performance"}</div>
        <h2 className="pres-h1" style={{ fontSize: "clamp(18px, 2.5vw, 28px)", marginBottom: "4px" }}>
          🧠 <em>{ar ? "الأداء المعرفي" : "Cognitive Outcomes"}</em>
        </h2>
        <div className="pres-divider" style={{ marginBottom: "10px" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "14px", flex: 1, minHeight: 0 }}>

        {/* ═══ Left: Full Professional Table ═══ */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
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
              background: "linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(168,85,247,0.18) 100%)",
              padding: "10px 18px",
              borderBottom: "1px solid rgba(99,102,241,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}>
              <span style={{ fontSize: "18px" }}>🧠</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 800, color: "var(--c-text)", letterSpacing: "0.3px" }}>
                  {ar ? "جدول 2. مقارنة الأداء المعرفي قبل وبعد تناول مشروبات الطاقة (ن=47)" : "Table 2. Cognitive Performance — Pre vs Post Energy Drink (n=47)"}
                </div>
                <div style={{ fontSize: "9px", color: "rgba(165,180,252,0.85)", fontWeight: 600, marginTop: "1px" }}>
                  {ar ? "اختبار T المزدوج — SPSS v26" : "Paired T-Test — SPSS v26"}
                </div>
              </div>
            </div>

            {/* Column Headers */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1.1fr 1.1fr 1.1fr 0.9fr",
              background: "rgba(99,102,241,0.08)",
              borderBottom: "2px solid rgba(99,102,241,0.2)",
            }}>
              {[
                ar ? "المجال المعرفي" : "COGNITIVE DOMAIN",
                ar ? "قبل (MEAN±SD)" : "PRE (MEAN±SD)",
                ar ? "بعد (MEAN±SD)" : "POST (MEAN±SD)",
                ar ? "متوسط الفرق" : "MEAN DIFF.",
                "p-value",
              ].map((h, hi) => (
                <div key={hi} style={{
                  padding: "9px 8px",
                  fontSize: "8px",
                  fontWeight: 800,
                  color: "#a5b4fc",
                  textAlign: hi === 0 ? "left" : "center",
                  letterSpacing: "0.7px",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: hi === 0 ? "flex-start" : "center",
                  paddingLeft: hi === 0 ? "16px" : "8px",
                  borderRight: hi < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Data Rows */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {COGNITIVE_DATA.map((cd, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.1 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.6fr 1.1fr 1.1fr 1.1fr 0.9fr",
                    borderBottom: i < COGNITIVE_DATA.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    flex: 1,
                    alignItems: "center",
                    background: cd.improvement
                      ? "rgba(99,102,241,0.04)"
                      : "rgba(245,158,11,0.03)",
                    position: "relative",
                  }}
                >
                  {/* Left accent bar */}
                  <div style={{
                    position: "absolute",
                    left: 0, top: "20%", bottom: "20%", width: "3px",
                    background: cd.color,
                    borderRadius: "0 3px 3px 0",
                  }} />

                  {/* Domain name */}
                  <div style={{ padding: "10px 16px 10px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: cd.color,
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${cd.color}99`,
                    }} />
                    <div style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.3 }}>
                      {ar ? cd.domainAr : cd.domain}
                    </div>
                  </div>

                  {/* Pre */}
                  <div style={{ padding: "6px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                    {cd.preSD !== null ? (
                      <>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748b", lineHeight: 1 }}>{cd.pre}</div>
                        <div style={{ fontSize: "9px", color: "#475569", marginTop: "2px" }}>±{cd.preSD}</div>
                      </>
                    ) : (
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#64748b" }}>{cd.pre}</div>
                    )}
                  </div>

                  {/* Post */}
                  <div style={{ padding: "6px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                    {cd.postSD !== null ? (
                      <>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: cd.improvement ? "#10b981" : "#94a3b8", lineHeight: 1 }}>{cd.post}</div>
                        <div style={{ fontSize: "9px", color: cd.improvement ? "#6ee7b7" : "#64748b", marginTop: "2px" }}>±{cd.postSD}</div>
                      </>
                    ) : (
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "#94a3b8" }}>{cd.post}</div>
                    )}
                  </div>

                  {/* Mean Diff */}
                  <div style={{ padding: "6px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                    {cd.diff !== "—" ? (
                      <div style={{
                        display: "inline-block",
                        background: cd.improvement ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
                        border: `1px solid ${cd.improvement ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)"}`,
                        borderRadius: "6px",
                        padding: "3px 7px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: cd.improvement ? "#10b981" : "#f59e0b",
                      }}>
                        {cd.diff}
                      </div>
                    ) : (
                      <span style={{ color: "#475569", fontSize: "13px", fontWeight: 500 }}>—</span>
                    )}
                  </div>

                  {/* P-value */}
                  <div style={{ padding: "6px 8px", textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                    {cd.pValue !== "—" ? (
                      <div style={{
                        display: "inline-block",
                        background: "rgba(99,102,241,0.15)",
                        border: "1px solid rgba(99,102,241,0.35)",
                        borderRadius: "6px",
                        padding: "3px 7px",
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#818cf8",
                      }}>
                        {cd.pValue}
                      </div>
                    ) : (
                      <span style={{ color: "#475569", fontSize: "11px" }}>—</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer note */}
            <div style={{
              padding: "5px 16px",
              background: "rgba(255,255,255,0.02)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              fontSize: "9px",
              color: "#64748b",
              fontStyle: "italic",
            }}>
              {ar
                ? "أ. لا يمكن حساب اختبار T لأن الانحراف المعياري للفرق = صفر."
                : "a. The t-test cannot be computed because the standard error of the difference is 0."}
            </div>
          </div>
        </motion.div>

        {/* ═══ Right: Key Findings Panel ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "10px", minHeight: 0 }}
        >
          {/* Significant findings */}
          <div style={{
            flex: 1,
            borderRadius: "16px",
            border: "1px solid rgba(99,102,241,0.25)",
            background: "linear-gradient(160deg, rgba(99,102,241,0.1), rgba(99,102,241,0.04))",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "#818cf8", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>
              ✅ {ar ? "تحسّن معنوي" : "Significant Improvement"}
            </div>
            {significantItems.map((cd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                style={{
                  background: `linear-gradient(135deg, ${cd.color}18, ${cd.color}08)`,
                  border: `1px solid ${cd.color}30`,
                  borderRadius: "10px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: `linear-gradient(135deg, ${cd.color}, ${cd.color}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "14px", flexShrink: 0,
                  boxShadow: `0 4px 12px ${cd.color}44`,
                }}>
                  {i === 0 ? "🧘" : i === 1 ? "🗃️" : "⚡"}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.2 }}>
                    {ar ? cd.domainAr : cd.domain}
                  </div>
                  <div style={{ fontSize: "9.5px", color: cd.color, fontWeight: 600, marginTop: "2px" }}>
                    p {cd.pValue}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Not significant */}
          <div style={{
            borderRadius: "14px",
            border: "1px solid rgba(245,158,11,0.2)",
            background: "rgba(245,158,11,0.05)",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "#f59e0b", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "2px" }}>
              ⚠️ {ar ? "بدون تغيير معنوي" : "No Sig. Change"}
            </div>
            {notSignificantItems.map((cd, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  borderRadius: "8px",
                  padding: "5px 10px",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ fontSize: "12px" }}>◈</span>
                {ar ? cd.domainAr : cd.domain}
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
