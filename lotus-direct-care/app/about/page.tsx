import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Users, 
  Heart, 
  Brain, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  BookOpen
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Lotus Direct Care',
  description: 'Learn about Lotus Direct Care, Dr. Aaron Rosenberg, and our patient-centered approach to comprehensive healthcare. Combining direct primary care with functional medicine and integrative therapies in Mequon, Wisconsin.',
  openGraph: {
    title: 'About Us | Lotus Direct Care',
    description: 'Learn about Lotus Direct Care, Dr. Aaron Rosenberg, and our patient-centered approach to comprehensive healthcare. Combining direct primary care with functional medicine and integrative therapies in Mequon, Wisconsin.',
    url: 'https://lotusdirectcare.com/about',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/u6683669286_httpss.mj.runnXIAXCQcAw0_Use_this_to_make_a_websi_875e0c6c-0eb2-4288-bc2a-a5de572245e3_0.png"
        imageAlt="Lotus flower representing the holistic approach of Lotus Direct Care"
        title="About Lotus Direct Care"
        subtitle="A revolutionary approach to healthcare that puts you first. We combine direct primary care accessibility with functional medicine principles, longevity medicine, and integrative therapies for comprehensive care."
        showCTA={true}
        primaryCTAText="Meet Dr. Rosenberg"
        primaryCTAHref="/about/dr-rosenberg"
        secondaryCTAText="Our Approach"
        secondaryCTAHref="/about/approach"
      />

      {/* Mission & Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To transform healthcare by providing personalized, comprehensive medical care that 
                  addresses the root causes of illness and promotes optimal wellness. We believe in 
                  empowering our patients with the knowledge and tools they need to achieve lasting health.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personalized treatment plans tailored to your unique needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Evidence-based functional medicine approaches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Direct access to your physician when you need it</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We envision a healthcare system where every patient receives the time, attention, 
                  and comprehensive care they deserve. By combining cutting-edge diagnostic tools with 
                  time-tested healing principles, we're creating a new standard for medical excellence.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600 mb-1">10+</div>
                    <div className="text-sm text-gray-600">Years of Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600 mb-1">1000+</div>
                    <div className="text-sm text-gray-600">Lives Transformed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600 mb-1">95%</div>
                    <div className="text-sm text-gray-600">Patient Satisfaction</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-teal-600 mb-1">After-hours</div>
                    <div className="text-sm text-gray-600">Member Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do at Lotus Direct Care
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Heart className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We treat every patient with empathy, understanding, and genuine care for their wellbeing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Brain className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We stay at the forefront of medical science to bring you the most effective treatments.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Users className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Partnership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We work collaboratively with our patients to achieve their health goals together.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Sparkles className="w-10 h-10 text-teal-600 mb-3" />
                  <CardTitle className="text-xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We maintain the highest standards in everything we do, from diagnosis to treatment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Lotus Direct Care?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience healthcare the way it should be - personalized, accessible, and effective
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Personalized Care Plans
                </h3>
                <p className="text-gray-600">
                  Every patient receives a customized treatment plan based on their unique health profile, 
                  genetics, and lifestyle factors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Licensed Medical Excellence
                </h3>
                <p className="text-gray-600">
                  Dr. Rosenberg brings over 20 years of experience and multiple certifications in 
                  functional and integrative medicine.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Evidence-Based Approach
                </h3>
                <p className="text-gray-600">
                  We combine the latest scientific research with proven natural therapies to deliver 
                  optimal health outcomes.
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
              Ready to Experience Healthcare Differently?
            </h2>
            <p className="text-lg text-teal-50 mb-8">
              Join our practice and discover what personalized, patient-centered care really means.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
                <Link href="/membership">
                  View Membership Plans
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}