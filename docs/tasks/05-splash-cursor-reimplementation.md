# Task 05: Splash Cursor Reimplementation

## objective
Reimplement the splash cursor effect so the homepage keeps a polished, responsive, and accessible pointer-reactive visual layer without degrading content readability, interaction behavior, or frame performance.

## scope in/out
### in scope
- Rebuild and harden the splash cursor implementation used on the homepage.
- Align behavior with the source snippet while adapting to project conventions and performance targets.
- Define desktop and mobile interaction strategy (pointer, touch, reduced-motion).
- Ensure effect remains decorative and does not block content interaction.
- Tune defaults for smooth rendering on standard laptop/mobile hardware.

### out of scope
- Global redesign of homepage layout or section order.
- Introducing new animation libraries (Framer Motion and GSAP are already available).
- Changing copy/content in hero, programs, or other sections.
- Reworking unrelated canvas or particle effects in other components.

## exact target file paths
- `snippets/Splash Cursor.tsx` (reference source behavior and props)
- `src/components/SplashCursor.tsx` (primary implementation target)
- `src/app/page.tsx` (integration point and prop wiring)
- `src/app/layout.tsx` (only if top-level layering/theme interaction requires adjustment)
- `docs/tasks/05-splash-cursor-reimplementation.md` (this execution spec)

## dependencies
- Homepage composition remains in `src/app/page.tsx` with `<SplashCursor />` mounted once at page root.
- Any z-index or layer updates must preserve click/scroll access to all sections.
- Reduced-motion behavior must match existing accessibility expectations.
- QA for this task should run before downstream hero motion polish to avoid confounded regressions.

## micro-step checklist grouped by workstream
### WS-A: Baseline capture and parity mapping
- [ ] Capture current behavior notes: visual density, latency feel, fade-out cadence, and color profile.
- [ ] Compare `snippets/Splash Cursor.tsx` against `src/components/SplashCursor.tsx` and document deltas.
- [ ] Freeze baseline screenshots/video clips for before/after verification.
- [ ] Define target parity level (exact clone vs tuned adaptation).

### WS-B: Core rendering and simulation hardening
- [ ] Confirm render loop lifecycle is correctly initialized and fully cleaned up on unmount.
- [ ] Audit pointer/touch handlers for unnecessary allocations and event churn.
- [ ] Validate particle lifecycle bounds and memory growth behavior under heavy pointer movement.
- [ ] Tune dissipation/pressure/curl defaults for stable visuals across 60/120Hz displays.
- [ ] Verify device pixel ratio handling and canvas resize math across orientation changes.

### WS-C: Accessibility and interaction guarantees
- [ ] Enforce `prefers-reduced-motion` path (disable or heavily simplify effect).
- [ ] Ensure canvas remains `pointer-events: none` and `aria-hidden`.
- [ ] Validate touch behavior does not create scroll blocking or gesture conflicts.
- [ ] Confirm text contrast/readability remains acceptable over animated overlays.

### WS-D: Integration and configuration
- [ ] Keep homepage integration in `src/app/page.tsx` with explicit props and stable defaults.
- [ ] Ensure effect is rendered once only and not duplicated through re-renders/layout nesting.
- [ ] Document recommended prop ranges for future tuning (density, force, radius, color speed).
- [ ] Verify no console warnings/errors in development and production builds.

### WS-E: QA and stabilization
- [ ] Run frame stability checks during sustained pointer movement and idle state.
- [ ] Validate behavior on desktop mouse, touch device, and reduced-motion mode.
- [ ] Capture final visual references and note accepted performance envelope.
- [ ] Record any deferred tuning items as follow-up tasks.

## parallel agent split suggestions
- **Agent 1 (Rendering):** Own WS-B (simulation/render-loop quality and cleanup).
- **Agent 2 (A11y/UX):** Own WS-C (reduced-motion, touch behavior, non-blocking overlay validation).
- **Agent 3 (Integration):** Own WS-D + WS-E (page wiring, final QA matrix, sign-off artifacts).
- **Coordination gate 1:** WS-A completes first and publishes parity checklist.
- **Coordination gate 2:** WS-B and WS-C merge into a single preview before WS-E starts.

## acceptance criteria
- Splash cursor effect visually matches the intended style from the snippet baseline.
- Overlay never blocks pointer, keyboard, or touch interactions with page content.
- Reduced-motion users get a safe non-animated or minimized-motion experience.
- No sustained frame drops or runaway memory growth during a 30-second stress interaction.
- No new runtime warnings/errors tied to resize, RAF lifecycle, or event handlers.

## QA checklist (desktop/mobile/accessibility/perf)
- [ ] **Desktop:** Mouse movement feels responsive; no stutter at normal interaction speeds.
- [ ] **Desktop:** Canvas remains behind interactive UI layer semantics and above background visuals only.
- [ ] **Mobile:** Touch scroll remains smooth; effect does not hijack gestures.
- [ ] **Mobile:** Orientation change preserves correct canvas scale and positioning.
- [ ] **Accessibility:** `prefers-reduced-motion` path verified in browser devtools/system setting.
- [ ] **Accessibility:** Decorative layer is ignored by assistive technology (`aria-hidden`).
- [ ] **Performance:** 30-second interaction test shows stable FPS characteristics and no memory spikes.
- [ ] **Performance:** Idle state clears particles and returns to low CPU usage.

## rollback plan
- Revert `src/components/SplashCursor.tsx` and `src/app/page.tsx` to the last stable commit where pointer effects were acceptable.
- If regressions persist, temporarily disable `<SplashCursor />` mount in `src/app/page.tsx` while retaining branch artifacts for iterative fix.
- Re-run smoke QA (desktop pointer, mobile scroll, reduced-motion) before redeploying rollback state.
