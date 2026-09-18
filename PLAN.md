# PLAN — version endpoint

## Goal
Add `GET /api/version` returning `{"version": "<package.json version>"}` as JSON, reusing `lib/status.js` so the version is defined once.

## Non-goals
No changes to `/api/health`, no new dependencies, no build step.

## Builder
BUILDER: claude — small serverless handler plus a test; same shape as the existing health endpoint.

## Acceptance criteria
| ID | Criterion | How it is observed |
|---|---|---|
| AC-1 | `api/version.js` exists and responds 200 with JSON `{version}` equal to package.json version | tests/version.test.js |
| AC-2 | `lib/status.js` gains a `version()` helper used by both endpoints; existing tests still pass | npm test |

## Verification
PROOF_CMD: npm test
