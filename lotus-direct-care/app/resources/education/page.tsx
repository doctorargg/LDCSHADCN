import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ResourceList } from '@/components/resources/resource-list'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ArrowLeft, 
  BookOpen, 
  Heart, 
  Brain, 
  Utensils, 
  Activity,
  CheckCircle2,
  Calendar,
  Users,
  Stethoscope
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Educational Resources | Lotus Direct Care',
  description: 'Learn about functional medicine, health optimization, and evidence-based wellness strategies from Dr. Aaron Rosenberg at Lotus Direct Care.',
  keywords: 'functional medicine education, health education, wellness resources, preventive health, Dr. Aaron Rosenberg',
  openGraph: {
    title: 'Educational Resources | Lotus Direct Care',
    description: 'Expand your knowledge with our curated educational resources on functional medicine and health optimization.',
    url: 'https://lotusdirectcare.com/resources/education',
  },
}

const educationalResources = [
  {
    title: 'Understanding Functional Medicine',
    description: 'A comprehensive guide to the functional medicine approach, how it differs from conventional medicine, and what to expect.',
    type: 'article' as const,
    category: 'Functional Medicine',
    href: '/resources/blog/understanding-functional-medicine',
    featured: true
  },
  {
    title: 'New Patient Welcome Guide',
    description: 'Everything you need to know about becoming a patient at Lotus Direct Care, including what to expect during your first visit.',
    type: 'guide' as const,
    category: 'Getting Started',
    href: '#new-patient-guide',
    featured: true
  },
  {
    title: 'Visit Preparation Checklist',
    description: 'Maximize your appointment time with this comprehensive checklist covering what to bring and how to prepare.',
    type: 'guide' as const,
    category: 'Preparation',
    href: '#visit-prep',
    featured: true
  },
  {
    title: 'The Gut-Brain Connection',
    description: 'Explore the fascinating relationship between digestive health and mental wellbeing, and how to optimize both.',
    type: 'article' as const,
    category: 'Gut Health',
    href: '/resources/blog/gut-health-foundation'
  },
  {
    title: 'Longevity Medicine Explained',
    description: 'Learn about the science of healthy aging and evidence-based strategies to extend your healthspan.',
    type: 'article' as const,
    category: 'Longevity',
    href: '/resources/blog/longevity-medicine-guide'
  },
  {
    title: 'Nutrition for Optimal Health',
    description: 'Evidence-based nutrition guidelines tailored to support your unique health goals and needs.',
    type: 'guide' as const,
    category: 'Nutrition',
    href: '#nutrition-guide'
  },
  {
    title: 'Sleep Optimization Guide',
    description: 'Practical strategies to improve your sleep quality and understand its impact on overall health.',
    type: 'guide' as const,
    category: 'Lifestyle Medicine',
    href: '#sleep-guide'
  },
  {
    title: 'Stress Management Techniques',
    description: 'Learn effective, science-backed methods to manage stress and build resilience.',
    type: 'guide' as const,
    category: 'Mental Health',
    href: '#stress-management'
  }
]

const recommendedReading = [
  {
    title: 'The Functional Medicine Approach to Health',
    author: 'Institute for Functional Medicine',
    type: 'external' as const,
    href: 'https://www.ifm.org/functional-medicine/what-is-functional-medicine/'
  },
  {
    title: 'Lifestyle Medicine: A Brief Review',
    author: 'American College of Preventive Medicine',
    type: 'external' as const,
    href: 'https://www.acpm.org/page/lifestylemedicine'
  },
  {
    title: 'The Science of Longevity',
    author: 'National Institute on Aging',
    type: 'external' as const,
    href: 'https://www.nia.nih.gov/health/longevity'
  }
]

