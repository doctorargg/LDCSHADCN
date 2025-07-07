import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Brain,
  Shield,
  Clock,
  Heart,
  Activity,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Users,
  Microscope,
  TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ketamine Therapy | Lotus Direct Care - Innovative Depression Treatment',
  description: 'Discover breakthrough ketamine therapy for treatment-resistant depression, anxiety, PTSD, and chronic pain at Lotus Direct Care in Mequon, WI. Safe, effective, medically supervised treatments.',
  keywords: 'ketamine therapy, treatment-resistant depression, PTSD treatment, chronic pain relief, ketamine infusion, mental health treatment, Dr. Aaron Rosenberg, Mequon, Wisconsin',
  openGraph: {
    title: 'Ketamine Therapy | Lotus Direct Care',
    description: 'Revolutionary treatment for depression, anxiety, PTSD, and chronic pain with rapid results.',
    url: 'https://lotusdirectcare.com/services/ketamine-therapy',
  },
}

const conditions = [
  'Treatment-Resistant Depression',
  'Major Depressive Disorder',
  'Bipolar Depression',
  'Post-Traumatic Stress Disorder (PTSD)',
  'Generalized Anxiety Disorder',
  'Social Anxiety Disorder',
  'Chronic Pain Syndromes',
  'Fibromyalgia',
  'Complex Regional Pain Syndrome',
  'Neuropathic Pain',
  'Migraines',
  'Suicidal Ideation'
]

const benefits = [
  {
    title: 'Rapid Relief',
    description: 'Many patients experience improvement within hours to days, not weeks',
    icon: Clock
  },
  {
    title: 'High Success Rate',
    description: 'Up to 70% response rate in treatment-resistant cases',
    icon: TrendingUp
  },
  {
    title: 'Safe & Monitored',
    description: 'Medical supervision throughout your treatment',
    icon: Shield
  },
  {
    title: 'Lasting Results',
    description: 'Effects can last weeks to months with maintenance',
    icon: Heart
  }
]

const treatmentProcess = [
  {
    step: '1',
    title: 'Comprehensive Evaluation',
    description: 'Thorough assessment of your medical history, current medications, and treatment goals.'
  },
  {
    step: '2',
    title: 'Personalized Protocol',
    description: 'Custom treatment plan based on your specific condition and response patterns.'
  },
  {
    step: '3',
    title: 'Monitored Sessions',
    description: 'Comfortable, supervised treatments in our relaxing medical setting.'
  },
  {
    step: '4',
    title: 'Integration Support',
    description: 'Follow-up care and maintenance planning for lasting results.'
  }
]

const protocols = [
  {
    title: 'Depression Protocol',
    sessions: '6 sessions over 2-3 weeks',
    description: 'Intensive initial series followed by maintenance as needed',
    conditions: ['Major Depression', 'Treatment-Resistant Depression', 'Bipolar Depression']
  },
  {
    title: 'PTSD Protocol',
    sessions: '6-8 sessions over 3-4 weeks',
    description: 'Specialized dosing for trauma-related symptoms',
    conditions: ['PTSD', 'Complex Trauma', 'Acute Stress Disorder']
  },
  {
    title: 'Pain Management Protocol',
    sessions: '4-6 sessions, frequency varies',
    description: 'Lower doses over longer duration for chronic pain',
    conditions: ['Fibromyalgia', 'CRPS', 'Neuropathic Pain']
  },
  {
    title: 'Maintenance Protocol',
    sessions: 'Monthly or as needed',
    description: 'Sustain improvements with periodic booster sessions',
    conditions: ['All conditions after initial series']
  }
]

