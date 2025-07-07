"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FAQItem,
  FAQCategory,
  faqCategories,
  getFAQsByCategory,
  searchFAQs,
} from "@/lib/data/faq";

interface FAQAccordionProps {
  faqs?: FAQItem[];
  showSearch?: boolean;
  showCategories?: boolean;
  defaultCategory?: FAQCategory;
}

export function FAQAccordion({
  faqs: providedFaqs,
  showSearch = true,
  showCategories = true,
  defaultCategory,
}: FAQAccordionProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<FAQCategory | "All">(
    defaultCategory || "All"
  );

  // Filter FAQs based on search and category
  const filteredFaqs = React.useMemo(() => {
    let faqs = providedFaqs || [];

    // If no FAQs provided, get from data
    if (!providedFaqs) {
      if (selectedCategory === "All") {
        faqs = searchTerm ? searchFAQs(searchTerm) : getFAQsByCategory("General");
      } else {
        faqs = getFAQsByCategory(selectedCategory);
      }
    }

    // Apply search filter if search term exists
    if (searchTerm && providedFaqs) {
      faqs = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return faqs;
  }, [searchTerm, selectedCategory, providedFaqs]);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      {showSearch && (
        <div className="relative">
          <Label htmlFor="faq-search" className="sr-only">
            Search FAQs
          </Label>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="faq-search"
            type="search"
            placeholder="Search frequently asked questions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Category Filter */}
      {showCategories && !providedFaqs && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === "All" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory("All")}
          >
            All Categories
          </Badge>
          {faqCategories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}

      {/* FAQ Accordion */}
      {filteredFaqs.length > 0 ? (
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                <span className="pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          {searchTerm
            ? `No FAQs found matching "${searchTerm}"`
            : "No FAQs available in this category"}
        </div>
      )}

      {/* Results count */}
      {searchTerm && (
        <p className="text-sm text-muted-foreground">
          Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}