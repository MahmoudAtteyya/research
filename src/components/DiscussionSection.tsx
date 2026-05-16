"use client";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DiscussionSection({ lang }: { lang: "en" | "ar" }) {
  const isAr = lang === "ar";
  const cards = [
    { icon: TrendingUp, color: "#00FF9F", title: "Cardiovascular Effects", titleAr: "التأثيرات القلبية الوعائية",
      points: ["Significant post-consumption increases in HR, SBP, DBP, RR, and temperature (all p < 0.001)", "Aligns with Grasser et al. (2014): healthy adults consuming Red Bull showed significant BP & HR elevation", "Shah (2019) reported significant cardiovascular stimulation consistent with our findings"],
      pointsAr: ["زيادات معنوية بعد الاستهلاك في النبض وضغط الدم والتنفس والحرارة (p < 0.001)", "يتوافق مع Grasser وآخرون (2014): بالغون أصحاء أظهروا ارتفاعاً في ضغط الدم ومعدل النبض", "Shah (2019) تحفيز قلبي وعائي يتسق مع نتائجنا"]
    },
    { icon: BookOpen, color: "#00D4FF", title: "Cognitive Outcomes", titleAr: "النتائج المعرفية",
      points: ["Improvements in mindfulness scores, working memory, and processing speed", "Kennedy (2004): caffeine improves alertness, reaction time & working memory", "Haskell CF: improvements in attention switching & subjective alertness"],
      pointsAr: ["تحسن في درجات اليقظة والذاكرة العاملة وسرعة المعالجة", "Kennedy (2004): الكافيين يحسن اليقظة ووقت الاستجابة والذاكرة العاملة", "Haskell: تحسينات في تحويل الانتباه واليقظة"]
    },
    { icon: AlertTriangle, color: "#FF4D6D", title: "Adverse Effects", titleAr: "الآثار الجانبية",
      points: ["Palpitations, anxiety, insomnia, dizziness & headache reported by 30.4% of participants", "Seifert SM identified palpitations & sleep disturbance as common adverse effects", "EFSA confirmed caffeine-containing drinks frequently cause adverse CV events"],
      pointsAr: ["30.4% من المشاركين أبلغوا عن خفقان وقلق وأرق ودوخة وصداع", "Seifert حدد خفقان القلب واضطراب النوم كآثار جانبية شائعة", "أكدت EFSA أن مشروبات الكافيين تسبب أحداثاً قلبية ضارة"]
    },
    { icon: CheckCircle2, color: "#FFD700", title: "Integrated Interpretation", titleAr: "التفسير المتكامل",
      points: ["Coexistence of cognitive enhancement with measurable cardiovascular stimulation", "WHO highlights public health concerns, especially for young people", "Dose-response relationship: low-moderate caffeine (50–200mg) improves alertness without major adverse effects"],
      pointsAr: ["تزامن التحسين المعرفي مع التحفيز القلبي الوعائي", "منظمة الصحة العالمية تبرز مخاوف الصحة العامة خاصة للشباب", "الجرعات المنخفضة (50-200 ملغ) تحسن اليقظة دون آثار جانبية كبيرة"]
    },
  ];

  return (
    <section id="discussion" className="py-20 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div className="mb-10">
        <h2 className="text-3xl lg:text-4xl font-black gradient-text mb-2">{isAr ? "المناقشة" : "Discussion"}</h2>
        <p style={{ color: "var(--text-muted)" }}>{isAr ? "مقارنة نتائجنا مع الأدبيات العلمية العالمية" : "Our findings compared with existing scientific literature"}</p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-green))" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
        {cards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6" style={{ borderTop: `3px solid ${card.color}` }}>
            <div className="flex items-center gap-3 mb-4">
              <card.icon className="w-6 h-6" style={{ color: card.color }} />
              <h3 className="font-bold" style={{ color: card.color }}>{isAr ? card.titleAr : card.title}</h3>
            </div>
            <ul className="space-y-2">
              {(isAr ? card.pointsAr : card.points).map((p, j) => (
                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: card.color }} />{p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--accent-green)" }}>
            <CheckCircle2 className="w-5 h-5" /> {isAr ? "نقاط القوة" : "Strengths"}
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {(isAr ? ["بروتوكول موحد لقياسات قبل وبعد", "تقييم متزامن للفسيولوجيا والإدراك", "أدوات بحثية مقننة وموثقة", "ملاءمة محلية للسياق المصري"] :
              ["Standardized pre-post measurement protocol", "Simultaneous assessment of physiology & cognition", "Validated cognitive assessment battery", "Locally relevant Egyptian context evidence"]).map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-green)" }} />{s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--accent-red)" }}>
            <AlertTriangle className="w-5 h-5" /> {isAr ? "القيود" : "Limitations"}
          </h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {(isAr ? ["حجم عينة صغير نسبياً (47 مشاركاً)", "غياب مجموعة ضابطة", "الفروق الفردية في تحمل الكافيين غير محكومة", "دراسة أحادية المركز"] :
              ["Relatively small sample size (47 participants)", "Absence of a control group", "Individual caffeine tolerance not controlled", "Single-center study limits generalizability"]).map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-red)" }} />{l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
