import { Hero } from '@/components/layout/hero'
import { LeadCaptureForm } from '@/components/forms/lead-capture-form'
import { ValuePropositions } from '@/components/sections/value-propositions'
import { ServicesOverview } from '@/components/sections/services-overview'
import { DoctorIntro } from '@/components/sections/doctor-intro'
import { TrustSignals } from '@/components/sections/trust-signals'
import { TestimonialsHome } from '@/components/sections/testimonials-home'
import { CONTACT_INFO } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Value Propositions */}
      <ValuePropositions />
      
      {/* Services Overview */}
      <ServicesOverview />
      
      {/* Lead Capture Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Ready to Transform Your Health?
                </h2>
                <p className="text-lg text-gray-600">
                  Take the first step towards optimal wellness. Schedule a consultation 
                  with Dr. Rosenberg and discover how our comprehensive approach to personalized 
                  healthcare can help you achieve your health goals.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">
                      Personalized treatment plans based on your unique health profile
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">
                      Comprehensive testing to uncover root causes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-teal-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">
                      Ongoing support throughout your wellness journey
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Lead Capture Form */}
              <div>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Doctor Introduction */}
      <DoctorIntro />
      
      {/* Testimonials */}
      <TestimonialsHome />
      
      {/* Trust Signals & Credentials */}
      <TrustSignals />
      
      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Journey to Optimal Health Today
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait another day to feel your best. Schedule your consultation 
            and discover what your body is truly capable of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${CONTACT_INFO.PHONE.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Call {CONTACT_INFO.PHONE}
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              Schedule Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}