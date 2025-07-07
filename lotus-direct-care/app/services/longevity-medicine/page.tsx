import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Activity, 
  Dna,
  Timer,
  TrendingUp,
  Battery,
  Brain,
  CheckCircle2,
  ArrowRight,
  Heart,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Longevity Medicine | Lotus Direct Care - Optimize Your Healthspan',
  description: 'Extend your healthspan with cutting-edge longevity medicine at Lotus Direct Care. Biological age testing, preventive protocols, and optimization strategies in Mequon, WI.',
  keywords: 'longevity medicine, healthspan, biological age, anti-aging, preventive medicine, Dr. Aaron Rosenberg, Mequon, Wisconsin, age optimization, longevity protocols',
  openGraph: {
    title: 'Longevity Medicine | Lotus Direct Care',
    description: 'Science-based strategies to optimize your healthspan and add life to your years.',
    url: 'https://lotusdirectcare.com/services/longevity-medicine',
  },
}

const pillars = [
  {
    icon: Dna,
    title: 'Genetic Optimization',
    description: 'Leverage your genetic blueprint to personalize prevention strategies and optimize cellular function.'
  },
  {
    icon: Battery,
    title: 'Metabolic Health',
    description: 'Optimize energy production, insulin sensitivity, and metabolic flexibility for sustained vitality.'
  },
  {
    icon: Brain,
    title: 'Cognitive Enhancement',
    description: 'Protect and enhance brain function to maintain mental sharpness throughout life.'
  },
  {
    icon: Heart,
    title: 'Cardiovascular Health',
    description: 'Advanced cardiovascular risk assessment and prevention beyond standard care.'
  },
  {
    icon: Shield,
    title: 'Immune Resilience',
    description: 'Build a robust immune system that protects without overreacting.'
  },
  {
    icon: Timer,
    title: 'Cellular Regeneration',
    description: 'Support cellular repair mechanisms and slow the aging process at its core.'
  }
]

const biomarkers = [
  {
    category: 'Metabolic Health',
    tests: ['HbA1c & Insulin', 'Lipid particle analysis', 'Inflammatory markers', 'Oxidative stress']
  },
  {
    category: 'Hormonal Balance',
    tests: ['Complete hormone panel', 'Thyroid optimization', 'Growth hormone markers', 'Stress hormones']
  },
  {
    category: 'Cellular Health',
    tests: ['Telomere length', 'Mitochondrial function', 'DNA methylation age', 'Cellular senescence']
  },
  {
    category: 'Nutrient Status',
    tests: ['Micronutrient analysis', 'Omega-3 index', 'Vitamin D optimization', 'Antioxidant capacity']
  }
]

const protocols = [
  {
    title: 'Precision Nutrition',
    description: 'Personalized nutrition based on genetics, biomarkers, and metabolic type',
    features: ['Nutrigenomics', 'Intermittent fasting', 'Targeted supplementation']
  },
  {
    title: 'Movement Optimization',
    description: 'Exercise prescriptions for longevity, not just fitness',
    features: ['VO2 max improvement', 'Strength preservation', 'Flexibility & balance']
  },
  {
    title: 'Sleep & Recovery',
    description: 'Optimize the critical regeneration that happens during sleep',
    features: ['Sleep architecture', 'Circadian rhythm', 'Recovery protocols']
  },
  {
    title: 'Stress Resilience',
    description: 'Build capacity to handle stress without accelerating aging',
    features: ['HRV optimization', 'Meditation practices', 'Hormesis strategies']
  }
]

