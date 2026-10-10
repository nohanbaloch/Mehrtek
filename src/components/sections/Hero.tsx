import { ArrowDownRight, Bot, Check, LineChart, MessageCircle, Plug } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ui/ContactForm";
import type { SiteContent } from "@/types/content";

interface HeroProps {
  content: SiteContent["hero"];
}

function AutomationMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl animate-hero-enter" aria-label="Automation pipeline, growth chart, and client chat preview" role="img">
      <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-2xl border border-border bg-background p-4 shadow-medium sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Growth system</p>
            <p className="mt-1 font-semibold">New enquiry workflow</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Live</span>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl bg-muted p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">When a lead arrives</p>
              <Plug size={16} className="text-primary" aria-hidden="true" />
            </div>
            <div className="mt-4 space-y-2">
              {["Website form submitted", "Check service fit", "Send helpful reply"].map((step, index) => (
                <div key={step} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">{index + 1}</span>
                  <span>{step}</span>
                  {index < 2 ? <ArrowDownRight size={13} className="ml-auto text-muted-foreground" aria-hidden="true" /> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">Qualified leads</p>
              <LineChart size={16} className="text-primary" aria-hidden="true" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight">+38%</p>
            <div className="mt-5 flex h-14 items-end gap-1.5" aria-hidden="true">
              {[28, 38, 32, 55, 48, 68, 82, 94].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-primary/70" style={{ height: `${height}%` }} />)}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Bot size={16} aria-hidden="true" /></span>
          <div className="text-xs">
            <p className="font-semibold">Mehrtek assistant</p>
            <p className="mt-1 text-muted-foreground">Your reply is ready for review.</p>
          </div>
          <MessageCircle className="ml-auto text-primary" size={17} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export function Hero({ content }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-border py-12 sm:py-16 lg:py-24" aria-labelledby="hero-title">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="animate-hero-enter">
          <Badge>{content.eyebrow}</Badge>
          <h1 id="hero-title" className="mt-5 max-w-xl text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">{content.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">{content.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ContactForm label={content.primaryCta} className="w-full sm:w-auto" />
            <ButtonLink href="#services" variant="secondary" className="w-full sm:w-auto">{content.secondaryCta}</ButtonLink>
          </div>
          <p className="mt-5 text-sm text-muted-foreground"><Check className="mr-1 inline-block text-primary" size={16} aria-hidden="true" />{content.trustLine}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {content.serviceChips.map((chip) => <a key={chip.label} href={chip.href} className="rounded-full border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{chip.label}</a>)}
          </div>
        </div>
        <AutomationMockup />
      </Container>
    </section>
  );
}
