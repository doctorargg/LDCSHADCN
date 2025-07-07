'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar } from 'lucide-react'
import { ReactNode } from 'react'

interface HeroWithImageProps {
  imageSrc: string
  imageAlt: string
  title: string | ReactNode
  subtitle?: string
  showCTA?: boolean
  primaryCTAText?: string
  primaryCTAHref?: string
  secondaryCTAText?: string
  secondaryCTAHref?: string
  overlayOpacity?: number
  minHeight?: string
  children?: ReactNode
}

export function HeroWithImage({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  showCTA = false,
  primaryCTAText = "Schedule Consultation",
  primaryCTAHref = "/contact",
  secondaryCTAText = "Learn More",
  secondaryCTAHref = "/services",
  overlayOpacity = 0.6,
  minHeight = "min-h-[60vh]",
  children
}: HeroWithImageProps) {
  return (
    <section className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}>
      {/* Background Image with optimization */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {title}
          </h1>
          
          {/* Subheadline */}
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
              {subtitle}
            </p>
          )}
          
          {/* CTA Buttons */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" asChild className="shadow-2xl shadow-[oklch(0.62_0.18_180_/_0.3)]">
                <Link href={primaryCTAHref} className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {primaryCTAText}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-xl">
                <Link href={secondaryCTAHref} className="flex items-center gap-2">
                  {secondaryCTAText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          )}
          
          {/* Additional content */}
          {children}
        </div>
      </div>
      
      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}