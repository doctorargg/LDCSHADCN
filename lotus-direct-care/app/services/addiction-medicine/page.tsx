import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { CONTACT_INFO } from '@/lib/constants'
import { 
  Heart, 
  Shield,
  Users,
  Brain,
  Stethoscope,
  HandHeart,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sun,
  Phone,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Addiction Medicine | Lotus Direct Care - Compassionate Recovery Support',
  description: 'Evidence-based addiction medicine and recovery support at Lotus Direct Care. Medication-assisted treatment, holistic care, and long-term wellness in Mequon, WI.',
  keywords: 'addiction medicine, MAT, medication-assisted treatment, recovery, substance use disorder, Dr. Aaron Rosenberg, Mequon, Wisconsin, addiction recovery, holistic treatment',
  openGraph: {
    title: 'Addiction Medicine | Lotus Direct Care',
    description: 'Compassionate, evidence-based treatment for substance use disorders with a focus on whole-person healing.',
    url: 'https://lotusdirectcare.com/services/addiction-medicine',
  },
}

const treatmentApproach = [
  {
    icon: Stethoscope,
    title: 'Medical Stabilization',
    description: 'Safe, comfortable management of withdrawal and medical complications'
  },
  {
    icon: Brain,
    title: 'Medication-Assisted Treatment',
    description: 'FDA-approved medications to reduce cravings and support recovery'
  },
  {
    icon: HandHeart,
    title: 'Counseling Integration',
    description: 'Coordination with therapy and counseling services for comprehensive care'
  },
  {
    icon: Heart,
    title: 'Holistic Wellness',
    description: 'Address underlying health issues that contribute to substance use'
  },
  {
    icon: Users,
    title: 'Family Support',
    description: 'Resources and guidance for loved ones affected by addiction'
  },
  {
    icon: Sun,
    title: 'Long-Term Recovery',
    description: 'Ongoing support to maintain sobriety and build a fulfilling life'
  }
]

const substancesWeTreat = [
  'Alcohol Use Disorder',
  'Opioid Addiction',
  'Stimulant Use Disorder',
  'Benzodiazepine Dependence',
  'Cannabis Use Disorder',
  'Nicotine Addiction',
  'Prescription Drug Misuse',
  'Polysubstance Use'
]

const matOptions = [
  {
    medication: 'Buprenorphine/Suboxone',
    for: 'Opioid Use Disorder',
    benefits: ['Reduces cravings', 'Prevents withdrawal', 'Blocks opioid effects', 'Allows normal functioning']
  },
  {
    medication: 'Naltrexone',
    for: 'Alcohol & Opioid Use Disorder',
    benefits: ['Reduces cravings', 'Blocks rewarding effects', 'Monthly injection available', 'Non-addictive']
  },
  {
    medication: 'Acamprosate',
    for: 'Alcohol Use Disorder',
    benefits: ['Reduces cravings', 'Supports abstinence', 'Restores brain balance', 'Well-tolerated']
  },
  {
    medication: 'Disulfiram',
    for: 'Alcohol Use Disorder',
    benefits: ['Deters drinking', 'Supports commitment', 'Daily accountability', 'Effective deterrent']
  }
]

const recoveryPhases = [
  {
    phase: 'Initial Assessment',
    duration: 'Week 1',
    focus: 'Comprehensive evaluation, medical stabilization, and treatment planning'
  },
  {
    phase: 'Stabilization',
    duration: 'Weeks 2-4',
    focus: 'Medication optimization, withdrawal management, and establishing care team'
  },
  {
    phase: 'Active Treatment',
    duration: 'Months 2-6',
    focus: 'Therapy integration, lifestyle changes, and building recovery skills'
  },
  {
    phase: 'Maintenance',
    duration: 'Ongoing',
    focus: 'Long-term support, relapse prevention, and life enhancement'
  }
]

