import { Input } from "@/components";
import { Metadata } from "next";
import Link from "next/link";
import { IoAtOutline, IoLockClosedOutline, IoLockOpenOutline, IoPersonAddOutline, IoPersonOutline } from "react-icons/io5";

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
        <form>
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Registrate en App Soporte</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">¡Bienvenido! Por favor ingresa la información solicitada para crear tu cuenta</p>
          <Input
            name="name"
            placeholder="Ejm. Lucas"
            title="Nombres"
            type="text"
            id="name"
            icon={<IoPersonAddOutline />}
          />
          <Input
            name="lastName"
            placeholder="Ejm. Perez"
            title="Apellidos"
            type="text"
            id="lastName"
            icon={<IoPersonOutline />}
            isOptional
          />
          <Input
            name="email"
            placeholder="Ejm. email@gmail.com"
            title="Correo electrónico"
            type="email"
            id="email"
            icon={<IoAtOutline />}
          />
          <Input
            name="password"
            placeholder="**********"
            title="Contraseña"
            type="password"
            id="password"
            icon={<IoLockClosedOutline />}
          />
          <Input
            name="repeatPassword"
            placeholder="**********"
            title="Repetir contraseña"
            type="password"
            id="repeatPassword"
            icon={<IoLockOpenOutline />}
          />
          <button type="submit" className="block w-full bg-blue-600 mt-4 py-2 rounded-md text-white font-semibold mb-2 hover:bg-blue-700 transition-all">Realizar registro</button>

          <div className="text-center">
            <span className="text-xs text-gray-600 font-semibold mr-2">¿Tienes una cuenta?</span>
            <Link href="/auth/iniciar-sesion" className="text-xs font-semibold text-blue-600">Inicia sesión aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}