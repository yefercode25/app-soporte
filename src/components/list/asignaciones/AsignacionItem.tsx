import { AsignacionComputador } from "@/types";
import Link from "next/link";
import { IoCreateOutline, IoDesktopOutline, IoEyeOutline, IoLocationOutline, IoPrintOutline, IoTrashOutline } from "react-icons/io5";
import { SiAnydesk } from "react-icons/si";

interface Props {
  asignacion: AsignacionComputador;
}

export const AsignacionItem = ({ asignacion }: Props) => {
  const { computer, id, location, printer, status, userCuid } = asignacion;

  return (
    <div className="px-3 py-4 bg-white text-gray-800 rounded-md overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="block w-full md:flex md:items-center md:justify-between">
          <div>
            <div className="flex flex-col-reverse gap-2">
              <h2 className="font-bold text-xl flex items-center gap-2">
                {userCuid.fullName}
              </h2>
              <div className="flex items-center gap-2">
                <p className={`text-xs capitalize px-2 py-[3px] text-white rounded-full ${status === 'vigente' ? 'bg-green-600' : 'bg-red-600'}`}>{status}</p>
              </div>
            </div>
            <div className="text-xs flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1 capitalize">
                <IoLocationOutline />
                <p>{location}</p>
              </div>
              <div className="flex items-center gap-1 capitalize">
                <IoDesktopOutline />
                <p>{`${computer.brand} ${computer.model} (${computer.serial})`}</p>
              </div>
              <div className="flex items-center gap-1 capitalize">
                <IoPrintOutline />
                <p>{!!printer ? `${printer.brand} ${printer.model} (${printer.serial})` : 'Sin impresora asignada'}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-between">
            <Link
              href={`/asignaciones/${id}`}
              className="bg-green-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-700 font-semibold"
            >
              <span><IoEyeOutline /></span>
            </Link>
            <Link
              href={`/asignaciones/${id}/editar`}
              className="bg-blue-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
            >
              <span><IoCreateOutline /></span>
            </Link>
            <Link
              href={`/asignaciones/${id}/eliminar`}
              className="bg-red-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-700 font-semibold"
            >
              <span><IoTrashOutline /></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}