import { TestimonialCard } from "./testimonial-card";
import { Testimonial } from "@/lib/data/testimonials";

interface TestimonialListProps {
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3;
}

export function TestimonialList({ testimonials, columns = 3 }: TestimonialListProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 sm:gap-6`}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}