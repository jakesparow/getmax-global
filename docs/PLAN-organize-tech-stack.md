# Plan: Align getmax-global, fix public-surface bugs, harden security

## Context

You asked two things: **what's our tech stack**, and **what should be done to complete the social media / digital marketing platform**. After surveying all 5 repos, the actual situation is:

**Your tech stack is already organized — split by purpose:**

| Repo | Stack | Role |
|---|---|---|
| `getmax-platform` | Next.js 16 + React 19 + **TypeScript** + MongoDB + Vercel | Main app — 7 products live, including Storm (marketing: leads, campaigns, content publishing, auto-blog ISR) |
| `getmax-global` | Vite 5 + React 18 + **plain JS** + Tailwind v3 | Public marketing site — **misaligned with platform** |
| `social-engine` | Python + AWS Lambda + DynamoDB | 42-platform poster (CLI, prototype) |
| `getmax-agents` | Python + Anthropic SDK + MongoDB | 8 agents (lead-intel, stedi, skysenders, buffer, outreach, MS365, research, HRMS) |
| `symphony` | Elixir + Phoenix LiveView | Linear → Codex orchestration |

**On "Zero from Vercel":** Zero is **not** a Vercel product. Zero is a sync engine by Rocicorp (Replicache team) for local-first apps. Vercel ships Next.js, v0, AI SDK, and Turborepo. **Stay on TypeScript.** Your platform is deep into Next.js 16 + React 19 + TS 5 with edge middleware, JWT in jose, MongoDB schema helpers, and 33 active branches — switching languages would burn months for no benefit. If you want a real productivity bump, the right moves are: keep TS, lean harder on the AI SDK for streaming, and consider Drizzle for typed query helpers on top of Mongo (not a rewrite).

**Why focus this plan on `getmax-global` specifically:**
- You have a parallel Claude Code session running — `getmax-global` has **only 1 branch (master)** and 0 open PRs, so collision risk is near-zero. `getmax-platform` has 33 active branches and is the wrong place to work concurrently.
- You asked for **security + bug fixes first**, and `getmax-global` has both: `mailto:` CTAs leak your email address on a public surface and capture zero leads; `/demo` 404s; signup link redirects to a route that may not exist.
- The branch name `claude/organize-tech-stack-F2ll8` literally matches the work: bring this repo's stack in line with `getmax-platform` (Next.js 16 + React 19 + TS), so future changes can be made in one place with one mental model.

**Intended outcome:** Marketing site renders on the same stack as the platform, every public CTA works and captures a lead instead of opening an email client, `/demo` exists as a real page, blog content from `getmax-platform/storm` is reachable, and there is no exposed contact email on the page source.

---

## Recommended approach

Migrate `getmax-global` to **Next.js 16 + React 19 + TypeScript + Tailwind v4** (same major versions as `getmax-platform`), fix the public-CTA bugs in the same branch, and wire the blog feed from `getmax-platform`'s ISR endpoint.

Branch: `claude/organize-tech-stack-F2ll8` on `jakesparow/getmax-global` (created from `master`).

### Files to add/modify

**New (Next.js scaffolding):**
- `next.config.ts` — replace `vite.config.js`. Mirror the config style from `jakesparow/getmax-platform/next.config.*`.
- `tsconfig.json` — strict TS, paths alias `@/*` → `src/*`. Mirror `getmax-platform/tsconfig.json`.
- `app/layout.tsx` — root layout. Move OG/Twitter/canonical/theme-color meta from `index.html` into `metadata` export.
- `app/page.tsx` — landing (port from current `src/` landing component).
- `app/pricing/page.tsx`, `app/hipaa/page.tsx`, `app/privacy/page.tsx`, `app/security/page.tsx`, `app/terms/page.tsx` — port the existing 5 trust pages.
- `app/demo/page.tsx` — **new page** (currently 404). Form fields: name, work email, company, est. claim volume. Posts to `/api/demo`.
- `app/blog/page.tsx` + `app/blog/[slug]/page.tsx` — fetch from `getmax-platform`'s public blog endpoint with ISR (`export const revalidate = 600`). Reuse the same ISR pattern that `getmax-platform/app/blog` uses (see PR #87 in platform).
- `app/api/demo/route.ts` — POST handler. Validate with `zod`, send to Resend (or a single MongoDB collection on the platform side via authed webhook). Returns 200 + thank-you redirect.
- `app/api/contact/route.ts` — POST handler for the footer "contact" replacement.
- `components/Nav.tsx`, `components/Footer.tsx`, `components/CTAButton.tsx` — port existing components, convert `.jsx` → `.tsx`, add prop types.

