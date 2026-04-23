# Task 11: Why Section Real Photos Carousel

## objective
Replace the single/static image in the Why section with a real-photos carousel that uses all assets in `assets/real photos`, delivering a more authentic and dynamic storytelling experience.

## scope in/out
### in scope
- Replace current Why-section image block with a carousel component.
- Source and include all assets from `assets/real photos`.
- Ensure carousel behavior is responsive, performant, and accessible.
- Align carousel styling with existing Why-section typography/layout.

### out of scope
- Editing/cropping original photo assets unless required for technical compatibility.
- Rewriting Why-section copy/content strategy.
- Site-wide carousel standardization across other sections.
- Backend/media service integration beyond existing local asset usage.

## target files
- `src/components/sections/why-photos-carousel.tsx`
- `src/lib/real-photos.ts`
- `src/app/page.tsx` (if section composition integration point is here)
- `src/app/api/real-photos/[photo]/route.ts` (only if current architecture uses route-based image serving)
- `assets/real photos/*` (source assets inventory/validation)
- `public/*` (only if asset pipeline requires relocation/copy)

## prerequisites
- Confirm exact source directory and naming for all "real photos" assets.
- Verify every required image has acceptable dimensions/file size for web rendering.
- Confirm desired carousel behavior: autoplay/manual controls/looping/drag/swipe.
- Confirm fallback behavior for missing/corrupt image files.
- Align on accessibility expectations (keyboard navigation, labels, pause behavior).

## implementation steps (granular)
1. **Asset inventory and validation**
   - Enumerate all files under `assets/real photos` and confirm each should be included.
   - Validate formats, dimensions, orientation mix, and file size constraints.
   - Flag problematic files early (unsupported type, excessive size, corrupt metadata).

2. **Data model wiring**
   - Update image source list utility (`src/lib/real-photos.ts`) to include all valid assets.
   - Ensure deterministic ordering (name/date/manual order) is defined explicitly.
   - Add safe guards for empty list and invalid entries.

3. **Carousel component implementation/integration**
   - Implement or finalize Why-section carousel component in `src/components/sections/why-photos-carousel.tsx`.
   - Replace legacy single image render path with carousel component usage.
   - Preserve section spacing, heading flow, and responsive grid/alignment behavior.

4. **Interaction and accessibility pass**
   - Support keyboard navigation for previous/next where controls exist.
   - Add meaningful labels/alt strategy for real photos context.
   - Ensure motion behavior respects reduced-motion preferences if autoplay is enabled.

5. **Performance and rendering stability**
   - Use optimized image loading strategy aligned with current app stack.
   - Prevent layout shift via defined dimensions/aspect handling.
   - Confirm smooth transitions with no stutter on typical devices.

6. **Error/fallback handling**
   - Handle missing image paths gracefully (skip item or fallback placeholder).
   - Ensure section remains functional even if one or more assets fail.
   - Ensure no hard crash when asset list is empty in non-prod/dev states.

7. **Final integration and visual QA**
   - Validate all photos are present in carousel sequence.
   - Check desktop/tablet/mobile layout and interaction.
   - Capture before/after visuals for stakeholder review.

## parallel execution matrix (who can do what concurrently)
| Workstream | Owner Role | Can Run In Parallel With | Dependencies | Deliverable |
|---|---|---|---|---|
| WS-A: Asset inventory + quality check | Content/Design Ops | WS-B, WS-C | Access to source assets | Validated list of all usable photos |
| WS-B: Data source update (`real-photos` list) | Frontend Dev 1 | WS-A (partial), WS-C | Initial asset naming known | Stable image data mapping with all assets |
| WS-C: Carousel UI/UX implementation | Frontend Dev 2 | WS-B (partial), WS-D | Why section integration point known | Working carousel in Why section |
| WS-D: Accessibility and reduced-motion compliance | Frontend Dev 3 / QA | WS-C | Base carousel interactions available | A11y-compliant controls and behavior |
| WS-E: Performance tuning and image loading checks | Frontend Dev 4 | WS-C, WS-D | Integrated carousel build | Smooth rendering and acceptable load impact |
| WS-F: End-to-end QA + sign-off package | QA + Product/Design | After WS-B/C/D/E | Preview build | Test matrix, screenshots, and approval decision |

## acceptance criteria
- Why section no longer displays the old single image implementation.
- Carousel is visible in Why section and includes all assets from `assets/real photos`.
- Carousel behavior works across target breakpoints (mobile/tablet/desktop).
- Transitions and interactions are stable and performant.
- Accessibility baseline is met (keyboard + labels + motion consideration).
- Section remains usable even if one or more images fail to load.

## QA checklist
- [ ] All expected photos from `assets/real photos` appear in carousel.
- [ ] No duplicate/missing entries compared to validated inventory.
- [ ] Carousel supports intended interactions (click/tap/swipe/keys as applicable).
- [ ] Reduced-motion behavior verified (if autoplay/animated transitions are used).
- [ ] No major CLS/layout shift while images load.
- [ ] No console errors from missing assets or route failures.
- [ ] Layout validated on mobile, tablet, desktop, and wide viewport.
- [ ] Visual sign-off screenshots captured.

## risks/fallback and rollback
### key risks
- Large image set can impact load performance and smoothness.
- Mixed image dimensions can create unstable layout/cropping issues.
- Missing/corrupt files can break sequence logic if not guarded.
- Carousel controls can reduce accessibility if labels/focus are incomplete.

### fallback options
- If performance regresses, stage loading (lazy-load offscreen items) and compress oversized assets.
- If dimension variance is severe, enforce consistent container aspect ratio with object-fit strategy.
- If carousel interaction is unstable, start with simpler manual navigation before autoplay/advanced transitions.
- If any asset fails repeatedly, temporarily exclude flagged files while preserving full section functionality.

### rollback plan
- Restore previous single-image Why section implementation via revert.
- Retain data utility improvements behind branch for incremental reintroduction.
- Re-introduce carousel in phased rollout after fixing asset/performance issues.
