import { db } from "../../db";

export function GET() {
    console.log("check:001 here get")
  const users = db.query("SELECT * FROM accounts").all();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req: Request) {
    console.log("check:001 here post")
  const { username } = await req.json();
  db.run("INSERT INTO accounts (username) VALUES (?)", username);
  const user = db
    .query("SELECT * FROM accounts WHERE username = ?")
    .get(username);
  return new Response(JSON.stringify(user), { status: 201 });
}
