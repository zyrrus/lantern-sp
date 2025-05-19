import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const user = req.headers.get("remote_user");
  if (!user) {
    return Response.json({ error: "Unauthenticated" }, { status: 401 });
  }
  return Response.json({ user }, { status: 200 });
}
