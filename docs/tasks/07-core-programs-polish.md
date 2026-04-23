# Task 07: Core Programs Polish

## objective
Polish the visual presentation and interaction quality of the Core Programs section while preserving all existing program content, data mapping, and factual messaging.

## scope in/out
### in scope
- Improve layout rhythm, card hierarchy, and motion polish in the programs area.
- Enhance readability and scanability of program cards and ACIS highlight block.
- Tune subtle entrance/hover behavior for a more premium but restrained feel.
- Preserve section anchors (`#programs`, `#materials`, `#acis`) and current CTA intent.
- Maintain consistency with existing brand palette and typographic system.

### out of scope
- Changing program titles, descriptions, or canonical data source content.
- Altering ACIS coverage claims or approved messaging.
- Adding/removing programs from the data array.
- Introducing new backend/data-fetch behavior.

## exact target file paths
- `src/components/sections/programs-section.tsx` (primary implementation target)
- `src/components/sections/hero-section.tsx` (only for visual cadence alignment, no content rewrite)
- `src/components/sections/about-section.tsx` (optional spacing/transition alignment)
- `src/components/AnimatedContent.tsx` (optional if reused for reveal polish)
- `src/components/GradualBlur.tsx` (optional if reused for visual treatment)
- `src/lib/utils.ts` (optional utility-only changes)
- `docs/00-master-context.md` (reference only; no edits required)
- `docs/tasks/07-core-programs-polish.md` (this execution spec)

## dependencies
- Program content source remains unchanged and governed by existing section data contract.
- Any animation changes should coexist with existing Framer Motion patterns in surrounding sections.
- Visual choices must remain consistent with brand constraints in project docs.
- QA sign-off should include confirmation that factual messaging is untouched.

## micro-step checklist grouped by workstream
### WS-A: UX/content guardrail lock
- [ ] Snapshot current `programs-section` render and text content for regression baseline.
- [ ] Mark non-editable content zones (program title/description strings, ACIS claim lines).
- [ ] Define polish intent with measurable targets (spacing, contrast, interaction subtlety).
- [ ] Publish approved "do not change" data checklist to all implementation agents.

### WS-B: Layout and visual hierarchy polish
- [ ] Refine section spacing and card grid rhythm for cleaner scan path on all breakpoints.
- [ ] Improve card visual hierarchy (title prominence, body readability, whitespace balance).
- [ ] Harmonize border/shadow treatment with neighboring sections.
- [ ] Tune ACIS highlight block so it feels emphasized but not visually heavy.
- [ ] Recheck CTA placement prominence and touch target comfort.

### WS-C: Motion and interaction refinement
- [ ] Tune existing motion timings/delays to reduce perceived stagger clutter.
- [ ] Add or adjust lightweight hover/focus affordances for cards and CTA.
- [ ] Ensure motion remains subtle, brand-appropriate, and non-distracting.
- [ ] Enforce reduced-motion compatibility for all added animation behavior.

### WS-D: Content integrity and regression validation
- [ ] Diff rendered text content before/after to ensure zero copy drift.
- [ ] Verify section anchors still navigate correctly from internal links.
- [ ] Validate no semantic regressions in heading structure/list semantics.
- [ ] Capture polished-state screenshots per breakpoint for sign-off.

## parallel agent split suggestions
- **Agent 1 (Layout):** Own WS-B structural polish in `programs-section`.
- **Agent 2 (Motion):** Own WS-C animation/interaction tuning.
- **Agent 3 (QA Guardrail):** Own WS-A and WS-D to enforce no content/data drift.
- **Coordination gate 1:** WS-A publishes immutable content checklist before edits begin.
- **Coordination gate 2:** Merge WS-B and WS-C into a single review build, then run WS-D.

## acceptance criteria
- Core Programs section appears visually more polished and easier to scan.
- All existing programs content/data remains exactly intact.
- ACIS block retains current claim language and CTA purpose.
- Motion/hover enhancements feel smooth and restrained across breakpoints.
- Anchor navigation to `#programs`, `#materials`, and `#acis` still works.

## QA checklist (desktop/mobile/accessibility/perf)
- [ ] **Desktop:** Card layout is balanced with no awkward whitespace or wrapping issues.
- [ ] **Desktop:** Hover/focus states are visible and consistent across interactive elements.
- [ ] **Mobile:** Grid collapse remains readable with comfortable spacing and tap targets.
- [ ] **Mobile:** ACIS block and CTA remain prominent without dominating viewport.
- [ ] **Accessibility:** Heading levels, list semantics, and link focus indicators are intact.
- [ ] **Accessibility:** Reduced-motion behavior verified for any new motion affordances.
- [ ] **Performance:** Added polish does not materially increase scroll jank or paint cost.
- [ ] **Content Integrity:** Program text and ACIS claims match pre-polish baseline exactly.

## rollback plan
- Revert `src/components/sections/programs-section.tsx` to baseline if content integrity or UX quality fails.
- Keep only safe spacing/token adjustments if they pass QA and do not alter content behavior.
- Re-run anchor, accessibility, and content-diff smoke tests after rollback.
