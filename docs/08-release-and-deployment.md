# 08 Release and Deployment

## Purpose

Provide a repeatable and low-risk launch process.

Related docs: [Implementation Plan](./06-implementation-plan.md), [Testing and QA](./07-testing-and-qa.md), [Maintenance and Operations](./09-maintenance-and-operations.md)

## Release Preconditions

- QA checklist completed.
- Stakeholder content approval complete.
- CTA destination tested and monitored.

## Deployment Workflow

- Merge release branch to main.
- Trigger production deployment.
- Confirm build success and environment health.

## Post-Deploy Smoke Test

- Hero, sections, and anchors load correctly.
- CTA and contact methods work.
- Metadata/social preview are valid.
- Mobile spot-check passes.

## Rollback Plan

- Revert to last known good deployment.
- Communicate issue and ETA.
- Track root cause in [Decision Log](./11-decision-log.md).

## Release Notes Template

- Scope delivered.
- Risks and mitigations.
- Known issues.
- Owner and follow-up actions.
