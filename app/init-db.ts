import { Database } from "bun:sqlite";

const db = new Database("./database.sqlite.db");

// Create the `accounts` table
db.run(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL
  )
`);

// Create the `messages` table (predefined schema)
db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    from_id INTEGER NOT NULL REFERENCES accounts(id),
    to_id INTEGER NOT NULL REFERENCES accounts(id),
    content TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL
  ) WITHOUT ROWID
`);

// Example seed data
db.run(`
  INSERT INTO accounts (username) VALUES
  ('default'),
  ('Jeff')
`);

console.log("Database initialized!");
