# CLI Handoff — Landing & Marketing (getmaxglobal.com)

**Repo:** `getmax-global` · **Live:** https://getmaxglobal.com · **Branch:** `master`
**Stack:** Vite + React 18 + react-router-dom v7 + Tailwind + Framer Motion + lucide-react
**Deployed via:** Vercel CLI (`npx vercel --prod`). **GitHub auto-deploys FAIL — do not rely on them.**

This is the **public marketing root**. The product app lives at `app.getmaxglobal.com` (separate repo: `getmax-platform`). Do not duplicate product UI here.

---

## 1. One-door rule (do not break)

- `getmaxglobal.com` (this repo) = **marketing + trust pages + blog only**. No auth, no dashboards, no product UI.
- `app.getmaxglobal.com` = product, login, RBAC, tenant data.
- All "Sign in / Start free / Book demo" CTAs link to `https://app.getmaxglobal.com/...` — never inline a login here.
- Middleware host-classify is deployed on the platform repo. This repo just hands off.

## 2. Current routes (shipped)

```
src/App.jsx
  /            HomePage   (single big file, 751 lines — sections: Hero, Products, Solutions, Lab, Contact, Footer)
  /pricing     src/pages/Pricing.jsx
  /blog        src/pages/Blog.jsx       (auto-generated daily posts via scripts/generate-blog.py)
  /blog/:id    src/pages/Blog.jsx
  /security    src/pages/Security.jsx
  /hipaa       src/pages/Hipaa.jsx
  /privacy     src/pages/Privacy.jsx
  /terms       src/pages/Terms.jsx
```

`vercel.json` rewrites everything to `index.html` — SPA fallback. Don't change without checking router.

## 3. Product lineup (locked — match the platform)

Seven products, properly bounded per master architecture (`memory/project/master_architecture_v1.md`). Names + taglines must match the platform exactly:

| Letter | Name   | Scope (one line)                          | Status |
|--------|--------|-------------------------------------------|--------|
| P      | Pulse  | HRMS + workforce operations               | LIVE   |
| V      | Verify | Eligibility verification (X12 270/271)    | LIVE   |
| F      | Flux   | AI unified inbox (email/Teams/calendar)   | BUILT  |
| E      | Echo   | Voice AI platform (4 agents, 11 personas) | LIVE   |
| L      | Lisa   | Meeting agent (was "Scribe" — do not use) | BUILT  |
| S      | Storm  | Marketing OS / outbound                   | BUILD  |
| O      | Orion  | Claims / denials / AR                     | BUILD  |

`Nerve` (admin/control plane) is **Sriram-only**, not a public product. Do not list on marketing.

## 4. Pricing (only Verify is locked)

Source of truth: `memory/project/pricing_v1.md`.

- **Verify:** Starter $49 · Growth $199 · Pro $499 (tiered + metered overage, no unlimited).
- Storm / Echo / Orion follow the same shape but numbers **not yet public** — show "Custom" or hide until locked. Do not invent prices.
- All pricing CTAs route to `app.getmaxglobal.com/billing` (or `/signup?plan=...`).

## 5. Voice + copy rules (every external line)

From `memory/feedback/anti_ai_voice.md`:

- **No** "kindly / respectfully / yours sincerely / cutting-edge / leverage / streamline / robust / seamless / harness the power of".
- **No** em-dash overuse. **No** three-clause "We do X, Y, and Z" rhythm.
- Use real numbers + real names where possible (revenue, payer, EHR). Specifics over adjectives.
- Light human voice — Sriram is CEO of a 12-person AI-native RCM company, not a Fortune-500 PR team.
- If you can't write a line without sounding like ChatGPT, delete it.

## 6. Brand surface

- Dark premium theme (locked since commit `435af3f`).
- Real branding logos sit in `public/`. Do not regenerate, do not swap for emoji.
- Icons: `lucide-react` only — already imported in `App.jsx`. Don't add a second icon library.
- Framer Motion for entrance animations only. No parallax. No autoplay video.

## 7. Deploy + git rules

```powershell
# from getmax-global/
npm run build          # verify it compiles, dist/ regenerates
npx vercel --prod      # this is how prod actually updates
```

- Vercel project name: `getmax-global`. Domain: `getmaxglobal.com` (+ `www`).
- **Always `git add` + `git commit` + `git push` after any non-trivial change** (multi-CLI sync rule — see `memory/feedback/git_always.md`). Other CLIs / Claude Design / Mira CTO-review read git, not your local disk.
- Commit messages: imperative, lowercase prefix (`feat:`, `fix:`, `copy:`, `blog:`).

## 8. Blog pipeline (do not touch unless asked)

- `scripts/generate-blog.py` runs daily, writes a new post under `src/pages/Blog.jsx` data source, commits as `blog: auto-generated daily post YYYY-MM-DD`.
- `scripts/post-to-social.py` + `scripts/linkedin-auth.py` push to social. Secrets stripped from repo — `.env` only.
- If you edit `Blog.jsx`, preserve the auto-generated entries; the script appends, doesn't merge.

## 9. What's open / good next moves

Pick what fits the request. Don't do all of these blindly.

1. **Solutions section is generic.** Replace with 3 vertical cards: *Mental health / counseling*, *Multi-site outpatient*, *Independent RCM firms*. Real numbers, real EHRs (Mahler, Tebra, Valant).
2. **Pricing page** currently only details Verify. Add "Custom" tiles for Storm / Echo / Orion that route to a `/contact` form (or `mailto:sriram@getmaxrcm.com`).
3. **Hero CTA** says "Start free" but routes to `/#products`. Should route to `app.getmaxglobal.com/signup`.
4. **Trust bar** under hero is missing — add HIPAA / AWS / SOC2-in-progress badges with real link to `/security`.
5. **Mobile nav** is functional but the `Menu`/`X` toggle in `App.jsx` lines ~700-735 doesn't close on route change. Two-line fix.
6. **`<title>` + OG tags** in `index.html` are stale ("Getmax Global"). Rewrite with current product lineup + a real OG image in `public/og.png`.

## 10. What NOT to do

- ❌ Don't add a login / signup form here. Link to `app.getmaxglobal.com`.
- ❌ Don't add Pulse / Verify dashboards. Those live on the platform.
- ❌ Don't invent pricing for Storm / Echo / Orion.
- ❌ Don't switch theme to light. Don't replace `lucide-react`. Don't add a CSS framework.
- ❌ Don't push secrets. `.env` is gitignored; check before `git add -A`.
- ❌ Don't trust GitHub → Vercel auto-deploy. Run `npx vercel --prod` manually.

## 11. Quick orient (read these first, in order)

1. `src/App.jsx` — the home page is here, including data arrays for `PRODUCTS`, `NAV_LINKS`, `SOLUTIONS`.
2. `src/pages/Pricing.jsx` — current pricing shape.
3. `vercel.json` — SPA rewrite.
4. Memory: `feedback/anti_ai_voice.md`, `project/pricing_v1.md`, `project/master_architecture_v1.md`, `project/domain_strategy.md`.

---

_Owner: Sriram Raghavan (sriram@getmaxrcm.com). When in doubt, draft → email Sriram → ship. Don't push public-facing copy without his eyes on it._
