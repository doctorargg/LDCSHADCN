import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  CheckCircle2,
  XCircle,
  Users,
  Heart,
  Zap,
  Shield,
  Clock,
  Phone,
  Calendar,
  CreditCard,
  Stethoscope,
  MessageCircle,
  UserCheck,
  Video,
  FileText,
  Pill,
  Activity,
  Brain,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Membership Plans | Lotus Direct Care - Direct Primary Care in Mequon, WI',
  description: 'Transparent, affordable Direct Primary Care membership plans. Unlimited visits, extended appointments, and personalized healthcare starting at $165/month.',
  keywords: 'DPC membership, direct primary care pricing, concierge medicine cost, healthcare membership, Dr. Aaron Rosenberg, Mequon Wisconsin',
  openGraph: {
    title: 'Direct Primary Care Membership | Lotus Direct Care',
    description: 'Join our practice for personalized, accessible healthcare. Simple monthly membership with no hidden fees.',
    url: 'https://lotusdirectcare.com/membership',
  },
}

const membershipTiers = [
  {
    name: 'Individual',
    price: 165,
    period: 'month',
    description: 'Perfect for personal health management',
    ageRange: 'Ages 5 and up',
    featured: false,
    features: [
      'Unlimited office visits',
      'Same-day appointments available',
      '30-60 minute appointments',
      'Direct access via phone, text, email',
      'Annual comprehensive health assessment',
      'Basic lab work at wholesale prices',
      'Prescription management',
      'Care coordination'
    ]
  },
  {
    name: 'Family',
    price: 220,
    period: 'month',
    description: 'Comprehensive care for the whole family',
    ageRange: 'First 2 family members (ages 5+)',
    featured: true,
    features: [
      'Everything in Individual plan',
      'Coverage for first 2 family members',
      'Add additional members for $20/month each',
      'Family wellness planning',
      'Coordinated family health goals',
      'Parenting health guidance',
      'School/sports physicals',
      'Vaccination management'
    ]
  }
]

const comparisonFeatures = [
  {
    feature: 'Appointment Length',
    traditional: '7-10 minutes',
    dpc: '30-60 minutes',
    dpcHighlight: true
  },
  {
    feature: 'Wait Time for Appointment',
    traditional: '2-4 weeks',
    dpc: 'Same day available',
    dpcHighlight: true
  },
  {
    feature: 'Annual Cost (Healthy Adult)',
    traditional: '$3,000-5,000+',
    dpc: '$1,512-1,980',
    dpcHighlight: true
  },
  {
    feature: 'Physician Access',
    traditional: 'Through staff only',
    dpc: 'Direct phone/text/email',
    dpcHighlight: true
  },
  {
    feature: 'After-Hours Access',
    traditional: 'ER or Urgent Care',
    dpc: 'Direct physician contact',
    dpcHighlight: true
  },
  {
    feature: 'Insurance Paperwork',
    traditional: 'Extensive',
    dpc: 'None',
    dpcHighlight: true
  },
  {
    feature: 'Focus',
    traditional: 'Volume-based',
    dpc: 'Patient-centered',
    dpcHighlight: true
  },
  {
    feature: 'Preventive Care',
    traditional: 'Limited by coverage',
    dpc: 'Comprehensive & proactive',
    dpcHighlight: true
  }
]

const includedServices = [
  {
    icon: Stethoscope,
    title: 'Comprehensive Primary Care',
    items: [
      'Annual health assessments',
      'Acute illness treatment',
      'Chronic disease management',
      'Preventive care & screenings'
    ]
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    items: [
      'Phone consultations',
      'Text messaging support',
      'Email communication',
      'Video visits when appropriate'
    ]
  },
  {
    icon: Activity,
    title: 'Wellness Services',
    items: [
      'Nutrition counseling',
      'Exercise planning',
      'Stress management',
      'Sleep optimization'
    ]
  },
  {
    icon: FileText,
    title: 'Care Coordination',
    items: [
      'Specialist referrals',
      'Test result interpretation',
      'Medical record management',
      'Hospital follow-up care'
    ]
  }
]

const faqs = [
  {
    question: 'How does billing work?',
    answer: 'Your membership fee is billed monthly via credit card or ACH. There are no additional charges for covered services - no copays, no deductibles, no surprise bills.'
  },
  {
    question: 'Can I use my HSA/FSA to pay for membership?',
    answer: 'Yes! DPC membership fees are eligible medical expenses for HSA (Health Savings Account) and FSA (Flexible Spending Account) funds.'
  },
  {
    question: 'What about insurance?',
    answer: 'We recommend keeping insurance for hospitalizations, specialists, and emergencies. Many patients save money by pairing DPC with a high-deductible health plan.'
  },
  {
    question: 'Are there any enrollment fees or contracts?',
    answer: 'No enrollment fees! We have a 3-month minimum commitment (paid upfront), but no long-term contracts - you can cancel anytime after that with 30 days notice. If you cancel and later resume care, there is a $150 re-initiation fee.'
  },
  {
    question: 'What\'s not included in membership?',
    answer: 'Membership doesn\'t include medications (available at wholesale prices), outside lab work, imaging, specialist visits, or hospitalizations.'
  },
  {
    question: 'Can I join if I have chronic conditions?',
    answer: 'Absolutely! DPC is ideal for managing chronic conditions with the time and attention they require. We accept all patients regardless of health status.'
  }
]

