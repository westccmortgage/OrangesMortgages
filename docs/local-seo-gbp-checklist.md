# Local SEO + Google Business Profile checklist — West Coast Capital Mortgage, Inc.

Local SEO is how you show up in Google Maps and the "local pack" for searches like
*"mortgage broker near me"* or *"mortgage lender Orange County."* For a mortgage
business it's often the highest-ROI SEO channel. Most of it happens **outside the
website** (on Google), so these are steps for you — the site changes are noted at the end.

## 1. Google Business Profile (GBP) — the foundation
- [ ] **Claim & verify** your profile at [business.google.com](https://business.google.com). Verification is required to rank.
- [ ] **Business name:** exactly `West Coast Capital Mortgage, Inc.` (no keyword stuffing — against Google policy).
- [ ] **Primary category:** `Mortgage broker` (or `Mortgage lender`). Add relevant secondary categories.
- [ ] **Address:** your real licensed office address (or set a service-area business if you don't serve clients at the office).
- [ ] **Service area:** list the CA counties/cities you serve (Orange County, LA, San Diego, etc.).
- [ ] **Phone:** `(310) 654-1577` — must match the website exactly.
- [ ] **Website:** `https://orangesmortgages.com` (or westccmortgage.com — pick one primary and be consistent).
- [ ] **Hours:** `Mon–Sat 8am–7pm PT` (match the site footer).
- [ ] **Services:** add each loan type (Conventional, FHA, VA, Jumbo, DSCR, Refinance, Bank Statement) with short descriptions.
- [ ] **Photos:** logo, real office/team photos, the Orange mascot. Profiles with photos get more clicks.
- [ ] **Description:** 1–2 plain sentences about who you help and where. Include NMLS #2817729.

## 2. NAP consistency (Name, Address, Phone)
Google trusts businesses whose details match everywhere. Make **Name + Address + Phone**
identical on:
- [ ] Google Business Profile
- [ ] The website (footer + About page)
- [ ] NMLS Consumer Access listing
- [ ] Any directories (Yelp, Zillow, social profiles, etc.)

## 3. Reviews (huge ranking + trust factor)
- [ ] Ask every happy client for a Google review — send them your GBP review link.
- [ ] **Reply to every review** (positive and negative), professionally. Responses signal an active business.
- [ ] Never buy or fake reviews — it can get the profile suspended.

## 4. Ongoing signals
- [ ] Post to GBP a few times a month (new guide, rate update, tip). Use the guides we just published.
- [ ] Answer the **Q&A** section on your profile proactively.
- [ ] Keep hours accurate (holidays included).

## 5. Website changes (I can do these)
- [x] On-page SEO cleaned up (titles ≤60, descriptions ≤155).
- [x] Two local guides published + added to `sitemap.xml`.
- [ ] Add `LocalBusiness` structured data to the homepage — **template below**. I left it
      out of the live site because it needs your **real street address**; once you confirm
      it, I'll drop it in (or you can paste it into `index.html`).

### LocalBusiness JSON-LD template (fill in the placeholders, then add to `<head>` of index.html)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MortgageBroker",
  "name": "West Coast Capital Mortgage, Inc.",
  "image": "https://orangesmortgages.com/assets/orange-cutout.webp",
  "url": "https://orangesmortgages.com/",
  "telephone": "+1-310-654-1577",
  "email": "orange@orangesmortgages.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "FILL IN — street address",
    "addressLocality": "FILL IN — city",
    "addressRegion": "CA",
    "postalCode": "FILL IN — ZIP",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "FILL IN", "longitude": "FILL IN" },
  "areaServed": [
    { "@type": "State", "name": "California" },
    { "@type": "State", "name": "Florida" }
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00", "closes": "19:00"
  }],
  "sameAs": ["https://westccmortgage.com"],
  "identifier": [
    { "@type": "PropertyValue", "name": "NMLS", "value": "2817729" },
    { "@type": "PropertyValue", "name": "CA DRE Corporation License", "value": "02440065" }
  ]
}
</script>
```

> ⚠️ Only publish an address you actually operate from — a fake or mailbox address can get
> a GBP suspended and hurt trust. If you're a service-area business, use GBP's service-area
> setting and omit `address` from the schema (keep `areaServed`).
