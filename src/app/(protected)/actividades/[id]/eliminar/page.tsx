import { obtenerActividad } from "@/actions";
import { Controls, EliminarActividadForm } from "@/components";
import { PageProps } from "@/types";
import { notFound } from "next/navigation";

export default async function EliminarActividadPage({ params }: PageProps) {
  const id = params?.id ?? "";
  const { data } = await obtenerActividad(id);

  if(!data) {
    throw notFound();
  }

  return (
    <div>
      <div className="text-gray-800">
        <h1 className="font-bold text-2xl mb-1">Eliminar tarea</h1>
        <p className="mt-2 text-red-500 font-medium">Si eliminas la actividad, se perderá toda la información relacionada con ella.</p>
        <h3 className="mt-4">¿Estás seguro de que deseas eliminar la actividad {`"${data?.title?.trim()}"`}?</h3>

        <EliminarActividadForm id={id} />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}