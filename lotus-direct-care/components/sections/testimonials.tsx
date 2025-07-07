import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";
import { featuredTestimonials } from "@/lib/data/testimonials";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[oklch(0.75_0.15_75_/_0.03)] via-background to-[oklch(0.62_0.18_180_/_0.02)]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real stories from real patients who have experienced the transformative
              power of personalized, functional medicine at Lotus Direct Care.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="mb-12">
            <TestimonialCarousel testimonials={featuredTestimonials} />
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <a href="/about/testimonials">
                Read More Patient Stories
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}