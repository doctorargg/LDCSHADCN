import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  HeartHandshake,
  Leaf,
  Brain,
  Activity,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  FlaskConical,
  Users,
  Shield,
  Heart,
  Sun
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrative Therapies | Lotus Direct Care - Best of Both Worlds',
  description: 'Experience the perfect blend of conventional and natural medicine with Integrative Therapies at Lotus Direct Care. Personalized treatment plans combining evidence-based medicine with holistic healing in Mequon, WI.',
  keywords: 'integrative medicine, holistic healthcare, natural therapies, conventional medicine, Dr. Aaron Rosenberg, Mequon, Wisconsin, nutrition therapy, lifestyle medicine, mind-body medicine',
  openGraph: {
    title: 'Integrative Therapies | Lotus Direct Care',
    description: 'Combining the best of conventional and natural medicine for optimal healing and wellness.',
    url: 'https://lotusdirectcare.com/services/integrative-therapies',
  },
}

const therapyTypes = [
  {
    icon: Leaf,
    title: 'Nutritional Medicine',
    description: 'Therapeutic nutrition protocols tailored to your unique needs',
    approaches: [
      'Medical nutrition therapy',
      'Anti-inflammatory diets',
      'Metabolic optimization',
      'Therapeutic fasting protocols'
    ]
  },
  {
    icon: FlaskConical,
    title: 'Evidence-Based Supplements',
    description: 'Pharmaceutical-grade supplements with proven effectiveness',
    approaches: [
      'Targeted nutraceuticals',
      'Herbal medicine',
      'Orthomolecular therapy',
      'Micronutrient optimization'
    ]
  },
  {
    icon: Activity,
    title: 'Lifestyle Medicine',
    description: 'Science-backed lifestyle interventions for lasting change',
    approaches: [
      'Exercise prescription',
      'Sleep optimization',
      'Stress management',
      'Circadian rhythm support'
    ]
  },
  {
    icon: Brain,
    title: 'Mind-Body Techniques',
    description: 'Harness the power of the mind-body connection',
    approaches: [
      'Clinical mindfulness',
      'Biofeedback therapy',
      'Breathwork protocols',
      'Therapeutic meditation'
    ]
  }
]

const conditions = [
  'Chronic Pain & Inflammation',
  'Digestive Disorders',
  'Anxiety & Depression',
  'Hormonal Imbalances',
  'Autoimmune Conditions',
  'Metabolic Syndrome',
  'Chronic Fatigue',
  'Fibromyalgia',
  'Migraines & Headaches',
  'Arthritis',
  'Cardiovascular Disease',
  'Diabetes & Pre-diabetes'
]

const benefits = [
  {
    title: 'Comprehensive Care',
    description: 'Address all aspects of your health - physical, mental, and emotional',
    icon: Shield
  },
  {
    title: 'Personalized Approach',
    description: 'Treatment plans tailored to your unique biology and lifestyle',
    icon: Users
  },
  {
    title: 'Evidence-Based',
    description: 'All therapies backed by scientific research and clinical experience',
    icon: Stethoscope
  },
  {
    title: 'Fewer Side Effects',
    description: 'Natural approaches often have minimal side effects compared to medications alone',
    icon: Heart
  }
]

