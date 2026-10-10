import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
}

export function Section({
  eyebrow,
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("scroll-mt-24 py-20 md:py-28", className)} {...props}>
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p> : null}
        {title ? <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2> : null}
        {description ? <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
