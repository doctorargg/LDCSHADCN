"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "./testimonial-card";
import { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function TestimonialCarousel({
  testimonials,
  autoplay = true,
  autoplayDelay = 5000,
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Track selected index
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Autoplay functionality
  React.useEffect(() => {
    if (!autoplay || !emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayDelay]);

  return (
    <div className="relative px-4 sm:px-12">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex gap-4 -ml-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons - hidden on mobile, better positioned on desktop */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hidden sm:flex hover:scale-110 transition-transform"
        onClick={scrollPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full shadow-lg bg-background/95 backdrop-blur-sm hidden sm:flex hover:scale-110 transition-transform"
        onClick={scrollNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Progress indicators - visible on all screen sizes */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`transition-all ${
              index === selectedIndex
                ? 'w-8 h-2 bg-primary rounded-full'
                : 'w-2 h-2 bg-primary/20 rounded-full hover:bg-primary/40'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}