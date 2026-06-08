// ===================================================================
//  PRESENTATION DATA — Energy Drinks Study, Suez University 2025-2026
// ===================================================================

export type Lang = "en" | "ar";

export interface Slide {
  id: string;
  titleEn: string;
  titleAr: string;
  speakerNotesEn?: string;
  speakerNotesAr?: string;
}

export const SLIDES: Slide[] = [
  { id: "cover-1", titleEn: "Title", titleAr: "العنوان", speakerNotesEn: "Welcome. Present the study title and 5th year student group.", speakerNotesAr: "الترحيب. عنوان الدراسة وطلاب السنة الخامسة." },
  { id: "cover-2", titleEn: "Team Members", titleAr: "أعضاء الفريق", speakerNotesEn: "Introduce all 16 research team members.", speakerNotesAr: "تقديم أعضاء الفريق البحثي الستة عشر." },

  { id: "toc", titleEn: "Table of Contents", titleAr: "جدول المحتويات", speakerNotesEn: "Give a brief overview of the presentation structure.", speakerNotesAr: "أعطِ نظرة عامة موجزة على هيكل العرض." },
  { id: "intro-1", titleEn: "Introduction — Overview", titleAr: "المقدمة — نظرة عامة", speakerNotesEn: "Energy drinks are beverages marketed for boosting energy, alertness, and performance.", speakerNotesAr: "مشروبات الطاقة هي مشروبات تُسوَّق لتعزيز الطاقة واليقظة والأداء." },
  { id: "intro-2", titleEn: "Introduction — Market", titleAr: "المقدمة — السوق العالمي", speakerNotesEn: "The global market is massive and growing. University students are a key demographic.", speakerNotesAr: "السوق العالمي ضخم ومتنامٍ. طلاب الجامعات فئة مستهدفة رئيسية." },
  { id: "intro-3", titleEn: "Introduction — Components", titleAr: "المقدمة — المكوّنات", speakerNotesEn: "Key active components and their mechanisms of action.", speakerNotesAr: "المكونات النشطة الرئيسية وآليات عملها." },
  { id: "aim", titleEn: "Aim & Objectives", titleAr: "الهدف والأهداف", speakerNotesEn: "Primary aim: evaluate acute effects on vital signs and cognitive performance.", speakerNotesAr: "الهدف الأساسي: تقييم التأثيرات الحادة على العلامات الحيوية والأداء المعرفي." },
  { id: "methods-1", titleEn: "Study Design & Setting", titleAr: "تصميم الدراسة والموقع", speakerNotesEn: "Pre-post experimental design. Setting and sample overview.", speakerNotesAr: "تصميم تجريبي قبلي-بعدي. الموقع والعينة." },
  { id: "methods-2", titleEn: "Eligibility Criteria", titleAr: "معايير الاختيار", speakerNotesEn: "Study population, inclusion/exclusion criteria and measurement tools.", speakerNotesAr: "مجتمع الدراسة ومعايير الإدراج/الاستبعاد وأدوات القياس." },
  { id: "sample-size", titleEn: "Sample Size Calculation", titleAr: "حساب حجم العينة", speakerNotesEn: "Sample size calculation methodology and justification.", speakerNotesAr: "منهجية حساب حجم العينة والمبررات." },
  { id: "data-tools", titleEn: "Data Collection Tools", titleAr: "أدوات جمع البيانات", speakerNotesEn: "Three instruments: structured questionnaire, physiological vital signs measurement, and standardized cognitive assessment battery.", speakerNotesAr: "ثلاثة أدوات: استبيان منظّم، قياس العلامات الحيوية، وبطارية التقييم المعرفي الموحّدة." },
  { id: "stat-analysis", titleEn: "Statistical Analysis Plan", titleAr: "خطة التحليل الإحصائي", speakerNotesEn: "Data coded, entered in computer. SPSS 26 used. Paired T-Test. p<0.05.", speakerNotesAr: "البيانات مُرمَّزة ومُدخَلة. SPSS 26. اختبار T المزدوج. p<0.05." },
  { id: "ethics", titleEn: "Ethical Considerations", titleAr: "الاعتبارات الأخلاقية", speakerNotesEn: "Institutional approval, informed consent, confidentiality, right to withdraw, safety monitoring.", speakerNotesAr: "موافقة مؤسسية، موافقة مستنيرة، سرية، حق انسحاب، مراقبة سلامة." },
  { id: "results-intro", titleEn: "Results", titleAr: "النتائج", speakerNotesEn: "Now moving to the study results.", speakerNotesAr: "ننتقل الآن إلى نتائج الدراسة." },
  { id: "results-demo", titleEn: "Results — Demographics", titleAr: "النتائج — الديموغرافيا", speakerNotesEn: "47 participants: 33 males, 14 females. Mean age 23.68±5.8 years.", speakerNotesAr: "47 مشارك: 33 ذكور، 14 إناث. متوسط العمر 23.68±5.8 سنة." },
  { id: "results-habits", titleEn: "Results — Consumption Habits", titleAr: "النتائج — عادات الاستهلاك", speakerNotesEn: "Frequency and motives for consuming energy drinks.", speakerNotesAr: "معدل استهلاك وأسباب تناول مشروبات الطاقة." },
  { id: "results-side-effects", titleEn: "Results — Side Effects", titleAr: "النتائج — الآثار الجانبية", speakerNotesEn: "Reported side effects and symptom onset timing.", speakerNotesAr: "الآثار الجانبية المبلغ عنها ووقت ظهور الأعراض." },
  { id: "results-vital", titleEn: "Vital Signs Results", titleAr: "نتائج العلامات الحيوية", speakerNotesEn: "Significant changes across all measured vital signs.", speakerNotesAr: "تغيرات معنوية في كافة العلامات الحيوية." },
  { id: "results-cognitive", titleEn: "Cognitive Performance", titleAr: "الأداء المعرفي", speakerNotesEn: "Significant improvements in mindfulness, working memory, and processing speed.", speakerNotesAr: "تحسّن ملحوظ في اليقظة الذهنية والذاكرة العاملة وسرعة المعالجة." },
  { id: "conclusion", titleEn: "Conclusion", titleAr: "الخلاصة", speakerNotesEn: "Dual effect: cognitive boost + cardiovascular changes. Moderation needed.", speakerNotesAr: "تأثير مزدوج: تعزيز معرفي + تغيرات قلبية وعائية. الاعتدال ضروري." },
  { id: "limitations", titleEn: "Study Limitations", titleAr: "محدودية الدراسة", speakerNotesEn: "Three key limitations: sample size, time frame, and lack of ECG monitoring.", speakerNotesAr: "ثلاث محدوديات رئيسية: حجم العينة، الإطار الزمني، وغياب مراقبة تخطيط القلب." },
  { id: "recommendations", titleEn: "Recommendations", titleAr: "التوصيات", speakerNotesEn: "Public awareness, moderation, clinical and policy recommendations.", speakerNotesAr: "التوعية العامة، الاعتدال، التوصيات السريرية والسياساتية." },
  { id: "thankyou", titleEn: "Thank You", titleAr: "شكراً لكم", speakerNotesEn: "Thank the committee. Open for questions.", speakerNotesAr: "نشكر اللجنة. نحن مستعدون للأسئلة." },
];

