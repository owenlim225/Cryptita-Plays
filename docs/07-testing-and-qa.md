# 07 Testing and QA

## Purpose

Define quality checks for reliable, accessible, and sponsor-ready launch.

Related docs: [Design Brief](./04-design-brief.md), [Technical Specification](./05-technical-specification.md), [Release and Deployment](./08-release-and-deployment.md)

## Test Scope

- Functional behavior of nav, links, and CTA.
- Responsive behavior across key breakpoints.
- Accessibility and semantic correctness.
- Performance and SEO basics.

## Functional Checklist

- Anchor links navigate to correct sections.
- CTA buttons route to correct destination.
- Contact details are accurate and clickable.
- No broken internal/external links.

## Responsive Checklist

- Mobile (360px+), tablet, desktop layouts verified.
- No text overflow or clipped content.
- Tap targets are comfortably sized.

## Accessibility Checklist

- Keyboard navigation works end-to-end.
- Focus indicators visible on interactive elements.
- Headings follow proper hierarchy.
- Images include meaningful alt text.

## Performance And SEO Checklist

- Lighthouse baseline acceptable for launch.
- Metadata and OG tags render correctly.
- Images optimized and lazy-loaded where appropriate.

## Defect Triage

- P0: blocks key CTA or content rendering.
- P1: major UX or accessibility regression.
- P2: minor visual/text inconsistencies.
