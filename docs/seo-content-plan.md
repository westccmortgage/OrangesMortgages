# SEO Content Plan — Orange Mortgage (West Coast Capital Mortgage, Inc.)

Focus market: **California** (primary) and **Florida** (secondary). Niche: mortgage
(YMYL). Strategy: genuinely useful, plain-English guides that build topical authority
and E-E-A-T (expertise, experience, authority, trust), with clear licensing signals
(NMLS #2817729 / CA DRE #01385024) and disclaimers on every page.

## Principles for this niche
- **Accuracy over volume.** Mortgage is Your-Money-Your-Life; Google holds it to a high
  bar. Avoid quoting exact rates/limits that go stale — link to live tools instead.
- **One clear intent per page**, matching a real question people search.
- **Internal linking**: every guide links to the calculator, the Mortgage Strategy tool,
  `#contact`, and 1–2 sibling guides. Add each new page to `sitemap.xml`.
- **Schema on every guide**: `Article` + `FAQPage` (+ `BreadcrumbList` optional).
- **Titles ≤ 60 chars, meta descriptions ≤ 155 chars** (see the audit fix already applied).

## Status
| # | Guide | Status |
|---|-------|--------|
| 1 | First-Time Home Buyer in California | ✅ Live (`first-time-buyer-california.html`) |
| 2 | Jumbo vs Conforming Loans in California | ✅ Live (`jumbo-vs-conforming-california.html`) |

## Backlog (priority order)

Each row = one page. Keyword is the primary target; write naturally, don't stuff.

| # | Working title (≤60) | Primary keyword / intent | Key sections |
|---|---------------------|--------------------------|--------------|
| 3 | How Much Down Payment Do You Really Need? | "how much down payment california" (informational) | 20% myth, 3/3.5/0% options, PMI trade-off, assistance |
| 4 | FHA vs Conventional: Which Loan Is Right? | "fha vs conventional" (comparison) | credit, down payment, mortgage insurance, comparison table |
| 5 | VA Loans in California: A Veteran's Guide | "va loan california" (informational) | eligibility, 0% down, no PMI, funding fee, limits |
| 6 | Bank Statement Loans for the Self-Employed | "bank statement loan california" (mid-funnel) | who it's for, how income is calculated, docs |
| 7 | DSCR Loans: Financing Investment Property | "dscr loan california" (mid-funnel) | cash-flow qualifying, down payment, when to use |
| 8 | How to Get Pre-Approved (Step by Step) | "mortgage pre-approval" (transactional) | docs checklist, timeline, pre-qual vs pre-approval |
| 9 | Debt-to-Income (DTI) Explained | "debt to income ratio mortgage" (informational) | front/back-end DTI, how to improve, examples |
| 10 | Refinancing in California: When It Makes Sense | "when to refinance" (mid-funnel) | rate/term vs cash-out, break-even, costs |
| 11 | Cash-Out Refinance vs HELOC | "cash out refinance vs heloc" (comparison) | equity access, rates, pros/cons table |
| 12 | California County Conforming Loan Limits | "conforming loan limits california" (informational) | how limits are set, high-cost counties, link to tool |
| 13 | Closing Costs in California: What to Expect | "closing costs california" (informational) | typical line items, who pays what, estimate ranges |
| 14 | Buying a Home in Orange County | "orange county homebuyer" (local) | market feel, neighborhoods, jumbo prevalence, local expertise |
| 15 | What Actually Moves Your Mortgage Rate | "how are mortgage rates determined" (informational) | credit, LTV, loan type, market factors |

## Suggested article template (reuse the two live guides)
1. `subhero` hero: breadcrumb, eyebrow, H1 (with `<span class="accent">`), lead, meta line.
2. `article__body`: table-of-contents (`.toc`) → H2/H3 sections → `.callout` tips → internal links.
3. Comparison pages: use `.table-wrap > .ctable`.
4. `#faq` section (`.qa` details) — mirror exactly in a `FAQPage` JSON-LD block.
5. `cta` + disclaimer + shared footer/ask-orange.

## Cadence
- Aim for **1–2 quality guides per week**. Depth beats frequency in YMYL.
- Refresh the top guides every 6–12 months (loan limits, programs change yearly).
- After ~6 guides, add a `/guides` index/hub page and link it in the main nav.

## Measurement
- Connect **Google Search Console** to see the queries you already rank for and expand
  from real data (this is the one thing paid keyword tools add that this plan can't fake).
- Track: impressions, average position, and clicks per guide; double down on winners.
