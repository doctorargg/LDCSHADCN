import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

export function DoctorIntro() {
  return (
    <section className="py-16 md:py-24 gradient-lotus">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image placeholder - replace with actual doctor photo */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.62_0.18_180_/_0.2)] to-[oklch(0.75_0.15_75_/_0.2)] rounded-2xl" />
              <div className="relative h-full rounded-2xl overflow-hidden border-4 border-white shadow-lotus-hover">
                <Image
                  src="/images/team/dr-rosenberg.jpg"
                  alt="Dr. Aaron Rosenberg - Board-Certified Physician & Functional Medicine Expert"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  priority
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[oklch(0.62_0.18_180_/_0.2)] rounded-full blur-2xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[oklch(0.75_0.15_75_/_0.2)] rounded-full blur-2xl" />
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Dr. Aaron Rosenberg
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Your Partner in Achieving Optimal Health
              </p>
            </div>
            
            <div className="space-y-4 text-gray-600">
              <p>
                With over 10 years of experience in functional medicine, Dr. Rosenberg 
                has helped thousands of patients reclaim their health and vitality. His 
                unique approach combines cutting-edge diagnostic tools with time-tested 
                healing principles.
              </p>
              <p>
                As a board-certified physician and certified functional medicine practitioner, 
                Dr. Rosenberg specializes in complex chronic conditions, hormone optimization, 
                and metabolic health. He believes in treating the whole person, not just symptoms.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-gradient-to-r from-[oklch(0.62_0.18_180_/_0.1)] to-[oklch(0.62_0.18_180_/_0.05)] border-[oklch(0.62_0.18_180_/_0.2)]">Board Certified MD</Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-[oklch(0.62_0.18_180_/_0.1)] to-[oklch(0.62_0.18_180_/_0.05)] border-[oklch(0.62_0.18_180_/_0.2)]">Functional Medicine Certified</Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-[oklch(0.62_0.18_180_/_0.1)] to-[oklch(0.62_0.18_180_/_0.05)] border-[oklch(0.62_0.18_180_/_0.2)]">10+ Years Experience</Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/about/dr-rosenberg" className="flex items-center gap-2">
                  Read Full Bio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/approach">
                  Our Approach
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}