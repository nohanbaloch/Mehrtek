import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { Accordion } from "@/components/ui/Accordion";
import { PricingInteractive } from "@/components/sections/PricingInteractive";
import { site } from "@/content/site";
import { getPrice } from "@/lib/pricing";
import { createFaqPageJsonLd } from "@/lib/seo";

describe("Phase 3 content integrity", () => {
  it("contains complete features with unique titles", () => {
    expect(site.features.length).toBeGreaterThanOrEqual(6);
    expect(new Set(site.features.map((feature) => feature.title)).size).toBe(site.features.length);
    for (const feature of site.features) {
      expect(feature.icon.trim()).not.toBe("");
      expect(feature.title.trim()).not.toBe("");
      expect(feature.description.trim()).not.toBe("");
    }
  });

  it("contains complete placeholder testimonials", () => {
    expect(site.testimonials.length).toBeGreaterThanOrEqual(3);
    for (const testimonial of site.testimonials) {
      expect(testimonial.quote.trim()).not.toBe("");
      expect(testimonial.name.trim()).not.toBe("");
      expect(testimonial.role.trim()).not.toBe("");
      expect(testimonial.company.trim()).not.toBe("");
      expect(testimonial.initials.trim()).not.toBe("");
    }
  });
});

describe("Phase 3 page rendering", () => {
  it("renders every feature and testimonial from site content", () => {
    render(<Home />);

    for (const feature of site.features) {
      expect(screen.getByRole("heading", { name: feature.title })).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }

    for (const testimonial of site.testimonials) {
      expect(screen.getByText(`“${testimonial.quote}”`)).toBeInTheDocument();
      expect(screen.getByText(testimonial.name)).toBeInTheDocument();
    }
  });
});

describe("Pricing", () => {
  it("computes every plan price for both billing intervals", () => {
    for (const plan of site.plans) {
      const monthly = getPrice(plan, "monthly");
      const yearly = getPrice(plan, "yearly");

      if (plan.id === "custom") {
        expect(monthly).toBeNull();
        expect(yearly).toBeNull();
      } else {
        expect(monthly?.monthly).toBe(plan.price.monthly);
        expect(monthly?.yearlyTotal).toBe((plan.price.yearly ?? 0) * 12);
        expect(yearly?.monthly).toBe(plan.price.yearly);
        expect(yearly?.savings).toBe((plan.price.monthly ?? 0) * 12 - (plan.price.yearly ?? 0) * 12);
      }
    }
  });

  describe("FAQ", () => {
    it("contains complete FAQ content", () => {
      expect(site.faqs.length).toBeGreaterThanOrEqual(6);
      for (const faq of site.faqs) {
        expect(faq.question.trim()).not.toBe("");
        expect(faq.answer.trim()).not.toBe("");
      }
    });

    it("opens and closes one item at a time with correct ARIA attributes", async () => {
      const user = userEvent.setup();
      render(<Accordion items={site.faqs} />);
      const triggers = screen.getAllByRole("button");
      expect(triggers[0]).toHaveAttribute("aria-expanded", "false");

      await user.click(triggers[0]);
      expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
      expect(triggers[0]).toHaveAttribute("aria-controls");
      expect(screen.getByText(site.faqs[0].answer)).toBeVisible();

      await user.click(triggers[1]);
      expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
      expect(triggers[1]).toHaveAttribute("aria-expanded", "true");

      await user.keyboard("{Enter}");
      expect(triggers[1]).toHaveAttribute("aria-expanded", "false");
    });

    it("generates FAQ JSON-LD from the same content", () => {
      const jsonLd = createFaqPageJsonLd(site.faqs);
      expect(jsonLd.mainEntity).toHaveLength(site.faqs.length);
      expect(jsonLd.mainEntity[0]).toMatchObject({
        name: site.faqs[0].question,
        acceptedAnswer: { text: site.faqs[0].answer },
      });
    });
  });

  it("contains complete plans with unique ids and names", () => {
    expect(site.plans).toHaveLength(3);
    expect(new Set(site.plans.map((plan) => plan.id)).size).toBe(site.plans.length);
    expect(new Set(site.plans.map((plan) => plan.name)).size).toBe(site.plans.length);

    for (const plan of site.plans) {
      expect(plan.description.trim()).not.toBe("");
      expect(plan.cta.trim()).not.toBe("");
      expect(plan.href.trim()).not.toBe("");
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });

  it("changes displayed prices and aria-checked with keyboard input", async () => {
    const user = userEvent.setup();
    render(<PricingInteractive plans={site.plans} />);
    const toggle = screen.getByRole("switch");

    expect(toggle).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("$2,800")).toBeInTheDocument();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("$3,500")).toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });
});
