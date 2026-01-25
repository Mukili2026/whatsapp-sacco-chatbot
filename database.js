const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./sacco.db", (err) => {
  if (err) {
    console.error("❌ Database error:", err.message);
  } else {
    console.log("✅ SACCO database connected");
  }
});

db.run(`
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE,
  name TEXT,
  member_id TEXT,
  savings INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;