export default function KetamineTherapyPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-ketamine-therapy-hero.png"
        imageAlt="Lotus flower symbolizing mental health transformation through ketamine therapy"
        title="Revolutionary Treatment for Depression & Chronic Pain"
        subtitle="Experience rapid relief from treatment-resistant conditions with medically supervised ketamine therapy. When traditional treatments haven't worked, ketamine offers new hope with proven results."
        showCTA={true}
        primaryCTAText="Schedule Consultation"
        primaryCTAHref="#consultation"
        secondaryCTAText="Learn More"
        secondaryCTAHref="#about"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <Brain className="w-4 h-4 mr-1" />
          Ketamine Therapy
        </Badge>
      </HeroWithImage>

      {/* What is Ketamine Therapy */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What is Ketamine Therapy?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Ketamine is a breakthrough treatment that works differently than traditional antidepressants. 
                  By targeting NMDA receptors and promoting neuroplasticity, ketamine can rapidly improve 
                  mood, reduce pain, and restore hope when other treatments have failed.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Originally used as an anesthetic, ketamine has been found to have remarkable effects on 
                  depression, anxiety, PTSD, and chronic pain at sub-anesthetic doses. It's particularly 
                  effective for treatment-resistant conditions.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <benefit.icon className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Conditions We Treat</CardTitle>
                  <CardDescription>
                    Ketamine therapy has shown remarkable results for these conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {conditions.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                  <Alert className="mt-6 border-teal-200 bg-teal-50">
                    <AlertCircle className="h-4 w-4 text-teal-600" />
                    <AlertDescription className="text-sm">
                      Ketamine therapy may be especially beneficial if you've tried multiple medications 
                      without success.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Science Behind Ketamine
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding how ketamine works differently than traditional treatments
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Brain className="w-10 h-10 text-teal-600 mb-4" />
                  <CardTitle>Rapid Neuroplasticity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ketamine promotes the growth of new neural connections, helping your brain 
                    form healthier patterns and pathways within hours to days.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Activity className="w-10 h-10 text-blue-600 mb-4" />
                  <CardTitle>NMDA Receptor Action</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    By blocking NMDA receptors, ketamine triggers a cascade of changes that 
                    increase glutamate and BDNF, key factors in mood regulation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Sparkles className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Anti-Inflammatory Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ketamine reduces brain inflammation linked to depression and chronic pain, 
                    addressing a root cause often missed by other treatments.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-semibold mb-6 text-center">Why Ketamine Works When Others Don't</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Traditional Antidepressants</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      Target serotonin, dopamine, or norepinephrine
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      Take 4-6 weeks to show effects
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      30-40% of patients don't respond
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      Limited effect on neuroplasticity
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Ketamine Therapy</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600">✓</span>
                      Targets glutamate system and NMDA receptors
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600">✓</span>
                      Rapid effects within hours to days
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600">✓</span>
                      70% response rate in treatment-resistant cases
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600">✓</span>
                      Promotes rapid neuroplasticity and healing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Treatment Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A personalized, supportive approach to ketamine therapy
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatmentProcess.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-lg p-6 h-full hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600 font-bold text-xl">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                  {index < treatmentProcess.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Protocols */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Treatment Protocols
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Evidence-based protocols tailored to your specific condition
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {protocols.map((protocol, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{protocol.title}</CardTitle>
                      <Badge variant="outline" className="ml-2">{protocol.sessions}</Badge>
                    </div>
                    <CardDescription>{protocol.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Effective for:</p>
                      {protocol.conditions.map((condition, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-teal-600 rounded-full" />
                          {condition}
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

      {/* What to Expect */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              What to Expect During Treatment
            </h2>

            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl">Before Your Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">Preparation is key to a successful treatment:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Fast for 4 hours before treatment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Arrange transportation (no driving for 24 hours)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Wear comfortable clothing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Set positive intentions for healing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl">During Your Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">Your comfort and safety are our priorities:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Relaxing, private treatment room</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Continuous vital sign monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>40-60 minute infusion period</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Option for music or guided meditation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-xl">After Your Session</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600">Recovery and integration support:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>30-minute recovery period</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Light refreshments provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Integration guidance and resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Follow-up check within 24-48 hours</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Monitoring */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Safety & Medical Supervision
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your safety is our top priority throughout your treatment journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <Shield className="w-10 h-10 text-teal-600 mb-4" />
                    <CardTitle>Comprehensive Safety Protocols</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Pre-treatment medical screening and lab work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Continuous vital sign monitoring during infusions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Emergency protocols and equipment on-site</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>Physician supervision throughout treatment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription>
                    <strong>Important:</strong> Ketamine therapy is not appropriate for everyone. 
                    Contraindications include uncontrolled hypertension, active psychosis, and certain 
                    heart conditions. A thorough medical evaluation is required.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">Who Can Benefit?</h3>
                <p className="text-gray-600">
                  Ketamine therapy may be right for you if:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      You've tried multiple antidepressants without adequate relief
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      You need rapid relief from severe symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Traditional treatments cause intolerable side effects
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      You're struggling with both mood and chronic pain
                    </span>
                  </li>
                </ul>
              </div>
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
                Patient Success Stories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real experiences from patients who found hope through ketamine therapy
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Depression</Badge>
                  </div>
                  <CardTitle className="text-lg">Finding Light Again</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "After 20 years of depression and trying every medication, I was ready to give up. 
                    Ketamine gave me my life back. The fog lifted, and I could finally see hope again."
                  </p>
                  <p className="text-sm text-gray-500">- Mark T., Age 45</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">PTSD</Badge>
                  </div>
                  <CardTitle className="text-lg">Trauma Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "My PTSD was ruining my life. After just 3 ketamine sessions, I stopped having 
                    nightmares for the first time in years. I can finally move forward."
                  </p>
                  <p className="text-sm text-gray-500">- Sarah L., Age 38</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">Chronic Pain</Badge>
                  </div>
                  <CardTitle className="text-lg">Pain-Free Living</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic mb-4">
                    "Fibromyalgia had me bedridden. Ketamine not only reduced my pain but lifted 
                    the depression that came with it. I'm active again!"
                  </p>
                  <p className="text-sm text-gray-500">- Lisa M., Age 52</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section id="consultation" className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Take the First Step Toward Healing
                </h2>
                <p className="text-lg text-gray-600">
                  If you're struggling with treatment-resistant depression, anxiety, PTSD, or chronic 
                  pain, ketamine therapy could be the breakthrough you've been searching for. Schedule 
                  a consultation with Dr. Rosenberg to see if you're a candidate.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive evaluation to determine if ketamine is right for you
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized treatment plan based on your specific needs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Ongoing support throughout your healing journey
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
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is ketamine therapy safe?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  When administered by qualified medical professionals in a controlled setting, ketamine 
                  therapy is very safe. We conduct thorough medical screening, monitor vital signs throughout 
                  treatment, and have emergency protocols in place. Side effects are typically mild and 
                  temporary.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How quickly will I see results?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Many patients experience improvement within hours to days after their first treatment. 
                  However, we typically recommend completing the initial series of 6 treatments to achieve 
                  optimal and lasting results. Response varies by individual and condition.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Will I need to stop my current medications?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  In most cases, you can continue your current medications during ketamine therapy. We'll 
                  review all your medications during the consultation and make recommendations. Some 
                  medications may need to be adjusted, but we never recommend stopping medications without 
                  consulting your prescribing physician.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What does ketamine treatment feel like?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Patients often describe a feeling of relaxation and mild dissociation during treatment. 
                  You may feel like you're floating or have an altered perception of time and space. These 
                  effects are temporary and typically fade within 30-60 minutes after the infusion ends. 
                  Many patients find the experience pleasant and therapeutic.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is ketamine therapy covered by insurance?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Currently, most insurance plans don't cover ketamine infusions for mental health conditions. 
                  However, we offer flexible payment options and can provide documentation for HSA/FSA 
                  reimbursement. We also offer payment plans to make treatment accessible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How long do the effects last?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  The duration of improvement varies by individual. After the initial series, many patients 
                  maintain benefits for several weeks to months. We develop personalized maintenance 
                  protocols, which may include booster infusions every 3-6 weeks or as needed to sustain 
                  your progress.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Ready to Learn More? Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 p-4 z-40">
        <Button asChild size="lg" className="w-full">
          <Link href="/contact">Schedule Consultation</Link>
        </Button>
      </div>
    </>
  )
}