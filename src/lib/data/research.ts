export const researchData = {
  title: {
    en: "Effect of Energy Drinks Consumption on Vital Signs and Cognitive Performance Among Adults at Suez University",
    ar: "تأثير استهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي بين البالغين في جامعة السويس"
  },
  university: { en: "Suez University – Faculty of Medicine", ar: "جامعة السويس – كلية الطب البشري" },
  year: "2021–2026",
  group: "Fifth Year Students",

  team: [
    { name: "Rehab Shaban", icon: "Crown", isLead: true },
    { name: "Mahmoud Attia", icon: "Stethoscope", isLead: false },
    { name: "Mahmoud ElSayed", icon: "HeartPulse", isLead: false },
    { name: "Fatma Ali", icon: "Microscope", isLead: false },
    { name: "Abd ElRahman Mostafa", icon: "Brain", isLead: false },
    { name: "Kyrollos Ashraf", icon: "TestTube", isLead: false },
    { name: "Salah Mohamed", icon: "Activity", isLead: false },
    { name: "Ahmed Shaban", icon: "FlaskConical", isLead: false },
    { name: "Mahmoud Eldoreay", icon: "ClipboardList", isLead: false },
    { name: "Laila Roshdy", icon: "Dna", isLead: false },
    { name: "Nagwa Adel", icon: "Pill", isLead: false },
    { name: "Fatma Saad", icon: "Syringe", isLead: false },
    { name: "Abd ElRahman Mahmoud", icon: "BarChart2", isLead: false },
    { name: "Mohamed Abd Elhady", icon: "BookOpen", isLead: false },
    { name: "Mohamed Elshahat", icon: "Scan", isLead: false },
    { name: "Deng Ajou Luol", icon: "Globe", isLead: false },
  ],

  supervisors: [
    { name: "Prof. Dr. Maysa Ibrahim", role: "Direct Research Project Supervisor", icon: "GraduationCap" },
    { name: "Dr. Mohamed Wagih Saleh", role: "Direct Research Project Supervisor", icon: "Stethoscope" },
    { name: "Dr. Nanees Kamel Hussein", role: "Direct Research Year Supervisor", icon: "BookOpen" },
    { name: "Dr. Yosra Saeed Abdalla", role: "General Research Projects Supervisor", icon: "Award" },
  ],

  participants: { total: 47, male: 33, female: 14, students: 39, nonStudents: 8, ageMin: 18, ageMax: 42, ageMean: 23.68, ageSD: 5.8 },

  vitalSigns: [
    { name: "Systolic BP", nameAr: "ضغط الدم الانقباضي", unit: "mmHg", pre: { mean: 116.83, sd: 8.176 }, post: { mean: 119.85, sd: 8.183 }, diff: -3.021, pValue: "<0.001", significant: true },
    { name: "Diastolic BP", nameAr: "ضغط الدم الانبساطي", unit: "mmHg", pre: { mean: 76.21, sd: 8.338 }, post: { mean: 77.49, sd: 8.617 }, diff: -1.277, pValue: "<0.001", significant: true },
    { name: "Heart Rate", nameAr: "معدل النبض", unit: "bpm", pre: { mean: 75.62, sd: 9.912 }, post: { mean: 78.64, sd: 10.307 }, diff: -3.021, pValue: "<0.001", significant: true },
    { name: "Respiratory Rate", nameAr: "معدل التنفس", unit: "/min", pre: { mean: 16.70, sd: 1.988 }, post: { mean: 17.45, sd: 2.765 }, diff: -0.745, pValue: "<0.001", significant: true },
    { name: "Temperature", nameAr: "درجة الحرارة", unit: "°C", pre: { mean: 37.004, sd: 0.3495 }, post: { mean: 37.215, sd: 0.3514 }, diff: -0.211, pValue: "<0.001", significant: true }
  ],

  cognitiveTests: [
    { name: "Mindfulness Scale", nameAr: "مقياس اليقظة الذهنية", pre: 42.1, post: 47.3, improved: true },
    { name: "Working Memory", nameAr: "الذاكرة العاملة", pre: 9.32, post: 11.45, improved: true },
    { name: "Processing Speed", nameAr: "سرعة المعالجة", pre: 24.5, post: 21.2, improved: true },
    { name: "Attention (Digit Span)", nameAr: "الانتباه", pre: 6.8, post: 7.1, improved: true },
    { name: "Concentration", nameAr: "التركيز", pre: 18.4, post: 19.1, improved: true }
  ],

  consumption: {
    prevalence: 93.5,
    frequency: [
      { label: "1–2/week", labelAr: "1-2 أسبوعياً", value: 42.2 },
      { label: "3–4/week", labelAr: "3-4 أسبوعياً", value: 28.9 },
      { label: "Daily", labelAr: "يومياً", value: 17.8 },
      { label: "Occasionally", labelAr: "أحياناً", value: 11.1 }
    ],
    reasons: [
      { label: "Study/Exams", labelAr: "الدراسة والامتحانات", value: 55 },
      { label: "Alertness", labelAr: "اليقظة", value: 25 },
      { label: "Reduce Fatigue", labelAr: "تقليل التعب", value: 12 },
      { label: "Taste", labelAr: "الطعم", value: 8 }
    ],
    sideEffects: [
      { label: "Palpitations", labelAr: "خفقان", value: 35 },
      { label: "Anxiety", labelAr: "قلق", value: 28 },
      { label: "Insomnia", labelAr: "أرق", value: 22 },
      { label: "Headache", labelAr: "صداع", value: 15 }
    ]
  },

  keyFindings: {
    en: [
      "All vital signs showed statistically significant increases after energy drink consumption (p < 0.001)",
      "Heart rate increased by an average of 3 bpm post-consumption",
      "Systolic blood pressure rose by ~3 mmHg after consumption",
      "Cognitive improvements were observed across all 5 domains tested",
      "Working memory improved significantly (9.32 → 11.45)",
      "93.5% of participants were regular energy drink consumers",
      "Studying/exam preparation was the primary reason for consumption (55%)"
    ],
    ar: [
      "أظهرت جميع العلامات الحيوية زيادات ذات دلالة إحصائية بعد استهلاك مشروبات الطاقة (p < 0.001)",
      "ارتفع معدل ضربات القلب بمتوسط 3 نبضة/دقيقة بعد الاستهلاك",
      "ارتفع ضغط الدم الانقباضي بنحو 3 ملم زئبق بعد الاستهلاك",
      "لوحظ تحسن معرفي في جميع المجالات الخمسة المختبرة",
      "تحسنت الذاكرة العاملة بشكل ملحوظ (9.32 → 11.45)",
      "93.5% من المشاركين كانوا مستهلكين منتظمين لمشروبات الطاقة",
      "كانت الدراسة والامتحانات السبب الرئيسي للاستهلاك (55%)"
    ]
  }
};

