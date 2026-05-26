import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { verifySessionToken, COOKIE } from "@/lib/session";

async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("briefs").orderBy("createdAt", "desc").get();
    const briefs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ briefs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching briefs" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthorized(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, notes } = await req.json();
    const db = getAdminDb();
    const update: Record<string, string> = {};
    if (status) update.status = status;
    if (notes !== undefined) update.internalNotes = notes;
    await db.collection("briefs").doc(id).update(update);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error updating" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthorized(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await req.json();
    const db = getAdminDb();
    await db.collection("briefs").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error deleting" }, { status: 500 });
  }
}
