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

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
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
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
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

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full shadow-lg bg-background"
        onClick={scrollPrev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full shadow-lg bg-background"
        onClick={scrollNext}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}