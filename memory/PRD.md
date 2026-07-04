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

## Backlog
- P1: Real bio copy from Bill; swap remaining placeholder photos with his originals; individual journal article pages.
- P2: Email notification on new inquiry (Resend/SendGrid); print checkout (Stripe); image upload/admin panel.

## Next Tasks
- Collect Bill's bio + full photo set; wire email notifications for inquiries.

## Integrations
- None third-party yet. Contact form stores to MongoDB only (NO email sending yet — MOCKED as DB-store).
