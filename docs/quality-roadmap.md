# ASTRAL Quality Roadmap

Last reviewed: 2026-11-27

## Verified source/build items
- [x] Gesture instructions are reachable from title and pause screens (source audit).
- [x] Gesture guide return paths route back to title or pause overlay (source audit).
- [x] Pause-to-home path clears pause overlay, gameplay HUD and touch-play state (source audit).
- [x] Barrier duration and cooldown decrement during gameplay (source audit; previously fixed).
- [x] Pointer movement respects drag movement setting (source audit; previously fixed).
- [x] Pointer cancellation removes cancelled IDs from both pointer collections and clears tap suppression/movement when no pointer remains (source audit; 2026-11-27).
- [x] Production Vercel builds have previously passed TypeScript + Vite build (historical log; this run's latest build pending).

## Not verified without browser/device gameplay
- [ ] Touch: primary drag movement, shield double-tap, secondary-finger double-tap weapon mode while moving, pointercancel recovery on iOS/Android.
- [ ] Keyboard controls, pause/resume, restart, and home navigation in real browser.
- [ ] Complete six-stage clear and all three boss phases; collision and difficulty balance.
- [ ] Small-screen/landscape and desktop responsive behavior, accessibility focus and contrast.
- [ ] Economy: crystal persistence, shop purchase accounting, gacha results, stage/retry reward edge cases.
- [ ] FPS/performance and audio on actual devices.

## Next priorities
1. Run browser-based interaction tests (including multi-touch) if a browser runner becomes available; otherwise require hands-on mobile check.
2. Add deterministic unit tests for pure game helpers and progression/economy logic if code can be safely modularized.
3. Audit gameplay loop: timing cadence, collisions, progression/retry/economy invariants; avoid broad refactors until automated tests exist.
4. Review keyboard focus, menu transitions and viewport edge cases.

## Validation policy
- A source audit is not runtime verification.
- Typecheck/build success does not prove gameplay, touch gestures, browser rendering or balancing.
- Do not mark release-ready until the critical hands-on tests above are completed or reliable automated coverage is available.
