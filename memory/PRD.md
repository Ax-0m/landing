# Crowned — Fan Landing Page (frontend only)

## Problem statement
Marketing landing page for FANS (gifters) of the Crowned gifting platform, answering two questions through a calm, premium, animated product tour: "Can I trust this?" (certified creators, public certificate) and "What will it cost me?" (guest checkout with fee shown first, optional Member spend limits). Frontend only, one page, export-ready. No backend, no integrations, no deploy.

## Personas
- Gifter (fan): arrives from a creator's link, wants to gift without an account, needs price/fee/total transparency and control over spending.
- Member (optional): sets daily/monthly limits, Gifter Test, preferences, hard limits; one profile across every creator.
- Creator: referenced only conceptually (sees Gifter Test from the payment).

## Core requirements (static, from brief)
- Scroll film: 560vh container, sticky stage (top 72px), useScroll/useTransform timeline — hero → transition → 5 chapters (Certificate, Checkout, Limits, Gifter Test, Reviews) → exit. Reverses on scroll up.
- App window: card chrome, silver hairlines, title bar with crown mark + screen name, 5 dots, non-interactive screens, pointer tilt ≤5deg, rotateY -6→0→4 with scroll.
- Sections: sticky header, film, How it works (3 steps + drawing silver line), FAQ (native details), closing card, footer. Mobile sticky bottom bar after film starts.
- Design tokens only as specified (#F7F7F7/#FFFFFF/#E6E6E8/#17181B/#6B6B72/#C0392B, silver accent, card radius 24, Inter Tight 300 display + Source Sans 3 body).
- prefers-reduced-motion: no pinning; hero + five stacked blocks with captions.
- Facts restricted to the brief; banned words/stats avoided; copy centralized in content.js.

## Architecture
- CRA React 19 + framer-motion 11 + lucide-react, plain CSS (styles.css tokens). No router, no backend calls.
- src/ (12 files): index.js, App.jsx, content.js, styles.css + components: Header, Hero (film + captions + callouts + mobile bar), AppWindow, Screens (5 screens), HowItWorks, Faq, ClosingCard, Footer.
- public/: crown.png, crown-small.png, wordmark.png (attached logos), index.html with title/meta/OG/fonts.

## Implemented (2026-11-20)
- Full page per brief; scroll film with all 5 screens and per-screen animations (scan line, count-up receipt with $50→$25→$50 cycle, blocked-limit sequence, radar draw + chips, $100 progress ring).
- Reduced-motion stacked layout; mobile layout (window top, caption below, bottom bar); desktop 3-column stage with callouts ≥1440px.
- Verified: desktop 1440x900 (hero, limits chapter, end sections), mobile 390x844 (hero, chapter, end), no console errors, no horizontal overflow.

## Backlog (not requested)
- None stated; awaiting user follow-ups from preview review.
