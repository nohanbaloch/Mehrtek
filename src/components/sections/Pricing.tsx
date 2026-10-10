import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PricingInteractive } from "@/components/sections/PricingInteractive";
import type { Plan } from "@/types/content";

interface PricingProps {
  plans: Plan[];
}

export function Pricing({ plans }: PricingProps) {
  return (
    <Section
      id="pricing"
      eyebrow="Simple, transparent pricing"
      title="Choose the pace that fits your team"
      description="Start with the essentials, then add more power as your momentum grows."
    >
      <Container className="mt-10">
        <PricingInteractive plans={plans} />
      </Container>
    </Section>
  );
}
