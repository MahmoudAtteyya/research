"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => setShowTop(v > 0.2));
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[100]"
      >
        <div className="h-full w-full" style={{
          background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green), var(--accent-red))",
        }} />
      </motion.div>

      {/* Back to top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all"
        style={{
          background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))",
          boxShadow: "0 0 20px var(--glow-cyan)",
        }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </>
  );
}
