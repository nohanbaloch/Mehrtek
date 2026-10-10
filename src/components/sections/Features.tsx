import {
  Blocks,
  Gauge,
  Handshake,
  MessageSquareText,
  RefreshCw,
  Target,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import type { Feature, SectionContent } from "@/types/content";

const featureIcons: Record<Feature["icon"], LucideIcon> = {
  Blocks,
  Gauge,
  Handshake,
  MessageSquareText,
  RefreshCw,
  Target,
};

interface FeaturesProps {
  features: Feature[];
  content: SectionContent;
}

export function Features({ features, content }: FeaturesProps) {
  return (
    <Section
      id="features"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <Container className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon];

          return (
            <Card key={feature.title} className="interactive-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-3 text-muted-foreground">{feature.description}</p>
            </Card>
          );
        })}
      </Container>
    </Section>
  );
}
