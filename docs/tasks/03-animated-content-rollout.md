# Task 03: Animated Content Rollout

## Objective
Roll out `AnimatedContent` usage across selected homepage sections in a controlled way to improve perceived polish while preserving content clarity and performance.

## Scope
- In scope:
  - Identify where `AnimatedContent` should be applied in section components.
  - Introduce animation progressively (staged rollout) with sane defaults.
  - Keep messaging, especially core programs content, unchanged.
  - Add reduced-motion and regression checks.
- Out of scope:
  - Site-wide animation redesign.
  - Rewriting section copy or reordering information architecture.
  - Heavy scroll choreography beyond section reveal/entry behavior.

## Target Files
- `src/components/AnimatedContent.tsx`
- `src/components/sections/*.tsx`
- `src/app/page.tsx`
- Snippet references:
  - `snippets/Animated Content.tsx`
  - `snippets/Scroll Float.tsx` (interaction boundaries reference)

## Preconditions / Dependencies
- Confirm baseline animation policy (duration, easing, delay cadence).
- Confirm reduced-motion handling strategy and fallback behavior.
- Confirm performance budget for animation in low-end devices.
- Identify section priority order for staged rollout.

## Detailed Implementation Steps (Micro-Steps)
1. Readiness audit.
   1.1 Identify current animated elements and wrappers in section files.
   1.2 Mark candidate nodes for animation (headings, cards, CTA blocks).
   1.3 Exclude content that should remain static for clarity.
2. Define rollout phases.
   2.1 Phase 1: Hero + one supporting section.
   2.2 Phase 2: Informational/supporting sections.
   2.3 Phase 3: Footer/secondary enhancements only if stable.
3. Standardize animation defaults.
   3.1 Set shared defaults in `AnimatedContent` (duration/easing/offset).
   3.2 Define optional props for per-section tuning.
   3.3 Avoid per-instance arbitrary timing unless justified.
4. Integrate in Phase 1.
   4.1 Wrap selected hero content blocks with `AnimatedContent`.
   4.2 Ensure CTA discoverability is not delayed excessively.
   4.3 Validate no layout jump on first render.
5. Integrate in Phase 2.
   5.1 Apply animation wrappers in chosen section components.
   5.2 Stagger only where it improves scanning, not decoration overload.
   5.3 Keep interactive controls immediately usable.
6. Reduced-motion and fallback pass.
   6.1 Respect `prefers-reduced-motion` in animation behavior.
   6.2 Ensure elements are visible and accessible when animation is disabled.
   6.3 Confirm tab/focus behavior does not depend on animation completion.
7. Performance verification.
   7.1 Check for jank during initial scroll into animated regions.
   7.2 Reduce effect intensity where needed (distance, blur, shadows).
   7.3 Avoid large repaint triggers in dense sections.
8. Rollout completion and notes.
   8.1 Document which sections were animated and why.
   8.2 Capture before/after references and known limitations.

## Parallelization Strategy (Assignable Subtracks)
- Agent A - Component Baseline Track
  - Tune `src/components/AnimatedContent.tsx` defaults and prop contract.
  - Define reduced-motion behavior and fallback semantics.
- Agent B - Section Integration Track
  - Apply wrappers through phased section rollout.
  - Keep content structure and order intact.
- Agent C - QA + Perf Track
  - Validate animation behavior on desktop/mobile and reduced-motion mode.
  - Check for accessibility and performance regressions.

## Acceptance Criteria
- `AnimatedContent` is applied to approved sections in phased order.
- Core programs content remains unchanged.
- Animations are subtle, readable, and do not block interaction.
- Reduced-motion preference is respected and functionally equivalent.
- No major layout shift or noticeable scroll jank is introduced.

## QA Checklist
- [ ] Phase 1 sections animate correctly with clean entry behavior.
- [ ] Phase 2 sections preserve readability and information hierarchy.
- [ ] CTA elements remain discoverable and usable immediately.
- [ ] Reduced-motion mode displays all content without hidden states.
- [ ] Keyboard navigation and focus order are unaffected by animations.
- [ ] Mobile rendering remains smooth and visually coherent.
- [ ] Core programs content is unchanged.

## Risks and Rollback Notes
- Risks:
  - Over-animation may reduce message clarity in content-heavy sections.
  - Inconsistent prop usage can create uneven motion language.
  - Animation wrappers can introduce subtle layout regressions.
- Rollback:
  - Remove `AnimatedContent` wrappers from non-critical sections first.
  - Revert default changes in `src/components/AnimatedContent.tsx` if global regressions occur.
  - Keep phased commits/patches so rollback can be surgical.