export default function LongevityMedicinePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/artistic_lotus_hero.png"
        imageAlt="Artistic lotus flower symbolizing longevity and vitality"
        title="Add Life to Your Years, Not Just Years to Your Life"
        subtitle="Discover science-based strategies to optimize your healthspan, slow biological aging, and maintain peak performance at every stage of life."
        showCTA={false}
      />

      {/* What is Longevity Medicine */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The Science of Living Better, Longer
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Longevity medicine goes beyond treating disease to optimize every aspect of your health. 
                  Using cutting-edge diagnostics and evidence-based interventions, we help you maintain 
                  vitality, cognitive function, and physical performance throughout your life.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our approach is rooted in the latest research on aging biology, combining advanced 
                  testing with personalized protocols to slow aging at the cellular level.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Optimize Healthspan</h3>
                      <p className="text-gray-600">
                        Maximize the years you live in excellent health
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Data-Driven Decisions</h3>
                      <p className="text-gray-600">
                        Track biomarkers that predict future health outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Peak Performance</h3>
                      <p className="text-gray-600">
                        Maintain energy, strength, and mental clarity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Biological Age Assessment</CardTitle>
                  <CardDescription>
                    Discover how old your body really is with comprehensive testing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">What We Measure:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Epigenetic age via DNA methylation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Telomere length analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Metabolic age assessment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Cardiovascular age</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        <span>Cognitive function testing</span>
                      </li>
                    </ul>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/contact">Schedule Your Assessment</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Six Pillars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Six Pillars of Longevity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach addresses every aspect of healthy aging
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{pillar.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Advanced Testing */}
      <section id="assessment" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Advanced Biomarker Testing
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Go beyond standard labs with comprehensive testing that reveals your true biological age 
                and identifies areas for optimization
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {biomarkers.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {category.tests.map((test, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full" />
                          <span className="text-sm text-gray-600">{test}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-gray-600 mb-6">
                All testing is interpreted in the context of optimal ranges, not just "normal" ranges
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Start Your Testing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Protocols */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Personalized Longevity Protocol
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Evidence-based interventions tailored to your unique biology and goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {protocols.map((protocol, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{protocol.title}</CardTitle>
                    <CardDescription>{protocol.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {protocol.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Cutting-Edge Technology & Therapies
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access the latest advances in longevity science
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <Badge className="mb-2 w-fit">Advanced Therapies</Badge>
                  <CardTitle>Regenerative Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Peptide therapy protocols</li>
                    <li>• NAD+ optimization</li>
                    <li>• Mitochondrial support</li>
                    <li>• Cellular rejuvenation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <Badge className="mb-2 w-fit">Monitoring Tools</Badge>
                  <CardTitle>Continuous Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Wearable device integration</li>
                    <li>• Biomarker tracking app</li>
                    <li>• Progress dashboards</li>
                    <li>• Regular reassessments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <Badge className="mb-2 w-fit">Optimization</Badge>
                  <CardTitle>Performance Enhancement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Cognitive enhancement</li>
                    <li>• Physical optimization</li>
                    <li>• Recovery protocols</li>
                    <li>• Stress adaptation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Measurable Results
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our patients see real, quantifiable improvements in their biological age and health markers
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-4xl font-bold text-purple-600 mb-2">5-10</p>
                <p className="text-gray-600">Years reduction in biological age</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-4xl font-bold text-purple-600 mb-2">40%</p>
                <p className="text-gray-600">Improvement in energy levels</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-4xl font-bold text-purple-600 mb-2">60%</p>
                <p className="text-gray-600">Better sleep quality</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-4xl font-bold text-purple-600 mb-2">35%</p>
                <p className="text-gray-600">Enhanced cognitive function</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Invest in Your Future Health Today
                </h2>
                <p className="text-lg text-gray-600">
                  The best time to start optimizing your healthspan is now. Join our longevity program 
                  and discover how young your body can feel at any age.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive biological age assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized longevity protocol based on your results
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Ongoing monitoring and optimization
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
                  Who is a good candidate for longevity medicine?
                </h3>
                <p className="text-gray-600">
                  Anyone interested in optimizing their health and preventing age-related decline. 
                  Whether you're 30 and want to maintain peak performance or 60 and want to reverse 
                  biological aging, our protocols can be tailored to your goals.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How often do I need testing?
                </h3>
                <p className="text-gray-600">
                  Initial comprehensive testing is followed by targeted reassessments every 3-6 months. 
                  This allows us to track progress and adjust your protocol based on results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  What kind of commitment is required?
                </h3>
                <p className="text-gray-600">
                  Longevity optimization requires consistent effort in nutrition, exercise, sleep, and 
                  stress management. We provide the roadmap and support; your commitment determines 
                  the results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Is this just about living longer?
                </h3>
                <p className="text-gray-600">
                  No, it's about living better. Our focus is on healthspan - the years you live in 
                  excellent health. The goal is to compress morbidity so you stay vital and active 
                  throughout your life.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Start Your Longevity Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}