**Modify:**
- `package.json` — replace Vite deps with `next@^16`, `react@^19`, `react-dom@^19`, `@types/react`, `@types/node`, `typescript@^5`, `tailwindcss@^4`, `@tailwindcss/postcss`, `zod`, `resend`. Keep `framer-motion`, `lucide-react`, `react-markdown`.
- `postcss.config.js` → `postcss.config.mjs` — Tailwind v4 plugin.
- `tailwind.config.js` → inline via Tailwind v4 CSS-first config (or keep file for now if it's faster).
- `vercel.json` — strip Vite-specific settings; Vercel auto-detects Next.js.
- `index.html` — delete (moved to `app/layout.tsx`).
- `vite.config.js` — delete.

**Bug fixes inside the migration:**
- Every `mailto:sriram@getmaxrcm.com` in current `src/` → `<CTAButton href="/demo">Book a demo</CTAButton>` or `/contact`. Removes the public email exposure.
- "Get Started" link currently pointing at `app.getmaxglobal.com/signup` → verify route exists on `getmax-platform`'s `app/login`/`app/signup`. If not, point at the live signup that already works on the platform.
- Mobile nav close-on-route-change behavior already exists (commit 2026-05-16) — preserve it in the Next.js port.

### Reuse existing code, don't reinvent

- **Blog ISR pattern:** copy from `getmax-platform/app/blog` (PR #87 — auto-publish Storm content with ISR + SEO). Don't roll your own.
- **Resend client setup:** copy from `getmax-platform/lib/connectors/` (Resend is already wired there for transactional email).
- **Form validation:** use `zod` exactly the way it's used in `getmax-platform/app/api/*` route handlers.
- **Tailwind v4 + PostCSS config:** copy from `getmax-platform/postcss.config.*` and `getmax-platform/tailwind.config.*`.
- **Public meta tags / OG:** lift from current `index.html`; same values, just relocated into `metadata` exports.

### What this plan deliberately does NOT do

- Does **not** touch `getmax-platform` (parallel session is working there).
- Does **not** touch `social-engine`, `getmax-agents`, or `symphony`. Those have their own gaps (voice agent stub, Chief-of-Staff stub, buffer-agent static templates, only 5 of 42 social platforms with real posters) but every one of them is a separate plan.
- Does **not** introduce Zero, v0, or any non-TS runtime.
- Does **not** add a database to `getmax-global` — form submissions POST to Resend or to a `getmax-platform` webhook. The marketing site stays stateless.

---

## Execution order (so you can pause/resume safely between Claude sessions)

Each step ends in a green build so you can stop after any one of them.

1. **Branch + scaffold.** `claude/organize-tech-stack-F2ll8` is already created from `master`. `npx create-next-app@latest` style scaffold in a sibling dir, then merge files. Strict TS on. Build passes with a single landing route.
2. **Port pages.** Move landing + 5 trust pages into `app/`. Convert `.jsx` → `.tsx`. Build still passes; visually identical to current site in dev.
3. **Fix the bugs.** Replace all `mailto:` with `/demo` or `/contact` links. Verify signup link target. Add `app/demo/page.tsx` (form only, no backend yet) and `app/contact/page.tsx`.
4. **Wire the backends.** Add `app/api/demo/route.ts` and `app/api/contact/route.ts` with `zod` validation + Resend send. Add a single env var `RESEND_API_KEY` to Vercel (do not commit it).
5. **Connect the blog.** Add `app/blog/*` pulling from the `getmax-platform` public blog endpoint with ISR. Mirror the SEO setup from platform PR #87.
6. **Cut over deploy.** Push branch, open draft PR, deploy preview on Vercel, run through every CTA in the preview. When green: mark PR ready, merge, watch prod deploy.

---

## Verification

Run locally (after each step):

```bash
npm install
npm run build         # Next.js production build must pass with 0 TS errors
npm run dev           # Visit http://localhost:3000
```

Manual checks in the preview deploy before merging:

- [ ] Landing renders, all 7 product cards visible, nav links work on mobile.
- [ ] `/pricing`, `/hipaa`, `/privacy`, `/security`, `/terms` all render (no 404s).
- [ ] `/demo` renders a form. Submitting with valid data returns thank-you state. Submitting with invalid data shows zod errors inline.
- [ ] `/contact` form works the same way.
- [ ] No `mailto:` links in rendered HTML — `view-source` and grep for `mailto:`.
- [ ] "Get Started" button lands on a working signup page (not a 404).
- [ ] `/blog` lists posts auto-published from Storm; clicking one renders the post.
- [ ] OG preview works (paste prod URL into LinkedIn post composer, see correct title/image/description).
- [ ] Lighthouse on `/`: perf >= 90, a11y >= 95, SEO = 100.
- [ ] `view-source` contains no email addresses, no API keys, no internal hostnames.

Deploy verification:

- [ ] Vercel preview build green.
- [ ] After merge to `master`, prod deploy green.
- [ ] Send a test submission through the live `/demo` form; confirm it lands in Resend (or wherever the webhook routes).
- [ ] Confirm no other repo's CI broke (this repo deploys independently, so impact should be zero — but verify).

---

## Follow-up plans (not this plan, but tracked here)

When you're ready to tackle the other repos, the priority order I'd suggest:

1. **`getmax-agents`** — merge PR #1 (delete sensitive ops doc) and PR #3 (Skysenders API key → env var). Then rotate the keys flagged `ROTATE — was exposed in git history` in `.env.template` (Mahler, Waystar, Hostinger token, MongoDB URI). Pure security work.
2. **`getmax-platform`** — wait for the parallel session to land its branches, then merge PRs #88 (Stedi payer search fix), #89 (voice CLI dial), #90 (UI polish). Run the cross-product multi-tenancy escape audit described in `docs/RCM_VS_PRACTICE_MULTI_TENANCY.md`.
3. **`social-engine`** — implement real posters for the remaining 37 platforms (only 5 are real today: LinkedIn, Meta, Twitter, Bluesky, Telegram), and wire the content warehouse.
4. **`getmax-agents` (voice + Chief-of-Staff)** — net-new builds, not security/bug fixes. Defer until #1–#3 are done.
