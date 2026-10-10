import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Project, SectionContent } from "@/types/content";

interface WorkProps {
  projects: Project[];
  content: SectionContent;
}

export function Work({ projects, content }: WorkProps) {
  return (
    <Section id="work" eyebrow={content.eyebrow} title={content.title} description={content.description}>
      <Container className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-background shadow-subtle">
            <div className={`flex h-40 items-end p-6 ${project.accent}`}>
              <div className="flex w-full items-center justify-between rounded-lg border border-border/70 bg-background/90 p-3 backdrop-blur-sm">
                <span className="text-sm font-semibold">{project.category}</span>
                <ArrowUpRight size={18} className="text-primary" aria-hidden="true" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
              <p className="mt-3 text-muted-foreground">{project.description}</p>
              <p className="mt-5 text-sm font-medium text-primary">{project.outcome}</p>
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}