// ===== Research Data =====
export const VITAL_SIGNS_DATA = [
  { name: "Systolic BP", nameAr: "ضغط الدم الانقباضي", unit: "mmHg", pre: 116.83, post: 119.85, diff: -3.021, diffSD: 6.54, pValue: "<0.001**", preSD: 8.18, postSD: 8.18, color: "#f43f5e" },
  { name: "Diastolic BP", nameAr: "ضغط الدم الانبساطي", unit: "mmHg", pre: 76.21, post: 77.49, diff: 1.277, diffSD: 5.30, pValue: "<0.001**", preSD: 8.34, postSD: 8.62, color: "#ec4899" },
  { name: "Heart Rate", nameAr: "معدل ضربات القلب", unit: "bpm", pre: 75.62, post: 78.64, diff: -3.021, diffSD: 5.73, pValue: "<0.001**", preSD: 9.91, postSD: 10.31, color: "#e11d48" },
  { name: "Respiratory Rate", nameAr: "معدل التنفس", unit: "/min", pre: 16.70, post: 17.45, diff: -0.745, diffSD: 1.48, pValue: "<0.001**", preSD: 1.99, postSD: 2.77, color: "#a855f7" },
  { name: "Body Temperature", nameAr: "درجة حرارة الجسم", unit: "°C", pre: 37.004, post: 37.215, diff: -0.211, diffSD: 0.297, pValue: "<0.001**", preSD: 0.350, postSD: 0.351, color: "#f97316" },
];

export const DEMOGRAPHICS_DATA = {
  totalParticipants: 47,
  males: 33, females: 14,
  malePercent: 70.2, femalePercent: 29.8,
  ageRange: "18–42", ageMean: 23.68, ageSD: 5.8,
  students: 39, nonStudents: 8,
  edConsumers: 44, edConsumerPercent: 93.5,
};

export const ED_CONSUMPTION_FREQ = [
  { label: "Occasionally", labelAr: "نادراً", percent: 42.2, color: "#22c55e" },
  { label: "1-3 times/month", labelAr: "1-3 مرات شهرياً", percent: 31.1, color: "#a855f7" },
  { label: "1-2 times/week", labelAr: "1-2 مرة أسبوعياً", percent: 13.3, color: "#f59e0b" },
  { label: "3-5 times/week", labelAr: "3-5 مرات أسبوعياً", percent: 11.1, color: "#3b82f6" },
  { label: "Daily", labelAr: "يومياً", percent: 2.2, color: "#ef4444" },
];

