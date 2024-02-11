import { RegistrarUsuarioForm } from "@/components";
import { Metadata } from "next";
import { IoLockClosedOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: 'Registrar | App Soporte',
  description: 'Realiza el registro de tu cuenta en App Soporte',
};

export default function RegistrarPage() {
  return (
    <div>
      <div className="py-5 px-1 md:w-10/12 xl:w-8/12 mx-auto">
        <div className="flex items-center justify-center">
          <div className="text-6xl p-5 rounded-xl bg-blue-600 text-white inline-block mb-5">
            <IoLockClosedOutline />
          </div>
        </div>
        <RegistrarUsuarioForm />
      </div>
    </div>
  );
}