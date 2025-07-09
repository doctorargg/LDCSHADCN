import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Clock, 
  Phone, 
  Calendar,
  CreditCard,
  Heart,
  Users,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  MessageCircle,
  Shield,
  Zap
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Direct Primary Care | Lotus Direct Care - Mequon, WI',
  description: 'Experience personalized healthcare with Direct Primary Care at Lotus Direct Care. Unlimited visits, extended appointments, and direct physician access in Mequon, Wisconsin.',
  keywords: 'direct primary care, DPC, membership medicine, concierge medicine, Dr. Aaron Rosenberg, Mequon, Wisconsin, unlimited visits, personalized healthcare',
  openGraph: {
    title: 'Direct Primary Care | Lotus Direct Care',
    description: 'Healthcare reimagined - unlimited visits, no insurance hassles, and your doctor always available when you need them.',
    url: 'https://lotusdirectcare.com/services/direct-primary-care',
  },
}

const benefits = [
  {
    icon: Clock,
    title: 'Extended Appointments',
    description: '30-60 minute visits to thoroughly address all your health concerns'
  },
  {
    icon: Phone,
    title: 'Direct Access',
    description: 'Reach Dr. Rosenberg directly via phone, text, or email'
  },
  {
    icon: Calendar,
    title: 'Same-Day Visits',
    description: 'Get care when you need it, including evenings and weekends'
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    description: 'Simple monthly membership with no hidden fees or copays'
  },
  {
    icon: Heart,
    title: 'Preventive Focus',
    description: 'Proactive health management to keep you well'
  },
  {
    icon: Users,
    title: 'Limited Patient Panel',
    description: 'More time and attention for each patient'
  },
]

const membershipIncludes = [
  'Unlimited office visits',
  'Annual comprehensive health assessment',
  'Chronic disease management',
  'Acute illness treatment',
  'Minor procedures and wound care',
  'Basic lab work at wholesale prices',
  'Care coordination with specialists',
  'Health coaching and lifestyle guidance',
  'Prescription management',
  'Travel medicine consultations',
  'Mental health support',
  'Nutrition and wellness planning'
]

const comparisonData = [
  {
    feature: 'Average appointment time',
    traditional: '7-10 minutes',
    dpc: '30-60 minutes'
  },
  {
    feature: 'Wait time for appointment',
    traditional: '2-4 weeks',
    dpc: 'Same day available'
  },
  {
    feature: 'Annual cost (healthy adult)',
    traditional: '$3,000-5,000+',
    dpc: '$1,512-1,980'
  },
  {
    feature: 'Direct physician access',
    traditional: 'Through staff only',
    dpc: 'Phone, text, email'
  },
  {
    feature: 'Insurance paperwork',
    traditional: 'Extensive',
    dpc: 'None'
  },
  {
    feature: 'Focus',
    traditional: 'Volume-based',
    dpc: 'Patient-centered'
  },
]

