# ThermaSpan Website — Project Specs

## What it does
Marketing website for ThermaSpan, a structural insulated panel (SIPs) system by QuickBuilt Systems PTY LTD.
Showcases three product lines (Insulspan® roofing, Panelspan® walls, Panelcore® coldroom), handles enquiries and quote requests, and provides resources for builders and architects.

## Who uses it
- Builders and tradies looking for SIPs panels for homes, extensions, patios
- Architects and specifiers
- Owner-builders and homeowners

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router (TypeScript) |
| Styling | Tailwind CSS + globals.css design tokens |
| Animations | GSAP + ScrollTrigger |
| CMS | Decap CMS (GitHub backend, JSON content files) |
| Hosting | Vercel |
| Forms | Multi-step contact form → Make.com webhook |
| Auth (CMS) | `/api/auth` OAuth proxy (same as MagnaSpan) |

---

## Pages & Routes

| Route | Page |
|---|---|
| `/` | Home — hero slideshow, intro video, products, benefits, applications, CTA |
| `/products` | Products overview — all three product cards |
| `/products/insulspan` | Insulspan® Roofing Panels |
| `/products/panelspan` | Panelspan® Wall Panels |
| `/products/panelcore` | Panelcore® Coldroom Panels |
| `/building-system` | Building System — how it works + video |
| `/about` | About — story, team, video |
| `/gallery` | Gallery — masonry grid of 20 project photos |
| `/resources` | Resources — brochures, specs, install guides |
| `/contact` | Contact + Quote form (patio configurator) |

---

## Data / Content

All user-facing copy, images, and stats are stored in JSON files under `content/` and editable via Decap CMS.

| File | Page |
|---|---|
| `content/home.json` | Home |
| `content/products.json` | Products overview |
| `content/insulspan.json` | Insulspan product page |
| `content/panelspan.json` | Panelspan product page |
| `content/panelcore.json` | Panelcore product page |
| `content/building-system.json` | Building System |
| `content/about.json` | About |
| `content/gallery.json` | Gallery |
| `content/resources.json` | Resources |
| `content/contact.json` | Contact page |
| `content/global.json` | Shared: nav, footer, phone, email |

---

## Design Tokens (ThermaSpan)

- Canvas: `#f5efe2` (warm cream)
- Ink: `#26241f` (deep charcoal)
- Primary/accent: `#f15a24` (orange)
- Footer: `#1c1b18`
- Hairline: `#e3dccb`
- Container max: 1320px
- Header height: 76px
- Section padding: 96px
- Fonts: Inter (proxy for abcNormal)

---

## Key Components

- `Navbar` — sticky, mega-menu dropdown for Products, phone pill, "Request a quote" CTA
- `Footer` — dark, logo, nav columns, 20-photo gallery strip, copyright bar
- `Slideshow` — 20-image auto-playing hero slideshow (2.8s interval, pause on hover)
- `ContactForm` — multi-step form with conditional patio configurator:
  - Step 1: Interests (checkboxes)
  - Step 2: Requirements (radio buttons)
  - Step 3: Message (textarea)
  - Step 4: Contact details (name / company / email / phone / location)
  - Patio kit section (shown when "patio / awning" selected): style, roof type, beams, posts, accessories, finance, file upload

---

## Third-Party Services

| Service | Purpose |
|---|---|
| Make.com webhook | Receives contact/quote form submissions |
| Google Fonts | Inter (proxy for abcNormal proprietary font) |
| Decap CMS (GitHub backend) | Content editing at `/admin` |
| Vercel | Hosting + serverless functions |

---

## "Done" Criteria

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] All 10 pages render correctly in browser
- [ ] GSAP scroll animations work on every section
- [ ] Hero slideshow cycles automatically
- [ ] Contact form submits to Make.com webhook
- [ ] CMS is accessible at `/admin` (Decap)
- [ ] All images and videos display correctly
- [ ] Mobile responsive (hamburger menu, stacked layouts)

---

## Company Details (in all copy/footer)

- **Name:** QuickBuilt Systems PTY LTD / ThermaSpan
- **Phone:** 1300 132 787
- **Email:** sales@quickbuiltsystems.com.au
- **Location:** Sydney, NSW
- **Hours:** Mon–Fri 7:30am–4:30pm AEST
- **ABN:** 00 000 000 000 (placeholder)
