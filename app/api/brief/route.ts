import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clientName, businessName, email, phone, projectType, description } = body;
    if (!clientName || !businessName || !email || !phone || !projectType || !description) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const db = getAdminDb();
    await db.collection("briefs").doc(body.id).set({
      ...body,
      createdAt: new Date().toISOString(),
      status: "pending",
    });

    return NextResponse.json({ success: true, id: body.id });
  } catch (err) {
    console.error("Error guardando brief:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
