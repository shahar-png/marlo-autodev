// Single source of truth for the app version, shared by /api/health and /api/version.
function version() {
  return require("../package.json").version;
}

// Single source of truth for what /api/health reports. Pure so tests can call it.
function status(env = {}) {
  return {
    ok: true,
    app: "marlo-autodev",
    version: version(),
    sha: env.VERCEL_GIT_COMMIT_SHA || null,
    env: env.VERCEL_ENV || "local",
  };
}

module.exports = { status, version };
