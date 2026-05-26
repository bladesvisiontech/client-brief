import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session?.value) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db.collection("briefs").orderBy("createdAt", "desc").get();
    const briefs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ briefs });
  } catch (err) {
    console.error("Error obteniendo briefs:", err);
    return NextResponse.json({ error: "Error al obtener briefs" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  if (!session?.value) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    const db = getAdminDb();
    await db.collection("briefs").doc(id).update({ status });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error actualizando brief:", err);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
