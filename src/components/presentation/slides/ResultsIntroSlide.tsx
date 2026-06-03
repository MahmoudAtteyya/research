"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lang } from "@/lib/presentation/slides-data";

export default function ResultsIntroSlide({ lang }: { lang: Lang }) {
  const ar = lang === "ar";

  return (
    <div className="pres-slide-inner" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>

      {/* Background large icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          fontSize: "clamp(300px, 6.6vw, 536px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        📊
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.2) 100%)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: "30px",
            padding: "8px 24px",
            fontSize: "clamp(14px, 2.0vw, 26px)",
            fontWeight: 700,
            color: "var(--c-indigo)",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "24px"
          }}
        >
          {ar ? " النتائج" : "Results"}
        </motion.div>

        <h1 style={{
          fontSize: "clamp(40px, 6.6vw, 83px)",
          fontWeight: 900,
          color: "var(--c-text)",
          margin: 0,
          background: "linear-gradient(to right, var(--c-text), #a5b4fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-1px"
        }}>
          {ar ? "نتائج الدراسة" : "Study Results"}
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            height: "4px",
            background: "linear-gradient(90deg, transparent, var(--c-gold), transparent)",
            marginTop: "24px",
            marginBottom: "24px",
            borderRadius: "2px"
          }}
        />

        <p style={{
          fontSize: "clamp(16px, 2.2vw, 24px)",
          color: "var(--c-text-muted)",
          maxWidth: "600px",
          lineHeight: 1.6
        }}>
          {ar
            ? "نستعرض فيما يلي التحليل الإحصائي للبيانات الديموغرافية، التغيرات في العلامات الحيوية، والأداء المعرفي للمشاركين."
            : "Presenting the statistical analysis of demographic data, changes in vital signs, and cognitive performance of the participants."}
        </p>
      </motion.div>

    </div>
  );
}
