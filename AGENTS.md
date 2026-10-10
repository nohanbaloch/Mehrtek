# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, etc.) building and maintaining this project.
Read this file fully before writing any code. When this file conflicts with a guess, follow this file.

---

## 1. Project Overview

**Goal:** Build a fully working, production-ready marketing landing page for an Agency / SaaS product.

**Brand (placeholder):**
- Name: **Mehrtek** (project and brand name)
- Tagline: "Build smarter. Grow faster."
- Domain placeholder: `mehrtek.example` (use `NEXT_PUBLIC_SITE_URL` in code, never hardcode)
- Wordmark: text-based logo "Mehrtek" with a simple geometric SVG mark; no external logo files needed.
- Define the name once in `src/content/site.ts` as `brand.name` and reference it everywhere (header, footer, metadata, JSON-LD, OG image, legal pages, copyright line, package.json `name` as `mehrtek`). Never hardcode the name in components so it can be swapped with one edit.
- If any earlier code or file still says "Kindlewave", replace every occurrence with "Mehrtek" (including the wave-themed tagline and any wave/spark logo mark).

**What Mehrtek is (business definition — the site must make this obvious within 5 seconds):**
- Mehrtek is a small AI and digital services agency. It helps businesses and creators save time, make better decisions from their data, and produce polished content, using AI/ML, automation, analytics and video.
- Target customers: small and medium businesses, startups, e-commerce sellers, marketing teams and content creators who want AI, automation or better visuals without hiring a full in-house team.
- Core services (these six are the source of truth; edit here if the offer changes):
  1. **AI & Machine Learning Development**: custom models, prediction, classification, NLP, computer vision.
  2. **AI Automation & Workflows**: lead capture, CRM pipelines, email and report automation, n8n-style workflows with AI lead scoring.
  3. **AI Chatbots & Assistants**: support and sales chatbots trained on the client's own content.
  4. **Data Analytics & Dashboards**: cleaning, analysis, market-basket and sales insights, clear dashboards and reports.
  5. **Video Editing & Color Grading**: social, promo and short-film edits with professional color work.
  6. **Computer Vision & OCR**: document, handwriting and image recognition systems.
- Value proposition (use as the base for the hero copy): "We build AI, automation and data tools that save you time and grow your business."
- Primary conversion goal: book a free 20-minute discovery call (the CTA text is "Book a free call"). Secondary goal: "See our services" (scrolls to #services).
- Tone: clear, friendly, confident, jargon-light. Explain every service in plain language a non-technical business owner understands.

**Required sections (in this order):**
1. Header / Navigation (sticky, mobile menu)
2. Hero (says in plain words what Mehrtek does and who it is for)
3. Logos / social proof strip
4. Services (what we offer, with outcomes and deliverables) — spec 6.4A
5. Why Mehrtek / Features grid
6. How we work (process steps) — spec 6.4B
7. Testimonials
8. Pricing (with monthly / yearly toggle)
9. FAQ (accordion)
10. Final CTA banner
11. Footer

**Success criteria:**
- Works with zero console errors or warnings in dev and production builds.
- Lighthouse (mobile) scores: Performance >= 95, Accessibility = 100, Best Practices >= 95, SEO = 100.
- Mobile-first: designed and built for 320px first, then enhanced up to 1920px+ (see section 5A).
- Keyboard-navigable and screen-reader friendly (WCAG 2.2 AA).
- Deployable to Vercel with a single push, no manual steps.

**Non-goals:** No backend app, no auth, no CMS, no database. The only server code allowed is the contact/waitlist route handler (see section 9).

---

## 2. Tech Stack (do not substitute without asking)

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) with React and TypeScript (strict mode) |
| Styling | Tailwind CSS (v4 if available, otherwise v3.4) |
| Components | Plain React components; headless primitives only where needed (Radix UI for Accordion/Dialog) |
| Icons | `lucide-react` |
| Animation | CSS transitions first; `motion` (Framer Motion) only for hero entrance and scroll reveals |
| Fonts | `next/font` (one sans for UI, optionally one display font). No external font `<link>` tags |
| Forms | React Hook Form + Zod |
| Linting | ESLint (Next config) + Prettier (with Tailwind plugin) |
| Testing | Vitest + React Testing Library (unit), Playwright (e2e smoke) |
| Package manager | pnpm (fall back to npm only if pnpm is unavailable) |
| Hosting | Vercel |

