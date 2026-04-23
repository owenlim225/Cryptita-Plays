# Task 01: CTA Volunteer + Sponsor

## Objective
Implement and validate a clear dual-CTA pattern that prioritizes two actions only: **Volunteer** and **Sponsor**, without changing core programs content.

## Scope
- In scope:
  - Audit current CTA usage in homepage sections.
  - Define and apply consistent CTA labels, variants, and destinations for `Volunteer` and `Sponsor`.
  - Keep all existing program descriptions and messaging intent intact.
  - Add QA checks for accessibility, responsiveness, and route correctness.
- Out of scope:
  - Rewriting program copy or restructuring core programs section.
  - Backend form implementation or CRM integration.
  - New brand redesign beyond CTA treatment.

## Target Files
- `src/app/page.tsx`
- `src/components/sections/*.tsx` (especially hero, impact, partner, and footer CTA locations)
- `src/components/ui/button.tsx` (only if variant support or semantic refinements are needed)
- Optional references:
  - `docs/00-master-context.md`
  - `docs/02-content-strategy.md`

## Preconditions / Dependencies
- Confirm destination behavior for each CTA:
  - `Volunteer` destination (internal page/section or external form).
  - `Sponsor` destination (internal page/section or external form).
- Confirm approved CTA casing and copy:
  - Exactly `Volunteer` and `Sponsor`.
- Ensure no conflict with existing primary actions in `src/app/page.tsx`.
- Establish whether links open in same tab or new tab for external destinations.

## Detailed Implementation Steps (Micro-Steps)
1. Inventory current CTA usage.
   1.1 Enumerate every button/link in `src/app/page.tsx`.
   1.2 Enumerate CTA-like elements in all files under `src/components/sections/`.
   1.3 Classify each as keep, relabel, or remove.
2. Define CTA placement strategy.
   2.1 Select primary location (top fold hero).
   2.2 Select reinforcing location (mid-page and/or footer section).
   2.3 Ensure no section has conflicting third primary CTA.
3. Normalize CTA copy.
   3.1 Replace mixed labels (e.g., Join/Support/Get Started) where applicable.
   3.2 Keep verb-only labels: `Volunteer`, `Sponsor`.
   3.3 Preserve nearby supporting text unless it directly conflicts.
4. Normalize CTA behavior.
   4.1 Wire `Volunteer` href/handler consistently across locations.
   4.2 Wire `Sponsor` href/handler consistently across locations.
   4.3 Apply external-link attributes when needed (`target`, `rel`).
5. Harmonize visual hierarchy.
   5.1 Assign one CTA as visual primary and the other as secondary.
   5.2 Ensure button sizes and spacing are consistent per section.
   5.3 Verify focus styles remain visible.
6. Accessibility pass.
   6.1 Confirm keyboard reachability/order.
   6.2 Confirm accessible names are exactly readable and not duplicated via hidden text.
   6.3 Check contrast and focus indicator on all CTA states.
7. Cross-page consistency check.
   7.1 Verify there are no stale CTA labels in section components.
   7.2 Verify no old CTA routes remain in conditional branches.
8. Final validation and documentation.
   8.1 Capture before/after screenshot references for desktop/mobile.
   8.2 Record all edited files and rationale in PR/task notes.

## Parallelization Strategy (Assignable Subtracks)
- Agent A - Content + Placement Track
  - Own CTA inventory and copy normalization.
  - Mark each CTA instance with target state (Volunteer/Sponsor/none).
  - Validate core programs language remains unchanged.
- Agent B - UI + Behavior Track
  - Implement final links/handlers and button variant consistency.
  - Handle responsive layout and interaction states.
  - Ensure `src/components/ui/button.tsx` changes are minimal and reusable.
- Agent C - QA + Accessibility Track
  - Run keyboard, screen reader label, and contrast checks.
  - Verify routing and link targets (internal/external).
  - Produce acceptance checklist evidence and rollback notes.

## Acceptance Criteria
- Only `Volunteer` and `Sponsor` are used for primary CTA actions.
- CTA labels are consistent in all intended homepage sections.
- Core programs content remains unchanged.
- CTA destinations are correct and do not produce navigation errors.
- CTA hierarchy (primary vs secondary) is visually and semantically clear.
- CTA interactions pass basic accessibility checks (focus, labels, keyboard).

## QA Checklist
- [ ] Every intended CTA instance uses exact labels `Volunteer` or `Sponsor`.
- [ ] No legacy CTA labels remain in `src/app/page.tsx` or sections.
- [ ] Desktop and mobile layouts show CTA pair without overlap/clipping.
- [ ] Keyboard tab order reaches both CTAs logically.
- [ ] Focus ring is visible on both CTAs in all placements.
- [ ] External links include safe `rel` usage when opening new tab.
- [ ] Core programs section content is unchanged.
- [ ] Link targets resolve correctly in local run/build preview.

## Risks and Rollback Notes
- Risks:
  - Accidentally changing non-CTA messaging while editing section copy.
  - Inconsistent CTA routes between duplicated section components.
  - Regression in button styles when variants are shared broadly.
- Rollback:
  - Revert only CTA-related diffs in `src/app/page.tsx` and affected section files.
  - If shared button styles regress, revert `src/components/ui/button.tsx` separately.
  - Keep a small patch scoped to label + destination changes for safe re-apply.
