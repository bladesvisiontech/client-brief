import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE } from "@/lib/session";
import { decrypt } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token || !(await verifySessionToken(token)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { encrypted } = await req.json();
    const plain = await decrypt(encrypted);
    return NextResponse.json({ value: plain });
  } catch {
    return NextResponse.json({ error: "Could not decrypt" }, { status: 400 });
  }
}
