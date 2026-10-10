import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const contactValues = {
  name: "Test User",
  email: "test@example.com",
  message: "A test message",
};

async function openContactForm(page: Page) {
  await page.getByRole("button", { name: "Book a free call" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
}

test("loads without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page).toHaveTitle(/Mehrtek/);
  await expect(page.locator("h1")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("has no horizontal overflow at 320px and exactly one H1", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("navigation reaches each section", async ({ page }) => {
  await page.goto("/");

  for (const [label, id] of [
    ["Services", "services"],
    ["How it works", "process"],
    ["Work", "work"],
    ["Pricing", "pricing"],
    ["FAQ", "faq"],
  ] as const) {
    if ((await page.viewportSize())?.width && (await page.viewportSize())!.width < 768) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.locator("#mobile-navigation").getByRole("link", { name: label, exact: true }).click();
    } else {
      await page.getByRole("link", { name: label, exact: true }).first().click();
    }
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test("mobile navigation traps focus and closes on Escape", async ({ page }) => {
  test.skip((await page.viewportSize())?.width !== 412, "Mobile-only behavior");
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.click();
  const menu = page.locator("#mobile-navigation");
  await expect(menu).toBeVisible();
  await expect(menu.locator("a").first()).toBeFocused();

  const focusable = menu.locator("a[href], button:not([disabled])");
  await focusable.last().focus();
  await page.keyboard.press("Tab");
  await expect(focusable.first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(menuButton).toBeFocused();
});

test("pricing toggle changes prices and FAQ expands", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("switch", { name: /Monthly Yearly/ });
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await expect(page.getByText("$2,800", { exact: true })).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-checked", "false");
  await expect(page.getByText("$3,500", { exact: true })).toBeVisible();

  const question = page.getByRole("button", { name: "What kind of businesses do you work with?" });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/small service businesses and lean teams/)).toBeVisible();
});

test("contact form validates, submits, and rejects honeypot input", async ({ page }) => {
  await page.goto("/");
  await openContactForm(page);

  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();

  await page.route("/api/contact", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "Thanks for reaching out." }) });
  });
  await page.getByLabel("Name").fill(contactValues.name);
  await page.getByLabel("Email").fill(contactValues.email);
  await page.getByLabel("Message").fill(contactValues.message);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Thanks for reaching out.")).toBeVisible();

  await page.getByRole("button", { name: "Close contact form" }).click();
  await openContactForm(page);
  await page.locator('input[name="honeypot"]').evaluate((input) => {
    const element = input as HTMLInputElement;
    element.value = "bot";
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.getByLabel("Name").fill(contactValues.name);
  await page.getByLabel("Email").fill(contactValues.email);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByText("Thanks for reaching out.")).toBeVisible();
});

test("mobile sticky CTA appears between hero and final CTA", async ({ page }) => {
  test.skip((await page.viewportSize())?.width !== 412, "Mobile-only behavior");
  await page.goto("/");

  const stickyCta = page.getByTestId("mobile-sticky-cta");
  await expect(stickyCta).toBeHidden();
  await page.locator("#features").scrollIntoViewIfNeeded();
  await expect(stickyCta).toBeVisible();
  await page.locator("#final-cta").scrollIntoViewIfNeeded();
  await expect(stickyCta).toBeHidden();
});

test("has no serious or critical axe violations in light and dark mode", async ({ page }) => {
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(seriousOrCritical, `${colorScheme} mode violations`).toEqual([]);
  }
});
