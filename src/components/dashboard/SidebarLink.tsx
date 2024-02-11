'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  titulo: string;
  icono: React.ReactNode;
  ruta: string;
}

export const SidebarLink = ({ icono, ruta, titulo }: Props) => {
  const pathname = usePathname();
  let isActive = pathname === ruta;
  if (pathname.includes(ruta) && ruta !== '/') {
    isActive = true;
  }

  return (
    <li>
      <Link
        href={ruta}
        className={`middle center transition-all disabled:opacity-50 disabled:pointer-events-none py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize ${isActive ? 'bg-blue-600' : ''} hover:bg-blue-500`}
      >
        <span className="text-xl">
          {icono}
        </span>
        <p className="block antialiased text-base leading-relaxed text-inherit font-semibold capitalize">
          {titulo}
        </p>

      </Link>
    </li>
  )
}