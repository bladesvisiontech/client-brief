import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { encrypt } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { clientName, businessName, email, phone, projectType, description } = body;
    if (!clientName || !businessName || !email || !phone || !projectType || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Encrypt password before storing
    if (body.emailSetupPassword) {
      body.emailSetupPassword = await encrypt(body.emailSetupPassword);
    }

    const db = getAdminDb();
    await db.collection("briefs").doc(body.id).set({
      ...body,
      createdAt: new Date().toISOString(),
      status: "pending",
      internalNotes: "",
    });

    return NextResponse.json({ success: true, id: body.id });
  } catch (err) {
    console.error("Error saving brief:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
