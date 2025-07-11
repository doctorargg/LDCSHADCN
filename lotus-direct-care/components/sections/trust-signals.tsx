import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  GraduationCap, 
  Users, 
  Star,
  Building,
  Heart,
  Shield
} from 'lucide-react'
import { LegitScriptSeal } from '@/components/ui/legitscript-seal'

const credentials = [
  {
    icon: GraduationCap,
    title: 'Medical Education',
    items: ['Medical Doctor (MD) - Valedictorian', 'Autonomous University of Guadalajara', 'UC Davis-affiliated Residency', 'San Francisco State University'],
  },
  {
    icon: Award,
    title: 'Specialized Training',
    items: ['Institute for Functional Medicine Training', 'Addiction Medicine Expertise', '10+ Years Clinical Experience', 'Ketamine & Integrative Therapies'],
  },
  {
    icon: Building,
    title: 'Professional Excellence',
    items: ['American College of Physicians Member', 'Multilingual Care (English & Spanish)', 'Direct Primary Care Pioneer', 'Evidence-Based Practice'],
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
            Excellence in Personalized Healthcare
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted credentials and proven results across multiple medical disciplines
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
        
        {/* Verified & Certified Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Verified & Certified</h3>
          <div className="flex flex-col items-center gap-6">
            <div>
              <p className="text-gray-600 mb-4">LegitScript Approved</p>
              <LegitScriptSeal className="mx-auto" />
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                We are proud to be LegitScript certified, demonstrating our commitment to 
                compliance, safety, and legitimate healthcare practices.
              </p>
            </div>
          </div>
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
              "My experience with Dr Rosenberg has been wonderful. His office staff is amazing, 
              and he is an absolute professional. He found things that no one else did. He has 
              experience as a PCP but uses a functional medicine approach. This is so effective! 
              I am now a patient for life."
            </blockquote>
            <p className="text-gray-600">— Katrina J., Functional Medicine Patient</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}