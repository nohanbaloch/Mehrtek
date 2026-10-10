import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_2fr] md:py-20">
        <div className="max-w-xs">
          <Link href="/" className="text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {site.brand.name}
          </Link>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{site.brand.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {site.footer.linkGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {currentYear} {site.brand.name}. All rights reserved.</p>
        <div className="flex gap-5">
          {site.footer.socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
