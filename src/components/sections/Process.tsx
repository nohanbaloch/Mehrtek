import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { ProcessStep, SectionContent } from "@/types/content";

interface ProcessProps {
  steps: ProcessStep[];
  content: SectionContent;
}

export function Process({ steps, content }: ProcessProps) {
  return (
    <Section id="process" className="bg-muted/30" eyebrow={content.eyebrow} title={content.title} description={content.description}>
      <Container className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative rounded-[var(--radius-lg)] border border-border bg-background p-6">
            <span className="text-sm font-bold text-primary">{step.number}</span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-3 text-muted-foreground">{step.description}</p>
            {index < steps.length - 1 ? <ArrowRight className="absolute -right-3 top-8 z-10 hidden rounded-full bg-background p-1 text-primary md:block" size={24} aria-hidden="true" /> : null}
          </div>
        ))}
      </Container>
    </Section>
  );
}
