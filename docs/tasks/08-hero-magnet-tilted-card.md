# Task 08: Hero Magnet + Tilted Card

## objective
Integrate and polish magnetic CTA interaction and 3D tilt card behavior in the hero section to improve perceived interactivity while preserving accessibility, readability, and performance.

## scope in/out
### in scope
- Apply `Magnet` to selected hero interactive targets (primary CTA and/or logo/action cluster).
- Apply `TiltedCard` to hero feature card/panel for depth and motion polish.
- Tune interaction parameters for a subtle, premium effect (not gamified or distracting).
- Ensure reduced-motion and coarse-pointer scenarios gracefully degrade.
- Keep hero copy/content structure intact while improving interaction quality.

### out of scope
- Rewriting hero messaging, CTA text, or section narrative.
- Rebuilding hero layout architecture from scratch.
- Applying magnet/tilt globally to unrelated sections.
- Introducing third-party interaction libraries beyond existing stack.

## exact target file paths
- `snippets/Magnet.tsx` (reference source behavior)
- `snippets/Tilted Card.tsx` (reference source behavior)
- `src/components/ui/magnet.tsx` (primary magnet implementation target)
- `src/components/ui/tilted-card.tsx` (primary tilted card implementation target)
- `src/components/sections/hero-section.tsx` (integration target for both interactions)
- `src/components/ui/button.tsx` (optional if CTA composition needs compatibility adjustments)
- `src/app/page.tsx` (only if top-level interaction layering context requires update)
- `docs/tasks/08-hero-magnet-tilted-card.md` (this execution spec)

## dependencies
- Hero section remains the canonical integration surface: `src/components/sections/hero-section.tsx`.
- Task 05 splash cursor layering must not interfere with hero pointer interactions.
- Existing Framer Motion entrance behavior in hero must stay coherent with tilt/magnet behavior.
- Interaction defaults must satisfy accessibility constraints for reduced-motion/coarse pointers.

## micro-step checklist grouped by workstream
### WS-A: Interaction design calibration
- [ ] Define acceptable interaction envelope (max translation, max rotation, hover scale ceiling).
- [ ] Identify hero elements eligible for magnet vs tilt (avoid over-instrumenting every element).
- [ ] Confirm fallback behavior for touch/coarse pointer devices.
- [ ] Set anti-jank thresholds for transition timing and spring feel.

### WS-B: Magnet component hardening
- [ ] Compare `snippets/Magnet.tsx` with `src/components/ui/magnet.tsx` and map required parity changes.
- [ ] Optimize listener lifecycle and avoid expensive state updates when outside interaction range.
- [ ] Ensure disabled/reduced-motion/coarse-pointer paths reset transform to neutral.
- [ ] Validate wrapper semantics and className passthrough for composability in hero.

### WS-C: Tilted card component hardening
- [ ] Compare `snippets/Tilted Card.tsx` with `src/components/ui/tilted-card.tsx` for desired behavior deltas.
- [ ] Tune spring stiffness/damping/scale for stable feel with no overshoot artifacts.
- [ ] Confirm leave/reset behavior is deterministic and fast after rapid pointer exits.
- [ ] Ensure transform stack and perspective do not blur text or degrade card readability.

### WS-D: Hero integration and conflict resolution
- [ ] Integrate `Magnet` and `TiltedCard` in hero with minimal DOM complexity.
- [ ] Preserve existing CTA focus states and keyboard accessibility.
- [ ] Validate interaction harmony with hero `motion.div` reveal timing.
- [ ] Confirm no z-index/pointer conflicts with splash cursor overlay.

### WS-E: Validation and sign-off
- [ ] Run interaction tests across desktop mouse, trackpad, and touch devices.
- [ ] Verify reduced-motion path disables advanced transform behavior.
- [ ] Capture before/after interaction video for reviewer calibration.
- [ ] Document tuned parameter values and rationale for future maintenance.

## parallel agent split suggestions
- **Agent 1 (Magnet):** Own WS-B (`src/components/ui/magnet.tsx`).
- **Agent 2 (Tilt):** Own WS-C (`src/components/ui/tilted-card.tsx`).
- **Agent 3 (Integration/QA):** Own WS-D and WS-E in hero and verification matrix.
- **Coordination gate 1:** WS-A publishes parameter budget before code changes.
- **Coordination gate 2:** Merge WS-B and WS-C, then execute WS-D integration pass.

## acceptance criteria
- Hero section includes polished magnet and tilt behavior on approved elements.
- Interactions feel responsive but restrained, with no distracting or exaggerated movement.
- Keyboard/touch/reduced-motion users retain full functional accessibility.
- No pointer conflict between hero interactions and splash cursor overlay.
- No noticeable frame drops during rapid pointer movement over hero elements.

## QA checklist (desktop/mobile/accessibility/perf)
- [ ] **Desktop:** Magnet pull feels smooth and recenters cleanly when pointer leaves.
- [ ] **Desktop:** Tilted card tracks pointer direction accurately without sudden jumps.
- [ ] **Desktop:** Hero CTA remains clearly clickable and focus-visible.
- [ ] **Mobile:** Coarse pointer devices avoid awkward hover-only transforms.
- [ ] **Mobile:** Hero remains legible and stable under touch scroll.
- [ ] **Accessibility:** Reduced-motion mode neutralizes magnet/tilt transforms.
- [ ] **Accessibility:** Keyboard navigation works regardless of pointer interaction state.
- [ ] **Performance:** No sustained FPS drops in hero under rapid pointer movement.

## rollback plan
- Revert `src/components/sections/hero-section.tsx` integration first to disable magnet/tilt usage quickly.
- If component internals are unstable, also revert `src/components/ui/magnet.tsx` and `src/components/ui/tilted-card.tsx` to prior stable versions.
- Re-run hero smoke tests (CTA click/focus, mobile readability, reduced-motion) before redeployment.
