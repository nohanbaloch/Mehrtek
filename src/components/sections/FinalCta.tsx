import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import type { SiteContent } from "@/types/content";

interface FinalCtaProps {
  content: SiteContent["finalCta"];
}

export function FinalCta({ content }: FinalCtaProps) {
  return (
    <section
      id="final-cta"
      className="border-y border-primary/20 bg-primary py-16 text-center text-primary-foreground md:py-20"
      aria-labelledby="final-cta-title"
    >
      <Container>
        <h2 id="final-cta-title" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {content.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground">{content.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ContactForm label={content.primaryCta} className="w-full bg-background text-foreground hover:bg-background/90 sm:w-auto" />
          {content.secondaryLink ? (
            <ButtonLink href={content.secondaryLink.href} variant="ghost" className="w-full text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto">
              {content.secondaryLink.label}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
