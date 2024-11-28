// app/api/vote/route.ts
import { NextResponse } from "next/server";

// eslint-disable-next-line prefer-const
let votes = { A: 0, B: 0 };

export async function POST(req: Request) {
  const { vote } = await req.json();
  votes[vote === "Opção A" ? "A" : "B"] += 1;
  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json(votes);
}
