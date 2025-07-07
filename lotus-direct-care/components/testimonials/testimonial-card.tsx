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
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{testimonial.patientName}</h3>
            <p className="text-sm text-muted-foreground">{testimonial.condition}</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-sm leading-relaxed text-foreground/90 italic">
          "{testimonial.review}"
        </blockquote>
        <p className="text-xs text-muted-foreground mt-4">
          {new Date(testimonial.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </CardContent>
    </Card>
  );
}