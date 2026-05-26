import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (email !== adminEmail) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    await signInWithEmailAndPassword(auth, email, password);

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 horas
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }
}
