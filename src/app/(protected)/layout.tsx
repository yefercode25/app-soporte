import { AuthControl } from "@/components";
import { verifyJWT } from "@/utils/jwt";
import { toastAlert } from "@/utils/toastAlert";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const cache = 'no-store';

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