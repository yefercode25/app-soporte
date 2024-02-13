import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { IniciarSesionForm } from "@/components";
import { IoLockClosedOutline } from "react-icons/io5";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Iniciar Sesión | App Soporte',
  description: 'Iniciar sesión en la aplicación de soporte',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-wrap justify-center content-center h-full">
      <div className="w-full md:w-7/12">
        <div className="flex items-center justify-center">
          <div className="text-6xl p-5 rounded-xl bg-blue-600 text-white inline-block mb-5">
            <IoLockClosedOutline />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold">Bienvenido a App Soporte</h1>
        <small className="text-gray-400">¡Bienvenido de nuevo! Por ingresa la información solicitada para acceder</small>

        <IniciarSesionForm />
      </div>
    </div>
  );
}