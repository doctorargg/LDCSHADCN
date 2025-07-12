import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, Clock, Shield, Calendar } from "lucide-react";
import { EXTERNAL_URLS } from "@/lib/constants";

export function TestimonialsHome() {
  const shortTestimonials = [
    {
      quote: "Dr. Rosenberg has literally saved my life and given me another chance at a happy and successful life.",
      author: "Geoffrey V.",
      rating: 5
    },
    {
      quote: "Best decision I ever made for my health was switching to Dr Aaron.",
      author: "Deb G.",
      rating: 5
    },
    {
      quote: "He found things that no one else did. He has experience as a PCP but uses a functional medicine approach. This is so effective!",
      author: "Katrina J.",
      rating: 5
    },
    {
      quote: "I'm incredibly grateful to have found this practice and I cannot recommend them enough.",
      author: "Joshua G.",
      rating: 5
    }
  ];

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

          {/* Testimonials Grid with staggered animation */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {shortTestimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-background via-background to-primary/[0.02] group"
              >
                <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-all duration-300">
                  <Quote className="h-16 w-16 group-hover:scale-110 transition-transform" />
                </div>
                <CardContent className="p-6 sm:p-8 relative z-10">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic text-base sm:text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between border-t pt-4 border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-xs text-primary/60">
                          Verified Patient
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Recently Reviewed
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA with Conversion Elements */}
          <div className="text-center space-y-6">
            {/* Urgency and Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>No Insurance Hassles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Same-Day Appointments Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">Limited Membership Spots Available</span>
              </div>
            </div>
            
            {/* Primary CTA */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-2">Ready to Transform Your Health?</h3>
              <p className="text-gray-600 mb-4">
                Join these satisfied patients and experience healthcare that puts you first.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="shadow-lg">
                  <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Schedule Free Discovery Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/about/testimonials">
                    Read More Patient Stories
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}