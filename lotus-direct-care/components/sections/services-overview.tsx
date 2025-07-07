import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Heart, 
  Microscope, 
  Leaf, 
  Clock, 
  Shield, 
  Sparkles, 
  Droplets 
} from 'lucide-react'

const services = [
  {
    title: 'Direct Primary Care',
    description: 'Healthcare membership with unlimited access',
    icon: Heart,
    href: '/services/direct-primary-care',
    popular: true,
  },
  {
    title: 'Functional Medicine',
    description: 'Discover and treat root causes of chronic illness',
    icon: Microscope,
    href: '/services/functional-medicine',
    popular: false,
  },
  {
    title: 'Integrative Therapies',
    description: 'Combining conventional and natural approaches',
    icon: Leaf,
    href: '/services/integrative-therapies',
    popular: false,
  },
  {
    title: 'Longevity Medicine',
    description: 'Optimize your healthspan, not just lifespan',
    icon: Clock,
    href: '/services/longevity-medicine',
    popular: false,
  },
  {
    title: 'Addiction Medicine',
    description: 'Compassionate, evidence-based recovery support',
    icon: Shield,
    href: '/services/addiction-medicine',
    popular: false,
  },
  {
    title: 'Ketamine Therapy',
    description: 'Breakthrough treatment for depression and pain',
    icon: Sparkles,
    href: '/services/ketamine-therapy',
    popular: false,
  },
  {
    title: 'PRP Therapy',
    description: 'Natural regenerative therapy for healing',
    icon: Droplets,
    href: '/services/prp-therapy',
    popular: false,
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience personalized healthcare solutions through our integrative approach, combining direct primary care, functional medicine, and specialized therapies
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link key={index} href={service.href} className="group">
                <Card className="relative h-full hover:shadow-lg hover:shadow-lotus-teal/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-[oklch(0.75_0.15_75)] to-[oklch(0.70_0.14_75)] border-0 shadow-lg z-10">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[oklch(0.62_0.18_180_/_0.1)] text-[oklch(0.45_0.16_180)] group-hover:bg-[oklch(0.62_0.18_180_/_0.15)] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg flex-1">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/services" className="flex items-center gap-2">
              Learn More About Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}