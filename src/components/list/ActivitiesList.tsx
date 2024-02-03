'use client';

import { listarActividades } from "@/actions";
import { APIResponse, ListadoActividades, Actividad, GrupoActividad } from "@/types";
import { fechaFormateada, horaFormateada } from "@/utils/dates";
import { toastAlert } from "@/utils/toastAlert";
import { useEffect, useState } from "react";
import { IoBusinessOutline, IoPersonOutline } from "react-icons/io5";

export const ActivitiesList = () => {
  const [actividades, setActividades] = useState<GrupoActividad[]>([]);

  useEffect(() => {
    const getListActividades = async () => {
      try {
        const listado: APIResponse<ListadoActividades> = await listarActividades({}) as APIResponse<ListadoActividades>;
        if (listado.data) {
          setActividades(listado.data.actividades);
        }
      } catch (error) {
        toastAlert({
          tipo: 'error',
          title: 'Error al cargar actividades',
          description: 'Ocurrió un error al cargar las actividades, por favor intenta nuevamente.',
        });
      }
    };

    getListActividades();
  }, []);



  return (
    <div>
      {actividades.map((grupoActividad, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-gray-800 capitalize text-xl font-bold mb-2">{fechaFormateada(grupoActividad.date)}</h2>
          <ul>
            {grupoActividad.activities.map((actividad) => (
              <li key={actividad.id} className="p-3 bg-blue-50 rounded-md text-sm shadow mb-2">
                <div className="flex justify-between items-center mb-2 px-2 py-1 rounded-full bg-white">
                  <span className="text-[10px] bg-blue-600 text-white inline-block px-4 py-[2px] rounded-full">{horaFormateada(actividad.createdAt.toISOString())}</span>
                  <span className={`text-[10px] capitalize text-white inline-block px-4 py-[2px] rounded-full ${(actividad.priority == 'normal' || actividad.priority == 'baja') ? 'bg-green-500' : 'bg-red-600'}`}>{actividad.priority || 'No definida'}</span>
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
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}