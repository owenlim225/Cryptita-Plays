# 06 Brand Kit

## Purpose
This document defines the complete visual and messaging system for the Cryptita Plays one-page website. It is implementation-ready for design and frontend work, with rules aligned to sponsor-facing clarity and the approved source of truth in `docs/00-master-context.md`.

## Source Of Truth And Guardrails
- All organization, program, impact, partner, and contact statements must match `docs/00-master-context.md`.
- Tone and language must stay education-first, safety-forward, and beginner-friendly.
- Avoid hype framing, speculative claims, and unapproved social or program statements.
- Canonical contact values:
  - `cryptitaplays@gmail.com`
  - `@cryptitaplays`
  - `+63-906-0925-761`

## Brand Foundation

### Positioning
Cryptita Plays is a community-driven social impact initiative in the Philippines that bridges Web3 education and social development for youth and underserved communities.

### Core Tagline
`Bridging Web3 Education and Social Impact`

### Tone
- Warm
- Credible
- Practical
- Community-centered

### Messaging Rules
- Lead with education, safety, and inclusion.
- Use concrete outcomes and plain language.
- Keep sponsor-facing copy skimmable and trust-building.
- Do not imply guaranteed financial returns from Web3.
- Do not position the mission as trend-chasing or tech-first.

## Logo System

### Approved Logo Assets
- Primary logo file: `assets/primary logo.png`
- Long lockup: `assets/cryptita-tplays-long.png`
- Icon mark: `assets/icon mark.ico`

### Logo Variants For UI
- Primary lockup: use for header and hero identity.
- Secondary lockup (long): use in footer and wide layouts.
- Icon mark: use for favicon, compact nav avatar, and social preview mark.

### Clear Space And Minimum Size
- Clear space: at least the icon mark width around all sides.
- Minimum digital sizes:
  - Primary/secondary lockup: `120px` width
  - Icon mark: `24px` width (UI), `32px` width (navigation), `48px` width (hero accents)

### Contrast And Placement Rules
- On dark or primary backgrounds (`#971CE6`): use white logo artwork.
- On light backgrounds: use full-color logo if available; otherwise use dark text variant.
- Never place logos directly on busy photos without an overlay (minimum 60% dark overlay or solid panel).
- Never distort, stretch, rotate, or alter logo colors outside approved variants.

## Color System

### Brand Palette
- Primary: `#971CE6`
- Primary hover/active: `#7D12C8`
- Primary soft background: `#F4E9FD`
- Text strong: `#101828`
- Text muted: `#475467`
- Border/subtle line: `#D0D5DD`
- Surface: `#FFFFFF`
- Surface alt: `#F8FAFC`
- Inverse text on primary/dark: `#FFFFFF`

### Semantic UI Tokens
- `--color-bg-page`: `#FFFFFF`
- `--color-bg-section-alt`: `#F8FAFC`
- `--color-bg-emphasis`: `#971CE6`
- `--color-text-primary`: `#101828`
- `--color-text-secondary`: `#475467`
- `--color-text-on-emphasis`: `#FFFFFF`
- `--color-border-default`: `#D0D5DD`
- `--color-cta-primary`: `#971CE6`
- `--color-cta-primary-hover`: `#7D12C8`
- `--color-cta-secondary-bg`: `#F4E9FD`
- `--color-cta-secondary-text`: `#7D12C8`

### Accessibility And Contrast Rules
- Body text should use `#101828` on white or near-white surfaces.
- White text should be reserved for primary/dark backgrounds.
- Buttons must maintain high contrast between label and fill.
- Partner logos should be placed on controlled surfaces (white or dark-neutral panels) to preserve legibility.

## Typography System

### Typefaces
- Primary display and heading: `Space Grotesk`
- Secondary UI/body: `Inter`

### Font Role Rules
- Use `Space Grotesk` for H1-H3 and key campaign statements.
- Use `Inter` for body, navigation, metadata, lists, labels, and long-form readability.
- Keep mixed-font usage minimal in one component to maintain cohesion.

### Type Scale (Desktop-First)
- H1: `56/64`, `700`, Space Grotesk
- H2: `44/52`, `700`, Space Grotesk
- H3: `36/44`, `600`, Space Grotesk
- H4: `28/36`, `600`, Space Grotesk
- H5: `22/30`, `600`, Space Grotesk
- H6: `18/26`, `600`, Space Grotesk
- Body large: `18/30`, `400`, Inter
- Body default: `16/26`, `400`, Inter
- Body small: `14/22`, `400`, Inter
- Caption/meta: `12/18`, `500`, Inter
- Button label: `16/24`, `600`, Inter

### Responsive Type Behavior
- Reduce each heading step by one tier on tablet/mobile where needed.
- Keep body at `16px` minimum for readability.
- Limit line length to about 60-75 characters in desktop paragraph blocks.

## UI Brand Tokens

### Spacing Scale
- `4, 8, 12, 16, 24, 32, 48, 64, 96`
- Section vertical rhythm:
  - Desktop: `96-120px`
  - Tablet: `72-96px`
  - Mobile: `56-72px`

### Radius, Border, Shadow
- Radius:
  - Inputs/buttons: `10px`
  - Cards: `16px`
  - Pill tags: `999px`
- Borders: `1px solid #D0D5DD`
- Shadows:
  - Card resting: `0 2px 12px rgba(16, 24, 40, 0.08)`
  - Card hover: `0 8px 24px rgba(16, 24, 40, 0.12)`

