import Image from "next/image";

import { Container } from "@/components/layout/Container";
import type { SiteContent } from "@/types/content";

interface LogoCloudProps {
  logos: SiteContent["logos"];
}

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <section className="border-b border-border py-10 sm:py-12" aria-labelledby="logo-cloud-title">
      <Container>
        <h2 id="logo-cloud-title" className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Trusted by growing teams
        </h2>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <Image key={logo.src} src={logo.src} alt={logo.alt} width={160} height={40} className="mx-auto h-8 w-auto max-w-full grayscale opacity-60 transition-opacity hover:opacity-100 dark:opacity-70" />
          ))}
        </div>
      </Container>
    </section>
  );
}