export const ED_CONSUMPTION_REASONS = [
  { reason: "Studying & Exams", reasonAr: "الدراسة والامتحانات", percent: 33.3, color: "#3b82f6" },
  { reason: "Energy & Alertness", reasonAr: "زيادة الطاقة واليقظة", percent: 28.9, color: "#06b6d4" },
  { reason: "Taste Preference", reasonAr: "تفضيل الطعم", percent: 11.1, color: "#10b981" },
  { reason: "Curiosity", reasonAr: "الفضول", percent: 11.1, color: "#f59e0b" },
  { reason: "Sports/Exercise", reasonAr: "الرياضة / التمرين", percent: 8.9, color: "#ef4444" },
  { reason: "Social Reasons", reasonAr: "أسباب اجتماعية", percent: 6.7, color: "#a855f7" },
];

export const SIDE_EFFECTS = [
  { effect: "Palpitations", effectAr: "خفقان", count: 14, color: "#ef4444" },
  { effect: "Anxiety", effectAr: "قلق", count: 6, color: "#f59e0b" },
  { effect: "Headache", effectAr: "صداع", count: 6, color: "#a855f7" },
  { effect: "Insomnia & Dizziness", effectAr: "أرق ودوخة", count: 5, color: "#3b82f6" },
  { effect: "Tremors & Chest Pain", effectAr: "رعشة وألم بالصدر", count: 3, color: "#10b981" },
  { effect: "Blurred Vision", effectAr: "رؤية ضبابية", count: 1, color: "#06b6d4" },
];

export const SYMPTOM_ONSET = [
  { timing: "30-60 minutes", timingAr: "30-60 دقيقة", percent: 50.0, color: "#ef4444" },
  { timing: "<30 minutes", timingAr: "أقل من 30 دقيقة", percent: 25.0, color: "#3b82f6" },
  { timing: "1-3 hours", timingAr: "1-3 ساعات", percent: 18.8, color: "#f59e0b" },
  { timing: ">3 hours", timingAr: "أكثر من 3 ساعات", percent: 6.3, color: "#10b981" },
];

export const COGNITIVE_DATA = [
  { domain: "Mindfulness Score", domainAr: "اليقظة الذهنية", pre: 52.40, preSD: 2.651, post: 53.00, postSD: 2.085, diff: "-0.596 ± 1.74", pValue: "<0.001", improvement: true, color: "#22c55e" },
  { domain: "Working Memory (Short-Term)", domainAr: "الذاكرة العاملة", pre: 9.32, preSD: 3.224, post: 9.43, postSD: 3.500, diff: "-0.106 ± 2.60", pValue: "<0.001", improvement: true, color: "#6366f1" },
  { domain: "Processing Speed", domainAr: "سرعة المعالجة", pre: 0.55, preSD: 0.880, post: 0.64, postSD: 0.919, diff: "-0.85 ± 0.351", pValue: "<0.001", improvement: true, color: "#a855f7" },
  { domain: "Attention", domainAr: "الانتباه", pre: 1.00, preSD: null, post: 1.00, postSD: null, diff: "—", pValue: "—", improvement: false, color: "#f59e0b", note: "1.00a" },
  { domain: "Concentration", domainAr: "التركيز", pre: 1.00, preSD: null, post: 1.00, postSD: null, diff: "—", pValue: "—", improvement: false, color: "#ef4444", note: "1.00a" },
];

export const TEAM_MEMBERS = [
  "Rehab Shaban",
  "Mahmoud Attia",
  "Nagwa Adel",
  "Abd ElRahman Mahmoud",
  "Abd ElRahman Mostafa",
  "Ahmed Shaban",
  "Deng Ajou Luol",
  "Fatma Ali",
  "Fatma Saad",
  "Kyrollos Ashraf",
  "Laila Roshdy",
  "Mahmoud Eldoreay",
  "Mahmoud ElSayed",
  "Mohamed Abd Elhady",
  "Mohamed Elshahat",
  "Salah Mohamed",
];

export const SUPERVISORS = [
  { name: "Prof Dr. Maysa Ibrahim", roleEn: "Direct Research Project Supervisor", roleAr: "مشرف البحث المباشر" },
  { name: "Dr. Mohamed Wagih Saleh", roleEn: "Direct Research Project Supervisor", roleAr: "مشرف البحث المباشر" },
  { name: "Dr. Nanees Kamel Hussein", roleEn: "Research Year Supervisor", roleAr: "مشرف السنة البحثية" },
  { name: "Dr. Yosra Saeed Abdalla", roleEn: "General Research Projects Supervisor", roleAr: "المشرف العام على مشاريع البحث" },
];
