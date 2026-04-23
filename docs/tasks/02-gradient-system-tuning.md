# Task 02: Gradient System Tuning

## Objective
Tune and standardize the gradient system used across homepage sections so visual depth and readability improve without altering core programs content.

## Scope
- In scope:
  - Audit gradient backgrounds/overlays in homepage sections.
  - Tune gradient stops, opacity, blur layering, and contrast behavior.
  - Align gradients with the brand mood and section hierarchy.
  - Validate readability for text layered on gradients.
- Out of scope:
  - Full brand re-theme or typography overhaul.
  - Rewriting section content.
  - Animating gradients unless already in component behavior.

## Target Files
- `src/components/sections/*.tsx`
- `src/app/page.tsx`
- Supporting visual components if referenced by sections:
  - `src/components/GradualBlur.tsx`
  - `src/components/AnimatedContent.tsx`
  - `src/components/LogoLoop.css`
- Design references:
  - `snippets/Gradual Blur.tsx`
  - `snippets/Animated Content.tsx`
  - `docs/06-brand-kit.md`

## Preconditions / Dependencies
- Confirm preferred gradient style direction (subtle, energetic, or mixed by section).
- Confirm any existing tokens/utilities for colors and alpha values.
- Ensure section owners agree on readability threshold for text over gradient layers.
- Decide if gradients should vary by section purpose (hero vs informational blocks).

## Detailed Implementation Steps (Micro-Steps)
1. Baseline audit.
   1.1 Capture current gradients per section from `src/components/sections/`.
   1.2 Identify repeated values and one-off hardcoded gradients.
   1.3 Mark readability hotspots where text contrast is weak.
2. Define gradient tiers.
   2.1 Create at least three gradient intensity tiers (low/medium/high).
   2.2 Map tiers to section intent (hero emphasis vs content support).
   2.3 Specify max opacity and blur limits per tier.
3. Normalize color stops.
   3.1 Align stop positions across similar sections.
   3.2 Replace abrupt transitions with smoother stop spacing.
   3.3 Limit over-saturated color mixing in text-heavy regions.
4. Balance overlay layers.
   4.1 Tune overlay alpha so text remains legible.
   4.2 Reduce excessive blur where edges become muddy.
   4.3 Keep decorative layers behind interaction controls.
5. Integrate snippet intent safely.
   5.1 Compare `snippets/Gradual Blur.tsx` behavior to current implementation.
   5.2 Reuse only visual principles, not one-to-one copy unless compatible.
   5.3 Ensure snippet-inspired changes do not alter content structure.
6. Responsive tuning.
   6.1 Check gradient cropping behavior on small screens.
   6.2 Verify no key text sits on high-noise color intersections.
   6.3 Adjust per-breakpoint opacity/position only when needed.
7. Accessibility and performance checks.
   7.1 Validate text contrast against gradient surfaces.
   7.2 Confirm visual effects do not cause readability flicker.
   7.3 Ensure no heavy effect introduces noticeable paint jank.
8. Documentation and sign-off.
   8.1 Record final gradient rules per section.
   8.2 Attach visual comparison references (before/after).

## Parallelization Strategy (Assignable Subtracks)
- Agent A - Gradient Audit + Rules Track
  - Inventory existing gradient usage and define tier rules.
  - Produce section-by-section gradient map and target values.
- Agent B - Implementation Track
  - Apply tuned gradient values in section components and supporting visual components.
  - Keep changes constrained to styling/visual layers.
- Agent C - Readability + Performance QA Track
  - Run contrast checks on gradient-backed text.
  - Validate responsive behavior and basic rendering performance.

## Acceptance Criteria
- Gradients are visually consistent and tiered by section intent.
- Text readability is improved and remains stable across breakpoints.
- No core programs content changes.
- Gradient-related styles are easier to maintain (fewer arbitrary one-offs).
- No visible regressions in section hierarchy or interaction clarity.

## QA Checklist
- [ ] Each section gradient maps to an explicit low/medium/high tier.
- [ ] No text-heavy block fails readability due to background intensity.
- [ ] Mobile layout maintains gradient intent without clipping key content.
- [ ] Gradient transitions are smooth, with no harsh color banding.
- [ ] Decorative layers do not obscure CTA buttons or links.
- [ ] Any snippet-inspired behavior is compatible and non-disruptive.
- [ ] Core programs content is unchanged.

## Risks and Rollback Notes
- Risks:
  - Over-tuning could flatten brand personality or reduce visual distinction.
  - Section-specific overrides may reintroduce inconsistency later.
  - Opacity adjustments can unintentionally weaken CTA prominence.
- Rollback:
  - Revert changed gradient classes/inline styles section-by-section.
  - Keep a snapshot of pre-tuning values for quick restoration.
  - If regressions are broad, restore prior state and reapply using tier rules only.
