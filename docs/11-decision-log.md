# 11 Decision Log

## Purpose

Capture key project decisions and rationale for traceability.

Related docs: [Technical Specification](./05-technical-specification.md), [Release and Deployment](./08-release-and-deployment.md), [Risk Register](./10-risk-register.md)

## Decision Template

- ID:
- Date:
- Decision:
- Context:
- Options Considered:
- Rationale:
- Consequences:
- Owner:

## Governance Note

- If a decision changes canonical facts, claims, partner lists, program names, or contact details, update `docs/00-master-context.md` in the same PR.

## Recorded Decisions

### D-01

- Date: 2026-04-17
- Decision: Launch as a one-page Next.js site first.
- Context: Need fast sponsor-facing presence with low complexity.
- Options Considered: one-page launch vs full multi-page site.
- Rationale: Faster time-to-value and simpler maintenance.
- Consequences: Tight content hierarchy required.
- Owner: Product + Engineering

### D-02

- Date: 2026-04-17
- Decision: Start with static content in repository.
- Context: Team needs controlled and versioned updates.
- Options Considered: static files vs CMS at launch.
- Rationale: Lower setup cost and reduced integration risk.
- Consequences: Content updates require PR workflow.
- Owner: Engineering
