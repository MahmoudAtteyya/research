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

        {/* ── Body: Premium 2-column layout ── */}
        <div style={{ display: "flex", flex: 1, gap: "40px", minHeight: 0, alignItems: "stretch", padding: "10px 0" }}>

          {/* Column 1: Image (Takes up more space now) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            style={{ flex: "1.2", position: "relative", display: "flex", flexDirection: "column" }}
          >
            <div style={{
              position: "relative",
              flex: 1,
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.01)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.15), inset 0 1px 1px rgba(255,255,255,0.05)",
            }}>
              <Image
                src="/images/sample_size.png"
                alt="Sample Size Calculation Form"
                fill
                style={{ objectFit: "contain", padding: "12px", cursor: "pointer", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}
                unoptimized
                onClick={() => setIsModalOpen(true)}
              />
              {/* Enlarge button */}
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  background: "linear-gradient(135deg, var(--c-indigo), var(--c-violet))",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  fontSize: "clamp(14px, 2vw, 22px)",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                {ar ? "تكبير الصورة" : "Enlarge"}
              </button>
            </div>
          </motion.div>

          {/* Column 2: Important Info Stats (Takes up remaining space) */}
          <motion.div
            initial={{ opacity: 0, x: ar ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, type: "spring", stiffness: 110 }}
            style={{ flex: "0.8", display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}
          >
            {/* Huge Enrollment card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              style={{
                flex: 1,
                background: "linear-gradient(145deg, rgba(99,102,241,0.12), rgba(99,102,241,0.02))",
                border: "1px solid rgba(99,102,241,0.2)",
                borderTop: "6px solid #6366f1",
                borderRadius: "24px",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 16px 40px rgba(99,102,241,0.1)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div style={{
                position: "absolute", top: "-40px", right: "-40px", width: "150px", height: "150px",
                background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)", borderRadius: "50%"
              }} />
              
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "clamp(40px, 6vw, 70px)", marginBottom: "8px", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}
              >
                👥
              </motion.div>
              <div style={{
                fontSize: "clamp(60px, 8vw, 100px)",
                fontWeight: 900,
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: "8px",
                filter: "drop-shadow(0 4px 12px rgba(99,102,241,0.3))"
              }}>
                47
              </div>
              <div style={{ fontSize: "clamp(16px, 2.2vw, 28px)", fontWeight: 700, color: "var(--c-text)", lineHeight: 1.4 }}>
                {ar ? "بالغاً صحيحاً تم تسجيله" : "Healthy adults enrolled"}
              </div>
              <div style={{ fontSize: "clamp(12px, 1.8vw, 20px)", fontWeight: 500, color: "var(--c-text-muted)", marginTop: "4px" }}>
                {ar ? "في الدراسة البحثية" : "in the research study"}
              </div>
            </motion.div>

            {/* Premium Sampling technique card */}
            <motion.div 
              whileHover={{ scale: 1.02, y: -4 }}
              style={{
                background: "linear-gradient(145deg, rgba(245,158,11,0.15), rgba(245,158,11,0.03))",
                border: "1px solid rgba(245,158,11,0.30)",
                borderLeft: "6px solid #f59e0b",
                borderRadius: "20px",
                padding: "16px 24px",
                boxShadow: "0 12px 32px rgba(245,158,11,0.08)"
              }}
            >
              <div style={{ fontSize: "clamp(10px, 1.4vw, 16px)", fontWeight: 800, color: "#f59e0b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>
                {ar ? "أسلوب أخذ العينات" : "Sampling Technique"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ 
                  width: "44px", height: "44px", borderRadius: "12px", 
                  background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "clamp(20px, 3vw, 32px)", boxShadow: "inset 0 2px 10px rgba(255,255,255,0.1)"
                }}>🎯</div>
                <span style={{ fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 800, color: "var(--c-text)", lineHeight: 1.3 }}>
                  {ar ? "أخذ عينات ملائمة" : "Convenience Sampling"}
                </span>
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
