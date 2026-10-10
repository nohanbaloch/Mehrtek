# Mehrtek

Mehrtek is a production-ready, mobile-first marketing landing page for a fictional
agency/SaaS product. It is built with Next.js App Router, React, TypeScript, Tailwind
CSS, Radix UI, React Hook Form, and Zod.

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint with zero warnings required |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Chromium, WebKit, and Pixel 7 Playwright tests |
| `npm run check` | Run lint, typecheck, unit tests, and build |
| `npm run format` | Format the repository with Prettier |

The Playwright suite expects a production build. Run `npm run build` before
`npm run test:e2e` locally.

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: Canonical production URL used by metadata, sitemap, and robots.
- `WEB3FORMS_ACCESS_KEY`: Server-only Web3Forms access key for contact submissions. If it is
  unset, development returns a friendly success response; production returns `503`. Create a
  new key if an existing key has ever been committed or shared.

The contact route has a simple in-memory five-request-per-IP hourly limiter. It is
appropriate for this stateless placeholder and should be replaced with a shared limiter
before a multi-instance production launch.

## Project structure

```text
src/app/                 App Router pages, metadata, API route, sitemap, and robots
src/components/          Layout, landing sections, and UI primitives
src/content/site.ts      Typed brand, copy, pricing, FAQ, and navigation data
src/lib/                 Content helpers, schemas, pricing, and SEO JSON-LD
src/types/               Shared content types
tests/unit/               Vitest and React Testing Library coverage
tests/e2e/                Playwright browser, mobile, and axe smoke coverage
public/logos/             Placeholder customer logo SVGs
public/avatars/           Placeholder testimonial avatar SVGs
```

## Deploy to Vercel

1. Import the repository into Vercel.
2. Keep the detected Next.js framework and the `npm run build` command.
3. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
4. Set `WEB3FORMS_ACCESS_KEY` to the Web3Forms access key.
5. Deploy and verify `/`, `/sitemap.xml`, `/robots.txt`, `/privacy`, `/terms`, and the 404 page.

## Replace before launch

- [ ] Replace the fictional brand copy and tagline if Mehrtek is not the final brand.
- [ ] Replace the six placeholder logos in `public/logos/`.
- [ ] Replace all placeholder testimonial names, quotes, companies, and avatars.
- [ ] Replace the placeholder project cards in `src/content/site.ts` with approved case studies,
      outcomes, visuals, and client permissions.
- [ ] Replace the placeholder pricing packages, prices, features, billing terms, and savings claim.
- [ ] Replace the placeholder FAQ answers with approved service, delivery, support, and refund terms.
- [ ] Replace the service deliverables, package scope, and process details with final commercial copy.
- [ ] Replace the sample privacy and terms text in `src/app/privacy/page.tsx` and
      `src/app/terms/page.tsx`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Create a Web3Forms access key, configure `WEB3FORMS_ACCESS_KEY`, and verify delivery.
- [ ] Replace the generated OG image messaging if the approved brand messaging changes.
- [ ] Replace fictional dashboard labels and any placeholder statistics before launch.

## Decisions

- npm is used because this repository already contains `package-lock.json` and pnpm was
  unavailable during setup.
- The landing page keeps all marketing data in `src/content/site.ts`; components consume
  the typed content and derive the displayed brand name from `site.brand.name`.
- The static testimonial grid is preferred over an auto-advancing carousel for accessibility
  and predictable mobile performance.
- The contact endpoint uses an in-memory limiter and Web3Forms delivery because the product
  has no database or backend application in scope.
- Playwright runs against the production build so browser coverage matches the deployment
  artifact.
