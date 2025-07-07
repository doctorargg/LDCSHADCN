import { Card, CardContent } from '@/components/ui/card'
import { 
  Heart, 
  Target, 
  Users, 
  Clock, 
  Shield, 
  Sparkles 
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Root Cause Focus',
    description: 'We look beyond symptoms to identify and address the underlying causes of your health concerns.',
  },
  {
    icon: Users,
    title: 'Personalized Care',
    description: 'Every treatment plan is tailored to your unique genetics, lifestyle, and health goals.',
  },
  {
    icon: Clock,
    title: 'Extended Consultations',
    description: 'We take the time to truly understand your health story and create comprehensive solutions.',
  },
  {
    icon: Shield,
    title: 'Evidence-Based',
    description: 'Our approach combines cutting-edge research with proven functional medicine principles.',
  },
  {
    icon: Heart,
    title: 'Whole-Person Health',
    description: 'We address physical, mental, and emotional aspects of wellness for lasting results.',
  },
  {
    icon: Sparkles,
    title: 'Optimal Vitality',
    description: 'Go beyond disease management to achieve peak performance and vibrant health.',
  },
]

export function ValuePropositions() {
  return (
    <section className="py-16 md:py-24 gradient-lotus">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Functional Medicine?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience healthcare that treats you as a whole person, not just a collection of symptoms
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="border-0 shadow-md shadow-lotus-teal/10 hover:shadow-lg hover:shadow-lotus-teal/20 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.62_0.18_180_/_0.1)] to-[oklch(0.75_0.15_75_/_0.1)] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[oklch(0.45_0.16_180)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}