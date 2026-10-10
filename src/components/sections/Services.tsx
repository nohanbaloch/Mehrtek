"use client";

import {
  Bot,
  ChartNoAxesCombined,
  MousePointerClick,
  PanelsTopLeft,
  PenLine,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/ui/ContactForm";
import type { SectionContent, Service } from "@/types/content";

const serviceIcons: Record<Service["icon"], LucideIcon> = {
  Bot,
  ChartNoAxesCombined,
  MousePointerClick,
  PanelsTopLeft,
  PenLine,
  Workflow,
};

interface ServicesProps {
  services: Service[];
  content: SectionContent;
}

export function Services({ services, content }: ServicesProps) {
  return (
    <Section id="services" eyebrow={content.eyebrow} title={content.title} description={content.description}>
      <Container className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <Card key={service.id} className="interactive-card flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service {String(services.indexOf(service) + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-3 text-muted-foreground">{service.outcome}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground"><strong className="font-semibold text-foreground">Best for:</strong> {service.bestFor.replace("Best for ", "")}</p>
              <ContactForm label="Get a quote" service={service.title} variant="secondary" className="mt-6 w-full" />
            </Card>
          );
        })}
      </Container>
    </Section>
  );
}
