import { db } from "../../db";

export function GET(req: Request) {
  const { fromId, toId } = new URL(req.url).searchParams;
  const messages = db
    .query(
      `
    SELECT * FROM messages
    WHERE (from_id = ? AND to_id = ?) OR (from_id = ? AND to_id = ?)
    ORDER BY sent_at ASC
  `
    )
    .all(fromId, toId, toId, fromId);
  return new Response(JSON.stringify(messages), { status: 200 });
}

export async function POST(req: Request) {
  const { fromId, toId, content } = await req.json();
  const sentAt = new Date().toISOString();
  db.run(
    "INSERT INTO messages (from_id, to_id, content, sent_at) VALUES (?, ?, ?, ?)",
    fromId,
    toId,
    content,
    sentAt
  );
  return new Response(null, { status: 201 });
}
