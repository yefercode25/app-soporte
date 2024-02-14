'use client';

import { fechaFormateada, horaFormateada } from "@/utils/dates";
import { GrupoActividad } from "@/types";
import { IoBusinessOutline, IoCreateOutline, IoEyeOutline, IoPersonOutline, IoRefreshOutline, IoTrashOutline } from "react-icons/io5";
import Link from "next/link";

interface ActivitiesListProps {
  actividades: GrupoActividad[];
}

export const ActivitiesList = ({ actividades }: ActivitiesListProps) => {
  return (
    <div>
      {actividades.map((grupoActividad, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-gray-300 capitalize text-sm font-semibold mb-2">{fechaFormateada(grupoActividad.date)}</h2>
          <ul>
            {grupoActividad.activities.map((actividad) => (
              <li key={actividad.id} className="p-3 bg-white hover:bg-gray-100 transition-all rounded-md text-sm shadow mb-3 md:flex md:items-center justify-between gap-2 text-gray-800">
                <div>
                  <div className="inline-flex justify-between items-center gap-1">
                    <span className="text-[10px] bg-blue-600 font-semibold inline-block mb-2 px-2 rounded-full text-white">{horaFormateada(actividad.createdAt.toISOString())}</span>
                    <span className={`text-[10px] bg-blue-600 font-semibold inline-block mb-2 px-2 rounded-full text-white ${actividad?.completedAt?.toString() ? 'bg-green-600' : 'bg-orange-500'}`}>{actividad?.completedAt?.toString() ? 'Completada' : 'Pendiente'}</span>
                    <span className={`text-[10px] capitalize font-semibold inline-block mb-2 px-2 rounded-full text-white ${(actividad.priority == 'normal' || actividad.priority == 'baja') ? 'bg-green-500' : 'bg-red-600'}`}>{actividad.priority || 'No definida'}</span>
                  </div>
                  <h3 className="font-bold text-[16px] md:text-[18px] mb-1 truncate">{actividad.title}</h3>
                  <p className="text-gray-700 font-medium text-xs md:text-sm">{actividad.observation || 'Sin observación'}.</p>
                  <div className="mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <span className="flex items-center"><IoPersonOutline /></span>
                      <p className="ml-2">{actividad?.employee?.fullName || 'No definido'} ({actividad?.employee?.dependency || 'No definido'})</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 justify-between">
                  <Link
                    href={`/actividades/${actividad?.id}`}
                    className="bg-green-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-700 font-semibold"
                  >
                    <span><IoEyeOutline /></span>
                  </Link>
                  <Link
                    href={`/actividades/${actividad?.id}/editar`}
                    className="bg-blue-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
                  >
                    <span><IoCreateOutline /></span>
                  </Link>
                  <Link
                    href={`/actividades/${actividad?.id}/estado`}
                    className="bg-orange-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
                  >
                    <span><IoRefreshOutline /></span>
                  </Link>
                  <Link
                    href={`/actividades/${actividad?.id}/eliminar`}
                    className="bg-red-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-700 font-semibold"
                  >
                    <span><IoTrashOutline /></span>
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