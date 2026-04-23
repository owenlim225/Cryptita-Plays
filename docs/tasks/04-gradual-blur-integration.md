# Task 04: Gradual Blur Integration

## Objective
Integrate a `GradualBlur` treatment into appropriate homepage sections to improve depth and visual separation while maintaining legibility and preserving core programs content.

## Scope
- In scope:
  - Identify best-fit insertion points for `GradualBlur`.
  - Integrate with existing section layouts and gradient system.
  - Tune blur intensity and mask behavior by breakpoint.
  - Validate accessibility/readability impact.
- Out of scope:
  - Global visual effects rewrite.
  - Changes to core programs copy or data.
  - Complex animation timelines not directly tied to blur presentation.

## Target Files
- `src/components/GradualBlur.tsx`
- `src/components/sections/*.tsx`
- `src/app/page.tsx`
- Related references:
  - `snippets/Gradual Blur.tsx`
  - `snippets/Animated Content.tsx`
  - `docs/tasks/02-gradient-system-tuning.md`

## Preconditions / Dependencies
- Confirm if `GradualBlur` exists as reusable component API or needs refinement.
- Ensure gradient tuning baseline is stable enough to layer blur without muddying contrast.
- Confirm design intent for where blur should appear (background-only vs content-adjacent).
- Align with reduced-motion/readability expectations for effect-heavy sections.

## Detailed Implementation Steps (Micro-Steps)
1. Discovery and fit mapping.
   1.1 Review all sections for visual density and separation needs.
   1.2 Mark candidate insertion zones (hero backdrop, transitions, media blocks).
   1.3 Reject sections where blur would reduce text clarity.
2. Define integration rules.
   2.1 Set max blur strength by context (hero, mid-content, footer).
   2.2 Define safe layering order with gradients and content.
   2.3 Define z-index and pointer-events policy for non-interference.
3. Refine `GradualBlur` component contract.
   3.1 Add/normalize props for direction, intensity, and spread.
   3.2 Ensure defaults are conservative and readable.
   3.3 Keep implementation composable for multiple sections.
4. Phase integration into sections.
   4.1 Integrate into highest-impact section first (typically hero).
   4.2 Add to one transitional section where separation is needed.
   4.3 Expand to additional sections only after readability checks pass.
5. Responsive adjustments.
   5.1 Reduce blur strength on small screens.
   5.2 Prevent blur clipping or overflow artifacts near section boundaries.
   5.3 Ensure sticky/fixed elements remain visually distinct.
6. Accessibility and usability checks.
   6.1 Confirm text contrast on blurred backdrops.
   6.2 Verify interactive elements remain crisp and discoverable.
   6.3 Ensure blur overlays do not block pointer/keyboard interactions.
7. Cross-effect harmonization.
   7.1 Validate coexistence with `AnimatedContent` if both are present.
   7.2 Avoid compounding effects that produce haze/noise.
   7.3 Keep visual hierarchy consistent with CTA prominence.
8. Final hardening and notes.
   8.1 Capture section-by-section blur decisions and rationale.
   8.2 Record fallback plan for sections sensitive to readability.

## Parallelization Strategy (Assignable Subtracks)
- Agent A - Component + API Track
  - Own `src/components/GradualBlur.tsx` API and defaults.
  - Keep props simple and reusable for sections.
- Agent B - Section Integration Track
  - Add blur layers in selected section files and tune breakpoint behavior.
  - Ensure no interaction interference with CTA and links.
- Agent C - QA + Visual Validation Track
  - Validate readability, contrast, and interaction states.
  - Check desktop/mobile rendering for blur artifacts and overdraw.

## Acceptance Criteria
- `GradualBlur` is integrated only in sections where it improves separation.
- Core programs content remains unchanged.
- Blur intensity is controlled and does not degrade readability.
- Interactive elements remain accessible and unaffected.
- Combined effects (gradients + blur + animation) remain balanced and performant.

## QA Checklist
- [ ] Blur appears only in approved sections and contexts.
- [ ] Text blocks over blur maintain acceptable readability.
- [ ] CTA/button/link states remain clear and fully interactive.
- [ ] No pointer-event blockage from blur overlays.
- [ ] Mobile view avoids excessive haze and edge clipping artifacts.
- [ ] Combined with gradients, visual hierarchy remains intact.
- [ ] Core programs content is unchanged.

## Risks and Rollback Notes
- Risks:
  - Blur + gradient stacking can reduce contrast unexpectedly.
  - Overly aggressive blur may obscure important visual anchors.
  - Section-specific custom props can create maintenance burden.
- Rollback:
  - Remove blur layers from lower-priority sections first.
  - Revert `GradualBlur` prop defaults to conservative baseline.
  - If readability regressions persist, disable blur integration and retain gradient-only styling.
