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
    <section className="py-16 md:py-24 bg-gradient-to-br from-[oklch(0.75_0.15_75_/_0.03)] via-background to-[oklch(0.62_0.18_180_/_0.02)] relative overflow-hidden">
      {/* Decorative lotus elements */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-10"
        style={{
          backgroundImage: 'url("/images/Lotus Midjourney Flowers/lotus-functional-medicine-hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateX(50%) translateY(-50%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 opacity-10"
        style={{
          backgroundImage: 'url("/images/Lotus Midjourney Flowers/lotus_dpc_hero.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateX(-50%) translateY(50%)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
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

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {shortTestimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute top-4 right-4 text-primary/10">
                  <Quote className="h-16 w-16" />
                </div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">
                      — {testimonial.author}
                    </div>
                    <div className="text-xs text-gray-500">
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
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-2xl mx-auto relative overflow-hidden">
              {/* Decorative lotus accent */}
              <div 
                className="absolute bottom-0 left-0 w-24 h-24 opacity-15"
                style={{
                  backgroundImage: 'url("/images/Lotus Midjourney Flowers/lotus_logo_full.png")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'bottom left',
                  transform: 'translate(-20%, 20%) rotate(-15deg)',
                }}
              />
              <h3 className="text-xl font-semibold mb-2 relative z-10">Ready to Transform Your Health?</h3>
              <p className="text-gray-600 mb-4 relative z-10">
                Join these satisfied patients and experience healthcare that puts you first.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
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