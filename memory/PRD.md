# Bill Farr — Western & Travel Photography Portfolio

## Original Problem Statement
Bill Farr, a Western & Travel photographer, wants a best-in-class portfolio site that feels modern yet human, with emotional strength that connects immediately. Sections: Home, Portfolio (Western + Travel), About, Journal, Prints for sale, Contact/booking. Warm, earthy, film-like aesthetic. Working contact form. Emergent badge removed.

## Architecture
- **Frontend**: React (CRA + craco), Tailwind, framer-motion, Lenis smooth scroll, sonner toasts. Single-page with anchored sections in `src/components/site/*`.
- **Backend**: FastAPI + MongoDB (motor). Inquiries API.
- **Design**: Warm film palette (sand #F5F2EB / walnut #2A2421 / clay #B25E42 / sage). Cormorant Garamond + Outfit + JetBrains Mono. Film-grain overlay, asymmetric galleries, custom lightbox.

## User Personas
- Prospective clients booking Western/travel shoots.
- Print buyers.
- Editors / collaborators browsing work.

## Core Requirements (static)
- Cinematic hero, Western gallery (Tetris grid + lightbox), Travel gallery (alternating dark section + lightbox), Prints grid with inquiry, Journal list, Contact/booking form storing inquiries.

## Implemented (2026-07-04)
- Full single-page site with all sections, lightbox (keyboard nav), print-inquiry prefill into contact form.
- Backend: `POST /api/inquiries`, `GET /api/inquiries` (name/email/message/inquiry_type/subject) → MongoDB `inquiries`.
- Uses Bill's real photos: portrait (About) + wild horses (Hero + Western + Prints). Remaining imagery = curated placeholders to swap later.
- Emergent badge removed from index.html.

## Implemented (later — deployed to production at billfarrphotography.com)
- Real optimized WebP watermarked photos throughout; custom loader; Lenis parallax galleries; SEO/OG tags + favicons; domain SEO tags set to https://billfarrphotography.com.
- Email notifications LIVE via Emergent managed email (`EMERGENT_EMAIL_KEY`) on new inquiry (Reply-To = client).
- Bio photo = Arizona desert selfie; journal entries rewritten (Quiet Art of Horsemanship / Spirit of the Wrangler / Between Visibility and Mystery); longhorn = "West Texas Ranch".
- Western gallery: added "First Light" (sunburst) + "Wild Mustangs" (8 items). Travel: removed St Paul's, added "Bridges of the Vltava" (Prague) + "The Shard After Dark" (Thames) (5 items).
- Fixed mobile-invisible Travel images (ParallaxImage percentage-height bug on iOS Safari).
- **Analytics dashboard `/insights` (and `/#insights`), key `bill-insights-2026`** — cookieless/first-party. Tracks: pageviews + page-load speed (avg/mobile/desktop via Navigation Timing), journal opens, gallery image opens, CTA clicks (Book a Shoot / View Work / Email), section-reach funnel (IntersectionObserver), country (Cloudflare `cf-ipcountry` header — populates in production), inquiry-type breakdown, 30-day views trend, referrers, devices. Filters out `emergent` referrers.
  - Backend: `POST /api/analytics/track` (fields: type,label,gallery,load_ms), `GET /api/analytics/summary?key=` (401 on bad key). Collection `db.analytics`.

## Backlog
- P1: Testimonials + Services/Pricing sections (awaiting Bill's copy); embed Instagram feed (awaiting handle).
- P2: Restore hidden Prints section + Facebook/Instagram social links; Phase-1 CMS (password-protected editing of journal/copy); city-level geo (needs geo API/DB — currently country-only).

## Integrations
- Emergent Managed Email (`EMERGENT_EMAIL_KEY`) — LIVE for contact form forwarding.

## Old status (historical, superseded above)

