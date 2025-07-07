import { Metadata } from "next";
import { MessageCircleQuestion, Phone, Mail } from "lucide-react";
import { FAQAccordion } from "@/components/faq/faq-accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO, EXTERNAL_URLS } from "@/lib/constants";
import { faqs } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Lotus Direct Care",
  description:
    "Find answers to common questions about Direct Primary Care, Functional Medicine, pricing, insurance, and appointments at Lotus Direct Care in Mequon, WI.",
  keywords: [
    "FAQ",
    "frequently asked questions",
    "direct primary care FAQ",
    "functional medicine questions",
    "Dr. Aaron Rosenberg",
    "Lotus Direct Care",
    "Mequon medical practice",
  ],
};

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <MessageCircleQuestion className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our Direct Primary Care model,
          Functional Medicine approach, and how we can help you achieve optimal health.
        </p>
      </div>

      {/* Main FAQ Section */}
      <div className="mb-16">
        <FAQAccordion faqs={faqs} showSearch={true} showCategories={true} />
      </div>

      {/* Still Have Questions Section */}
      <Card className="bg-muted/30 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Still Have Questions?</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're here to help! If you couldn't find the answer you're looking for,
            please don't hesitate to reach out. We'd be happy to discuss your
            healthcare needs and how Direct Primary Care can work for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg">
              <a href={`tel:${CONTACT_INFO.PHONE}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call {CONTACT_INFO.PHONE}
              </a>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <a href={`mailto:${CONTACT_INFO.EMAIL}`}>
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </a>
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Ready to experience healthcare that puts you first?
            </p>
            <Button asChild variant="secondary">
              <a href={EXTERNAL_URLS.BOOK_APPOINTMENT} target="_blank" rel="noopener noreferrer">
                Schedule a Free Discovery Call
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn about our intake process and what to expect at your first visit.
            </p>
            <Button asChild variant="link" className="p-0 h-auto">
              <a href="/services/direct-primary-care">Learn More →</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Our Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore our comprehensive approach to healthcare and wellness.
            </p>
            <Button asChild variant="link" className="p-0 h-auto">
              <a href="/services">View Services →</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About Dr. Rosenberg</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Meet our physician and learn about his approach to medicine.
            </p>
            <Button asChild variant="link" className="p-0 h-auto">
              <a href="/about/dr-rosenberg">Meet Dr. Rosenberg →</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}