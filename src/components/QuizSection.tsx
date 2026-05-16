"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "@/lib/data/research";
import { CheckCircle, XCircle, ChevronRight, RotateCcw } from "lucide-react";

export default function QuizSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = quizQuestions[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.correct;
    setAnswers(prev => [...prev, correct]);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) setFinished(true);
    else { setCurrent(c => c + 1); setSelected(null); }
  };

  const handleReset = () => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); };

  const pct = Math.round((score / quizQuestions.length) * 100);

  return (
    <section id="quiz" className="py-20 px-4 max-w-3xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-10 text-center">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{isAr ? "اختبر معلوماتك" : "Test Your Knowledge"}</h2>
        <p style={{ color: "var(--text-muted)" }}>{isAr ? "5 أسئلة من نتائج بحثنا" : "5 questions from our research"}</p>
        <div className="mt-3 h-1 w-16 rounded-full mx-auto" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </div>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            className="glass rounded-3xl p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                {isAr ? `السؤال ${current + 1} / ${quizQuestions.length}` : `Question ${current + 1} / ${quizQuestions.length}`}
              </span>
              <div className="flex gap-1.5">
                {quizQuestions.map((_, i) => (
                  <div key={i} className="h-1.5 w-8 rounded-full transition-all duration-300"
                    style={{ background: i < current ? (answers[i] ? "var(--accent-green)" : "var(--accent-red)") : i === current ? "var(--accent-cyan)" : "var(--bg-surface-3)" }} />
                ))}
              </div>
            </div>

            <h3 className="text-lg font-bold mb-6 leading-relaxed" style={{ color: "var(--text-primary)" }}>
              {isAr ? q.questionAr : q.question}
            </h3>

            <div className="flex flex-col gap-3 mb-6">
              {q.options.map((opt, idx) => {
                let bg = "var(--bg-surface-2)", border = "var(--border)", color = "var(--text-secondary)";
                if (selected !== null) {
                  if (idx === q.correct) { bg = "rgba(0,255,159,0.1)"; border = "var(--accent-green)"; color = "var(--accent-green)"; }
                  else if (idx === selected) { bg = "rgba(255,77,109,0.1)"; border = "var(--accent-red)"; color = "var(--accent-red)"; }
                  else { color = "var(--text-muted)"; }
                }
                return (
                  <motion.button key={idx} onClick={() => handleSelect(idx)}
                    whileHover={selected === null ? { scale: 1.01 } : {}}
                    whileTap={selected === null ? { scale: 0.99 } : {}}
                    className="w-full text-start px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{ background: bg, border: `1px solid ${border}`, color, cursor: selected === null ? "pointer" : "default" }}>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border flex-shrink-0"
                        style={{ borderColor: border, color }}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {selected !== null && idx === q.correct && <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent-green)" }} />}
                      {selected !== null && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent-red)" }} />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selected !== null && (
              <>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl mb-4 text-sm"
                  style={{ background: "var(--glow-cyan)", border: "1px solid var(--border-accent)" }}>
                  <span className="font-bold" style={{ color: "var(--accent-cyan)" }}>💡 {isAr ? "معلومة: " : "Fact: "}</span>
                  <span style={{ color: "var(--text-muted)" }}>{isAr ? q.factAr : q.fact}</span>
                </motion.div>
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext}
                  className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))" }}>
                  {current + 1 >= quizQuestions.length ? (isAr ? "عرض النتيجة" : "See Results") : (isAr ? "التالي" : "Next")}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-10 text-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, delay: 0.3 }}
              className="text-6xl mb-6">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</motion.div>

            <div className="text-6xl font-black mb-2" style={{ color: pct >= 80 ? "var(--accent-green)" : pct >= 60 ? "var(--accent-gold)" : "var(--accent-red)" }}>
              {pct}%
            </div>
            <p className="text-xl font-bold mb-2" style={{ color: "var(--text-secondary)" }}>
              {score} / {quizQuestions.length} {isAr ? "صحيح" : "correct"}
            </p>
            <p className="mb-8" style={{ color: "var(--text-muted)" }}>
              {pct >= 80 ? (isAr ? "ممتاز! أنت خبير في مشروبات الطاقة 🎉" : "Excellent! You know your energy drinks! 🎉")
                : pct >= 60 ? (isAr ? "جيد! تعرف على المزيد من بحثنا" : "Good! Check our research for more")
                : (isAr ? "راجع نتائجنا لتعلم المزيد" : "Explore our results to learn more")}
            </p>

            {/* Score breakdown */}
            <div className="flex gap-2 justify-center mb-8">
              {answers.map((correct, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: correct ? "var(--accent-green)" : "var(--accent-red)" }}>
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <motion.button whileHover={{ scale: 1.05 }} onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border text-sm transition-all"
                style={{ border: "1px solid var(--border-accent)", color: "var(--accent-cyan)" }}>
                <RotateCcw className="w-4 h-4" />{isAr ? "إعادة" : "Try Again"}
              </motion.button>
              <motion.a whileHover={{ scale: 1.05 }} href="#results"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm"
                style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-green))" }}>
                {isAr ? "استعرض النتائج" : "View Results"}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
