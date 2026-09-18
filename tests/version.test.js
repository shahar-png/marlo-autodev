const test = require("node:test");
const assert = require("node:assert/strict");
const { version, status } = require("../lib/status");
const handler = require("../api/version");
const pkg = require("../package.json");

// Minimal stand-in for the Vercel Node response object.
function mockRes() {
  const res = { headers: {}, statusCode: null, body: null };
  res.setHeader = (k, v) => {
    res.headers[k] = v;
  };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.end = (body) => {
    res.body = body;
  };
  return res;
}

test("version() matches package.json", () => {
  assert.equal(version(), pkg.version);
});

test("health status reuses version()", () => {
  assert.equal(status({}).version, version());
});

test("GET /api/version responds 200 with {version}", () => {
  const res = mockRes();
  handler({ method: "GET" }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(res.body), { version: pkg.version });
});
