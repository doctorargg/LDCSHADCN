import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const reviewSchema = {
    "@type": "Review",
    "@context": "https://schema.org",
    "author": {
      "@type": "Person",
      "name": testimonial.patientName
    },
    "datePublished": testimonial.date,
    "reviewBody": testimonial.review,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "itemReviewed": {
      "@type": "MedicalOrganization",
      "name": "Lotus Direct Care",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11649 N Port Washington Rd",
        "addressLocality": "Mequon",
        "addressRegion": "WI",
        "postalCode": "53092",
        "addressCountry": "US"
      }
    }
  };

  return (
    <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-background to-primary/[0.02] group">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <CardHeader className="pb-4 relative">
        <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{testimonial.patientName}</h3>
            <p className="text-sm text-primary/70 font-medium">{testimonial.condition}</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-all ${
                  i < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400 group-hover:scale-110"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-sm leading-relaxed text-gray-700 italic mb-4">
          "{testimonial.review}"
        </blockquote>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-muted-foreground">
            {new Date(testimonial.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <span className="text-xs font-medium text-primary/60">Verified Patient</span>
        </div>
      </CardContent>
    </Card>
  );
}