Rules:
- Add a dependency only when it removes real complexity. Prefer the platform and Tailwind.
- Never add a UI kit that ships its own global CSS or theme (no MUI, no Chakra).
- Pin exact versions in `package.json` for production dependencies.

---

## 3. Commands

Run these exact commands. All must pass before any task is considered done.

```bash
pnpm install          # install dependencies
pnpm dev              # dev server on http://localhost:3000
pnpm build            # production build (must succeed with zero warnings)
pnpm start            # serve the production build
pnpm lint             # ESLint, zero errors, zero warnings
pnpm typecheck        # tsc --noEmit
pnpm format           # prettier --write .
pnpm test             # vitest run
pnpm test:e2e         # playwright test
```

Add these scripts to `package.json` if they are missing. Add a combined `pnpm check` script that runs `lint`, `typecheck`, `test`, and `build` in sequence.

---

## 4. Project Structure

```
.
├── AGENTS.md
├── README.md
├── .env.example
├── next.config.ts
├── tailwind.config.ts            # only if using Tailwind v3
├── tsconfig.json
├── public/
│   ├── favicon.ico
│   ├── icon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png              # 1200x630
│   └── logos/                    # SVG customer logos
├── src/
│   ├── app/
│   │   ├── layout.tsx            # fonts, metadata, JSON-LD, providers
│   │   ├── page.tsx              # composes all sections
│   │   ├── globals.css           # design tokens, base styles
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── api/
│   │       └── contact/route.ts  # POST handler, validated with Zod
│   ├── components/
│   │   ├── layout/               # Header, Footer, Container, Section
│   │   ├── sections/             # Hero, LogoCloud, Features, Testimonials, Pricing, Faq, CtaBanner
│   │   └── ui/                   # Button, Badge, Card, Accordion, Toggle, Input
│   ├── content/
│   │   └── site.ts               # ALL copy and data lives here (typed)
│   ├── lib/
│   │   ├── cn.ts                 # clsx + tailwind-merge
│   │   ├── schema.ts             # Zod schemas
│   │   └── seo.ts                # metadata + JSON-LD helpers
│   └── types/
│       └── content.ts
└── tests/
    ├── unit/
    └── e2e/
```

Rules:
- **All copy, prices, FAQs, testimonials, feature lists, and nav links live in `src/content/site.ts`**, typed with interfaces from `src/types/content.ts`. Components receive data via props or import from this file. No hardcoded marketing text inside JSX.
- Section components are Server Components by default. Add `"use client"` only to components that need state or effects (mobile menu, pricing toggle, accordion if not using a server-safe primitive, scroll animations, the contact form).
- One component per file, named export, PascalCase filename.

---

## 5. Design System

Define tokens once in `globals.css` (CSS variables) and reference them via Tailwind. No magic hex values in components.

