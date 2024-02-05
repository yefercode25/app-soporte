import Link from "next/link";
import { IoHomeOutline, IoDocumentTextOutline, IoExitOutline, IoConstructOutline, IoApps, IoTicketOutline, IoPersonAddOutline, IoDesktopOutline, IoGlobeOutline } from "react-icons/io5"
import { SidebarLink } from ".";

const generalMenuItems = [
  { titulo: 'Inicio', icono: <IoHomeOutline />, ruta: '/' },
  { titulo: 'Actividades', icono: <IoTicketOutline />, ruta: '/actividades' },
  { titulo: 'Funcionarios', icono: <IoPersonAddOutline />, ruta: '/funcionarios' },
  { titulo: 'Equipos', icono: <IoDesktopOutline />, ruta: '/equipos' },
  { titulo: 'Red', icono: <IoGlobeOutline />, ruta: '/equipos' },
]

const categoriesMenuItems = [
  {
    categoria: 'Utilidades',
    items: [
      { titulo: 'Reportes', icono: <IoDocumentTextOutline />, ruta: '/actividades/reportes' },
    ]
  },
  {
    categoria: 'Configuración',
    items: [
      { titulo: 'Cuenta', icono: <IoConstructOutline />, ruta: '/actividades/cuenta' },
      { titulo: 'Cerrar sesión', icono: <IoExitOutline />, ruta: '/auth/cerrar-sesion' },
    ]
  }
];

export const SidebarLinks = () => {
  return (
    <>
      <div className="relative border-b border-white/20">
        <Link className="flex items-center gap-4 py-6 px-8" href="/">
          <h2 className="antialiased tracking-normal leading-relaxed text-white font-bold text-xl">App Soporte</h2>
        </Link>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {generalMenuItems.map((item, index) => (
            <SidebarLink key={index} {...item} />
          ))}
        </ul>
        {categoriesMenuItems.map((category, index) => (
          <ul className="mb-4 flex flex-col gap-1" key={index}>
            <li className="mx-3.5 mt-4 mb-2">
              <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">{category.categoria}</p>
            </li>
            {category.items.map((item, index) => (
              <SidebarLink key={index} {...item} />
            ))}
          </ul>
        ))}
      </div>
    </>
  )
}