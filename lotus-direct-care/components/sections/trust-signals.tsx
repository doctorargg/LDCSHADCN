import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  GraduationCap, 
  Users, 
  Star,
  Building,
  Heart
} from 'lucide-react'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Medical Education',
    items: ['Autonomous University of Guadalajara (Valedictorian)', 'UC Davis-affiliated Residency', 'San Francisco State University'],
  },
  {
    icon: Award,
    title: 'Certifications',
    items: ['Board Certified Internal Medicine', 'Functional Medicine (IFM - In Progress)', 'Addiction Medicine'],
  },
  {
    icon: Building,
    title: 'Professional Affiliations',
    items: ['American College of Physicians', 'Institute for Functional Medicine', 'Fluent in English & Spanish'],
  },
]

const stats = [
  { number: '10+', label: 'Years of Experience' },
  { number: '1000+', label: 'Patients Helped' },
  { number: '98%', label: 'Patient Satisfaction' },
  { number: '4.9', label: 'Average Rating' },
]

export function TrustSignals() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-[oklch(0.62_0.18_180_/_0.02)] to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Excellence in Functional Medicine
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted credentials and proven results you can count on
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[oklch(0.62_0.18_180)] to-[oklch(0.55_0.17_180)] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Credentials */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {credentials.map((credential, index) => {
            const Icon = credential.icon
            return (
              <Card key={index} className="border-0 shadow-md shadow-lotus-teal/10 hover:shadow-lg hover:shadow-lotus-teal/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.62_0.18_180_/_0.1)] to-[oklch(0.75_0.15_75_/_0.1)] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[oklch(0.45_0.16_180)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {credential.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {credential.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[oklch(0.75_0.15_75)] rounded-full mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Patient testimonial preview */}
        <Card className="border-0 shadow-2xl gradient-lotus">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg italic text-gray-700 mb-4 max-w-2xl mx-auto">
              "Dr. Rosenberg changed my life. After years of conventional treatments that only 
              masked my symptoms, he helped me discover and address the root causes of my health 
              issues. I feel better at 50 than I did at 30!"
            </blockquote>
            <p className="text-gray-600">— Sarah M., Patient since 2019</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}