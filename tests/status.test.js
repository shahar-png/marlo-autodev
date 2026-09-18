const test = require("node:test");
const assert = require("node:assert/strict");
const { status } = require("../lib/status");

test("health status is ok and carries the deploy sha", () => {
  const s = status({ VERCEL_GIT_COMMIT_SHA: "abc123", VERCEL_ENV: "production" });
  assert.equal(s.ok, true);
  assert.equal(s.app, "marlo-autodev");
  assert.equal(s.sha, "abc123");
  assert.equal(s.env, "production");
});

test("health status defaults outside Vercel", () => {
  const s = status({});
  assert.equal(s.sha, null);
  assert.equal(s.env, "local");
});
