import type { Faq, Plan, SiteContent } from "@/types/content";

export function createFaqPageJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createSiteJsonLd(site: SiteContent, siteUrl: string) {
  const offers = site.plans
    .filter((plan): plan is Plan & { price: { monthly: number; yearly: number } } => plan.price.monthly !== null && plan.price.yearly !== null)
    .map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price.yearly,
      priceCurrency: "USD",
      url: `${siteUrl}#pricing`,
    }));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.brand.name,
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.brand.name,
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.brand.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers,
    },
  ];
}
