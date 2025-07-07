import { Metadata } from "next";
import { Heart, Star, Calendar, Shield, Clock, CheckCircle } from "lucide-react";
import { TestimonialList } from "@/components/testimonials/testimonial-list";
import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EXTERNAL_URLS } from "@/lib/constants";
import { testimonials, featuredTestimonials } from "@/lib/data/testimonials";

export const metadata: Metadata = {
  title: "Patient Testimonials | Lotus Direct Care",
  description:
    "Read what our patients say about their experience with Dr. Aaron Rosenberg and Lotus Direct Care. Discover how functional medicine and direct primary care have transformed lives.",
  keywords: [
    "patient testimonials",
    "patient reviews",
    "Dr. Aaron Rosenberg reviews",
    "Lotus Direct Care testimonials",
    "functional medicine success stories",
    "direct primary care reviews",
    "Mequon doctor reviews",
  ],
};

export default function TestimonialsPage() {
  // Calculate average rating
  const averageRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  // Aggregate rating schema for SEO
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Lotus Direct Care",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11649 N Port Washington Rd",
      "addressLocality": "Mequon",
      "addressRegion": "WI",
      "postalCode": "53092",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": testimonials.length,
      "bestRating": 5,
      "worstRating": 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Patient Testimonials</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Hear directly from our patients about their experiences with Dr. Rosenberg
          and how our personalized approach to healthcare has made a difference in
          their lives.
        </p>
        
        {/* Overall Rating */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-lg font-semibold">{averageRating} out of 5</span>
          <span className="text-muted-foreground">
            ({testimonials.length} reviews)
          </span>
        </div>
      </div>

      {/* Featured Testimonials Carousel */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Featured Patient Stories
        </h2>
        <TestimonialCarousel testimonials={featuredTestimonials} />
        
        {/* Mid-section CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Experience the Difference</h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>No Insurance Delays</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>60-Minute Appointments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>24/7 Doctor Access</span>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="shadow-lg">
                <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Free Discovery Call
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* All Testimonials */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">All Patient Reviews</h2>
        <TestimonialList testimonials={testimonials} columns={2} />
        
        {/* Post-testimonials CTA with urgency */}
        <div className="mt-12 text-center">
          <Card className="inline-block bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 font-semibold">
                  Limited Membership Spots Available for 2025
                </span>
              </div>
              <p className="text-sm text-yellow-700 mb-4">
                Join our practice while spots are still available.
                Current members enjoy same-day appointments and direct doctor access.
              </p>
              <Button asChild variant="default" size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer">
                  Secure Your Spot Today
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Ready to Experience Healthcare That Puts You First?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Join our patients who have discovered the difference that personalized,
            unhurried care can make. Schedule your free discovery call today to
            learn how Direct Primary Care can transform your health journey.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Same-Day Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>No Insurance Required</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg">
              <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer">
                Schedule Free Discovery Call
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <a href="/services/direct-primary-care">
                Learn About Direct Primary Care
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground italic max-w-3xl mx-auto">
          * Patient testimonials reflect individual experiences and results may vary.
          All testimonials are from actual patients of Lotus Direct Care. Names are
          displayed as first name and last initial to protect patient privacy in
          accordance with HIPAA regulations.
        </p>
      </div>
    </div>
  );
}