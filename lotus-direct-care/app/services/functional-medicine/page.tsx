import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { createMedicalProcedureSchema, createFAQPageSchema, FUNCTIONAL_MEDICINE_SCHEMA } from '@/lib/schema'
import { 
  Brain, 
  Search,
  Beaker,
  Target,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Activity,
  ShieldCheck,
  Microscope
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Functional Medicine | Lotus Direct Care - Root Cause Healthcare',
  description: 'Discover the root causes of your health issues with Functional Medicine at Lotus Direct Care. Comprehensive testing, personalized protocols, and integrative treatments in Mequon, WI.',
  keywords: 'functional medicine, root cause analysis, integrative medicine, holistic healthcare, Dr. Aaron Rosenberg, Mequon, Wisconsin, comprehensive testing, personalized medicine',
  openGraph: {
    title: 'Functional Medicine | Lotus Direct Care',
    description: 'Address the root causes of chronic health issues with personalized functional medicine protocols.',
    url: 'https://lotusdirectcare.com/services/functional-medicine',
  },
}

const conditions = [
  'Chronic Fatigue & Low Energy',
  'Digestive Issues & IBS',
  'Hormonal Imbalances',
  'Autoimmune Conditions',
  'Thyroid Disorders',
  'Weight Management Issues',
  'Brain Fog & Memory Problems',
  'Chronic Pain & Inflammation',
  'Anxiety & Depression',
  'Skin Conditions',
  'Sleep Disorders',
  'Metabolic Syndrome'
]

const testingOptions = [
  {
    title: 'Comprehensive Blood Panel',
    description: 'Advanced biomarkers beyond standard labs',
    includes: ['Inflammatory markers', 'Nutrient levels', 'Metabolic function', 'Hormone panels']
  },
  {
    title: 'Gut Health Analysis',
    description: 'Complete microbiome and digestive assessment',
    includes: ['Microbiome mapping', 'Food sensitivities', 'Intestinal permeability', 'Digestive function']
  },
  {
    title: 'Genetic Testing',
    description: 'Personalized insights from your DNA',
    includes: ['Methylation pathways', 'Detox capacity', 'Nutrient metabolism', 'Disease risk factors']
  },
  {
    title: 'Environmental Toxin Testing',
    description: 'Identify harmful exposures affecting your health',
    includes: ['Heavy metals', 'Mold toxins', 'Chemical exposures', 'Oxidative stress']
  }
]

const approach = [
  {
    step: '1',
    title: 'Comprehensive Assessment',
    description: 'We start with an in-depth evaluation of your health history, symptoms, lifestyle, and goals.'
  },
  {
    step: '2',
    title: 'Advanced Testing',
    description: 'Targeted lab work to uncover hidden imbalances and root causes of your symptoms.'
  },
  {
    step: '3',
    title: 'Personalized Protocol',
    description: 'Custom treatment plan combining nutrition, supplements, lifestyle changes, and therapies.'
  },
  {
    step: '4',
    title: 'Ongoing Support',
    description: 'Regular follow-ups to monitor progress, adjust protocols, and ensure lasting results.'
  }
]

