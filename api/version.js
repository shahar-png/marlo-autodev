const { version } = require("../lib/status");

module.exports = (req, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("cache-control", "no-store");
  res.status(200).end(JSON.stringify({ version: version() }));
};