**Tokens to define:**
- Colors: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--primary`, `--primary-foreground`, `--accent`, `--ring`, `--success`, `--danger`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadows: subtle, medium, glow (for the featured pricing card)
- Spacing scale: use Tailwind's default scale; vertical section padding `py-20 md:py-28`

**Theming:**
- Support light and dark mode via `prefers-color-scheme` plus a manual toggle in the header (class strategy, persisted in `localStorage`, no flash of wrong theme: inject a tiny inline script in `<head>`).
- Contrast: all text >= 4.5:1, large text and UI components >= 3:1, in both themes.

**Typography:**
- Fluid headings using `clamp()`. Hero H1: roughly 40px on mobile to 72px on desktop.
- Body 16px minimum, line-height 1.6, max line length about 65ch.
- One H1 on the page. Headings must not skip levels.

**Layout:**
- `Container`: `max-w-7xl`, horizontal padding `px-4 sm:px-6 lg:px-8`.
- `Section` wrapper accepts `id`, `eyebrow`, `title`, `description` and renders a consistent section header.

**Visual direction:** modern, clean, high-contrast, generous whitespace, one strong brand color, subtle gradients and a soft background grid or glow in the hero. Avoid stock "template" clutter. Do not use emoji as icons.

---

## 5A. Mobile-First Approach (mandatory)

This is a **mobile-first** website. Design, build, and test the smallest screen first, then enhance upward.

**Styling rules:**
- Unprefixed Tailwind classes define the mobile (320px+) layout. `sm:`, `md:`, `lg:`, `xl:` prefixes only add or override for larger screens.
- Never use `max-width` media queries or `max-*:` variants to patch mobile after the fact. No desktop-first code that is "fixed" for mobile later.
- Base layout is a single column. Multi-column grids, side-by-side hero layouts, and horizontal navigation appear only at `md` and above.
- Default breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px. Do not add custom breakpoints without a documented reason.
- Use fluid units (`clamp()`, `%`, `rem`, `min()`, `dvh`) over fixed pixel widths. Use `100dvh` rather than `100vh` for full-height mobile sections so browser UI bars do not cause overflow.
- Account for safe areas on notched devices (`env(safe-area-inset-*)`) on any fixed or sticky element at the screen edges.

**Mobile UX requirements:**
- Zero horizontal scroll at any width from 320px up (test with an element-overflow check). Only intentionally scrollable regions (e.g. the pricing comparison table) may scroll horizontally, and they must signal it.
- Touch targets are at least 44x44px with at least 8px spacing between adjacent targets.
- Body text at least 16px so iOS does not zoom on focus; form inputs are also at least 16px.
- Primary CTA is visible in the first viewport at 360x640 without scrolling.
- Add a sticky bottom CTA bar on mobile (shown after the hero scrolls out of view, hidden at `md` and above, hidden while the mobile menu or a dialog is open). It must not cover content or the footer.
- Primary actions are reachable by thumb: place important buttons in the lower half of the screen where practical, and make buttons full-width on mobile.
- Use the correct input types and attributes (`type="email"`, `inputMode`, `autoComplete`, `enterKeyHint`) on all form fields.
- No hover-only interactions. Every hover effect must have an equivalent tap or focus behavior. Wrap hover-only styling in `@media (hover: hover)` or use `hover:` variants that degrade safely.
- Pricing cards stack vertically on mobile with the highlighted plan first or visually emphasized; the billing toggle stays visible and sticky-friendly at the top of the pricing section.
- Testimonials stack or use a swipeable, keyboard-operable layout on mobile.
- FAQ accordion triggers span the full width with generous padding for easy tapping.

**Mobile performance:**
- Mobile Lighthouse (simulated slow 4G, mid-tier device) is the primary performance benchmark. Desktop scores are secondary.
- Serve responsive images with accurate `sizes` so phones never download desktop-sized assets.
- Defer or skip heavy animation on mobile; entrance animations must be light and respect `prefers-reduced-motion`.
- Avoid large blur, filter, or backdrop-filter effects over big areas on mobile; they hurt scroll performance on low-end devices.

**Mobile testing checklist (run before any section is considered done):**
- 320px, 360px, 390px, 430px, 768px, 1024px, 1440px widths
- Portrait and landscape on a phone viewport
- Light and dark mode
- Real touch behavior check via Playwright mobile device emulation (e.g. Pixel 7 and iPhone 14 profiles)

---

## 6. Section Specifications

### 6.1 Header / Navigation
- Sticky, with backdrop blur and a bottom border that appears after scrolling.
- Logo (text or SVG) left; links center/right: Features, Testimonials, Pricing, FAQ; primary CTA button on the right; theme toggle.
- Mobile (< `md`): hamburger opens a full-width menu panel. Requirements: focus trap, `Escape` closes, focus returns to the trigger, body scroll locked while open, `aria-expanded` and `aria-controls` set, closes on link click.
- Anchor links smooth-scroll with `scroll-margin-top` offset equal to header height. Respect `prefers-reduced-motion`.
- Include a "Skip to content" link as the first focusable element.

### 6.2 Hero
- Eyebrow badge (e.g. "New: ..."), H1 (outcome-focused, <= 12 words), subheadline (<= 30 words), primary CTA + secondary CTA, small trust line (e.g. rating, "No credit card required").
- Visual on the right or below: product screenshot / dashboard mockup built with HTML/CSS or an optimized image (`next/image`, `priority`, explicit width/height, AVIF/WebP). No layout shift.
- Entrance animation: subtle fade/translate, disabled under reduced motion.
- Hero is above the fold at 360x640 and 1440x900 with the primary CTA visible.
- **Clarity rule:** a first-time visitor must understand what Mehrtek does, who it is for, and what to do next within 5 seconds, without scrolling. The hero must include: (1) an H1 stating the outcome, e.g. "We build AI, automation and data tools that grow your business"; (2) a subheadline naming the services in plain words, e.g. "AI development, workflow automation, chatbots, analytics and video editing for growing businesses."; (3) a row of 4-6 small service chips linking to #services; (4) primary CTA "Book a free call" and secondary CTA "See our services". Never use vague headlines like "Next-gen solutions" or "Innovate your future".
- The hero visual must show the work, not decoration: build a dashboard/automation-flow mockup in HTML/CSS (e.g. a lead pipeline with an AI score, a chart card and a chat bubble) so the services are visible at a glance.

### 6.3 Logo Cloud
- 5-6 grayscale SVG customer logos, evenly spaced, wraps on mobile. Decorative `alt=""` only if the surrounding text names them; otherwise meaningful `alt`.

### 6.4 Features Grid
- 6 features minimum (3x2 on desktop, 2 columns on tablet, 1 on mobile).
- Each card: icon (lucide), title, 1-2 sentence description. Optional "bento" variation with one larger highlight card.
- Hover state: slight lift + border color change. Cards are not links unless they truly navigate.
- Data comes from `site.ts` as `features: Feature[]`.

### 6.4A Services (core section: this is what visitors came to see)
- Section id="services", eyebrow "What we do", title "Services that help your business grow", one-line description.
- Render the six services from the business definition in section 1, from `services: Service[]` in `site.ts`. Each service card has: icon, name, a one-sentence plain-language outcome ("Answer customers 24/7 with a chatbot trained on your own content"), 3 bullet deliverables (e.g. "Chatbot trained on your FAQs", "Website and WhatsApp-ready", "Hand-off and training"), a "Best for" line, and a "Learn more" / "Get a quote" link that opens the contact dialog with the service pre-selected.
- Layout mobile-first: 1 column on mobile, 2 at md, 3 at lg. Cards are visually distinct and substantial, not thin.
- Add a service selector (dropdown or checkboxes) to the contact form so leads say which service they want.

### 6.4B How We Work (process)
- Section id="process", title "How it works". 4 numbered steps: 1) Free discovery call, 2) Proposal with scope, timeline and price, 3) Build with weekly updates and demos, 4) Launch, hand-off and support.
- Vertical timeline on mobile, horizontal 4-column row at lg. Each step has a number, title and 1-2 sentences. Add a short "What you get" line under the steps (clear scope, fixed timeline, source files and documentation).

### 6.5 Testimonials
- 3 to 6 testimonials: quote, name, role, company, avatar (`next/image`, initials fallback).
- Layout: responsive masonry-style grid or a carousel. If a carousel: it must be keyboard operable, have visible prev/next buttons with labels, support swipe, never auto-advance without a pause control, and respect reduced motion. A static grid is preferred and is the default.
- Use semantic `<figure>`, `<blockquote>`, `<figcaption>`.
- Include an aggregate rating line only if it is real data supplied in `site.ts`. Do not fabricate statistics.

### 6.6 Pricing (with toggle)
- Three tiers (e.g. Starter, Pro, Enterprise). The middle tier is highlighted ("Most popular") with a stronger border/glow.
- **Billing toggle (Monthly / Yearly):**
  - Implemented as an accessible switch (`role="switch"`, `aria-checked`, label text visible, operable with Space/Enter) or a two-option radio group.
  - Default: Yearly, with a "Save 20%" badge.
  - Prices update instantly with no layout shift (reserve width; use `tabular-nums`). Animate number change subtly; respect reduced motion.
  - Show the per-month price for both modes, plus a "billed annually" note when yearly.
  - Announce the change to screen readers via `aria-live="polite"` on the price region.
  - Pricing data is a typed array in `site.ts` with `monthly` and `yearly` fields. Never compute prices ad hoc in JSX; use a single helper `getPrice(plan, interval)`.
- Each tier: name, short description, price, CTA, feature checklist (check icons with visible text, not icon-only meaning).
- Enterprise tier shows "Custom" and a "Contact sales" CTA.
- Optional collapsible "Compare all features" table: horizontally scrollable on mobile with a sticky first column.

### 6.7 FAQ (Accordion)
- 6 to 8 questions covering: pricing, free trial, cancellation, security/data, integrations, support, onboarding, refunds.
- Use Radix `Accordion` (type `single`, `collapsible`) or a native `<details>`/`<summary>` implementation. Requirements either way:
  - Button/summary is keyboard operable; Arrow keys move between items if using Radix.
  - `aria-expanded`, `aria-controls`, and region labelling correct.
  - Smooth height animation via CSS grid-rows trick or Radix animation vars; disabled under reduced motion.
  - Chevron rotates on open.
- Inject `FAQPage` JSON-LD generated from the same `faqs` array in `site.ts` so content and structured data never drift.

### 6.8 Final CTA Banner
- Strong headline, one sentence, primary CTA, optional secondary link. Contrasting background.

### 6.9 Footer
- Brand blurb, 3 link columns (Product, Company, Legal), social icons (with `aria-label`), copyright with the current year computed at build time.
- Legal links point to `/privacy` and `/terms` pages. Create simple placeholder pages for both with clearly marked sample text.

---

## 7. Accessibility Requirements (non-negotiable)

- Semantic landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<section aria-labelledby>`, `<footer>`.
- Every interactive element reachable and operable by keyboard, with a visible focus ring (`focus-visible`), at least 3:1 contrast against its surroundings.
- Touch targets >= 44x44px.
- All images have correct `alt` (empty for purely decorative).
- Do not convey meaning by color alone.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Forms: visible labels, `aria-invalid`, `aria-describedby` for errors, errors announced, no placeholder-as-label.
- Run `axe` in the Playwright smoke test; zero serious or critical violations.

