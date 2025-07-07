import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ResourceList } from '@/components/resources/resource-list'
import { 
  FileText, 
  GraduationCap, 
  UserCircle, 
  Calendar, 
  Heart,
  BookOpen,
  Stethoscope,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Patient Resources | Lotus Direct Care',
  description: 'Access patient forms, educational resources, and preparation guides for your visit to Lotus Direct Care in Mequon, WI.',
  keywords: 'patient resources, patient forms, functional medicine education, visit preparation, Dr. Aaron Rosenberg, Mequon',
  openGraph: {
    title: 'Patient Resources | Lotus Direct Care',
    description: 'Everything you need for your healthcare journey - forms, education, and preparation guides.',
    url: 'https://lotusdirectcare.com/resources',
  },
}

const resourceCategories = [
  {
    title: 'Patient Forms',
    description: 'Download and complete important forms before your visit to save time and ensure we have all necessary information.',
    icon: FileText,
    href: '/resources/forms',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    items: [
      'New Patient Registration',
      'Medical History Questionnaire',
      'Consent Forms',
      'Insurance Information'
    ]
  },
  {
    title: 'Educational Resources',
    description: 'Learn about functional medicine, health optimization strategies, and evidence-based wellness approaches.',
    icon: GraduationCap,
    href: '/resources/education',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    items: [
      'Functional Medicine Basics',
      'Nutrition Guidelines',
      'Lifestyle Medicine',
      'Preventive Health Strategies'
    ]
  },
  {
    title: 'Patient Portal',
    description: 'Access your health records, lab results, and communicate securely with our team through our patient portal.',
    icon: UserCircle,
    href: 'https://portal.lotusdirectcare.com',
    external: true,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    items: [
      'View Lab Results',
      'Message Your Provider',
      'Schedule Appointments',
      'Access Health Records'
    ]
  }
]

const featuredResources = [
  {
    title: 'New Patient Welcome Guide',
    description: 'Everything you need to know about your first visit, what to expect, and how to prepare.',
    type: 'guide' as const,
    category: 'Getting Started',
    href: '/resources/education#new-patient-guide',
    featured: true
  },
  {
    title: 'Functional Medicine Assessment',
    description: 'Comprehensive health questionnaire to help us understand your complete health picture.',
    type: 'form' as const,
    category: 'Forms',
    downloadUrl: '/forms/functional-medicine-assessment.pdf',
    fileSize: '245 KB',
    lastUpdated: 'January 2025',
    featured: true
  },
  {
    title: 'Visit Preparation Checklist',
    description: 'Simple checklist to ensure you get the most out of your appointment.',
    type: 'guide' as const,
    category: 'Preparation',
    href: '/resources/education#visit-prep',
    featured: true
  }
]

const quickLinks = [
  {
    icon: Calendar,
    title: 'Schedule an Appointment',
    description: 'Book your consultation online',
    href: '/contact'
  },
  {
    icon: Heart,
    title: 'Our Services',
    description: 'Explore our healthcare offerings',
    href: '/services'
  },
  {
    icon: Stethoscope,
    title: 'About Dr. Rosenberg',
    description: 'Meet your healthcare provider',
    href: '/about/dr-rosenberg'
  },
  {
    icon: BookOpen,
    title: 'Health Blog',
    description: 'Read our latest articles',
    href: '/resources/blog'
  }
]

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Patient Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your comprehensive resource center for forms, educational materials, and tools to support 
              your health journey with Lotus Direct Care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/resources/forms">Download Forms</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://portal.lotusdirectcare.com" target="_blank" rel="noopener noreferrer">
                  Patient Portal Login
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resource Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find everything you need organized by category for easy access.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {resourceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card 
                  key={index}
                  className={`hover:shadow-xl transition-all duration-300 border-2 ${category.borderColor} overflow-hidden group`}
                >
                  <div className={`h-2 ${category.bgColor}`} />
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${category.bgColor} rounded-full mb-4`}>
                      <Icon className={`w-8 h-8 ${category.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2">{category.title}</CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className={`w-4 h-4 ${category.color}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="outline" className="w-full group-hover:bg-gray-50">
                      {category.external ? (
                        <a 
                          href={category.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Access {category.title}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      ) : (
                        <Link href={category.href} className="flex items-center justify-center gap-2">
                          View {category.title}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start here with our most requested resources and guides.
            </p>
          </div>

          <ResourceList resources={featuredResources} />
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Links
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Additional resources and actions to support your healthcare journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full">
                        <Icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <h3 className="font-semibold text-lg">{link.title}</h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={link.href} className="text-teal-600 hover:text-teal-700">
                          Learn More →
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Finding Something?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our team is here to assist you with any questions about our resources or help you find 
              what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white">
                <a href="tel:+1234567890">Call (123) 456-7890</a>
              </Button>
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}