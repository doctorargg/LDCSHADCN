import { HeroWithImage } from './hero-with-image'

export function Hero() {
  return (
    <HeroWithImage
      imageSrc="/images/Lotus Midjourney Flowers/lotus-homepage-new.png"
      imageAlt="Lotus flower representing holistic health and wellness at Lotus Direct Care"
      title={
        <>
          Transform Your Health with
          <span className="bg-gradient-to-r from-[oklch(0.85_0.12_75)] to-[oklch(0.75_0.15_75)] bg-clip-text text-transparent block mt-2">Functional Medicine</span>
        </>
      }
      subtitle="Dr. Aaron Rosenberg brings 10+ years of expertise in uncovering root causes and creating personalized paths to optimal wellness"
      showCTA={true}
      minHeight="min-h-[90vh]"
    >
      {/* Trust indicators */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
          <span>Board Certified</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
          <span>10+ Years Experience</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[oklch(0.75_0.15_75)] rounded-full animate-pulse" />
          <span>Personalized Care</span>
        </div>
      </div>
    </HeroWithImage>
  )
}