---

## 8. Performance Requirements

- Use `next/image` for all raster images with correct `sizes`; `priority` only on the LCP hero image.
- Use `next/font` with `display: swap` and subsetting; no render-blocking third-party fonts.
- Keep client JavaScript small: Server Components by default, dynamic-import anything heavy and below the fold.
- No layout shift: reserve space for images, fonts, and the pricing numbers. Target CLS < 0.05, LCP < 2.0s, INP < 150ms on mobile.
- No unused dependencies. Run `pnpm build` and review the route size report; the landing page first-load JS should stay under about 120 kB gzipped.
- Third-party scripts (analytics) load with `next/script` strategy `afterInteractive` or `lazyOnload`, and are optional and env-gated.

---

## 9. Forms and Integrations

- The "Get started / Contact sales" flow opens a lightweight form (email, name, optional message) in a dialog or on an anchored section.
- Client validation: React Hook Form + Zod. Server validation: the same Zod schema in `app/api/contact/route.ts`.
- The route handler: accepts POST only, validates input, rate-limits by IP (simple in-memory limiter is acceptable, note its limits in the README), includes a hidden honeypot field, returns JSON with correct status codes (200, 400, 429, 500), and never leaks internal errors.
- Delivery target is configured through environment variables (e.g. a webhook URL or email provider key). If no variable is configured, the handler logs a clear server-side warning and returns a friendly success response in development only; in production it returns 503 with a safe message.
- Document every variable in `.env.example`. Never commit real secrets. Never expose secrets to the client (only `NEXT_PUBLIC_*` is client-visible).
- Success and error states are visible and announced to screen readers.

