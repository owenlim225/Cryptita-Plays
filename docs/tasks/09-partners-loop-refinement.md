# Task 09: Partners Loop Refinement

## objective
Refine the partners logo loop section for cleaner visual polish and better logo legibility by removing card outlines, slowing animation cadence, applying dual-edge fades, and improving contrast through a darker section background.

## scope in/out
### in scope
- Remove visible outline/border treatment from partner logo cards/containers.
- Slow the logo loop speed while keeping seamless infinite motion.
- Add fade treatment on both left and right loop edges.
- Darken loop section background to improve hover-state logo visibility.
- Validate responsiveness and hover behavior across breakpoints.

### out of scope
- Rebranding or replacing partner logo assets.
- Structural rewrite of the logo loop component architecture.
- Global theming/token migration outside the partners loop area.
- New animation libraries or package additions.

## target files
- `src/components/LogoLoop.jsx`
- `src/components/LogoLoop.css`
- `src/app/page.tsx` (only if section-level wrapper classes/theme hooks are needed)
- `src/app/layout.tsx` (only if global style variable usage is required)

## prerequisites
- Verify current source of truth for partners section location in homepage composition.
- Confirm approved visual direction for "darker background" (target contrast intent, not exact color token yet).
- Confirm whether fades should be CSS mask, gradient overlays, or pseudo-element overlays based on browser support target.
- Ensure all partner logo assets render correctly before refinement so regressions are obvious.

## implementation steps (granular)
1. **Audit current implementation**
   - Identify exact markup/classes controlling logo card outline and hover states.
   - Identify current animation duration, timing function, and duplication strategy for seamless looping.
   - Identify where section background is currently defined (component-local vs page-level class).

2. **Remove outline treatment**
   - Remove border/outline/shadow styles that visually frame each logo card.
   - Retain spacing, alignment, and hover affordance without relying on outlines.
   - Re-check logo separation using gap/padding so cards still feel distinct.

3. **Slow loop motion**
   - Increase animation duration to a visibly slower pace (target "calm marquee", not static).
   - Keep linear timing and infinite loop continuity.
   - Verify no jump at loop seam after timing changes.

4. **Implement dual-edge fade**
   - Add fade on both left and right edges of the visible loop viewport.
   - Ensure fade does not clip logos too aggressively on mobile widths.
   - Confirm fade works with hover interactions and does not block pointer events.

5. **Darken partners section background**
   - Apply darker background color/style to the loop container/section.
   - Verify default and hover logo visibility improves against new background.
   - Re-check adjacent section transitions for visual continuity.

6. **Responsive/interaction validation**
   - Confirm logo readability at common breakpoints (mobile, tablet, desktop, wide).
   - Validate hover/focus affordances remain discoverable and accessible.
   - Confirm animation performance remains smooth without stutter.

7. **Stabilize and document**
   - Add brief implementation notes in task tracking or PR body.
   - Capture before/after screenshots or preview references for reviewer sign-off.

## parallel execution matrix (who can do what concurrently)
| Workstream | Owner Role | Can Run In Parallel With | Dependencies | Deliverable |
|---|---|---|---|---|
| WS-A: Visual audit + acceptance thresholds | Product/Design | WS-B, WS-C | None | Agreed visual targets for speed, contrast, fades |
| WS-B: Outline + background style changes | Frontend Dev 1 | WS-A, WS-C | Minimal input from WS-A | Updated styles for card chrome + section contrast |
| WS-C: Loop speed + seam stability | Frontend Dev 2 | WS-A, WS-B | Existing loop implementation understood | Tuned animation duration with seamless looping |
| WS-D: Edge fade implementation | Frontend Dev 3 | WS-B, WS-C | Confirm loop viewport container | Dual-edge fade behavior across breakpoints |
| WS-E: QA pass + regression checks | QA | After WS-B/C/D merge | Integrated preview build | Pass/fail report with screenshots and issues |
| WS-F: Final sign-off | Product/Design | After WS-E | QA report + preview | Approval or change requests |

## acceptance criteria
- Partner logo cards no longer show visible outline/border framing.
- Logo loop animation is noticeably slower and remains seamless/infinite.
- Left and right edges both show fade treatment during logo movement.
- Background behind partner logos is darker than prior implementation.
- Hover-state logo visibility is improved and clearly legible.
- No layout breakage or major animation jitter across supported breakpoints.

## QA checklist
- [ ] Outlines removed on all cards/logo containers in loop.
- [ ] Loop seam is invisible at least across 3 full cycles.
- [ ] Fade appears on both edges and scales correctly on mobile/desktop.
- [ ] Hover states remain visible and interactive within faded regions.
- [ ] Contrast of logos vs background is improved in default and hover states.
- [ ] No clipping/overflow artifacts at container boundaries.
- [ ] No new console errors related to animation/styles.
- [ ] Basic cross-browser sanity check completed.

## risks/fallback and rollback
### key risks
- Fade implementation can interfere with pointer interactions if overlay captures events.
- Darker background can conflict with neighboring section palette or brand consistency.
- Slowing loop too much can reduce perceived motion and visual energy.
- CSS-only masking may vary across browser engines.

### fallback options
- If mask-based fades are inconsistent, use gradient pseudo-elements with `pointer-events: none`.
- If dark background conflicts with theme, apply a localized overlay only behind loop viewport.
- If loop speed feels too slow, move to a middle-ground duration agreed by design.

### rollback plan
- Revert partners loop styling/animation commits to previous stable state.
- Keep only non-breaking improvements (if any) behind feature branch until refined.
- Validate old behavior quickly with smoke QA before redeploying.
