import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminDashboard from "@/components/admin/AdminDashboard";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin — Inmotion Brief" };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <LoginForm />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </main>
  );
}
