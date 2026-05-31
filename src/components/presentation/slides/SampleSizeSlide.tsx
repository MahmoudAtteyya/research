"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";
import Image from "next/image";

export default function SampleSizeSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="pres-slide-inner">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ flexShrink: 0 }}>
          <div className="pres-label">{ar ? "المنهجية" : "Methodology"}</div>
          <h2 className="pres-h1" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>
            {ar ? "حساب " : "Calculation of "}<em>{ar ? "حجم العينة" : "Sample Size"}</em>
          </h2>
          <div className="pres-divider" />
        </motion.div>

        <div style={{ display: "flex", flex: 1, gap: "24px", minHeight: 0, alignItems: "center" }}>

          {/* Left Side: Summary / Key points */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div className="pres-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--c-indigo)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📊</span> {ar ? "معايير حساب العينة" : "Sample Size Criteria"}
              </h3>

              <ul className="pres-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <li>
                  <strong>{ar ? "مستوى الثقة (Confidence Level):" : "Confidence Level:"}</strong> 95%
                </li>
                <li>
                  <strong>{ar ? "القوة الإحصائية (Power):" : "Statistical Power:"}</strong> 80%
                </li>
                <li>
                  <strong>{ar ? "المتوسط في المجموعة 1 (النبض):" : "Mean Group 1 (HR):"}</strong> 81.3
                </li>
                <li>
                  <strong>{ar ? "المتوسط في المجموعة 2 (النبض):" : "Mean Group 2 (HR):"}</strong> 84.8
                </li>
                <li>
                  <strong>{ar ? "الانحراف المعياري:" : "Standard Deviation:"}</strong> 8.2 & 8.5
                </li>
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pres-card"
              style={{ padding: "16px", background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.3)" }}
            >
              <div style={{ fontSize: "13px", color: "#10b981", fontWeight: 700, marginBottom: "4px" }}>
                ✅ {ar ? "النتيجة النهائية" : "Final Result"}
              </div>
              <div style={{ fontSize: "14px", color: "var(--c-text-muted)", lineHeight: 1.5 }}>
                {ar
                  ? "بناءً على حسابات Epi Info، فإن حجم العينة المطلوب هو 47 مشاركاً."
                  : "Based on Epi Info calculations, the required sample size is 47 participants."}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: The Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{ flex: 1.2, height: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <div className="pres-card" style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src="/images/sample_size.png"
                  alt="Sample Size Calculation"
                  fill
                  style={{ objectFit: "contain", padding: "8px", cursor: "pointer" }}
                  unoptimized
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
              {/* Enlarge Button overlay */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "var(--c-indigo)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                {ar ? "تكبير الصورة" : "Enlarge Image"}
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(4px)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px"
            }}
            onClick={() => setIsModalOpen(false)}
          >
            {/* Back Button */}
            <div style={{ position: "absolute", bottom: "100px", left: "40px", zIndex: 100 }}>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                style={{
                  background: "var(--c-indigo)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {ar ? "رجوع للبريزنتيشن" : "Back to Presentation"}
              </button>
            </div>

            {/* Huge Image Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              style={{ flex: 1, width: "100%", height: "100%", position: "relative", cursor: "zoom-out", marginTop: "40px" }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
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
