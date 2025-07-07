export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = 
  | "General"
  | "Services"
  | "Pricing & Insurance"
  | "Appointments"
  | "Direct Primary Care"
  | "Functional Medicine"
  | "New Patients";

export const faqCategories: FAQCategory[] = [
  "General",
  "Services",
  "Pricing & Insurance",
  "Appointments",
  "Direct Primary Care",
  "Functional Medicine",
  "New Patients",
];

export const faqs: FAQItem[] = [
  // General
  {
    id: "1",
    question: "What makes Lotus Direct Care different from traditional medical practices?",
    answer: "Lotus Direct Care combines Direct Primary Care (DPC) with Functional Medicine. This means you get unlimited access to Dr. Rosenberg through a monthly membership, longer appointments (30-60 minutes), same-day or next-day availability, and a root-cause approach to health issues rather than just symptom management.",
    category: "General",
  },
  {
    id: "2",
    question: "Where is Lotus Direct Care located?",
    answer: "We are located at 1516 W Mequon Rd., STE 103, Mequon, WI 53092. We're easily accessible from Milwaukee, Ozaukee County, and surrounding areas.",
    category: "General",
  },
  {
    id: "3",
    question: "What are your office hours?",
    answer: "Our office hours are Monday through Friday, 9:00 AM to 5:00 PM. We are closed on weekends. However, DPC members have 24/7 access to Dr. Rosenberg via phone, text, or email for urgent concerns.",
    category: "General",
  },

  // Services
  {
    id: "4",
    question: "What services does Dr. Rosenberg provide?",
    answer: "Dr. Rosenberg offers comprehensive primary care, functional medicine consultations, longevity medicine programs, addiction medicine, hormone optimization, chronic disease management, preventive care, and integrative therapies. We focus on treating the whole person, not just symptoms.",
    category: "Services",
  },
  {
    id: "5",
    question: "Do you offer telemedicine appointments?",
    answer: "Yes! We offer both in-person and telemedicine appointments. Many follow-up visits and consultations can be done virtually for your convenience. Initial appointments and certain procedures require in-person visits.",
    category: "Services",
  },
  {
    id: "6",
    question: "What conditions do you treat?",
    answer: "We treat a wide range of conditions including but not limited to: chronic fatigue, autoimmune diseases, digestive issues, hormone imbalances, metabolic disorders, cardiovascular disease, mental health concerns, addiction, and age-related health issues. We also focus heavily on prevention and optimization.",
    category: "Services",
  },

  // Pricing & Insurance
  {
    id: "7",
    question: "How much does Direct Primary Care membership cost?",
    answer: "Our DPC membership starts at $150 per month for adults, with discounted rates for families and children. This includes unlimited visits, 24/7 access to Dr. Rosenberg, same-day appointments, and no copays. Contact us for detailed pricing information.",
    category: "Pricing & Insurance",
  },
  {
    id: "8",
    question: "Do you accept insurance?",
    answer: "We operate outside of the insurance model for primary care services, which allows us to provide better care at a lower overall cost. However, we can provide documentation for you to submit to your insurance for potential reimbursement. We recommend pairing DPC membership with a high-deductible health plan for comprehensive coverage.",
    category: "Pricing & Insurance",
  },
  {
    id: "9",
    question: "Are lab tests and medications included in the membership?",
    answer: "Basic lab work is often included or available at significantly discounted rates (up to 95% off retail prices). We also offer wholesale pricing on many medications through our in-house dispensary. Specialized testing and certain medications may have additional costs.",
    category: "Pricing & Insurance",
  },
  {
    id: "10",
    question: "Can I use my HSA or FSA to pay for membership?",
    answer: "Yes! Direct Primary Care membership fees are eligible expenses for Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA). We can provide the necessary documentation for your account administrator.",
    category: "Pricing & Insurance",
  },

  // Appointments
  {
    id: "11",
    question: "How do I schedule an appointment?",
    answer: "You can schedule appointments online through our patient portal, call us at (262) 242-0700, or text/email if you're a DPC member. We offer same-day or next-day appointments for members, and typically within a week for new patients.",
    category: "Appointments",
  },
  {
    id: "12",
    question: "How long are appointments?",
    answer: "Unlike traditional practices with 7-10 minute visits, our appointments are 30-60 minutes long. Initial consultations are typically 60-90 minutes. We believe in taking the time to truly understand your health concerns and goals.",
    category: "Appointments",
  },
  {
    id: "13",
    question: "What should I bring to my first appointment?",
    answer: "Please bring a photo ID, list of current medications and supplements, recent lab results or medical records (if available), and a list of your main health concerns and goals. We'll send you intake forms to complete online before your visit.",
    category: "Appointments",
  },

  // Direct Primary Care
  {
    id: "14",
    question: "What is Direct Primary Care (DPC)?",
    answer: "Direct Primary Care is a healthcare model where patients pay a monthly membership fee for unlimited access to their physician. This eliminates insurance bureaucracy, reduces costs, and allows for longer appointments, better availability, and a stronger doctor-patient relationship.",
    category: "Direct Primary Care",
  },
  {
    id: "15",
    question: "What's included in DPC membership?",
    answer: "DPC membership includes unlimited office visits, 24/7 access to Dr. Rosenberg via phone/text/email, same-day or next-day appointments, extended appointments (30-60 minutes), chronic disease management, preventive care, care coordination, and often discounted labs and medications.",
    category: "Direct Primary Care",
  },
  {
    id: "16",
    question: "Do I still need health insurance with DPC?",
    answer: "Yes, we recommend maintaining health insurance for hospitalizations, surgeries, and specialist care. Many patients pair DPC with a high-deductible health plan, which provides comprehensive coverage at a lower overall cost than traditional insurance alone.",
    category: "Direct Primary Care",
  },

  // Functional Medicine
  {
    id: "17",
    question: "What is Functional Medicine?",
    answer: "Functional Medicine is a systems-based approach that focuses on identifying and addressing the root causes of disease. Instead of just treating symptoms, we look at genetics, environment, lifestyle, and how all body systems interact to create optimal health or disease.",
    category: "Functional Medicine",
  },
  {
    id: "18",
    question: "How is Functional Medicine different from conventional medicine?",
    answer: "While conventional medicine often focuses on managing symptoms with medications, Functional Medicine seeks to understand why symptoms occur. We use advanced testing, detailed health histories, and personalized treatment plans that may include nutrition, supplements, lifestyle changes, and medications when necessary.",
    category: "Functional Medicine",
  },
  {
    id: "19",
    question: "What kind of testing do you use in Functional Medicine?",
    answer: "We use comprehensive testing including advanced blood panels, hormone testing, food sensitivity testing, gut microbiome analysis, genetic testing, heavy metal testing, and metabolic assessments. Testing is personalized based on your health concerns and goals.",
    category: "Functional Medicine",
  },

  // New Patients
  {
    id: "20",
    question: "How do I become a patient?",
    answer: "Start by scheduling a free 15-minute discovery call or your initial consultation. You can book online or call (262) 242-0700. We'll discuss your health goals, explain our services, and determine if we're a good fit for your healthcare needs.",
    category: "New Patients",
  },
  {
    id: "21",
    question: "What happens during the initial consultation?",
    answer: "Your initial consultation (60-90 minutes) includes a comprehensive health history review, discussion of your health concerns and goals, physical examination if needed, initial treatment planning, and explanation of our DPC membership options. We may also order initial lab work.",
    category: "New Patients",
  },
  {
    id: "22",
    question: "Can I transfer my medical records to Lotus Direct Care?",
    answer: "Absolutely! We can help you transfer your medical records from your previous providers. Having your complete medical history helps us provide the best possible care. We'll provide you with the necessary forms and guidance.",
    category: "New Patients",
  },
];

// Helper functions
export const getFAQsByCategory = (category: FAQCategory): FAQItem[] => {
  return faqs.filter(faq => faq.category === category);
};

export const searchFAQs = (searchTerm: string): FAQItem[] => {
  const lowercaseSearch = searchTerm.toLowerCase();
  return faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(lowercaseSearch) ||
      faq.answer.toLowerCase().includes(lowercaseSearch)
  );
};