export default function IntegrativeTherapiesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/u6683669286_httpss.mj.runnXIAXCQcAw0_Use_this_to_make_a_websi_995d475e-9ef2-497e-aa80-7ad4a490f562_2.png"
        imageAlt="Lotus flower symbolizing the integration of conventional and natural medicine at Lotus Direct Care"
        title="The Best of Both Worlds in Healthcare"
        subtitle="Experience the power of integrative medicine - where cutting-edge conventional treatments meet time-tested natural therapies. Get comprehensive care that addresses not just symptoms, but your whole person."
        showCTA={true}
        primaryCTAText="Explore Integrative Care"
        primaryCTAHref="#therapies"
        secondaryCTAText="Schedule Consultation"
        secondaryCTAHref="/contact"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <HeartHandshake className="w-4 h-4 mr-1" />
          Integrative Therapies
        </Badge>
      </HeroWithImage>

      {/* What is Integrative Medicine */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What Are Integrative Therapies?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Integrative therapies combine the best of conventional medicine with evidence-based 
                  natural and holistic approaches. This comprehensive model recognizes that optimal 
                  health requires more than just treating symptoms - it requires addressing the whole 
                  person.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  At Lotus Direct Care, we bridge the gap between traditional medical care and 
                  complementary therapies, creating personalized treatment plans that work 
                  synergistically to promote healing and prevent disease.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Holistic Integration</h3>
                      <p className="text-gray-600">
                        Seamlessly blending conventional and natural approaches
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Evidence-Based Care</h3>
                      <p className="text-gray-600">
                        All therapies backed by scientific research and clinical data
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Patient-Centered</h3>
                      <p className="text-gray-600">
                        Your preferences and values guide every treatment decision
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-gradient-to-br from-teal-50 to-green-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl">The Integrative Advantage</CardTitle>
                  <CardDescription className="text-gray-700">
                    Why choose between conventional and natural when you can have both?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        <strong>Conventional Medicine:</strong> Diagnostics, medications, procedures when needed
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        <strong>Natural Therapies:</strong> Nutrition, supplements, lifestyle interventions
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">
                        <strong>Mind-Body Medicine:</strong> Stress reduction, mindfulness, healing practices
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white/70 rounded-lg">
                    <p className="text-sm text-gray-600 italic">
                      "The goal is not to replace conventional medicine, but to enhance it with 
                      complementary approaches that support your body's natural healing abilities."
                    </p>
                    <p className="text-sm text-gray-500 mt-2">- Dr. Aaron Rosenberg</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Therapies */}
      <section id="therapies" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Integrative Therapy Offerings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive toolkit of evidence-based therapies to support your healing journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {therapyTypes.map((therapy, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <therapy.icon className="w-8 h-8 text-teal-600" />
                    <Badge variant="outline">Integrative Therapy</Badge>
                  </div>
                  <CardTitle className="text-xl mt-4">{therapy.title}</CardTitle>
                  <CardDescription>{therapy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {therapy.approaches.map((approach, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                        {approach}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Philosophy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Treatment Philosophy
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We believe in treating the whole person, not just the disease
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Start with Least Invasive</h3>
                <p className="text-gray-600">
                  We always begin with the gentlest, most natural approaches before considering 
                  more aggressive interventions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaborative Care</h3>
                <p className="text-gray-600">
                  You're an active partner in your health journey, with full input into your 
                  treatment plan.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Root Cause Focus</h3>
                <p className="text-gray-600">
                  We don't just manage symptoms - we identify and address the underlying causes 
                  of your health issues.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-semibold mb-4">The Integrative Process</h3>
                <div className="grid md:grid-cols-4 gap-4 mt-8">
                  <div className="relative">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                        1
                      </div>
                      <p className="text-sm font-medium">Comprehensive Assessment</p>
                    </div>
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                        2
                      </div>
                      <p className="text-sm font-medium">Personalized Plan</p>
                    </div>
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                        3
                      </div>
                      <p className="text-sm font-medium">Integrated Therapies</p>
                    </div>
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-300 w-4 h-4" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      4
                    </div>
                    <p className="text-sm font-medium">Ongoing Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Benefits of Integrative Care
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience healthcare that works with your body, not against it
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur text-center">
                  <CardHeader>
                    <benefit.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Address */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Conditions We Address
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Integrative therapies are particularly effective for chronic and complex conditions
              </p>
            </div>

            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-4">
                  {conditions.map((condition, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                      <span className="text-gray-700">{condition}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Don't see your condition listed? Contact us to discuss how integrative therapies 
                    can help with your specific health concerns.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/contact">Discuss Your Condition</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to Experience Integrative Care?
                </h2>
                <p className="text-lg text-gray-600">
                  Take the first step towards comprehensive healing that addresses your whole person. 
                  Schedule a consultation with Dr. Rosenberg to explore how integrative therapies can 
                  transform your health journey.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive health assessment to understand your unique needs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized treatment plan combining conventional and natural approaches
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Ongoing support and adjustments to optimize your results
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  What is the difference between integrative and functional medicine?
                </h3>
                <p className="text-gray-600">
                  While both approaches are holistic, functional medicine focuses primarily on finding 
                  root causes through advanced testing. Integrative medicine combines conventional 
                  treatments with evidence-based complementary therapies. At Lotus Direct Care, we 
                  offer both approaches and often combine them for optimal results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Will integrative therapies interfere with my current medications?
                </h3>
                <p className="text-gray-600">
                  Safety is our top priority. We carefully review all your current medications and 
                  supplements to ensure there are no interactions. Many integrative therapies can 
                  actually enhance the effectiveness of conventional treatments or help reduce the 
                  need for certain medications over time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How do you ensure the therapies you recommend are evidence-based?
                </h3>
                <p className="text-gray-600">
                  Dr. Rosenberg stays current with the latest research in integrative medicine through 
                  continuing education, peer-reviewed journals, and professional associations. We only 
                  recommend therapies with strong scientific support and proven clinical effectiveness.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How long before I see results with integrative therapies?
                </h3>
                <p className="text-gray-600">
                  Results vary depending on your condition and the therapies used. Some patients 
                  experience improvements within days to weeks (especially with lifestyle changes), 
                  while others may need 2-3 months to see significant changes. We monitor your 
                  progress closely and adjust treatments as needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Are integrative therapies covered by insurance?
                </h3>
                <p className="text-gray-600">
                  Coverage varies by insurance plan. Some services, particularly those involving 
                  conventional medical care, may be covered. Many patients use HSA/FSA funds for 
                  integrative therapies. We provide detailed documentation to help you seek 
                  reimbursement when possible.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Have More Questions? Let's Talk</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow-lg p-4 z-40">
        <Button asChild className="w-full" size="lg">
          <Link href="/contact">Schedule Consultation</Link>
        </Button>
      </div>
    </>
  )
}