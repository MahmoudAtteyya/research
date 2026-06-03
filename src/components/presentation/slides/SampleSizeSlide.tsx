"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";
import Image from "next/image";

const CRITERIA = [
  { labelEn: "Confidence Level", labelAr: "مستوى الثقة", valueEn: "95%", value: "95%", color: "#6366f1" },
  { labelEn: "Statistical Power", labelAr: "القوة الإحصائية", valueEn: "80%", value: "80%", color: "#06b6d4" },
  { labelEn: "Mean Group 1 (HR)", labelAr: "متوسط المجموعة 1 (القلب)", valueEn: "81.3", value: "81.3", color: "#10b981" },
  { labelEn: "Mean Group 2 (HR)", labelAr: "متوسط المجموعة 2 (القلب)", valueEn: "84.8", value: "84.8", color: "#f59e0b" },
  { labelEn: "Standard Deviation", labelAr: "الانحراف المعياري", valueEn: "8.2&8.5", value: "8.2&8.5", color: "#a855f7" },
];

export default function SampleSizeSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="pres-slide-inner" style={{ direction: ar ? "rtl" : "ltr" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ flexShrink: 0 }}
        >
          <div className="pres-label">{ar ? "الطرق" : "Methods"} · 3 / 4</div>
          <h2 className="pres-h1" style={{ fontSize: "clamp(20px, 3.1vw, 38px)" }}>
            {ar ? "حساب " : "Calculation of "}<em>{ar ? "حجم العينة" : "Sample Size"}</em>
          </h2>
          <div className="pres-divider" />
        </motion.div>

        {/* ── Body: 3-column layout ── */}
        <div style={{ display: "flex", flex: 1, gap: "16px", minHeight: 0, alignItems: "stretch" }}>

          {/* Column 1: Criteria list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 110 }}
            style={{ flex: "0 0 220px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}
          >
            <div style={{ fontSize: "9.5px", fontWeight: 800, color: "var(--c-text-muted)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
              {ar ? "معايير الحساب" : "Calculation Criteria"}
            </div>
            {CRITERIA.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: `linear-gradient(135deg, ${c.color}12, ${c.color}06)`,
                  border: `1px solid ${c.color}30`,
                  borderLeft: `3px solid ${c.color}`,
                  borderRadius: "10px",
                  padding: "9px 12px",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "clamp(12px, 1.7vw, 21px)", color: "var(--c-text-muted)", fontWeight: 500, lineHeight: 1.3 }}>
                  {ar ? c.labelAr : c.labelEn}
                </span>
                <span style={{ fontSize: "clamp(13px, 1.8vw, 24px)", fontWeight: 800, color: c.color, flexShrink: 0 }}>
                  {c.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Column 2: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}
          >
            <div style={{
              position: "relative",
              flex: 1,
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}>
              <Image
                src="/images/sample_size.png"
                alt="Sample Size Calculation Form"
                fill
                style={{ objectFit: "contain", padding: "8px", cursor: "pointer" }}
                unoptimized
                onClick={() => setIsModalOpen(true)}
              />
              {/* Enlarge button */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  background: "var(--c-indigo)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "clamp(12px, 1.4vw, 15px)",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                {ar ? "تكبير" : "Enlarge"}
              </button>
            </div>
          </motion.div>

          {/* Column 3: Enrollment summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 110 }}
            style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}
          >
            {/* Enrollment card */}
            <div style={{
              background: "linear-gradient(145deg, rgba(99,102,241,0.15), rgba(99,102,241,0.06))",
              border: "1px solid rgba(99,102,241,0.35)",
              borderTop: "3px solid #6366f1",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
            }}>
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "clamp(36px, 5.1vw, 65px)", marginBottom: "8px" }}
              >
                👥
              </motion.div>
              <div style={{
                fontSize: "clamp(38px, 5.3vw, 68px)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: "6px",
              }}>
                47
              </div>
              <div style={{ fontSize: "clamp(12px, 1.7vw, 21px)", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.4, marginBottom: "4px" }}>
                {ar ? "بالغاً صحيحاً تم تسجيله في الدراسة" : "healthy adults was enrolled in the study"}
              </div>
            </div>

            {/* Sampling technique card */}
            <div style={{
              background: "linear-gradient(145deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))",
              border: "1px solid rgba(245,158,11,0.30)",
              borderTop: "3px solid #f59e0b",
              borderRadius: "14px",
              padding: "16px",
            }}>
              <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", fontWeight: 800, color: "#f59e0b", letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: "8px" }}>
                {ar ? "أسلوب أخذ العينات" : "Sampling Technique"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "clamp(18px, 2.8vw, 36px)" }}>🎯</span>
                <span style={{ fontSize: "clamp(14px, 2.0vw, 26px)", fontWeight: 800, color: "var(--c-text)" }}>
                  {ar ? "أخذ عينات ملائمة" : "Convenience Sampling"}
                </span>
              </div>
            </div>

            {/* Software tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.25)",
                borderRadius: "10px",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "clamp(14px, 2.0vw, 26px)" }}>✅</span>
              <div>
                <div style={{ fontSize: "clamp(9px, 1.2vw, 15px)", color: "#10b981", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                  {ar ? "البرنامج المستخدم" : "Software"}
                </div>
                <div style={{ fontSize: "clamp(12px, 1.7vw, 21px)", fontWeight: 700, color: "var(--c-text)" }}>Epi Info</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(6px)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <div style={{ position: "absolute", top: "30px", right: "30px", zIndex: 100 }}>
              <button
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                style={{
                  background: "var(--c-indigo)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "clamp(14px, 1.5vw, 19px)",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {ar ? "رجوع للعرض" : "Back to Presentation"}
              </button>
            </div>
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              style={{ flex: 1, width: "100%", height: "100%", position: "relative", cursor: "zoom-out" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/sample_size.png"
                alt="Sample Size Calculation Full"
                fill
                style={{ objectFit: "contain" }}
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
