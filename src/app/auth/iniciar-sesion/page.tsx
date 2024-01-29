import { Metadata } from "next";
import Link from "next/link";
import { IoLockClosedOutline, IoLogoGoogle } from "react-icons/io5";

export const metadata: Metadata = {
  title: 'Iniciar Sesión | App Soporte',
  description: 'Iniciar sesión en la aplicación de soporte',
};

export default function LoginPage() {
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

        <form className="mt-4">
          <div className="mb-4">
            <label className="mb-1 block text-sm font-bold">Correo électronico:</label>
            <input type="email" placeholder="Ejem. tucorreo@gmail.com" className="block w-full rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 py-2 px-2 text-gray-500" />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold">Contraseña</label>
            <input type="password" placeholder="Tú contraseña de acceso" className="block w-full rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 py-2 px-2 text-gray-500" />
          </div>

          <div className="mb-4 flex flex-wrap content-center">
            <input id="remember" type="checkbox" className="mr-1 checked:bg-blue-600" /> <label htmlFor="remember" className="mr-auto text-xs font-semibold">Recordar por 30 días</label>
            <a href="#" className="text-xs font-semibold text-blue-600">¿Olvidaste tu contraseña?</a>
          </div>

          <div className="mb-3">
            <button className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">Iniciar sesión</button>
            <button className="flex items-center gap-2 flex-wrap justify-center w-full border border-blue-400 hover:bg-blue-400 hover:text-white px-2 py-1.5 rounded-md">
              <IoLogoGoogle />
              Iniciar sesión con Google
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-xs text-gray-400 font-semibold mr-2">¿No tienes una cuenta?</span>
          <Link href="/auth/registrar" className="text-xs font-semibold text-blue-600">Registrate aquí</Link>
        </div>
      </div>
    </div>
  );
}