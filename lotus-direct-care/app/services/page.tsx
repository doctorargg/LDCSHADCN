import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { 
  Heart, 
  Brain, 
  Activity, 
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  Shield,
  HeartHandshake,
  Zap,
  Sparkles
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services | Lotus Direct Care - Comprehensive Healthcare Solutions',
  description: 'Explore our integrative healthcare services including Direct Primary Care, Functional Medicine, Longevity Medicine, Addiction Medicine, Integrative Therapies, Ketamine Therapy, and PRP Therapy. Personalized medicine in Mequon, WI.',
  keywords: 'direct primary care, functional medicine, longevity medicine, addiction medicine, integrative therapies, ketamine therapy, PRP therapy, Dr. Aaron Rosenberg, Mequon, Wisconsin',
  openGraph: {
    title: 'Healthcare Services | Lotus Direct Care',
    description: 'Comprehensive healthcare services designed to optimize your health at every level.',
    url: 'https://lotusdirectcare.com/services',
  },
}

const services = [
  {
    title: 'Direct Primary Care',
    description: 'Experience healthcare the way it should be - personalized, accessible, and focused on you. No insurance hassles, unlimited visits, and direct access to your doctor.',
    icon: Stethoscope,
    href: '/services/direct-primary-care',
    features: [
      'Same-day appointments',
      'Extended visit times',
      'Direct physician access',
      'Transparent pricing'
    ],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    title: 'Functional Medicine',
    description: 'Discover and address the root causes of your health concerns through comprehensive testing, personalized treatment plans, and integrative therapies.',
    icon: Brain,
    href: '/services/functional-medicine',
    features: [
      'Root cause analysis',
      'Advanced testing',
      'Personalized protocols',
      'Integrative approach'
    ],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
  },
  {
    title: 'Longevity Medicine',
    description: 'Optimize your healthspan with cutting-edge preventive strategies, biomarker optimization, and evidence-based longevity protocols.',
    icon: Activity,
    href: '/services/longevity-medicine',
    features: [
      'Biological age testing',
      'Preventive strategies',
      'Performance optimization',
      'Longevity protocols'
    ],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    title: 'Addiction Medicine',
    description: 'Compassionate, evidence-based treatment for substance use disorders with a focus on whole-person healing and sustainable recovery.',
    icon: Heart,
    href: '/services/addiction-medicine',
    features: [
      'Medication-assisted treatment',
      'Holistic recovery support',
      'Confidential care',
      'Long-term wellness'
    ],
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
  {
    title: 'Integrative Therapies',
    description: 'Combine conventional medicine with evidence-based complementary approaches for whole-person healing and optimal wellness outcomes.',
    icon: HeartHandshake,
    href: '/services/integrative-therapies',
    features: [
      'Mind-body techniques',
      'Nutritional therapy',
      'Stress management',
      'Holistic healing'
    ],
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    title: 'Ketamine Therapy',
    description: 'Experience breakthrough treatment for depression, anxiety, PTSD, and chronic pain with professionally supervised ketamine therapy protocols.',
    icon: Zap,
    href: '/services/ketamine-therapy',
    features: [
      'Treatment-resistant depression',
      'Anxiety & PTSD relief',
      'Chronic pain management',
      'Supervised protocols'
    ],
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    title: 'PRP Therapy',
    description: 'Harness your body\'s natural healing power with platelet-rich plasma therapy for joint health, aesthetic enhancement, and regenerative medicine.',
    icon: Sparkles,
    href: '/services/prp-therapy',
    features: [
      'Joint & tissue repair',
      'Hair restoration',
      'Skin rejuvenation',
      'Natural healing'
    ],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
]

const benefits = [
  {
    icon: Clock,
    title: 'More Time With Your Doctor',
    description: '30-60 minute appointments ensure all your concerns are addressed thoroughly.'
  },
  {
    icon: Shield,
    title: 'Preventive Focus',
    description: 'Proactive health optimization to prevent disease before it starts.'
  },
  {
    icon: Users,
    title: 'Personalized Care',
    description: 'Treatment plans tailored to your unique genetics, lifestyle, and goals.'
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus_services_hero.png"
        imageAlt="Lotus flower representing our comprehensive healthcare services"
        title="Comprehensive Healthcare Services"
        subtitle="Experience a new standard of care with our integrated approach to health optimization. From preventive care to specialized treatments, we're here to support your wellness journey."
        showCTA={false}
      />

      {/* Services Grid */}
      <section id="services" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Healthcare Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each service is designed to address specific aspects of your health while working 
              together for comprehensive wellness.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card 
                  key={index} 
                  className={`hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} overflow-hidden group h-full flex flex-col`}
                >
                  <div className={`h-2 ${service.bgColor}`} />
                  <CardHeader className="flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${service.bgColor}`}>
                        <Icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Learn More
                      </Badge>
                    </div>
                    <CardTitle className="text-xl lg:text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm lg:text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className={`w-4 h-4 ${service.color} flex-shrink-0`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" className="w-full group-hover:bg-gray-50">
                      <Link href={service.href} className="flex items-center justify-center gap-2">
                        Explore {service.title}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Lotus Direct Care Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine the best of modern medicine with personalized care to help you achieve optimal health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
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
                  Ready to Experience Better Healthcare?
                </h2>
                <p className="text-lg text-gray-600">
                  Join our practice and discover what personalized, patient-centered care truly feels like. 
                  We're accepting new patients who are ready to take control of their health.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Initial consultation to understand your health goals
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Comprehensive health assessment and testing
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">
                      Personalized treatment plan based on your unique needs
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

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Have Questions About Our Services?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We understand that choosing a new healthcare approach is a big decision. 
              Our team is here to answer all your questions and help you understand how our services can benefit you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline">
                <a href="tel:+1234567890">Call (123) 456-7890</a>
              </Button>
              <Button asChild size="lg">
                <Link href="/contact">Contact Us Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}