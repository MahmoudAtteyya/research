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
  { id: "cover-1",          titleEn: "Title",                    titleAr: "العنوان",                      speakerNotesEn: "Welcome. Present the study title and 5th year student group.", speakerNotesAr: "الترحيب. عنوان الدراسة وطلاب السنة الخامسة." },
  { id: "cover-2",          titleEn: "Team Members",             titleAr: "أعضاء الفريق",                 speakerNotesEn: "Introduce all 16 research team members.", speakerNotesAr: "تقديم أعضاء الفريق البحثي الستة عشر." },
  { id: "cover-3",          titleEn: "Supervisors",              titleAr: "المشرفون",                      speakerNotesEn: "Acknowledge and introduce all four supervisors.", speakerNotesAr: "الإشارة إلى جميع المشرفين الأربعة وتقديمهم." },
  { id: "toc",              titleEn: "Table of Contents",        titleAr: "جدول المحتويات",                speakerNotesEn: "Give a brief overview of the presentation structure.", speakerNotesAr: "أعطِ نظرة عامة موجزة على هيكل العرض." },
  { id: "intro-1",          titleEn: "Introduction — Overview",  titleAr: "المقدمة — نظرة عامة",          speakerNotesEn: "Energy drinks are beverages marketed for boosting energy, alertness, and performance.", speakerNotesAr: "مشروبات الطاقة هي مشروبات تُسوَّق لتعزيز الطاقة واليقظة والأداء." },
  { id: "intro-2",          titleEn: "Introduction — Market",    titleAr: "المقدمة — السوق العالمي",       speakerNotesEn: "The global market is massive and growing. University students are a key demographic.", speakerNotesAr: "السوق العالمي ضخم ومتنامٍ. طلاب الجامعات فئة مستهدفة رئيسية." },
  { id: "intro-3",          titleEn: "Introduction — Components",titleAr: "المقدمة — المكوّنات",          speakerNotesEn: "Key active components and their mechanisms of action.", speakerNotesAr: "المكونات النشطة الرئيسية وآليات عملها." },
  { id: "aim",              titleEn: "Aim & Objectives",         titleAr: "الهدف والأهداف",                speakerNotesEn: "Primary aim: evaluate acute effects on vital signs and cognitive performance.", speakerNotesAr: "الهدف الأساسي: تقييم التأثيرات الحادة على العلامات الحيوية والأداء المعرفي." },
  { id: "hypothesis",       titleEn: "Research Question",        titleAr: "السؤال البحثي",                 speakerNotesEn: "The research question and our study hypothesis.", speakerNotesAr: "السؤال البحثي وفرضية الدراسة." },
  { id: "literature-1",     titleEn: "Literature — Cardiovascular",titleAr: "الأدبيات — القلب والأوعية",  speakerNotesEn: "Previous studies on cardiovascular effects of energy drinks.", speakerNotesAr: "الدراسات السابقة حول التأثيرات القلبية الوعائية." },
  { id: "literature-2",     titleEn: "Literature — Cognitive",   titleAr: "الأدبيات — المعرفة",           speakerNotesEn: "Evidence on cognitive and neurological effects.", speakerNotesAr: "الأدلة على التأثيرات المعرفية والعصبية." },
  { id: "methods-1",        titleEn: "Study Design & Setting",   titleAr: "تصميم الدراسة والموقع",         speakerNotesEn: "Pre-post experimental design. Setting and sample overview.", speakerNotesAr: "تصميم تجريبي قبلي-بعدي. الموقع والعينة." },
  { id: "methods-2",        titleEn: "Population, Sample & Tools",titleAr: "المجتمع والعينة والأدوات",    speakerNotesEn: "Study population, inclusion/exclusion criteria and measurement tools.", speakerNotesAr: "مجتمع الدراسة ومعايير الإدراج/الاستبعاد وأدوات القياس." },
  { id: "stat-analysis",    titleEn: "Statistical Analysis Plan",titleAr: "خطة التحليل الإحصائي",         speakerNotesEn: "Data coded, entered in computer. SPSS 26 used. Paired T-Test. p<0.05.", speakerNotesAr: "البيانات مُرمَّزة ومُدخَلة. SPSS 26. اختبار T المزدوج. p<0.05." },
  { id: "ethics",           titleEn: "Ethical Considerations",   titleAr: "الاعتبارات الأخلاقية",          speakerNotesEn: "Institutional approval, informed consent, confidentiality, right to withdraw, safety monitoring.", speakerNotesAr: "موافقة مؤسسية، موافقة مستنيرة، سرية، حق انسحاب، مراقبة سلامة." },
  { id: "results-demo",     titleEn: "Results — Demographics",  titleAr: "النتائج — الديموغرافيا",        speakerNotesEn: "47 participants: 33 males, 14 females. Mean age 23.68±5.8 years.", speakerNotesAr: "47 مشارك: 33 ذكور، 14 إناث. متوسط العمر 23.68±5.8 سنة." },
  { id: "results-vital-1",  titleEn: "Vital Signs — BP & HR",   titleAr: "العلامات الحيوية — الضغط والقلب", speakerNotesEn: "Significant increases in blood pressure and heart rate. All p<0.001.", speakerNotesAr: "زيادات ملحوظة في ضغط الدم ومعدل القلب. جميعها p<0.001." },
  { id: "results-vital-2",  titleEn: "Vital Signs — RR & Temp", titleAr: "العلامات الحيوية — التنفس والحرارة", speakerNotesEn: "Respiratory rate and temperature also showed significant changes.", speakerNotesAr: "معدل التنفس ودرجة الحرارة أظهرا أيضاً تغيرات معنوية." },
  { id: "results-cognitive", titleEn: "Cognitive Performance",  titleAr: "الأداء المعرفي",               speakerNotesEn: "Significant improvements in mindfulness, working memory, and processing speed.", speakerNotesAr: "تحسّن ملحوظ في اليقظة الذهنية والذاكرة العاملة وسرعة المعالجة." },
  { id: "discussion",       titleEn: "Discussion",              titleAr: "المناقشة",                      speakerNotesEn: "Our results align with and extend previous literature.", speakerNotesAr: "نتائجنا تتوافق مع الأدبيات السابقة وتوسّعها." },
  { id: "conclusion",       titleEn: "Conclusion",              titleAr: "الخلاصة",                       speakerNotesEn: "Dual effect: cognitive boost + cardiovascular changes. Moderation needed.", speakerNotesAr: "تأثير مزدوج: تعزيز معرفي + تغيرات قلبية وعائية. الاعتدال ضروري." },
  { id: "recommendations",  titleEn: "Recommendations",         titleAr: "التوصيات",                      speakerNotesEn: "Public awareness, moderation, clinical and policy recommendations.", speakerNotesAr: "التوعية العامة، الاعتدال، التوصيات السريرية والسياساتية." },
  { id: "thankyou",         titleEn: "Thank You",               titleAr: "شكراً لكم",                    speakerNotesEn: "Thank the committee. Open for questions.", speakerNotesAr: "نشكر اللجنة. نحن مستعدون للأسئلة." },
];

