'use client';

import { GrupoActividad } from "@/types";
import { fechaFormateada, horaFormateada } from "@/utils/dates";
import Link from "next/link";
import { IoBusinessOutline, IoEyeOutline, IoPencil, IoPersonOutline, IoTrashOutline } from "react-icons/io5";

interface ActivitiesListProps {
  actividades: GrupoActividad[];
}

export const ActivitiesList = ({ actividades }: ActivitiesListProps) => {
  return (
    <div>
      {actividades.map((grupoActividad, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-gray-800 capitalize text-xl font-bold mb-2">{fechaFormateada(grupoActividad.date)}</h2>
          <ul>
            {grupoActividad.activities.map((actividad) => (
              <li key={actividad.id} className="p-3 bg-blue-50 hover:bg-blue-100 transition-all rounded-md text-sm shadow mb-3 md:flex md:items-center justify-between gap-2">
                <div>
                  <div className="flex justify-between items-center mb-2 px-2 py-1 rounded-full bg-white">
                    <span className="text-[10px] text-blue-600 font-semibold inline-block px-4 py-[2px] rounded-full">{horaFormateada(actividad.createdAt.toISOString())}</span>
                    <span className={`text-[10px] text-blue-600 font-semibold inline-block px-4 py-[2px] rounded-full ${actividad?.completedAt?.toString() ? 'text-green-600' : 'text-orange-500'}`}>{actividad?.completedAt?.toString() ? 'Completada' : 'Pendiente'}</span>
                    <span className={`text-[10px] capitalize font-semibold inline-block px-4 py-[2px] rounded-full ${(actividad.priority == 'normal' || actividad.priority == 'baja') ? 'text-green-500' : 'text-red-600'}`}>{actividad.priority || 'No definida'}</span>
                  </div>
                  <h3 className="font-bold text-[18px] mb-1">{actividad.title}</h3>
                  <p className="text-gray-500 font-medium">{actividad.observation || 'Sin observación'}</p>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="flex items-center"><IoPersonOutline /></span>
                      <p className="ml-2"><span className="font-semibold">Solicitado por: </span> {actividad?.employee?.fullName || 'No definido'}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="flex items-center"><IoBusinessOutline /></span>
                      <p className="ml-2"><span className="font-semibold">Ubicado en: </span> {actividad?.employee?.dependency || 'No definido'}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-1 justify-between">
                  <Link
                    href={`/actividades/${actividad?.id}`}
                    className="bg-green-600 text-white inline-flex items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-700 font-semibold"
                  >
                    <span><IoEyeOutline /></span>
                    <span>Detalles</span>
                  </Link>
                  <Link
                    href={`/actividades/${actividad?.id}/editar`}
                    className="bg-blue-600 text-white inline-flex items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
                  >
                    <span><IoPencil /></span>
                    <span>Editar</span>
                  </Link>
                  <Link
                    href={`/actividades/${actividad?.id}/eliminar`}
                    className="bg-red-600 text-white inline-flex items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-700 font-semibold"
                  >
                    <span><IoTrashOutline /></span>
                    <span>Eliminar</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}