export default function DirectPrimaryCarePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus_dpc_hero.png"
        imageAlt="Lotus flower representing personalized direct primary care at Lotus Direct Care"
        title="Healthcare Reimagined: Personal, Accessible, Affordable"
        subtitle="Experience the difference of having a doctor who truly knows you. With Direct Primary Care, you get unlimited access to personalized healthcare without the insurance hassles."
        showCTA={true}
        primaryCTAText="View Membership Options"
        primaryCTAHref="#membership"
        secondaryCTAText="Schedule Free Consultation"
        secondaryCTAHref="/contact"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <Stethoscope className="w-4 h-4 mr-1" />
          Direct Primary Care
        </Badge>
      </HeroWithImage>

      {/* What is DPC Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What is Direct Primary Care?
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Direct Primary Care (DPC) is a revolutionary healthcare model that puts the relationship 
                  between you and your doctor first. By removing insurance from primary care, we eliminate 
                  bureaucracy and focus on what matters most - your health.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  With a simple monthly membership, you get unlimited access to comprehensive primary care 
                  services. No copays, no deductibles, no surprise bills - just transparent, accessible healthcare.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">More Time With Your Doctor</h3>
                      <p className="text-gray-600">
                        30-60 minute appointments mean we can address all your concerns thoroughly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Direct Communication</h3>
                      <p className="text-gray-600">
                        Reach Dr. Rosenberg directly when you need guidance or have questions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Preventive Focus</h3>
                      <p className="text-gray-600">
                        Proactive care to prevent problems before they become serious
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Traditional vs. Direct Primary Care
                </h3>
                <div className="space-y-4">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <p className="font-semibold text-gray-900 mb-2">{item.feature}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Traditional</p>
                          <p className="text-red-600">{item.traditional}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">DPC</p>
                          <p className="text-green-600 font-semibold">{item.dpc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Benefits of Direct Primary Care
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how DPC transforms your healthcare experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Membership
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No hidden fees, no surprise bills. Just honest, affordable healthcare.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <Card className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">Individual</CardTitle>
                  <CardDescription>Perfect for personal health management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900">$165<span className="text-lg font-normal text-gray-600">/month</span></p>
                    <p className="text-sm text-gray-500">Ages 5 and up</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-500 relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">Family</CardTitle>
                  <CardDescription>Comprehensive care for the whole family</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900">$220<span className="text-lg font-normal text-gray-600">/month</span></p>
                    <p className="text-sm text-gray-500">First 2 family members (ages 5+)</p>
                    <p className="text-xs text-gray-500 mt-1">Add additional members for $20/month each</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 mb-8">
              <div className="text-center">
                <p className="text-gray-600">
                  <span className="font-semibold">No enrollment fees!</span> 
                  <span className="text-sm ml-2">Just your monthly membership fee to get started</span>
                </p>
              </div>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-green-900 mb-2">Save with Annual Plans</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-green-800">Individual Annual: $1,512.50</p>
                      <p className="text-green-700">Save over $450 per year!</p>
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Family Annual: $2,062.50</p>
                      <p className="text-green-700">Save over $575 per year!</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">* Annual discount not available when paying with Care Credit</p>
                </CardContent>
              </Card>
              
              <div className="text-center text-sm text-gray-600">
                <p><span className="font-semibold">Important:</span> We care for patients ages 5 and up. 3-month minimum commitment required.</p>
              </div>
            </div>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl">What's Included in Every Membership</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {membershipIncludes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to Join Our Practice?
                </h2>
                <p className="text-lg text-gray-600">
                  Take the first step towards a better healthcare experience. Schedule a free consultation 
                  to learn how Direct Primary Care can transform your health and well-being.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Free 30-minute consultation to discuss your health goals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Tour our modern, welcoming clinic in Mequon
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Get all your questions answered about DPC
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
                  Can I still use my insurance with DPC?
                </h3>
                <p className="text-gray-600">
                  Yes! DPC covers your primary care needs, but we recommend keeping insurance for 
                  specialists, hospitalizations, and emergencies. Many patients pair DPC with a 
                  high-deductible health plan for significant savings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  What if I need to see a specialist?
                </h3>
                <p className="text-gray-600">
                  We coordinate your care with trusted specialists and can often negotiate better 
                  rates for our patients. Your insurance typically covers specialist visits.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Are medications included?
                </h3>
                <p className="text-gray-600">
                  We offer many generic medications at wholesale prices (often $5-10). For other 
                  prescriptions, we help you find the best prices and can work with your insurance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Can I cancel my membership anytime?
                </h3>
                <p className="text-gray-600">
                  Yes! We have a 3-month minimum commitment (paid upfront), but no long-term 
                  contracts - you can cancel anytime after that with 30 days notice. If you 
                  cancel and later resume care, there is a $150 re-initiation fee.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/contact">Have More Questions? Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}