// ===== Research Data =====
export const VITAL_SIGNS_DATA = [
  { name: "Systolic BP",       nameAr: "ضغط الدم الانقباضي",    unit: "mmHg", pre: 116.83, post: 119.85, diff: 3.02,  pValue: "<0.001", preSD: 8.176,  postSD: 8.183,  color: "#f43f5e" },
  { name: "Diastolic BP",      nameAr: "ضغط الدم الانبساطي",   unit: "mmHg", pre: 76.21,  post: 77.49,  diff: 1.28,  pValue: "<0.001", preSD: 8.338,  postSD: 8.617,  color: "#ec4899" },
  { name: "Heart Rate",        nameAr: "معدل ضربات القلب",     unit: "bpm",  pre: 75.62,  post: 78.64,  diff: 3.02,  pValue: "<0.001", preSD: 9.912,  postSD: 10.307, color: "#e11d48" },
  { name: "Respiratory Rate",  nameAr: "معدل التنفس",          unit: "/min", pre: 16.70,  post: 17.45,  diff: 0.75,  pValue: "<0.001", preSD: 1.988,  postSD: 2.765,  color: "#a855f7" },
  { name: "Body Temperature",  nameAr: "درجة حرارة الجسم",     unit: "°C",   pre: 37.004, post: 37.215, diff: 0.211, pValue: "<0.001", preSD: 0.3495, postSD: 0.3514, color: "#f97316" },
];

export const DEMOGRAPHICS_DATA = {
  totalParticipants: 47,
  males: 33,  females: 14,
  malePercent: 70.2, femalePercent: 29.8,
  ageRange: "18–42", ageMean: 23.68, ageSD: 5.8,
  students: 39, nonStudents: 8,
  edConsumers: 44, edConsumerPercent: 93.5,
};

export const ED_CONSUMPTION_REASONS = [
  { reason: "Studying & Exams",    reasonAr: "الدراسة والامتحانات", percent: 48, color: "#6366f1" },
  { reason: "Reduce Fatigue",      reasonAr: "تقليل الإجهاد",      percent: 28, color: "#22c55e" },
  { reason: "Alertness",           reasonAr: "اليقظة",             percent: 15, color: "#f59e0b" },
  { reason: "Taste / Other",       reasonAr: "الطعم / أخرى",       percent: 9,  color: "#8b5cf6" },
];

export const COGNITIVE_DATA = [
  { domain: "Working Memory",         domainAr: "الذاكرة العاملة",    pre: 9.32, post: 11.4,  improvement: true,  color: "#6366f1" },
  { domain: "Mindfulness / Alertness",domainAr: "اليقظة الذهنية",   pre: 65,   post: 72,    improvement: true,  color: "#22c55e" },
  { domain: "Processing Speed",       domainAr: "سرعة المعالجة",    pre: 78,   post: 85,    improvement: true,  color: "#a855f7" },
  { domain: "Attention",             domainAr: "الانتباه والتركيز", pre: 70,   post: 72,    improvement: false, color: "#f59e0b" },
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
  "Mohammed Elshahat",
  "Salah Mohammed",
];

export const SUPERVISORS = [
  { name: "Prof Dr. Maysa Ibrahim",      roleEn: "Direct Research Project Supervisor",   roleAr: "مشرف البحث المباشر" },
  { name: "Dr. Mohammed Wagih Saleh",    roleEn: "Direct Research Project Supervisor",   roleAr: "مشرف البحث المباشر" },
  { name: "Dr. Nanees Kamel Hussein",    roleEn: "Research Year Supervisor",             roleAr: "مشرف السنة البحثية" },
  { name: "Dr. Yosra Saeed Abdalla",     roleEn: "General Research Projects Supervisor", roleAr: "المشرف العام على مشاريع البحث" },
];
