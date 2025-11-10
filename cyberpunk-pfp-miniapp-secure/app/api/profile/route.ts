import { NextResponse } from "next/server";
import { getUserByFid } from "@/lib/neynar";

export async function POST(req: Request) {
  const { fid } = await req.json();
  if (!fid) return NextResponse.json({ error: "fid required" }, { status: 400 });
  const u = await getUserByFid(Number(fid));
  return NextResponse.json(u);
}
