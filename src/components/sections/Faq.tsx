import Script from "next/script";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/content/site";
import { createFaqPageJsonLd } from "@/lib/seo";
import type { Faq } from "@/types/content";

interface FaqProps {
  faqs: Faq[];
}

export function Faq({ faqs }: FaqProps) {
  return (
    <Section
      id="faq"
      eyebrow="Questions, answered"
      title="A clear path from first step to next"
      description={`Everything you need to know before bringing your team into ${site.brand.name}.`}
    >
      <Container className="mt-12 max-w-3xl">
        <Accordion items={faqs} />
      </Container>
      <Script id="faq-json-ld" type="application/ld+json">
        {JSON.stringify(createFaqPageJsonLd(faqs))}
      </Script>
    </Section>
  );
}