export default function MembershipPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/u6683669286_A_lotus_flower_--chaos_35_--ar_21_--sref_httpss.m_9101ead2-ead7-4a8c-9d6c-4b421697725e_2.png"
        imageAlt="Lotus flower symbolizing transparent and affordable healthcare membership at Lotus Direct Care"
        title="Healthcare That Works For You"
        subtitle="Simple, transparent pricing for comprehensive primary care. No insurance hassles, no hidden fees - just exceptional healthcare when you need it."
        showCTA={true}
        primaryCTAText="View Membership Options"
        primaryCTAHref="#pricing"
        secondaryCTAText="Schedule Free Consultation"
        secondaryCTAHref="/contact"
      >
        <Badge className="mb-4 bg-white/20 text-white border-white/30">
          <Users className="w-4 h-4 mr-1" />
          Direct Primary Care Membership
        </Badge>
      </HeroWithImage>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Direct Primary Care?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experience healthcare the way it should be - personal, accessible, and affordable
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">More Time</h3>
                <p className="text-gray-600">
                  30-60 minute appointments to address all your health concerns thoroughly
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Better Care</h3>
                <p className="text-gray-600">
                  Proactive, preventive approach to keep you healthy and thriving
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personal Connection</h3>
                <p className="text-gray-600">
                  Build a real relationship with a doctor who truly knows you
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-2xl text-center">
                  Traditional Healthcare vs. Direct Primary Care
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        <th className="text-center p-4 font-semibold">Traditional Healthcare</th>
                        <th className="text-center p-4 font-semibold text-blue-600">Direct Primary Care</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{item.feature}</td>
                          <td className="p-4 text-center text-gray-600">
                            <div className="flex items-center justify-center gap-2">
                              <XCircle className="w-5 h-5 text-red-500" />
                              {item.traditional}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                              <span className={item.dpcHighlight ? 'font-semibold text-green-600' : ''}>
                                {item.dpc}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Membership Options
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All memberships include unlimited visits and direct physician access.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {membershipTiers.map((tier, index) => (
                <Card 
                  key={index} 
                  className={`relative ${tier.featured ? 'border-2 border-blue-500 shadow-lg scale-105' : 'border-2 hover:border-blue-200'} transition-all`}
                >
                  {tier.featured && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900">
                        ${tier.price}
                        <span className="text-lg font-normal text-gray-600">/{tier.period}</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{tier.ageRange}</p>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button asChild className="w-full" variant={tier.featured ? 'default' : 'outline'}>
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="text-center">
                <p className="text-gray-600">
                  <span className="font-semibold">No enrollment fees!</span> 
                  <span className="text-sm ml-2">Start your membership without any upfront costs</span>
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
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What's Included in Your Membership
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need for comprehensive primary care, all included in your monthly membership
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {includedServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <div key={index}>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                    <ul className="space-y-2">
                      {service.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <Card className="mt-12 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-xl">Additional Services Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-blue-600" />
                      Medications at Wholesale Prices
                    </h4>
                    <p className="text-sm text-gray-600">
                      Access to hundreds of generic medications at wholesale prices, 
                      often $5-10 per month
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Advanced Testing Options
                    </h4>
                    <p className="text-sm text-gray-600">
                      Specialized lab work and testing available at significantly 
                      reduced rates
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Functional Medicine Services
                    </h4>
                    <p className="text-sm text-gray-600">
                      Root-cause analysis and integrative treatment approaches 
                      for complex conditions
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Video className="w-5 h-5 text-blue-600" />
                      Telemedicine Visits
                    </h4>
                    <p className="text-sm text-gray-600">
                      Virtual consultations available for established patients 
                      when appropriate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Have more questions about membership?</p>
              <Button asChild size="lg">
                <Link href="/contact">Contact Us for a Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Lead Capture */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Experience Better Healthcare?
                </h2>
                <p className="text-lg text-blue-100">
                  Join our practice and discover what healthcare should be. Schedule your free 
                  consultation today and take the first step towards a healthier, happier you.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">
                      Free 30-minute consultation to discuss your health goals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">
                      Tour our modern, welcoming clinic in Mequon
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-50">
                      No obligation - just an opportunity to learn more
                    </span>
                  </li>
                </ul>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white" />
                    <div className="w-10 h-10 bg-gray-400 rounded-full border-2 border-white" />
                    <div className="w-10 h-10 bg-gray-500 rounded-full border-2 border-white" />
                  </div>
                  <p className="text-sm text-blue-100">
                    Join 500+ patients who've transformed their health
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Schedule Your Free Consultation
                </h3>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}