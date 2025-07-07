import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Comprehensive Health Assessment',
    description: 'In-depth evaluation including advanced lab testing, genetic analysis, and lifestyle assessment to create your personalized health roadmap.',
    features: ['90-minute consultation', 'Advanced biomarker testing', 'Genetic insights'],
    popular: true,
  },
  {
    title: 'Hormone Optimization',
    description: 'Balance your hormones naturally for improved energy, mood, sleep, and overall vitality using bioidentical hormone therapy.',
    features: ['Thyroid optimization', 'Adrenal support', 'Sex hormone balance'],
    popular: false,
  },
  {
    title: 'Gut Health Restoration',
    description: 'Heal your digestive system and microbiome to improve immunity, mental clarity, and nutrient absorption.',
    features: ['Microbiome analysis', 'Food sensitivity testing', 'Personalized nutrition'],
    popular: false,
  },
  {
    title: 'Metabolic Optimization',
    description: 'Reset your metabolism for sustainable weight management, increased energy, and disease prevention.',
    features: ['Insulin sensitivity', 'Mitochondrial support', 'Body composition'],
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
            Comprehensive functional medicine services designed to optimize your health at every level
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <Card key={index} className="relative hover:shadow-lg hover:shadow-lotus-teal/20 transition-all duration-300 hover:scale-[1.02]">
              {service.popular && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-[oklch(0.75_0.15_75)] to-[oklch(0.70_0.14_75)] border-0 shadow-lg">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-[oklch(0.62_0.18_180_/_0.1)] text-[oklch(0.45_0.16_180)] border-[oklch(0.62_0.18_180_/_0.2)]">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/services" className="flex items-center gap-2">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}