---

## 10. SEO and Metadata

- `metadata` in `layout.tsx`: title template, description, canonical URL (from `NEXT_PUBLIC_SITE_URL`), Open Graph, Twitter card (`summary_large_image`), theme-color for light/dark, icons.
- `app/sitemap.ts` and `app/robots.ts` implemented.
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication` (with `offers` generated from the pricing data), and `FAQPage`. Validate it is well-formed JSON and rendered once.
- Meaningful, unique `<title>` (<= 60 chars) and meta description (<= 160 chars).
- `og-image.png` at 1200x630 present in `public/`.
- Use real anchor `<a>` tags for navigation so links are crawlable.

---

## 11. Security and Quality

- Set security headers in `next.config.ts` `headers()`: `Content-Security-Policy` (tight but compatible with Next and chosen scripts), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (disable unused features), `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`).
- External links use `rel="noopener noreferrer"` with `target="_blank"` only when truly necessary.
- No `dangerouslySetInnerHTML` except for JSON-LD, and only with `JSON.stringify` output.
- Escape or validate all user input; never trust the client.
- Run `pnpm audit` and resolve high/critical issues.

---

## 12. Code Standards

- TypeScript `strict: true`; no `any` (use `unknown` and narrow); no non-null assertions unless justified in a comment.
- Prefer function components, small and composable. Extract logic into hooks (`useScrolled`, `useBillingInterval`, `useLockBodyScroll`).
- Use `cn()` for conditional classes. Keep Tailwind class lists readable; extract repeated patterns into components, not `@apply` sprawl.
- Imports use the `@/` alias for `src/`.
- Naming: components `PascalCase`, hooks `useCamelCase`, files for utilities `kebab-case` or `camelCase` consistently, constants `SCREAMING_SNAKE_CASE` only for true constants.
- No dead code, no commented-out code, no `console.log` in committed code.
- Comments explain *why*, not *what*.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).

---

## 13. Testing Requirements

**Unit (Vitest + RTL):**
- `getPrice()` returns correct values for every plan and interval.
- Pricing toggle switches displayed prices, updates `aria-checked`, and is keyboard operable.
- FAQ accordion opens/closes, only one open at a time, correct ARIA attributes.
- Contact schema accepts valid input and rejects invalid input.
- Content integrity: every feature, plan, testimonial, and FAQ has all required fields (no empty strings).

**E2E (Playwright, Chromium + WebKit + mobile viewport):**
- Page loads with no console errors.
- Nav links scroll to the right sections; mobile menu opens, traps focus, closes on Escape.
- Pricing toggle changes prices; FAQ expands.
- Contact form: validation errors, success path (mock the API), honeypot rejection.
- Axe accessibility scan passes.

---

## 14. Deployment (Vercel)

- Repo must deploy with default Vercel settings (framework auto-detected, build command `pnpm build`).
- Required environment variables are documented in `.env.example` and listed in the README deployment section.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, sitemap, and Open Graph are correct.
- Verify after deploy: `/`, `/sitemap.xml`, `/robots.txt`, `/privacy`, `/terms`, 404 page, and social preview.
- CI (GitHub Actions): on every PR run install, `lint`, `typecheck`, `test`, `build`. Optionally run Playwright against the preview.

---

## 15. Content Guidelines

- The brand is **Mehrtek** (see section 1). All copy, testimonials, FAQs, and legal text refer to it through `brand.name`.
- Write benefit-led copy: lead with the outcome for the customer, not the feature list.
- Use realistic placeholder content that is clearly swappable. Mark any fictional testimonial, logo, or statistic with a `// PLACEHOLDER` comment in `site.ts` and list them in the README under "Replace before launch".
- Never invent real company names as customers, fake awards, or fabricated metrics that could mislead if shipped. Use obviously generic brand names.
- Keep tone consistent, concise, and free of buzzword filler.
- **Fullness rule:** the page must never feel empty. Every section needs real, specific copy (no one-word cards, no lorem ipsum, no "Feature 1"). Each service, feature and FAQ must say concretely what the client gets. The page should read like a finished business site, with a visual in or near every section (icons, mockups, cards, gradients), not bare text on blank space.
- **Proof without fabrication:** use a "Selected work" strip or section with 3 sample project cards (e.g. a lead-generation automation with AI scoring, a market-basket analysis dashboard, an Urdu handwriting OCR model, a cinematic color-graded short). Each card has a title, one-line outcome, tags and a visual placeholder. Mark them `// PLACEHOLDER` so they can be replaced with real case studies. Do not invent client names, revenue numbers or percentage results.
- Navigation links: Services, How it works, Work, Pricing, FAQ, plus the "Book a free call" button.
- Pricing plans must be service packages, not generic SaaS tiers: e.g. "Quick Win" (one-off small project), "Growth" (monthly retainer, highlighted), "Custom" (enterprise / complex builds). Each plan lists what is included in plain language.