export default function AddictionMedicinePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus-addiction-treatment-hero.png"
        imageAlt="Lotus flower symbolizing healing and recovery from addiction at Lotus Direct Care"
        title="Compassionate Care for Lasting Recovery"
        subtitle="Break free from addiction with evidence-based treatment that addresses the whole person. We combine medical expertise with compassionate support to help you reclaim your life."
        showCTA={true}
        primaryCTAText="Get Help Today"
        primaryCTAHref="#get-help"
        secondaryCTAText={`Call ${CONTACT_INFO.PHONE}`}
        secondaryCTAHref={`tel:${CONTACT_INFO.PHONE.replace(/[^0-9]/g, '')}`}
      />

      {/* Understanding Addiction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A Medical Approach to Addiction Recovery
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Addiction is a complex medical condition, not a moral failing. At Lotus Direct Care, 
                  we treat substance use disorders with the same compassion and evidence-based approach 
                  we use for any other chronic condition.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our comprehensive treatment combines medication-assisted treatment (MAT) with behavioral 
                  support, addressing both the physical and psychological aspects of addiction for 
                  sustainable recovery.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Judgment-Free Care</h3>
                      <p className="text-gray-600">
                        A safe space where your recovery is our only priority
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Complete Confidentiality</h3>
                      <p className="text-gray-600">
                        Your privacy is protected throughout your treatment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Whole-Person Healing</h3>
                      <p className="text-gray-600">
                        Address underlying issues for lasting recovery
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="bg-rose-50 border-rose-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Substances We Treat</CardTitle>
                  <CardDescription>
                    Comprehensive treatment for all types of substance use disorders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {substancesWeTreat.map((substance, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{substance}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                      Don't see your substance listed? We can help. 
                      <Link href="/contact" className="text-rose-600 hover:underline ml-1">
                        Contact us
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Treatment Approach
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recovery is a journey, and we're with you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {treatmentApproach.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* MAT Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Medication-Assisted Treatment (MAT)
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                FDA-approved medications that make recovery more comfortable and sustainable
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {matOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{option.medication}</CardTitle>
                        <CardDescription>For {option.for}</CardDescription>
                      </div>
                      <Badge variant="secondary">FDA Approved</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">Benefits:</p>
                    <ul className="space-y-2">
                      {option.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-center text-gray-700">
                  <strong>Important:</strong> Medication is just one part of treatment. We combine MAT with 
                  counseling, lifestyle changes, and ongoing support for the best outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recovery Journey */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Recovery Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A structured path to lasting recovery with support at every phase
              </p>
            </div>

            <div className="space-y-6">
              {recoveryPhases.map((phase, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <Card className="flex-grow hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{phase.phase}</CardTitle>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{phase.focus}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Comprehensive Support Services
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Recovery involves more than just stopping substance use. We provide comprehensive 
                  support to help you rebuild every aspect of your life.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Flexible Scheduling</h3>
                      <p className="text-sm text-gray-600">
                        Evening and weekend appointments available
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">24/7 Support Line</h3>
                      <p className="text-sm text-gray-600">
                        Always available when you need help
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Care Coordination</h3>
                      <p className="text-sm text-gray-600">
                        We work with therapists, support groups, and other providers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Family Programs</h3>
                      <p className="text-sm text-gray-600">
                        Support and education for loved ones
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-2xl">Additional Services</CardTitle>
                  <CardDescription>
                    Comprehensive care for all aspects of recovery
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Mental Health Support</h4>
                    <p className="text-sm text-gray-600">
                      Treatment for co-occurring depression, anxiety, trauma, and other mental health conditions
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Physical Health Restoration</h4>
                    <p className="text-sm text-gray-600">
                      Address health issues caused by substance use and optimize overall wellness
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lifestyle Medicine</h4>
                    <p className="text-sm text-gray-600">
                      Nutrition, exercise, sleep optimization, and stress management for recovery
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Peer Support Connection</h4>
                    <p className="text-sm text-gray-600">
                      Connect with support groups and recovery communities in the area
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section id="get-help" className="py-16 md:py-24 bg-gradient-to-br from-rose-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Take the First Step Today
                </h2>
                <p className="text-lg text-gray-600">
                  Recovery is possible, and you don't have to do it alone. Our compassionate team 
                  is ready to help you start your journey to a healthier, happier life.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Confidential consultation to discuss your situation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Same-week appointments available
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Insurance accepted for many services
                    </span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                    <a href="tel:+1234567890">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now: (123) 456-7890
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Available 24/7 for urgent situations
                </p>
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
              Common Questions About Treatment
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Is addiction treatment confidential?
                </h3>
                <p className="text-gray-600">
                  Yes, absolutely. Your privacy is protected by federal law (HIPAA and 42 CFR Part 2). 
                  We cannot share information about your treatment without your written permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Do I need to stop using before my first appointment?
                </h3>
                <p className="text-gray-600">
                  No. Come as you are. We'll help you create a safe plan for reducing and stopping 
                  use. Attempting to quit on your own can be dangerous for some substances.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  How long does treatment last?
                </h3>
                <p className="text-gray-600">
                  Recovery is an ongoing process. Initial stabilization typically takes 3-6 months, 
                  but we provide long-term support to help maintain your recovery. Treatment length 
                  is individualized based on your needs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  What if I've tried treatment before and relapsed?
                </h3>
                <p className="text-gray-600">
                  Relapse is often part of the recovery journey. Each attempt provides valuable 
                  information about what works for you. We'll use your experiences to create a 
                  more effective treatment plan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Do you treat chronic pain alongside addiction?
                </h3>
                <p className="text-gray-600">
                  Yes. We specialize in treating co-occurring conditions including chronic pain. 
                  We'll help you manage pain effectively while addressing substance use concerns.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 mb-6">
                You deserve compassionate, effective treatment. We're here to help.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Start Your Recovery Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}