### Component Styling
- Primary button:
  - Fill: `#971CE6`
  - Text: `#FFFFFF`
  - Hover: `#7D12C8`
  - Focus: visible 2px ring using a soft primary tint
- Secondary button:
  - Fill: `#F4E9FD`
  - Text: `#7D12C8`
  - Border: transparent or `#D0D5DD` based on context
- Nav bar:
  - Clean, high-contrast text, sticky behavior
  - Primary CTA visible in desktop and mobile menu
- Cards:
  - White background, subtle border, soft shadow
  - Optional top accent line in primary

## Imagery And Partner Logo Guidance

### Real Photo Direction
- Use authentic community, youth, workshop, and outreach imagery.
- Prefer photos that communicate care, participation, and learning environments.
- Avoid overly staged, corporate stock-style visuals.
- Apply subtle overlay when placing text over photos for readability.

### Partner Logo Handling
- Place partner marks in consistent containers with fixed height.
- Preserve each logo's aspect ratio.
- Do not recolor third-party logos unless partner guidelines permit it.
- Use visual normalization (padding and container alignment), not geometric distortion.

### Partner List Compliance Rule
Only display partner names approved in `docs/00-master-context.md`, and use logo files from the published set only.

**Source library:** `assets/Partner logo files/Educational Partners/` and `assets/Partner logo files/Community Partners/` (see `docs/00-master-context.md` §8 for the name-to-filename table).

**Site delivery:** `public/brand/partners/educational/` and `public/brand/partners/community/`; UI lists `name` and `/brand/partners/...` paths in `src/components/site-data.ts`.

Educational partners (approved, with a source file in the Educational Partners folder):
- Blockchain4Youth
- Blockchain4Her
- MEXC Foundation
- Avalanche
- BASE Philippines
- OKX Wallet
- Coinex Charity
- TrustWallet
- Gate Web3
- Morph

Community partners (approved):
- NEN Digital
- BlockTides
- The SafeHouse
- Brgy Tamago
- Museigen.io
- Stocksify
- The Cryptology Academy
- GN club
- UPHSL GDC
- House of Degens (copy-approved only until a file exists in the Community Partners folder)

If new files appear under `assets/Partner logo files/…` that are not listed in the master context, treat them as unpublished until `docs/00-master-context.md` and the site data are updated.

## Website Application Map (One-Page Flow)

### 1) Hero
- Use primary lockup + tagline: `Bridging Web3 Education and Social Impact`
- Use high-impact photo or clean gradient with mission statement.
- Primary CTA uses canonical contact framing:
  - Example: `Join the Cryptita Plays Initiative`

### 2) Who We Are
- Use calm, high-legibility layout.
- Emphasize community-driven, social impact framing.

### 3) The Problem
- Use contrast block or split layout for urgency and clarity.
- Pair concise points with supportive iconography.

### 4) Our Approach
- Use process-style cards or horizontal steps.
- Keep language beginner-friendly and practical.

### 5) Core Programs
- Card-based layout with equal visual weight.
- Preserve exact canonical program names where required.

### 6) Educational Materials
- Use icon-supported list and concise descriptions.
- Keep reading flow quick and skimmable.

### 7) ACIS Program
- Visually distinct section using primary emphasis.
- Highlight monthly assistance, school supplies/materials, and Mini-Library access.
- Include coverage model: up to 5 students per Mini-Library area.

### 8) Impact
- Use statement-led panel and metric highlights.
- Keep claims aligned with approved impact statements.

### 9) Partners And Collaborators
- Separate educational vs community partner groups.
- Use normalized logo grid with sufficient spacing.

### 10) Why We Do This
- Use mission-led narrative block with human-centered imagery.

### 11) What’s Next
- Use roadmap-style concise milestones without speculative claims.

### 12) Join / Contact
- Repeat primary CTA and canonical contact values:
  - `cryptitaplays@gmail.com`
  - `@cryptitaplays`
  - `+63-906-0925-761`

## CTA Copy Bank (Master-Context Compatible)
- `Join the Cryptita Plays Initiative`
- `Support our Mini-Library and ACIS programs`
- `Volunteer or collaborate on educational initiatives`
- `Partner with us to bring Web3 education to more communities`
- `Help us create safe and accessible learning spaces`

## Asset Export And Handoff Specification

### Logo Exports
- Primary logo:
  - `SVG` (preferred source)
  - `PNG` transparent at `1x`, `2x`, `3x`
- Secondary/long lockup:
  - `SVG` + transparent `PNG`
- Icon mark:
  - `SVG` + square PNG sizes: `16, 32, 48, 64, 128, 256, 512`

### Favicon/App Icon
- Favicon set: `16x16`, `32x32`, `48x48`, `64x64` (`.ico` + `.png`)
- Web app icon: `192x192`, `512x512` (`PNG`)

### Social Preview
- Open Graph image target: `1200x630`
- Include logo, tagline, and a real-photo background with controlled contrast

### Image Delivery
- Photos: `JPG` or `WEBP` (quality tuned for web)
- Logos/icons: `SVG` primary, `PNG` fallback
- Keep originals archived in `assets/` and production-optimized versions in web static/public directories

## Content Compliance Checklist
- Program names match canonical wording from master context.
- Partner list includes approved names only.
- Contact details match canonical values exactly.
- Copy remains education-first, safety-forward, and no-hype.
- Impact language avoids overstatement and speculative outcomes.

