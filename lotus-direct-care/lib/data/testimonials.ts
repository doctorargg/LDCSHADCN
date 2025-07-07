export interface Testimonial {
  id: string;
  patientName: string; // First name + last initial only for HIPAA compliance
  condition: string;
  review: string;
  rating: number; // 1-5 stars
  date: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    patientName: "Sarah M.",
    condition: "Chronic Fatigue",
    review: "Dr. Rosenberg's functional medicine approach completely transformed my life. After years of being told my fatigue was 'just stress,' he found underlying thyroid and nutritional issues. I have my energy back and feel like myself again.",
    rating: 5,
    date: "2024-11-15",
    featured: true,
  },
  {
    id: "2",
    patientName: "Michael B.",
    condition: "Diabetes Management",
    review: "The direct primary care model gives me unlimited access to Dr. Rosenberg. We've worked together to reduce my A1C from 8.5 to 6.2 through personalized nutrition and lifestyle changes. The monthly membership is worth every penny.",
    rating: 5,
    date: "2024-10-22",
    featured: true,
  },
  {
    id: "3",
    patientName: "Jennifer K.",
    condition: "Autoimmune Disease",
    review: "Finally, a doctor who listens! Dr. Rosenberg spent over an hour in my first appointment understanding my health history. His integrative approach has helped me manage my Hashimoto's without increasing medications.",
    rating: 5,
    date: "2024-09-18",
  },
  {
    id: "4",
    patientName: "Robert L.",
    condition: "Longevity Medicine",
    review: "As someone in my 50s, I wanted to be proactive about healthy aging. Dr. Rosenberg's longevity program includes advanced testing and personalized protocols. I feel stronger and more energetic than I did in my 40s.",
    rating: 5,
    date: "2024-12-03",
    featured: true,
  },
  {
    id: "5",
    patientName: "Linda S.",
    condition: "Gut Health Issues",
    review: "After suffering from IBS for years, Dr. Rosenberg identified food sensitivities and gut dysbiosis. His treatment plan has given me my life back - I can finally enjoy meals without fear.",
    rating: 5,
    date: "2024-11-28",
  },
  {
    id: "6",
    patientName: "David W.",
    condition: "Addiction Recovery",
    review: "Dr. Rosenberg's compassionate approach to addiction medicine made all the difference in my recovery. He treats the whole person, not just the addiction. I'm grateful for his ongoing support.",
    rating: 5,
    date: "2024-10-10",
  },
  {
    id: "7",
    patientName: "Patricia H.",
    condition: "Hormone Imbalance",
    review: "Perimenopause was making me miserable until I found Dr. Rosenberg. His bioidentical hormone therapy and lifestyle recommendations have restored my quality of life. I wish I'd found him sooner!",
    rating: 5,
    date: "2024-12-10",
  },
  {
    id: "8",
    patientName: "James T.",
    condition: "Cardiovascular Health",
    review: "Dr. Rosenberg's preventive approach helped me avoid heart disease that runs in my family. Through advanced testing and personalized protocols, my cardiovascular markers have improved dramatically.",
    rating: 5,
    date: "2024-11-05",
  },
  {
    id: "9",
    patientName: "Maria G.",
    condition: "Chronic Pain",
    review: "The integrative therapies Dr. Rosenberg recommended have reduced my chronic pain by 70%. I'm now able to exercise again and have significantly reduced my pain medication.",
    rating: 5,
    date: "2024-10-30",
  },
  {
    id: "10",
    patientName: "Thomas P.",
    condition: "Mental Health & Wellness",
    review: "Dr. Rosenberg understands the mind-body connection. His holistic approach to treating my anxiety included nutrition, supplements, and lifestyle changes that have been more effective than medication alone.",
    rating: 5,
    date: "2024-12-01",
  },
];

// Get featured testimonials
export const featuredTestimonials = testimonials.filter(t => t.featured);

// Get testimonials by condition
export const getTestimonialsByCondition = (condition: string) => {
  return testimonials.filter(t => 
    t.condition.toLowerCase().includes(condition.toLowerCase())
  );
};