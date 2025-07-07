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

      {/* Local Community Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Serving the Greater Milwaukee Area
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Located in the heart of Mequon, Wisconsin, Lotus Direct Care is proud to serve 
                  families throughout the Milwaukee metropolitan area. Our convenient location 
                  provides easy access for residents of Ozaukee County and surrounding communities.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Primary Service Areas:</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Mequon</li>
                      <li>• Thiensville</li>
                      <li>• Cedarburg</li>
                      <li>• Grafton</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Extended Coverage:</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Milwaukee</li>
                      <li>• Germantown</li>
                      <li>• Fox Point</li>
                      <li>• Bayside</li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600">
                  Whether you're seeking functional medicine, direct primary care, or innovative 
                  treatments like ketamine therapy, our Mequon location offers a peaceful, 
                  healing environment just minutes from major Milwaukee suburbs.
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose Lotus Direct Care?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Comprehensive Care</h4>
                      <p className="text-gray-600 text-sm">
                        From functional medicine to cutting-edge therapies, all under one roof
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Direct Access</h4>
                      <p className="text-gray-600 text-sm">
                        Same-day appointments and direct communication with Dr. Rosenberg
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Personalized Medicine</h4>
                      <p className="text-gray-600 text-sm">
                        Treatment plans tailored to your unique biology and lifestyle
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Convenient Location</h4>
                      <p className="text-gray-600 text-sm">
                        Easy access with ample parking in beautiful Mequon, Wisconsin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions We Treat Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Treatment for Complex Conditions
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              Our integrative approach combines the best of conventional and functional medicine 
              to address a wide range of health conditions, from chronic diseases to mental health challenges.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Chronic Conditions</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Diabetes & Metabolic Syndrome</li>
                  <li>• Autoimmune Disorders</li>
                  <li>• Chronic Fatigue Syndrome</li>
                  <li>• Fibromyalgia</li>
                  <li>• Digestive Disorders</li>
                  <li>• Thyroid Dysfunction</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mental Health</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Treatment-Resistant Depression</li>
                  <li>• Anxiety Disorders</li>
                  <li>• PTSD</li>
                  <li>• Bipolar Disorder</li>
                  <li>• Brain Fog & Memory Issues</li>
                  <li>• Sleep Disorders</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pain & Inflammation</h3>
                <ul className="text-gray-600 space-y-2 text-left">
                  <li>• Chronic Pain Syndromes</li>
                  <li>• Joint Pain & Arthritis</li>
                  <li>• Migraines & Headaches</li>
                  <li>• Neuropathic Pain</li>
                  <li>• Sports Injuries</li>
                  <li>• Inflammatory Conditions</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Don't see your condition listed? We treat a wide variety of health challenges. 
              Contact us to discuss how our personalized approach can help you.
            </p>
            
            <a 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              Schedule Your Consultation
            </a>
          </div>
        </div>
      </section>
      
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