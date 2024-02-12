import Image from "next/image";
import Link from "next/link";
import { listarSubActivities, obtenerActividad } from "@/actions";
import { APIResponse, Actividad, PageProps } from "@/types";
import { fechaFormateada } from "@/utils/dates";
import { notFound } from "next/navigation";
import { IoBusinessOutline, IoCalendarOutline, IoDuplicateOutline, IoPersonOutline, IoRefreshOutline } from "react-icons/io5";
import { Controls, SubActivyItem } from "@/components";

export default async function VerActividadPage({ params }: PageProps) {
  const id = params?.id ?? "";
  const apiResponse: APIResponse<Actividad> = await obtenerActividad(id);

  if (apiResponse.statusCode === 404) {
    throw notFound();
  }

  const getSubActividades = await listarSubActivities(id);

  const actividad = apiResponse.data;
  const subActividades = getSubActividades.data;

  return (
    <div>
      <div className="flex flex-col items-start gap-2">
        <span
          className={`text-xs ${actividad.status === 'pendiente' ? 'bg-red-600' : (actividad.status === 'en progreso') ? 'bg-orange-600' : (actividad.status === 'completada') ? 'bg-green-600' : 'bg-blue-600'} text-white px-3 py-1 rounded-full`}
        >
          <span className="font-bold">Estado: </span> {actividad?.status}
        </span>
        {actividad.status !== 'completada' && !!actividad?.posponedAt && (
          <span
            className={`text-xs ${actividad.priority === 'alta' ? 'bg-red-600' : 'bg-blue-600'} text-white px-3 py-1 rounded-full`}
          >
            <span className="font-bold">Prioridad: </span> {actividad?.priority || 'No definido'}
          </span>
        )}
        {actividad.status !== 'completada' && (
          <span
            className={`text-xs ${actividad.priority === 'alta' ? 'bg-red-600' : 'bg-blue-600'} text-white px-3 py-1 rounded-full`}
          >
            <span className="font-bold">Prioridad: </span> {actividad?.priority || 'No definido'}
          </span>
        )}
        {actividad.status === 'completada' && (
          <span
            className={`text-xs bg-green-600 text-white px-3 py-1 rounded-full`}
          >
            <span className="font-bold">Completada el: </span> {fechaFormateada(actividad.createdAt.toISOString())}
          </span>
        )}
        <h1 className="text-2xl font-extrabold text-gray-800"> {actividad.title}</h1>
      </div>
      <p className="font-medium mt-2 text-gray-500">{actividad?.observation || 'Sin observaciones'}</p>
      <div className="mt-2">
        <div className="flex items-center text-sm px-2 py-1 bg-cyan-600 text-white mb-1 rounded-md">
          <span className="flex items-center"><IoCalendarOutline /></span>
          <p className="ml-2"><span className="font-semibold">Creada el: </span> {fechaFormateada(actividad.createdAt.toISOString())}</p>
        </div>
        <div className="flex items-center text-sm px-2 py-1 bg-cyan-600 text-white mb-1 rounded-md">
          <span className="flex items-center"><IoPersonOutline /></span>
          <p className="ml-2"><span className="font-semibold">Solicitado por: </span> {actividad?.employee?.fullName || 'No definido'}</p>
        </div>
        <div className="flex items-center text-sm px-2 py-1 bg-cyan-600 text-white mb-1 rounded-md">
          <span className="flex items-center"><IoBusinessOutline /></span>
          <p className="ml-2"><span className="font-semibold">Ubicado en: </span> {actividad?.employee?.dependency || 'No definido'}</p>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Tareas asociadas</h2>
          <span className="bg-blue-600 font-semibold px-2 py-1 rounded-full text-white text-xs">{(subActividades)?.length || 0} registradas</span>
        </div>

        <div className="mt-4 rounded-md shadow bg-gray-50 px-2 py-2">
          {subActividades.length > 0 ? (
            <div className="mt-2">
              {subActividades.map((subActividad: any) => (
                <SubActivyItem
                  key={subActividad.id}
                  {...subActividad}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center">
              <Image src="/img/empty.svg" alt="No hay tareas asociadas" width={250} height={250} />
              <p className="mt-3 font-semibold text-xl">No hay tareas asociadas</p>
            </div>
          )}
        </div>
      </div>

      <Controls returnLink="/actividades">
        <Link href={`/actividades/${id}/estado`} className="bg-orange-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
          <IoRefreshOutline />
        </Link>
        <Link href={`/actividades/${id}/subtarea/crear`} className="bg-blue-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
          <IoDuplicateOutline />
        </Link>
      </Controls>
    </div>
  );
}