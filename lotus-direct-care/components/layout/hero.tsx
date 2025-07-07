import { HeroWithImage } from './hero-with-image'
import { EXTERNAL_URLS } from '@/lib/constants'

export function Hero() {
  return (
    <HeroWithImage
      imageSrc="/images/Lotus Midjourney Flowers/lotus-homepage-new.png"
      imageAlt="Lotus flower representing holistic health and wellness at Lotus Direct Care"
      title={
        <>
          Transform Your Health with
          <span className="bg-gradient-to-r from-[oklch(0.85_0.12_75)] to-[oklch(0.75_0.15_75)] bg-clip-text text-transparent block mt-2">Personalized Medicine & Direct Primary Care</span>
        </>
      }
      subtitle="Dr. Aaron Rosenberg brings 10+ years of expertise in comprehensive healthcare, combining functional medicine, integrative therapies, and direct primary care to optimize your wellness"
      showCTA={true}
      minHeight="min-h-[90vh]"
      primaryCTAText="Schedule Free Discovery Call"
      primaryCTAHref={EXTERNAL_URLS.BOOK_APPOINTMENT}
    >
      {/* Trust indicators with urgency */}
      <div className="space-y-4">
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
            <span>Licensed Physician (MD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
            <span>Same-Day Appointments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
            <span>No Insurance Hassles</span>
          </div>
        </div>
        
        {/* Urgency indicator */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white font-medium">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Limited Membership Spots Available for 2025
          </span>
        </div>
      </div>
    </HeroWithImage>
  )
}