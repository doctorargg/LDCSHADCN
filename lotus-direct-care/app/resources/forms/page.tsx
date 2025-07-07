import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ResourceList } from '@/components/resources/resource-list'
import { ArrowLeft, Download, Info } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const metadata: Metadata = {
  title: 'Patient Forms | Lotus Direct Care',
  description: 'Download patient forms for Lotus Direct Care including new patient registration, medical history, consent forms, and more.',
  keywords: 'patient forms, medical forms, new patient paperwork, consent forms, medical history, Lotus Direct Care',
  openGraph: {
    title: 'Patient Forms | Lotus Direct Care',
    description: 'Download and complete patient forms before your visit to save time.',
    url: 'https://lotusdirectcare.com/resources/forms',
  },
}

const patientForms = [
  {
    title: 'New Patient Registration Form',
    description: 'Basic information form for all new patients including contact details, emergency contacts, and insurance information.',
    type: 'form' as const,
    category: 'New Patient',
    downloadUrl: '/forms/new-patient-registration.pdf',
    fileSize: '125 KB',
    lastUpdated: 'January 2025',
    featured: true
  },
  {
    title: 'Medical History Questionnaire',
    description: 'Comprehensive health history including past medical conditions, surgeries, medications, and family history.',
    type: 'form' as const,
    category: 'New Patient',
    downloadUrl: '/forms/medical-history.pdf',
    fileSize: '186 KB',
    lastUpdated: 'January 2025',
    featured: true
  },
  {
    title: 'Functional Medicine Assessment',
    description: 'Detailed questionnaire covering lifestyle, nutrition, stress, sleep, and environmental factors affecting your health.',
    type: 'form' as const,
    category: 'Functional Medicine',
    downloadUrl: '/forms/functional-medicine-assessment.pdf',
    fileSize: '245 KB',
    lastUpdated: 'January 2025'
  },
  {
    title: 'Consent for Treatment',
    description: 'General consent form for medical treatment and procedures at Lotus Direct Care.',
    type: 'form' as const,
    category: 'Consent Forms',
    downloadUrl: '/forms/consent-for-treatment.pdf',
    fileSize: '98 KB',
    lastUpdated: 'December 2024'
  },
  {
    title: 'Privacy Practices Acknowledgment',
    description: 'HIPAA privacy notice acknowledgment form regarding the use and disclosure of your health information.',
    type: 'form' as const,
    category: 'Consent Forms',
    downloadUrl: '/forms/privacy-practices.pdf',
    fileSize: '112 KB',
    lastUpdated: 'December 2024'
  },
  {
    title: 'Direct Primary Care Agreement',
    description: 'Membership agreement outlining the terms of our Direct Primary Care services and fee structure.',
    type: 'form' as const,
    category: 'DPC Membership',
    downloadUrl: '/forms/dpc-agreement.pdf',
    fileSize: '156 KB',
    lastUpdated: 'January 2025'
  },
  {
    title: 'Medication List Template',
    description: 'Template to list all current medications, supplements, dosages, and frequencies.',
    type: 'form' as const,
    category: 'Medical Records',
    downloadUrl: '/forms/medication-list.pdf',
    fileSize: '75 KB',
    lastUpdated: 'January 2025'
  },
  {
    title: 'Release of Medical Records',
    description: 'Authorization form to request medical records from previous healthcare providers.',
    type: 'form' as const,
    category: 'Medical Records',
    downloadUrl: '/forms/records-release.pdf',
    fileSize: '92 KB',
    lastUpdated: 'December 2024'
  },
  {
    title: 'Symptom Tracker',
    description: 'Daily symptom tracking journal to monitor your health between visits.',
    type: 'form' as const,
    category: 'Tools',
    downloadUrl: '/forms/symptom-tracker.pdf',
    fileSize: '134 KB',
    lastUpdated: 'January 2025'
  }
]

const formCategories = [
  { name: 'New Patient', count: 2 },
  { name: 'Consent Forms', count: 2 },
  { name: 'Medical Records', count: 2 },
  { name: 'Functional Medicine', count: 1 },
  { name: 'DPC Membership', count: 1 },
  { name: 'Tools', count: 1 }
]

export default function FormsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link href="/resources" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Resources
              </Link>
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Patient Forms
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Download and complete these forms before your visit to save time and ensure we have 
              all the information needed to provide you with the best possible care.
            </p>

            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>New Patients:</strong> Please complete the New Patient Registration Form and 
                Medical History Questionnaire before your first appointment. Additional forms may be 
                requested based on your specific needs.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>

      {/* Form Categories Overview */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4">
              {formCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <span className="text-gray-500">({category.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Forms List */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Forms</h2>
              <p className="text-gray-600">
                Click on any form below to download it as a PDF. You can complete these forms 
                digitally or print them out and bring them to your appointment.
              </p>
            </div>

            <ResourceList resources={patientForms} />

            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Form Submission Options</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Online Portal</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload completed forms securely through our patient portal.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <a href="https://portal.lotusdirectcare.com" target="_blank" rel="noopener noreferrer">
                      Access Portal
                    </a>
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Email</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Send completed forms to forms@lotusdirectcare.com
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <a href="mailto:forms@lotusdirectcare.com">
                      Send Email
                    </a>
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">In Person</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Bring printed forms to your appointment.
                  </p>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/contact">
                      Get Directions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help with Forms?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our staff is happy to assist you with any questions about completing your forms 
              or to help you determine which forms you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-white">
                <a href="tel:+1234567890">
                  <Download className="w-4 h-4 mr-2" />
                  Call (123) 456-7890
                </a>
              </Button>
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}