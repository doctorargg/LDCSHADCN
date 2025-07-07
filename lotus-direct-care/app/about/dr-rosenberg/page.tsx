import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  GraduationCap, 
  Award, 
  Calendar,
  Heart,
  Brain,
  Stethoscope,
  BookOpen,
  Users,
  ArrowRight,
  CheckCircle,
  Quote
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dr. Aaron Rosenberg | Lotus Direct Care',
  description: 'Meet Dr. Aaron Rosenberg, valedictorian of the Autonomous University of Guadalajara medical program, UC Davis-trained internist, and functional medicine practitioner serving Mequon, WI.',
  openGraph: {
    title: 'Dr. Aaron Rosenberg | Lotus Direct Care',
    description: 'Meet Dr. Aaron Rosenberg, valedictorian of the Autonomous University of Guadalajara medical program, UC Davis-trained internist, and functional medicine practitioner serving Mequon, WI.',
    url: 'https://lotusdirectcare.com/about/dr-rosenberg',
  },
}

export default function DrRosenbergPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-ketamine-therapy-hero.png"
        imageAlt="Dr. Aaron Rosenberg - Board-Certified Physician & Functional Medicine Expert"
        title="Dr. Aaron Rosenberg"
        subtitle="Board-Certified Physician & Functional Medicine Expert with over 10 years of experience helping patients achieve optimal health through personalized, evidence-based treatments."
        showCTA={false}
      />

      {/* Professional Biography Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative">
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl transform rotate-3" />
                <div className="relative h-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-lotus-teal/10 to-lotus-gold/10">
                  {/* TODO: Replace with actual photo once PDF is converted to image format */}
                  <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-lotus-teal to-lotus-teal-dark flex items-center justify-center">
                      <span className="text-white text-5xl font-bold">AR</span>
                    </div>
                    <span className="text-gray-500 text-sm">Dr. Aaron Rosenberg, MD</span>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-100 rounded-full opacity-50" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-50" />
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Meet Your Doctor
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary">MD, Board Certified</Badge>
                  <Badge variant="secondary">Functional Medicine</Badge>
                  <Badge variant="secondary">Addiction Medicine</Badge>
                  <Badge variant="secondary">10+ Years Experience</Badge>
                </div>
              </div>
              
              <p className="text-lg text-gray-600">
                With more than a decade of experience in medicine, Dr. Rosenberg has dedicated his career 
                to understanding the root causes of illness and helping patients achieve optimal health 
                through personalized, evidence-based treatments. Fluent in both English and Spanish, 
                he brings a unique cross-cultural perspective to patient care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about/approach">
                    Our Approach
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Journey</h2>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Dr. Aaron Rosenberg's journey in medicine began with a simple yet profound belief: 
                healthcare should address the whole person, not just symptoms. As valedictorian of 
                the Autonomous University of Guadalajara medical program, he demonstrated exceptional 
                dedication to medical excellence. His cross-cultural medical training, including a 
                post-graduate internship at a public hospital in Guadalajara and residency in a 
                UC Davis-affiliated program, provided him with a unique global perspective on healthcare.
              </p>
              
              <p>
                Throughout his career, Dr. Rosenberg has been driven by a passion for understanding 
                the intricate connections between lifestyle, genetics, and health. This led him to 
                pursue additional certifications in functional medicine, addiction medicine, and 
                longevity medicine, making him uniquely qualified to address complex health challenges.
              </p>
              
              <p>
                Today, Dr. Rosenberg combines his extensive medical knowledge with a compassionate, 
                patient-centered approach. He believes in empowering patients with the knowledge and 
                tools they need to take control of their health and achieve lasting wellness.
              </p>
            </div>
            
            {/* Quote */}
            <div className="mt-12 p-8 bg-teal-50 rounded-2xl relative">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-teal-200" />
              <blockquote className="text-lg text-gray-700 italic">
                "I believe that every patient has the potential for optimal health. My role is to 
                guide them on that journey, using the best of modern medicine combined with time-tested 
                healing principles. When we address root causes rather than just symptoms, remarkable 
                transformations become possible."
              </blockquote>
              <cite className="block mt-4 text-gray-600 not-italic">
                - Dr. Aaron Rosenberg
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Credentials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Education & Credentials
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Education */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-teal-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Bachelor's Degree</h4>
                    <p className="text-gray-600">San Francisco State University</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900">Doctor of Medicine (MD)</h4>
                    <p className="text-gray-600">Autonomous University of Guadalajara</p>
                    <p className="text-sm text-gray-500">Valedictorian</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900">Post-Graduate Internship</h4>
                    <p className="text-gray-600">Public Hospital, Guadalajara, MX</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-gray-900">Internal Medicine Residency</h4>
                    <p className="text-gray-600">UC Davis-affiliated program, CA</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Certifications */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-teal-600" />
                    Board Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Internal Medicine</h4>
                      <p className="text-sm text-gray-600">American Board of Internal Medicine</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Functional Medicine</h4>
                      <p className="text-sm text-gray-600">Certification in progress – Institute for Functional Medicine</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Addiction Medicine</h4>
                      <p className="text-sm text-gray-600">American Board of Addiction Medicine</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Languages</h4>
                      <p className="text-sm text-gray-600">Fluent in English and Spanish</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Areas of Expertise
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Brain className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Functional Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Comprehensive approach to identifying and addressing root causes of disease, 
                    focusing on optimal functioning of the body and its systems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Heart className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Hormone Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Expert in balancing hormones naturally to improve energy, mood, metabolism, 
                    and overall quality of life for both men and women.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Stethoscope className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Chronic Disease Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Specialized in managing complex conditions like diabetes, autoimmune disorders, 
                    and cardiovascular disease through integrative approaches.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Calendar className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Longevity Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cutting-edge strategies to optimize healthspan and lifespan, including 
                    advanced diagnostics and personalized prevention protocols.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Users className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Addiction Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Compassionate, evidence-based treatment for substance use disorders, 
                    addressing both physical and psychological aspects of recovery.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Nutritional Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Advanced nutritional strategies and supplementation protocols tailored 
                    to individual biochemistry and health goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Personal Philosophy
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Dr. Rosenberg believes that true healing comes from understanding and addressing 
                the unique factors that contribute to each person's health challenges. His approach 
                goes beyond treating symptoms to identify and resolve underlying imbalances.
              </p>
              
              <p>
                "Every patient who walks through my door has a unique story, a unique biochemistry, 
                and unique health goals," says Dr. Rosenberg. "My job is to listen carefully, 
                investigate thoroughly, and create a personalized roadmap to optimal health."
              </p>
              
              <p>
                This philosophy extends to his practice model as well. By offering direct primary 
                care, Dr. Rosenberg ensures that his patients have the time and access they need 
                to achieve their health goals without the constraints of traditional insurance-based 
                medicine.
              </p>
            </div>
            
            {/* Key Principles */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-900 mb-3">Patient-Centered Care</h3>
                <p className="text-gray-600">
                  Every decision is made with the patient's best interests in mind, focusing on 
                  what matters most to them.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-900 mb-3">Evidence-Based Medicine</h3>
                <p className="text-gray-600">
                  Treatments are grounded in the latest scientific research while respecting 
                  time-tested healing traditions.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-900 mb-3">Collaborative Partnership</h3>
                <p className="text-gray-600">
                  Patients are active partners in their healthcare journey, empowered with 
                  knowledge and supported every step of the way.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-900 mb-3">Continuous Learning</h3>
                <p className="text-gray-600">
                  Medicine is constantly evolving, and Dr. Rosenberg stays at the forefront 
                  through ongoing education and research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Health Journey?
            </h2>
            <p className="text-lg text-teal-50 mb-8">
              Schedule a consultation with Dr. Rosenberg and discover how personalized medicine 
              can transform your health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}