---

## 16. Workflow for Agents

1. Read this file, then inspect the repo state before changing anything.
2. If the project is empty, scaffold with `create-next-app` (TypeScript, Tailwind, ESLint, App Router, `src/` dir, `@/*` alias), then add the dependencies from section 2.
3. Build in this order: tokens and layout shell, content file and types, UI primitives, sections top to bottom, SEO/metadata, form + API route, tests, CI, README.
4. Build every section mobile-first: write the 360px layout first, then add `sm:`/`md:`/`lg:` enhancements. After each section: run `pnpm lint && pnpm typecheck`; visually verify at 320px, 360px, 768px, and 1440px, in light and dark mode, using the checklist in section 5A.
5. Before declaring completion run `pnpm check` and `pnpm test:e2e`, then fix everything that fails. Do not mark work done on a failing build.
6. Keep changes scoped. Do not refactor unrelated files or upgrade dependencies as a side effect.
7. If a requirement is ambiguous or two requirements conflict, choose the safest option consistent with this file, note the decision in the README under "Decisions", and continue. Ask the human only for blockers (missing secrets, brand name, domain).

---

## 17. Definition of Done

- [ ] All nine sections implemented per section 6 and driven from `site.ts`
- [ ] Pricing toggle works, is accessible, and has no layout shift
- [ ] FAQ accordion works with keyboard and screen readers; FAQ JSON-LD present
- [ ] Mobile menu, theme toggle, and anchor scrolling work
- [ ] Mobile-first verified: base styles target mobile, no `max-width` queries, no horizontal scroll from 320px, 44px touch targets, sticky mobile CTA works, primary CTA visible in the first viewport at 360x640
- [ ] Contact form validates client and server side, handles errors, and has spam protection
- [ ] Lighthouse mobile: Perf >= 95, A11y = 100, BP >= 95, SEO = 100
- [ ] Axe: zero serious/critical violations
- [ ] `pnpm check` and `pnpm test:e2e` pass with zero warnings
- [ ] Metadata, OG image, favicon set, sitemap, robots, structured data all present
- [ ] Security headers configured; no secrets committed; `.env.example` complete
- [ ] README includes: overview, setup, scripts, env vars, project structure, deployment steps, "Replace before launch" checklist, and "Decisions" log
- [ ] Successful production deployment verified on Vercel

---

## 18. Boundaries

**Always:**
- Keep copy in `site.ts`, tokens in `globals.css`.
- Respect reduced motion and color-scheme preferences.
- Run the checks before reporting completion.

**Ask first:**
- Adding a new major dependency or switching the framework.
- Changing the section order, brand name, or pricing structure.
- Adding any backend, database, or paid third-party service.

**Never:**
- Commit secrets, `.env` files, or `node_modules`.
- Disable ESLint/TypeScript rules or use `// @ts-ignore` to silence errors.
- Use `any`, inline styles for design, or hardcoded colors outside tokens.
- Fabricate real-world customers, testimonials, certifications, or statistics presented as genuine.
- Ship placeholder lorem ipsum.
- Write desktop-first styles or use `max-width` media queries to patch mobile layouts.