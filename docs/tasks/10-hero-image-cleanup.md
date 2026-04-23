# Task 10: Hero Image Cleanup

## objective
Simplify the hero visual stack by removing the transparent image layer so the hero renders cleaner, with fewer overlapping assets and less visual noise.

## scope in/out
### in scope
- Identify and remove transparent image layer used in the hero section.
- Preserve intended hero composition, spacing, and responsiveness after removal.
- Validate that copy, CTAs, and remaining hero visuals still align correctly.

### out of scope
- Full hero redesign or copy changes.
- New hero illustrations/asset replacement.
- Major animation rework not required by transparent-layer removal.
- Changes to unrelated sections outside hero.

## target files
- `src/app/page.tsx` (likely hero composition point)
- `src/components/*` hero-related components (exact file depends on current composition)
- `public/*` hero assets (reference check only; no required deletions unless explicitly approved)

## prerequisites
- Confirm which element is the "transparent image layer" (single asset vs overlay wrapper).
- Confirm expected post-removal visual from product/design.
- Capture baseline screenshot of current hero for regression comparison.
- Confirm whether removed layer has animation/parallax hooks that also need cleanup.

## implementation steps (granular)
1. **Locate hero asset stack**
   - Trace hero render tree and identify all image layers and wrappers.
   - Confirm which node corresponds to the transparent image layer.
   - Identify any style rules/transforms tied specifically to that layer.

2. **Remove transparent layer from render path**
   - Remove the image element/component node for the transparent layer.
   - Remove now-unused wrapper/positioning nodes if they only existed for that layer.
   - Keep semantic structure and layout stability intact.

3. **Cleanup related styles and logic**
   - Remove dead CSS classes, utility classes, and conditional logic linked only to removed layer.
   - Remove animation/transition hooks no longer referenced.
   - Ensure no orphan imports remain.

4. **Rebalance hero layout**
   - Validate vertical rhythm, spacing, and alignment after layer removal.
   - Adjust container alignment only if needed to preserve intended composition.
   - Re-check CTA/button visibility against background.

5. **Regression validation**
   - Confirm hero loads without missing asset errors.
   - Validate responsive behavior across key breakpoints.
   - Compare before/after screenshots with focus on clarity and readability.

6. **Stabilize and document**
   - Note removed layer and any secondary cleanup in task/PR notes.
   - Provide preview evidence for sign-off.

## parallel execution matrix (who can do what concurrently)
| Workstream | Owner Role | Can Run In Parallel With | Dependencies | Deliverable |
|---|---|---|---|---|
| WS-A: Baseline capture + visual intent confirmation | Product/Design | WS-B | None | Approved post-removal target |
| WS-B: Layer identification + code removal | Frontend Dev 1 | WS-A, WS-C | Hero code path known | Removed transparent layer in implementation |
| WS-C: Dead-style/dead-logic cleanup | Frontend Dev 2 | WS-B (partially) | Layer node identified | Clean stylesheet and imports |
| WS-D: Responsive QA + visual regression | QA | After WS-B/C integrate | Preview build | Breakpoint test results and screenshots |
| WS-E: Approval gate | Product/Design | After WS-D | QA output | Accept/reject decision |

## acceptance criteria
- Transparent image layer is no longer rendered in hero.
- Hero remains visually coherent and less cluttered.
- No missing asset warnings or runtime errors from removed references.
- CTA and text readability are equal or better than before.
- Mobile and desktop layouts remain stable.

## QA checklist
- [ ] Transparent layer not visible and not present in rendered DOM structure.
- [ ] Hero heading, supporting copy, and CTAs remain aligned.
- [ ] No unexpected blank gaps/overlaps introduced.
- [ ] No console errors from deleted imports/assets.
- [ ] Hero looks correct across mobile, tablet, and desktop breakpoints.
- [ ] Visual regression screenshots captured and reviewed.

## risks/fallback and rollback
### key risks
- Removing an overlay can expose underlying composition artifacts.
- Layer may be tied to layout anchoring, causing misalignment after removal.
- Hidden dependencies (animation or style hooks) can leave dead logic.

### fallback options
- If visual depth is lost, use subtle background gradient/shadow adjustments instead of reintroducing transparent layer.
- If layout shifts unexpectedly, retain structural wrapper but remove only image source/render.
- If removal impacts performance/UX unexpectedly, deploy behind branch-level preview until validated.

### rollback plan
- Revert hero cleanup commit(s) to restore prior layered state.
- Re-run hero smoke QA to ensure quick stabilization.
- Re-open cleanup as incremental task with narrower scope.
