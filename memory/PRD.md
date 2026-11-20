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

## Redesign v2 — "posh, edge-to-edge, monochrome" (2026-11-20, forked session)
User follow-ups: make it fancier/posh like youpay.co, window must cover the screen **edge to edge**, **black & white only** (brand), information displayed better, smoother hero exit.
User choices (ask_human): glass caption panel over the window, chapter progress rail, fake moving cursor inside the window, animated numbers/progress bars.

Implemented:
- Monochrome token set (ink #0A0A0B, paper #FFFFFF, bg #F5F5F6, grey hairlines, grey "silver" gradient). All gold/ivory/colour removed, incl. radar axis colours and the red blocked state.
- Display face switched to Instrument Serif (editorial headings) + Inter Tight for product UI, Source Sans 3 body.
- Window is now 100vw x 100svh: scales 0.78 → 1 with border-radius 38px → 0 (CSS var `--win-r` driven by a motion value), so it lands truly edge to edge; spring-smoothed scrollYProgress (`useSpring`) makes the hero → film and film → exit transitions glide.
- Hero: masked line-by-line headline reveal on load, eyebrow pill, cascading exit (actions → sub → title) with blur; window sits behind at 58% opacity + blur and sharpens as the hero leaves; crown lifted out of the window wrapper so it stays crisp.
- Window chrome: traffic lights, URL pill (`crowned.com / <screen>`), "Sample data" chip, left product nav with lucide icons + active tick, member footer, faint crown watermark.
- Glass caption panel (bottom-left, backdrop blur) with 01/05 chapter index, AnimatePresence blur/slide between chapters; callouts moved left of the content column; chapter rail right; 2px film progress bar.
- Fake cursor with tap ripple, coordinates per screen in content.js; counters for checkout receipt, gifter-test percentages and the $100 ring; progress bars animate on activation.
- Marquee strip, bento-style How it works grid, two-column FAQ, black closing card, refined footer.
- Testing agent iteration_1: frontend 100% (5 chapters, rail/nav/caption sync, animated values, mobile 390x844 no overlap/overflow, monochrome confirmed). FakeCursor out-of-range crash fixed (keyed remount).

## Backlog
- Awaiting further user review notes from the preview.

### Bug fix (2026-11-20)
- FakeCursor crash ("undefined is not an object (evaluating 'at.x')"): rewritten to store the active step object in state (no index) + keyed remount per screen id. Verified by testing agent iteration_2: 0 page errors after 5 stress scroll cycles, all regressions pass.
- Chapter rail now fades in/out with the film instead of showing over the hero.

## Iteration 3 (2026-11-20) — portraits, reflections, dark finale, working pointer
- Creator Faces: monograms replaced with grayscale Unsplash portraits (certificate avatar with corner marks + scan line, reviews header, window nav footer). URLs live in content.js (`certificate.avatar`, `reviews.avatar`).
- Window Reflections: `.winSheen` band sweeps across the glass, x driven by scroll progress (3 passes); inverts to a white sheen in dark mode.
- Dark Finale: the reviews chapter flips the window to a dark token set (`.appWindow.dark` overrides --paper/--ink/--hairline etc.), with dark caption glass, rail, callouts and a `stageDark` backdrop faded by scroll progress; the closing section + footer are now fully black and the header switches to dark glass (`onDark`) over them.
- Pointer fix: FakeCursor no longer uses hard-coded % coordinates — it queries `.screen.active [data-cursor]` targets, springs x/y to each one, loops, and adds a `.cursorPress` press effect on arrival. Targets tagged in Screens.jsx (avatar, certified pill, amount chips, total row, limit rows, radar, preference chip, ring, unlock row).
- Testing agent iteration_3: frontend 100% — cursor movement verified across 6 unique positions + press feedback, portraits load, sheen transform changes, dark finale + header switch verified, no console errors, no overflow at 1920x1080 or 390x844.
