import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import type { SectionContent, Testimonial } from "@/types/content";

interface TestimonialsProps {
  testimonials: Testimonial[];
  content: SectionContent;
}

export function Testimonials({ testimonials, content }: TestimonialsProps) {
  return (
    <Section
      id="testimonials"
      className="bg-muted/30"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <Container className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name}>
            <figure className="flex h-full flex-col">
              <blockquote className="text-lg leading-8 text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                {testimonial.avatar ? (
                  <Image
                    src={testimonial.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>
                )}
                <div>
                  <cite className="not-italic font-semibold">{testimonial.name}</cite>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Card>
        ))}
      </Container>
    </Section>
  );
}
