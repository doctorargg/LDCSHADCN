import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Target,
  Search,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  Shield,
  Clock,
  Microscope,
  Brain,
  Users,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Beaker,
  FileText,
  MessageCircle,
  Heart
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Approach | Lotus Direct Care',
  description: 'Discover our unique approach to healthcare that combines functional medicine with direct primary care for personalized, comprehensive treatment.',
  openGraph: {
    title: 'Our Approach | Lotus Direct Care',
    description: 'Discover our unique approach to healthcare that combines functional medicine with direct primary care for personalized, comprehensive treatment.',
    url: 'https://lotusdirectcare.com/about/approach',
  },
}

export default function ApproachPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-prp-injections-hero.png"
        imageAlt="Lotus flower symbolizing our holistic approach to healthcare"
        title="Our Approach to Healthcare"
        subtitle="A revolutionary model that combines the best of functional medicine with the personalized attention of direct primary care. We don't just treat symptoms - we optimize your entire health."
        showCTA={false}
      />

      {/* The Lotus Method */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Lotus Method: Your Journey to Optimal Health
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our systematic approach ensures nothing is overlooked in your path to wellness. 
                Each step builds upon the last, creating a comprehensive picture of your health.
              </p>
            </div>
            
            {/* Process Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-teal-600" />
                    Comprehensive Discovery
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We begin with an in-depth consultation that goes far beyond a typical medical history. 
                    We explore your health goals, lifestyle, stress levels, sleep patterns, nutrition, 
                    and environmental factors.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">90-Minute Initial Visit</h4>
                      <p className="text-sm text-gray-600">Thorough health assessment</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">Detailed Health Timeline</h4>
                      <p className="text-sm text-gray-600">Understanding your health journey</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">Lifestyle Analysis</h4>
                      <p className="text-sm text-gray-600">Identifying key factors</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Step 2 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Microscope className="w-5 h-5 text-teal-600" />
                    Advanced Diagnostics
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We utilize cutting-edge laboratory testing that goes beyond standard panels. 
                    Our comprehensive testing reveals hidden imbalances and provides insights into 
                    your unique biochemistry.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Comprehensive metabolic panels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Advanced hormone testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Micronutrient analysis</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Genetic testing when indicated</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Gut microbiome assessment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">Inflammatory markers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Step 3 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-teal-600" />
                    Personalized Treatment Plan
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Based on your unique results and goals, we create a customized treatment protocol 
                    that may include lifestyle modifications, targeted supplementation, hormone optimization, 
                    and other evidence-based interventions.
                  </p>
                  <div className="bg-teal-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Your Personalized Plan Includes:</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Nutritional recommendations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Exercise prescriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Stress management techniques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Sleep optimization strategies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Targeted supplementation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-teal-600" />
                        <span className="text-sm text-gray-700">Medication when necessary</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Step 4 */}
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HeartHandshake className="w-5 h-5 text-teal-600" />
                    Ongoing Partnership & Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your health journey doesn't end with a prescription. We provide continuous support, 
                    regular check-ins, and plan adjustments as needed. You have direct access to 
                    Dr. Rosenberg whenever questions arise.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-0 shadow-md">
                      <CardHeader className="pb-3">
                        <MessageCircle className="w-8 h-8 text-teal-600 mb-2" />
                        <CardTitle className="text-lg">Direct Communication</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Text, email, or call when you need guidance</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                      <CardHeader className="pb-3">
                        <Clock className="w-8 h-8 text-teal-600 mb-2" />
                        <CardTitle className="text-lg">Regular Follow-ups</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Scheduled check-ins to monitor progress</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 shadow-md">
                      <CardHeader className="pb-3">
                        <TrendingUp className="w-8 h-8 text-teal-600 mb-2" />
                        <CardTitle className="text-lg">Plan Optimization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">Continuous refinement based on results</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Makes Our Approach Different
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We've reimagined healthcare from the ground up, focusing on what truly matters: 
                your health outcomes and quality of life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Traditional Medicine</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">7-15 minute appointments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">Focus on symptom management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">Limited access to physician</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">Insurance-driven care decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">Basic lab testing only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-gray-600">Reactive approach to health</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-2xl shadow-lg text-white">
                <h3 className="text-2xl font-bold mb-6">The Lotus Direct Care Way</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>60-90 minute appointments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Root cause investigation & resolution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>After-hours and weekend access to Dr. Rosenberg via dedicated communication app</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Patient-centered care decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Comprehensive advanced testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Proactive prevention & optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Core Principles of Our Practice
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These foundational principles guide every interaction and treatment decision
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Target className="w-12 h-12 text-teal-600 mb-4" />
                  <CardTitle className="text-xl">Precision Medicine</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Your treatment is as unique as your fingerprint. We use advanced diagnostics 
                    and genetic insights to create protocols specifically designed for your biology.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Brain className="w-12 h-12 text-teal-600 mb-4" />
                  <CardTitle className="text-xl">Integrative Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We combine the best of conventional medicine with evidence-based natural 
                    therapies, nutrition, and lifestyle medicine for comprehensive healing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Shield className="w-12 h-12 text-teal-600 mb-4" />
                  <CardTitle className="text-xl">Preventive Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Why wait for disease to develop? We identify and address risk factors early, 
                    helping you maintain optimal health throughout your life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence-Based Methods */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Evidence-Based Treatment Methods
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We utilize a comprehensive toolkit of proven therapies and interventions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Beaker className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Laboratory Testing</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive panels that reveal hidden imbalances and guide targeted treatment
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <FileText className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Nutritional Optimization</h3>
                <p className="text-sm text-gray-600">
                  Personalized nutrition plans based on your genetics and metabolic needs
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Heart className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Bioidentical Hormones</h3>
                <p className="text-sm text-gray-600">
                  Safe, effective hormone optimization for vitality and wellbeing
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Brain className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Mind-Body Medicine</h3>
                <p className="text-sm text-gray-600">
                  Stress reduction techniques and mental health support for total wellness
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Lifestyle Medicine</h3>
                <p className="text-sm text-gray-600">
                  Exercise prescriptions, sleep optimization, and habit transformation
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Targeted Supplementation</h3>
                <p className="text-sm text-gray-600">
                  Evidence-based nutraceuticals chosen specifically for your needs
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
              Experience Healthcare That Actually Works
            </h2>
            <p className="text-lg text-teal-50 mb-8">
              Join us in revolutionizing your health journey with our proven approach to wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-gray-100">
                <Link href="/contact">
                  Schedule Your Discovery Call
                  <ArrowRight className="ml-2 h-4 w-4" />
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