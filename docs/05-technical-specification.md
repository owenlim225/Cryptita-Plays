# 05 Technical Specification

## Purpose

Define implementation details for the Next.js sponsor-facing one-page site.

Related docs: [Product Requirements](./01-product-requirements.md), [Information Architecture](./03-information-architecture.md), [Implementation Plan](./06-implementation-plan.md)

## Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: CSS/Tailwind (project standard)
- Hosting: Vercel (recommended)

## Functional Requirements

- Render all one-page sections from IA.
- Support anchor navigation with smooth scrolling.
- Provide sponsor inquiry CTA (mailto or form endpoint).
- Display static impact metrics and program highlights.

## Non-Functional Requirements

- Mobile-first performance target (LCP under 2.5s on 4G).
- Semantic HTML and a11y checks.
- SEO essentials (title, description, OG metadata).
- Reliable deployment and rollback path.

## Proposed File Structure

- `src/app/page.tsx` for page assembly.
- `src/components/sections/*` for content sections.
- `src/components/ui/*` for reusable UI primitives.
- `src/content/*` for editable copy/constants.

## Data Strategy

- Initial release: static content in version-controlled files.
- Optional phase 2: lightweight CMS or JSON-backed updates.

## Integrations

- Optional form service for inquiries (if approved).
- Analytics (e.g., Vercel Analytics / GA4).

## Security And Privacy

- No sensitive user data storage at launch.
- If form is used, capture only minimum needed fields.
- Publish privacy notice when collecting personal info.
