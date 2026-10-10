import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";
import { site } from "@/content/site";
import { createFaqPageJsonLd, createSiteJsonLd } from "@/lib/seo";
import { contactSchema } from "@/lib/schema";

afterEach(() => {
  vi.unstubAllEnvs();
});

function request(body: unknown, ip = `198.51.100.${Math.floor(Math.random() * 200)}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("contact schema and route", () => {
  it("accepts valid input and rejects invalid input", () => {
    expect(contactSchema.safeParse({ name: "Ava", email: "ava@example.com", service: "Conversion websites", message: "", honeypot: "" }).success).toBe(true);
    expect(contactSchema.safeParse({ name: "", email: "not-an-email" }).success).toBe(false);
  });

  it("returns validation, development success, production unavailable, and honeypot statuses", async () => {
    vi.stubEnv("NODE_ENV", "development");
    expect((await POST(request({ name: "", email: "bad" }))).status).toBe(400);
    expect((await POST(request({ name: "Bot", email: "bot@example.com", service: "Not sure yet", honeypot: "filled" }))).status).toBe(200);
    expect((await POST(request({ name: "Ava", email: "ava@example.com", service: "Not sure yet" }))).status).toBe(200);

    vi.stubEnv("NODE_ENV", "production");
    expect((await POST(request({ name: "Ava", email: "ava@example.com", service: "Not sure yet" }))).status).toBe(503);
  });

  it("returns 429 after the per-IP limit", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const ip = "203.0.113.77";
    const body = { name: "Ava", email: "ava@example.com", service: "Not sure yet" };
    for (let index = 0; index < 5; index += 1) {
      expect((await POST(request(body, ip))).status).toBe(200);
    }
    expect((await POST(request(body, ip))).status).toBe(429);
  });
});

describe("JSON-LD helpers", () => {
  it("produce valid JSON for FAQ and site structured data", () => {
    const faqJson = createFaqPageJsonLd(site.faqs);
    const siteJson = createSiteJsonLd(site, "https://mehrtek.example");
    expect(() => JSON.parse(JSON.stringify(faqJson))).not.toThrow();
    expect(() => JSON.parse(JSON.stringify(siteJson))).not.toThrow();
    expect(siteJson).toHaveLength(3);
  });
});
