import { ContactForm } from "@/components/forms/contact-form";
import { Clock, MapPin, Phone, Mail, Printer } from "lucide-react";
import { HeroWithImage } from '@/components/layout/hero-with-image'
import { CONTACT_INFO, BUSINESS_HOURS } from "@/lib/constants";
import { LegitScriptSeal } from "@/components/ui/legitscript-seal";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithImage
        imageSrc="/images/Lotus Midjourney Flowers/lotus_contact_hero.png"
        imageAlt="Lotus flower representing connection and communication at Lotus Direct Care"
        title="Contact Lotus Direct Care"
        subtitle="We're here to answer your questions and help you start your journey to personalized healthcare."
        showCTA={false}
        minHeight="min-h-[40vh]"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form - Left side */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>

        {/* Contact Information - Right side */}
        <div className="space-y-8">
          {/* Office Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Office Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    {CONTACT_INFO.ADDRESS.STREET}<br />
                    {CONTACT_INFO.ADDRESS.SUITE}<br />
                    {CONTACT_INFO.ADDRESS.CITY}, {CONTACT_INFO.ADDRESS.STATE} {CONTACT_INFO.ADDRESS.ZIP}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">
                    <a 
                      href={`tel:${CONTACT_INFO.PHONE.replace(/[^0-9]/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.PHONE}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">
                    <a 
                      href={`mailto:${CONTACT_INFO.EMAIL}`}
                      className="hover:text-primary transition-colors"
                    >
                      {CONTACT_INFO.EMAIL}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Printer className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Fax</p>
                  <p className="text-gray-600">
                    {CONTACT_INFO.FAX}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Office Hours</p>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: {BUSINESS_HOURS.MON.open} - {BUSINESS_HOURS.MON.close}</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Find Us</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(CONTACT_INFO.ADDRESS.FULL)}`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="mt-4">
              <a 
                href={`https://www.google.com/maps/dir//${encodeURIComponent(CONTACT_INFO.ADDRESS.FULL)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm"
              >
                Get Directions →
              </a>
            </div>
          </div>

          {/* Trust & Verification */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Verified Practice</h3>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                We maintain the highest standards of compliance and patient safety.
              </p>
              <LegitScriptSeal className="mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions About First Visits
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              What should I bring to my first appointment?
            </h3>
            <p className="text-gray-600">
              Please bring a photo ID, insurance card (if applicable), a list of current 
              medications, and any relevant medical records or test results from the past year.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              How long is the first visit?
            </h3>
            <p className="text-gray-600">
              Your first visit typically lasts 60-90 minutes. We take time to understand 
              your health history, current concerns, and wellness goals.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              Do you accept insurance?
            </h3>
            <p className="text-gray-600">
              As a direct primary care practice, we operate on a membership model. However, 
              we can provide documentation for HSA/FSA reimbursement and some services may 
              be covered by your insurance.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              What happens after I submit the contact form?
            </h3>
            <p className="text-gray-600">
              You'll receive an email confirmation immediately. Our team will contact you 
              within 1-2 business days using your preferred contact method to answer questions 
              and schedule your visit.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              Is parking available?
            </h3>
            <p className="text-gray-600">
              Yes, we have ample free parking available directly in front of our building. 
              Handicap accessible parking is also available near the main entrance.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">
              Can I schedule same-day appointments?
            </h3>
            <p className="text-gray-600">
              Yes! One of the benefits of our direct care model is same-day and next-day 
              availability for our members. We also offer virtual visits for your convenience.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}