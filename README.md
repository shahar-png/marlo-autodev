# marlo-autodev

Marlo's app repo, shipped end to end by **Agent OS** with no human merge.

```
you + Claude (chat)  →  PLAN.md on branch plan/<feature>
you + Grok Bot       →  discuss; on approval Grok Bot runs:  agent-os dispatch PLAN.md
agent-os dispatch    →  logs verdict + sha256 → claudex-loop (review → build → proof → inspect → judge)
judge: done          →  push branch, open PR, enable auto-merge
GitHub Actions       →  `proof` re-runs PROOF_CMD (required check)
GitHub auto-merge    →  squash to main
Vercel               →  production deploy of main
GitHub Actions       →  `post-deploy` health check; red → dispatch opens a revert PR
```

- `PROOF_CMD` for this repo: `npm test`
- Kill switch: add the `hold` label to a PR and auto-merge will not fire.
- Escalation (round 3 without `done`, or a failed health check): PR stays open as draft and you are notified. Nothing else waits on a human.
- Health: `/api/health` returns `{ok, app, version, sha, env}`; the post-deploy check requires `sha` to equal the pushed commit.

Tooling lives in [agent-os-loop](https://github.com/shahar-png/agent-os-loop) (`bin/agent-os`).
