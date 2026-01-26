let db;

if (process.env.DB_TYPE === "postgres") {
  db = require("./postgres");
  console.log("🐘 Using PostgreSQL database");
} else {
  db = require("./sqlite");
  console.log("📦 Using SQLite database");
}

module.exports = db;
