import { describe, expect, it } from "vitest";

import { site } from "@/content/site";

describe("hero content integrity", () => {
  it("contains complete hero fields and a concise H1", () => {
    const { hero } = site;
    const requiredFields = [hero.eyebrow, hero.title, hero.description, hero.primaryCta, hero.secondaryCta, hero.trustLine];

    expect(requiredFields.every((field) => field.trim().length > 0)).toBe(true);
    expect(hero.title.trim().split(/\s+/).length).toBeLessThanOrEqual(12);
  });
});
