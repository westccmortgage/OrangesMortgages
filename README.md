# 🍊 Orange Mortgage — Orange County Landing Page

A luxury, Apple-style marketing landing page for **Orange Mortgage**, featuring
*Orange* — the friendly mascot who makes home financing simple for Orange County
buyers and homeowners.

Built as a **zero-build static site**: just HTML, CSS, and a little vanilla JS.
Open it in any browser — no install, no tooling required.

## Quick start

```bash
# Just open the file…
open index.html            # macOS
xdg-open index.html        # Linux

# …or serve it locally for clean relative paths:
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
.
├── index.html            # All page sections (semantic markup)
├── css/styles.css        # Design system + responsive layout
├── js/main.js            # Nav, mortgage calculator, scroll reveals, form
└── assets/
    ├── orange-mascot.svg # The Orange mascot (inline SVG illustration)
    └── favicon.svg
```

## Sections

1. **Sticky nav** with mobile hamburger menu
2. **Hero** — mascot + headline + CTAs + floating glass dashboard cards
3. **Trust badges** strip
4. **Loan Options** — Conventional, Jumbo, FHA, VA, First-Time, Refinance
5. **Why Orange** — local-expert feature list
6. **Mortgage Calculator** — live monthly-payment estimator
7. **How It Works** — 4-step process
8. **Service Areas** — Orange County cities + stylized map
9. **Testimonials**
10. **Contact / lead form** (demo — shows a success message, no backend)
11. **Footer**

## Brand

| Token        | Value                          |
|--------------|--------------------------------|
| Navy         | `#14264a` / `#0e1c38`          |
| Orange       | `#ff8a1f` / `#f57500`          |
| Backgrounds  | white, `#f4f8fd`, `#eef4fc`    |
| Fonts        | Plus Jakarta Sans, Inter       |

## Swapping in the real mascot artwork

The page ships with a hand-built SVG mascot so it looks complete out of the box.
To use the polished 3D render images instead:

1. Drop your PNG/WebP files into `assets/` (e.g. `orange-hero.png`).
2. In `index.html`, replace the `src` on `.hero__mascot` and `.why__mascot`
   with your new file paths. The layout and drop-shadows will adapt automatically.

## Notes

- The lead form and calculator are **front-end demonstrations**. Wire the form
  to your CRM / email provider and replace illustrative rates before going live.
- Fully responsive (desktop → mobile) and respects `prefers-reduced-motion`.
- Placeholder contact details, NMLS number, and rates are illustrative.