const topicCategories = [
  {
    title: 'Functional Medicine Basics',
    icon: Brain,
    topics: [
      'Root cause approach',
      'Systems biology',
      'Personalized treatment',
      'Integrative therapies'
    ]
  },
  {
    title: 'Nutrition & Diet',
    icon: Utensils,
    topics: [
      'Anti-inflammatory diet',
      'Nutrient optimization',
      'Food sensitivities',
      'Meal planning'
    ]
  },
  {
    title: 'Lifestyle Medicine',
    icon: Activity,
    topics: [
      'Exercise prescription',
      'Sleep optimization',
      'Stress management',
      'Social connections'
    ]
  },
  {
    title: 'Preventive Health',
    icon: Heart,
    topics: [
      'Health screenings',
      'Risk assessment',
      'Early detection',
      'Disease prevention'
    ]
  }
]

export default function EducationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href="/resources" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Resources
              </Link>
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Educational Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empower yourself with knowledge about functional medicine, health optimization, 
              and evidence-based wellness strategies to support your health journey.
            </p>
          </div>
        </div>
      </section>

      {/* Topic Categories */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topicCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Icon className="w-6 h-6 text-teal-600" />
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="w-3 h-3 text-teal-500" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Resources</h2>
              <p className="text-gray-600">
                Start with these essential resources to understand our approach and prepare for your journey with us.
              </p>
            </div>

            <ResourceList resources={educationalResources} />
          </div>
        </div>
      </section>

      {/* Detailed Guides Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* New Patient Guide */}
            <div id="new-patient-guide">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">New Patient Welcome Guide</h2>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Welcome to Lotus Direct Care!</h3>
                <p className="text-gray-600 mb-6">
                  We're excited to partner with you on your health journey. This guide will help you 
                  understand what makes our practice unique and how to get the most from your care.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      Your First Visit
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Plan for 60-90 minutes for your initial consultation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Comprehensive health history review and discussion</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Physical examination and initial assessments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Discussion of health goals and treatment options</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5 text-teal-600" />
                      Our Approach
                    </h4>
                    <p className="text-gray-600 mb-3">
                      At Lotus Direct Care, we practice functional medicine within a direct primary care model. 
                      This means:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Root Cause Focus:</span> We look beyond symptoms to identify underlying causes
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Personalized Care:</span> Treatment plans tailored to your unique needs
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Direct Access:</span> Easy communication with Dr. Rosenberg between visits
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">Time to Listen:</span> Extended appointments to address all your concerns
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-teal-600" />
                      What We Treat
                    </h4>
                    <p className="text-gray-600">
                      We address a wide range of health concerns including chronic conditions, 
                      preventive care, hormone imbalances, digestive issues, metabolic health, 
                      and more. Our goal is to optimize your health at every level.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-800">
                    <strong>Next Steps:</strong> Complete your new patient forms and prepare any 
                    questions you'd like to discuss during your visit. We look forward to meeting you!
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Preparation */}
            <div id="visit-prep">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Preparation Checklist</h2>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <p className="text-gray-600 mb-6">
                  Use this checklist to ensure you're fully prepared for your appointment and can make 
                  the most of your time with Dr. Rosenberg.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Before Your Visit</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Complete all required forms</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Gather recent lab results or medical records</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>List all current medications and supplements</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Write down your main health concerns and goals</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Note any symptoms you're experiencing</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">What to Bring</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Photo ID and insurance card (if applicable)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Completed forms</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>List of questions for the doctor</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Any relevant medical records or test results</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded" />
                        <span>Your medication/supplement bottles</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Day of Your Visit</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Arrive 15 minutes early for check-in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Wear comfortable clothing for potential physical exam</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5" />
                        <span>Avoid heavy meals immediately before your visit</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Reading */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Reading</h2>
            <p className="text-gray-600 mb-8">
              Expand your knowledge with these trusted external resources on functional medicine and health optimization.
            </p>
            
            <div className="space-y-4">
              {recommendedReading.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.author}</p>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <a 
                          href={resource.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" />
                          Read More
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Informed
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest health tips, functional medicine insights, and practice updates 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Join Our Newsletter</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white">
                <Link href="/resources/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}