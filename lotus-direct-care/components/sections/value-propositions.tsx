import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Target, 
  Users, 
  Clock, 
  Shield, 
  Sparkles,
  Calendar,
  CheckCircle 
} from 'lucide-react'
import { EXTERNAL_URLS } from '@/lib/constants'

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
    description: 'Our integrative approach combines cutting-edge research with proven medical principles across multiple disciplines.',
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
            Why Choose Lotus Direct Care?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience comprehensive healthcare that combines direct primary care with functional medicine to treat you as a whole person
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
        
        {/* Trust Indicators and CTA */}
        <div className="mt-12 text-center">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">No Insurance Hassles</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Same-Day Appointments</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">24/7 Doctor Access</span>
            </div>
          </div>
          
          {/* CTA with urgency */}
          <Card className="inline-block bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Ready to Experience Better Healthcare?</h3>
              <p className="text-gray-600 mb-2">
                Join a practice where you're a patient, not a number.
              </p>
              <p className="text-sm text-primary font-semibold mb-6">
                Limited membership spots available - Secure yours today!
              </p>
              <Button asChild size="lg" className="shadow-lg">
                <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Your Free Discovery Call
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}