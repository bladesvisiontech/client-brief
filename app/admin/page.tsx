import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken, COOKIE } from "@/lib/session";
import AdminDashboard from "@/components/admin/AdminDashboard";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin — Inmotion" };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  const authenticated = token ? await verifySessionToken(token) : false;

  if (!authenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