export default function FunctionalMedicinePage() {
  const procedureSchema = createMedicalProcedureSchema(FUNCTIONAL_MEDICINE_SCHEMA)
  
  const faqData = [
    {
      question: "How is functional medicine different from conventional medicine?",
      answer: "Functional medicine focuses on identifying and addressing root causes rather than just treating symptoms. We spend more time with patients, use advanced testing, and create personalized treatment plans that address the whole person."
    },
    {
      question: "How long does it take to see results?",
      answer: "Results vary depending on your condition and commitment to the protocol. Some patients notice improvements within weeks, while complex chronic conditions may take 3-6 months to see significant changes."
    },
    {
      question: "Is functional medicine covered by insurance?",
      answer: "Some services may be covered by insurance, and we can provide documentation for reimbursement. Many patients use HSA/FSA accounts. We also offer flexible payment plans to make care accessible."
    },
    {
      question: "Do I need to stop my current medications?",
      answer: "Never stop medications without consulting your prescribing physician. We work collaboratively with your other healthcare providers and may help reduce medication needs over time as your health improves."
    }
  ]
  
  const faqSchema = createFAQPageSchema(faqData)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-functional-medicine-hero.png"
        imageAlt="Lotus flower symbolizing holistic functional medicine approach at Lotus Direct Care"
        title="Discover the Root Cause of Your Health Issues"
        subtitle="Move beyond symptom management to true healing. Functional medicine identifies and addresses the underlying causes of disease using a systems-oriented, patient-centered approach."
        showCTA={true}
        primaryCTAText="Start Your Assessment"
        primaryCTAHref="#assessment"
        secondaryCTAText="Schedule Consultation"
        secondaryCTAHref="/contact"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <Brain className="w-4 h-4 mr-1" />
          Functional Medicine
        </Badge>
      </HeroWithImage>

      {/* What is Functional Medicine */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What is Functional Medicine?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Functional medicine is a personalized, systems-oriented model that empowers patients and 
                  practitioners to work together to address the underlying causes of disease and promote 
                  optimal wellness.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Rather than treating symptoms in isolation, we look at the complex web of interactions 
                  in your body's systems, genetics, environment, and lifestyle that can influence long-term 
                  health and chronic disease.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Search className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Investigative Approach</h3>
                      <p className="text-gray-600">
                        We dig deep to find the "why" behind your symptoms
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Targeted Solutions</h3>
                      <p className="text-gray-600">
                        Precise interventions based on your unique biochemistry
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <HeartHandshake className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Partnership in Healing</h3>
                      <p className="text-gray-600">
                        You're an active participant in your health journey
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Conditions We Address</CardTitle>
                  <CardDescription>
                    Functional medicine excels at treating complex, chronic conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Functional Medicine Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic process to uncover and address the root causes of your health concerns
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {approach.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600 font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  {index < approach.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testing Options */}
      <section id="assessment" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Testing & Diagnostics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We use cutting-edge laboratory testing to get a complete picture of your health
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testingOptions.map((test, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Microscope className="w-8 h-8 text-teal-600" />
                    <Badge variant="outline">Advanced Testing</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{test.title}</CardTitle>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {test.includes.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Modalities */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Personalized Treatment Protocols
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your healing plan is as unique as you are, combining the best of conventional and integrative therapies
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <Leaf className="w-10 h-10 text-green-600 mb-4" />
                  <CardTitle>Nutritional Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Food as medicine approach with personalized nutrition plans based on your genetics, 
                    lab results, and health goals.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Therapeutic diets</li>
                    <li>• Elimination protocols</li>
                    <li>• Nutrient optimization</li>
                    <li>• Meal planning support</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <Beaker className="w-10 h-10 text-blue-600 mb-4" />
                  <CardTitle>Targeted Supplementation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Evidence-based supplements and nutraceuticals to address deficiencies and support 
                    optimal function.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Pharmaceutical-grade supplements</li>
                    <li>• Bioidentical hormones</li>
                    <li>• Peptide therapy</li>
                    <li>• IV nutrient therapy</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <Activity className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Lifestyle Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Comprehensive lifestyle interventions to support healing and prevent disease recurrence.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Stress management</li>
                    <li>• Sleep optimization</li>
                    <li>• Movement therapy</li>
                    <li>• Mind-body practices</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Real Results for Real People
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how functional medicine has transformed the lives of our patients
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Digestive Health</Badge>
                  </div>
                  <CardTitle className="text-lg">Sarah's Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "After years of IBS symptoms, Dr. Rosenberg found multiple food sensitivities and 
                    gut imbalances. Within 3 months on my protocol, I'm symptom-free!"
                  </p>
                  <p className="text-sm text-gray-500">- Sarah M., Age 34</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Hormonal Balance</Badge>
                  </div>
                  <CardTitle className="text-lg">Jennifer's Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "My energy is back, brain fog is gone, and I finally feel like myself again. 
                    Functional medicine gave me my life back."
                  </p>
                  <p className="text-sm text-gray-500">- Jennifer T., Age 42</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Autoimmune</Badge>
                  </div>
                  <CardTitle className="text-lg">Michael's Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "My rheumatoid arthritis is in remission without harsh medications. The root cause 
                    approach made all the difference."
                  </p>
                  <p className="text-sm text-gray-500">- Michael R., Age 51</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Start Your Functional Medicine Journey
                </h2>
                <p className="text-lg text-gray-600">
                  Take the first step towards uncovering the root causes of your health challenges. 
                  Schedule a comprehensive consultation with Dr. Rosenberg and discover how functional 
                  medicine can help you achieve optimal wellness.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      90-minute initial consultation to understand your complete health picture
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive testing recommendations based on your symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized treatment plan with ongoing support
                    </span>
                  </li>
                </ul>
              </div>
              
              <div>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How is functional medicine different from conventional medicine?
                </h3>
                <p className="text-gray-600">
                  Functional medicine focuses on identifying and addressing root causes rather than just 
                  treating symptoms. We spend more time with patients, use advanced testing, and create 
                  personalized treatment plans that address the whole person. This approach works 
                  seamlessly with our <Link href="/services/direct-primary-care" className="text-teal-600 hover:text-teal-700 underline">direct primary care model</Link> 
                  and can be enhanced with <Link href="/services/integrative-therapies" className="text-teal-600 hover:text-teal-700 underline">integrative therapies</Link>.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How long does it take to see results?
                </h3>
                <p className="text-gray-600">
                  Results vary depending on your condition and commitment to the protocol. Some patients 
                  notice improvements within weeks, while complex chronic conditions may take 3-6 months 
                  to see significant changes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Is functional medicine covered by insurance?
                </h3>
                <p className="text-gray-600">
                  Some services may be covered by insurance, and we can provide documentation for 
                  reimbursement. Many patients use HSA/FSA accounts. We also offer flexible payment 
                  plans to make care accessible.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Do I need to stop my current medications?
                </h3>
                <p className="text-gray-600">
                  Never stop medications without consulting your prescribing physician. We work 
                  collaboratively with your other healthcare providers and may help reduce medication 
                  needs over time as your health improves.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Ready to Get Started? Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complementary Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Enhance your functional medicine journey with our other specialized treatments
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link href="/services/direct-primary-care" className="hover:text-teal-600 transition-colors">
                      Direct Primary Care
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Unlimited access to personalized primary care as your foundation for health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Build a strong doctor-patient relationship with unlimited visits and direct access 
                    to comprehensive primary care services.
                  </p>
                  <Link href="/services/direct-primary-care" 
                        className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link href="/services/integrative-therapies" className="hover:text-teal-600 transition-colors">
                      Integrative Therapies
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Combine conventional and natural medicine for comprehensive healing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Enhance your functional medicine protocols with evidence-based complementary 
                    therapies for optimal results.
                  </p>
                  <Link href="/services/integrative-therapies" 
                        className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-1">
                    Explore Options <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link href="/services/longevity-medicine" className="hover:text-teal-600 transition-colors">
                      Longevity Medicine
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Optimize healthspan and extend quality of life through personalized protocols
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Take your functional medicine journey further with cutting-edge longevity 
                    protocols designed to optimize aging.
                  </p>
                  <Link href="/services/longevity-medicine" 
                        className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-1">
                    Discover More <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}