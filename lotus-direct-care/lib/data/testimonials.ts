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
    patientName: "Jeffrey J.",
    condition: "Cardiovascular Health & Weight Loss",
    review: "It is hard to express just how amazingly wonderful Dr Rosenberg and his team Savannah and Brian are. I came to them a very sick man with blood pressure so high (214/120) that I couldn't get routine dental work done. Dr. Rosenberg performed an EKG that showed my heart was severely enlarged. He immediately set me up with a cardiologist and prescribed proper medication. He also prescribed Zepbound for weight loss and fought with my insurance company to get it covered. Now, 6 months later, my blood pressure is 120/76 and my weight is down to 244lbs from 297lbs. I feel so much better and can do things I thought I would never be able to do again. Thank you Dr Rosenberg, Savannah, and Brian!! You guys are awesome!!!",
    rating: 5,
    date: "2024-07-01",
    featured: true,
  },
  {
    id: "2",
    patientName: "Joshua G.",
    condition: "Personalized Care Approach",
    review: "Dr. Rosenberg approaches your care with curiosity and compassion, and goes out of his way to make sure you feel seen, heard, and understood. He makes it a point to personalize your care plan rather than shoving you into a 'standard' box, and listens to your concerns actively, affirms them, and speaks truth, backed by science, to lay out his treatment plan. Despite being the 'expert' in the room, he never speaks condescendingly. He encourages you to advocate for yourself if you don't understand, or even if you disagree, and he goes out of his way to make sure you grasp the 'why' behind the treatment plan. I'm incredibly grateful to have found this practice and I cannot recommend them enough.",
    rating: 5,
    date: "2024-05-15",
    featured: true,
  },
  {
    id: "3",
    patientName: "Dawn F.",
    condition: "Direct Primary Care Experience",
    review: "The staff at Lotus Direct Care are top notch! But more importantly…for the first time (in a long time) my husband and I feel we are also getting top notch health care! Dr Rosenberg is incredibly knowledgeable and a hands on partner in our care. At the same time, if he doesn't know the answer to something, he's not afraid to say, 'Let me look into that'…and he does! There is also good follow through with Brian and Savannah! I love that they all really take the time to learn about what is going on with my health…so I can take better care of myself! Not like what often happens in a typical setting…where the epic screen drives any conversation. Dr Rosenberg manages the number of patients he has, so he knows each of us! Thanks Lotus Direct Health!",
    rating: 5,
    date: "2024-07-01",
    featured: true,
  },
  {
    id: "4",
    patientName: "Geoffrey V.",
    condition: "Addiction Recovery & Primary Care",
    review: "Dr. Rosenberg has literally saved my life and given me another chance at a happy and successful life. Not only does he take care of all of my primary care needs, but he has me on suboxone and as a 52 year old man I can't thank them enough. Dr Rosenberg and his staff have been amazing!!!",
    rating: 5,
    date: "2021-12-01",
    featured: true,
  },
  {
    id: "5",
    patientName: "Andrea G.",
    condition: "Comprehensive Medical Care",
    review: "I seen Dr. Rosenberg today. As a RN for 14 years, and working with many Doctors over the years, he is beyond exceptional. As a new patient, I felt he listened to everything compassionately/patiently, explained things thoroughly, and truly cared about my medical issues. Not only was he great, but his staff are too! Brian his medical assistant was so sweet, and Savannah at the front desk was very helpful and patient! I am so blessed to have found this clinic! My son and husband will definitely be going to Dr. Rosenberg now too!",
    rating: 5,
    date: "2019-12-01",
  },
  {
    id: "6",
    patientName: "Robert P.",
    condition: "Addiction Medicine",
    review: "Dr. Rosenberg is excellent. Very smart and professional. He has showed true caring and consideration in my two plus years of treatment. He and his staff have been very professional during my treatment. Dr. Rosenberg's 'harm reduction' method of treatment has been effective in my recovery. Dr. Rosenberg is considerate and kind while guiding a patient through the difficult process of recovery. I highly recommend Dr. Rosenberg and his staff.",
    rating: 5,
    date: "2021-06-01",
  },
  {
    id: "7",
    patientName: "Deb G.",
    condition: "Functional Medicine",
    review: "Best decision I ever made for my health was switching to Dr Aaron. His knowledge of health issues is impressive and he quick to resolve any that come up. The care received from the big clinics doesn't even come close to the meaningful care I receive from this office. Thank you!",
    rating: 5,
    date: "2024-07-01",
  },
  {
    id: "8",
    patientName: "David C.",
    condition: "Primary Care Excellence",
    review: "Doctor Rosenberg is the most compassionate and knowledgeable doctor I've ever had. The entire staff (special shout out to Brian and Savannah) truly care for their patients. Dr. Rosenberg and his practice are very responsive and thorough. I recommend to anyone who will listen.",
    rating: 5,
    date: "2022-12-01",
  },
  {
    id: "9",
    patientName: "Katrina J.",
    condition: "Functional Medicine Diagnosis",
    review: "My experience with Dr Rosenberg has been wonderful. His office staff is amazing, and he is an absolute professional. He found things that no one else did. He has experience as a PCP but uses a functional medicine approach. This is so effective! I am now a patient for life.",
    rating: 5,
    date: "2023-12-01",
  },
  {
    id: "10",
    patientName: "Amanda K.",
    condition: "Personalized Healthcare",
    review: "After many horrible experiences with multiple PCP's, I was referred to Dr. Rosenberg. I've been seeing him now for 4 months and I have had such an incredible experience. I would recommend him to everyone. Honestly is the best doctor out there. He genuinely cares about you and takes the time to listen and discuss. Sincerely wish I started seeing him much sooner!",
    rating: 5,
    date: "2024-07-01",
  },
  {
    id: "11",
    patientName: "Ashley S.",
    condition: "Family Care",
    review: "I have been a patient of Dr. Rosenberg for about 2 years and am so happy with the care I have received. He and his staff (including the billing department) are so kind, understanding, and helpful. Being a mother of two young children, I appreciate their flexibility and ease of making appointments when I need them. Dr. Rosenberg and his staff are AMAZING!!!",
    rating: 5,
    date: "2021-12-01",
  },
  {
    id: "12",
    patientName: "Mary G.",
    condition: "Comfortable Care Environment",
    review: "Dr. Rosenberg is a great doctor. He is relaxed enough to talk to like a friend but professional and competent enough to be a trusted physician. Very glad I found his practice.",
    rating: 5,
    date: "2020-12-01",
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