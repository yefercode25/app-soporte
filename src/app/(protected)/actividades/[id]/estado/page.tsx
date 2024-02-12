import { obtenerActividad } from "@/actions";
import { ActualizarEstadoActividadForm, Controls } from "@/components";
import { PageProps } from "@/types";

export default async function EstadoActividadPage({ params }: PageProps) {
  const id = params?.id ?? "";
  const { data } = await obtenerActividad(id);

  return (
    <div>
      <div className="text-gray-800">
        <h1 className="font-bold text-2xl mb-1">Actualizar estado de tarea</h1>
        <span className="text-sm mb-4 block px-2 py-1 rounded-md bg-teal-600 text-white">
          <span className="font-semibold">Cambia el estado de la actividad: </span> {data?.title ?? "No se ha encontrado la actividad"}
        </span>
        <ActualizarEstadoActividadForm id={id} status={data?.status} />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}