export const quizQuestions = [
  {
    question: "How much caffeine does a typical 250ml energy drink contain?",
    questionAr: "كم يحتوي مشروب الطاقة (250 مل) من الكافيين؟",
    options: ["50–80 mg", "80–150 mg", "200–300 mg", "400+ mg"],
    correct: 1,
    fact: "Most energy drinks contain 80–150 mg of caffeine per 250ml can.",
    factAr: "تحتوي معظم مشروبات الطاقة على 80–150 ملغ من الكافيين لكل علبة 250 مل."
  },
  {
    question: "What was the prevalence of energy drink consumption among study participants?",
    questionAr: "ما هو معدل انتشار استهلاك مشروبات الطاقة بين المشاركين؟",
    options: ["55%", "72%", "93.5%", "100%"],
    correct: 2,
    fact: "93.5% of participants reported consuming energy drinks regularly.",
    factAr: "93.5% من المشاركين أفادوا بتناول مشروبات الطاقة بانتظام."
  },
  {
    question: "Which vital sign showed the most significant change after energy drink consumption?",
    questionAr: "أي العلامات الحيوية أظهرت أكبر تغيير بعد استهلاك مشروبات الطاقة؟",
    options: ["Temperature", "Respiratory Rate", "Heart Rate", "Diastolic BP"],
    correct: 2,
    fact: "Heart rate showed a 3 bpm increase (75.62 → 78.64 bpm), all significant at p<0.001.",
    factAr: "ارتفع معدل النبض بمقدار 3 نبضة/دقيقة، وجميع النتائج دالة إحصائياً بمستوى p<0.001."
  },
  {
    question: "What is the safe daily caffeine limit for healthy adults (WHO)?",
    questionAr: "ما هو الحد اليومي الآمن للكافيين للبالغين الأصحاء؟",
    options: ["200 mg", "400 mg", "600 mg", "800 mg"],
    correct: 1,
    fact: "The Mayo Clinic recommends no more than 400 mg of caffeine per day for healthy adults.",
    factAr: "توصي عيادة Mayo بعدم تجاوز 400 ملغ من الكافيين يومياً للبالغين الأصحاء."
  },
  {
    question: "What percentage of participants consumed energy drinks for studying/exams?",
    questionAr: "ما نسبة المشاركين الذين يتناولون مشروبات الطاقة للدراسة؟",
    options: ["25%", "35%", "45%", "55%"],
    correct: 3,
    fact: "Studying and exam preparation was the primary reason for consumption at 55%.",
    factAr: "كانت الدراسة والامتحانات السبب الرئيسي للاستهلاك بنسبة 55%."
  }
];
