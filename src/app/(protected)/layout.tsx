import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/iniciar-sesion");
  }

  return (
    <>
      { children }
    </>
  );
}