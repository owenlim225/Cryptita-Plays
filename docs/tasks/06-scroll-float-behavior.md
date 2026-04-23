# Task 06: Scroll Float Behavior

## objective
Define and implement stable, readable, and performant scroll-triggered character float behavior for headline text so motion enhances hierarchy without harming legibility or accessibility.

## scope in/out
### in scope
- Finalize behavior of `ScrollFloat` for string-based content in section headings and hero-adjacent messaging.
- Align the component with snippet intent while ensuring SSR-safe, client-side animation behavior.
- Tune ScrollTrigger settings (start/end/scrub/stagger/easing) for predictable motion across breakpoints.
- Preserve readability during and after animation states.
- Establish clear reduced-motion behavior and fallback rendering.

### out of scope
- Rewriting content copy or section IA.
- Replacing GSAP/ScrollTrigger with another animation framework.
- Global typography redesign beyond animation-specific readability fixes.
- Animation treatment of non-text elements unrelated to `ScrollFloat`.

## exact target file paths
- `snippets/Scroll Float.tsx` (reference behavior source)
- `src/components/ScrollFloat.tsx` (primary implementation target)
- `src/components/sections/hero-section.tsx` (integration candidate for headline/subhead)
- `src/components/sections/about-section.tsx` (optional secondary integration point)
- `src/components/sections/programs-section.tsx` (optional heading integration only; no content/data edits)
- `docs/tasks/06-scroll-float-behavior.md` (this execution spec)

## dependencies
- GSAP and ScrollTrigger are already available and should remain the animation backend.
- Any section-level adoption depends on content owners confirming which headings should animate.
- Task 05 overlay/z-index behavior should be stable first to avoid compounding perceived motion noise.
- Animation cadence should remain consistent with other on-scroll effects in the page.

## micro-step checklist grouped by workstream
### WS-A: Behavior definition and thresholds
- [ ] Define accepted visual profile: reveal speed, float distance, and readability threshold.
- [ ] Select default trigger window (`scrollStart`, `scrollEnd`) for most sections.
- [ ] Decide which headings opt in vs remain static.
- [ ] Document no-go zones (e.g., dense paragraphs, small-font body text).

### WS-B: Component-level implementation polish
- [ ] Audit character splitting logic for spaces/special characters and stable React keys.
- [ ] Validate cleanup via `gsap.context(...).revert()` and ensure no duplicate triggers on rerender.
- [ ] Confirm reduced-motion short-circuit returns static readable text.
- [ ] Tune defaults for duration/ease/stagger to avoid flicker or over-dramatic deformation.
- [ ] Ensure component handles non-string children without unintended wrappers.

### WS-C: Section integration with guardrails
- [ ] Integrate `ScrollFloat` in approved heading locations only.
- [ ] Preserve existing semantic tags (`h1`, `h2`, etc.) for accessibility and SEO.
- [ ] Confirm layout does not shift when characters animate into place.
- [ ] Keep programs section content and data unchanged; animate headings only if approved.

### WS-D: Regression and consistency QA
- [ ] Validate animation timing consistency across hero and lower sections.
- [ ] Confirm no visual conflict with Framer Motion section reveals.
- [ ] Verify no console warnings from ScrollTrigger registration or trigger lifecycle.
- [ ] Gather before/after captures and note any parameter overrides per section.

## parallel agent split suggestions
- **Agent 1 (Component):** Own WS-B in `src/components/ScrollFloat.tsx`.
- **Agent 2 (Integration):** Own WS-C in section files after WS-A decisions are published.
- **Agent 3 (QA):** Own WS-D with cross-breakpoint verification and issue logging.
- **Coordination gate 1:** WS-A must finalize default thresholds before section integration.
- **Coordination gate 2:** Merge component updates before broad QA sweep.

## acceptance criteria
- `ScrollFloat` reveals characters smoothly with readable intermediate states.
- Reduced-motion users see static readable text with no ScrollTrigger motion.
- No duplicated ScrollTriggers or memory leaks across route transitions/rerenders.
- Heading semantics and layout structure remain intact after integration.
- Programs section textual content/data remains unchanged.

## QA checklist (desktop/mobile/accessibility/perf)
- [ ] **Desktop:** Heading reveal feels smooth at standard wheel/trackpad scroll speeds.
- [ ] **Desktop:** Characters do not overlap or jitter when rapidly scrolling up/down.
- [ ] **Mobile:** Headings remain readable and stable during touch scrolling.
- [ ] **Mobile:** No excessive paint/reflow causing stutter in long pages.
- [ ] **Accessibility:** Reduced-motion mode disables scroll-linked transform animation.
- [ ] **Accessibility:** Semantic heading structure remains valid after wrapping/splitting.
- [ ] **Performance:** No trigger accumulation after navigating away and back.
- [ ] **Performance:** Animation does not noticeably degrade total page scroll smoothness.

## rollback plan
- Revert section integrations first while retaining component improvements if safe.
- If core behavior is unstable, revert `src/components/ScrollFloat.tsx` to prior static-safe state.
- Run smoke checks on hero/program headings and overall scroll stability after rollback.
