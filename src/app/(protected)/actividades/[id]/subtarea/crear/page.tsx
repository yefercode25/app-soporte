import { obtenerActividad } from "@/actions";
import { Controls, RegistrarSubActividadForm } from "@/components";
import { PageProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear tarea | Actividades",
  description: "Crea una tarea para la actividad seleccionada",
};

export default async function CrearSubActividadPage({ params }: PageProps) {
  const id = params?.id ?? "";
  const { data } = await obtenerActividad(id);

  return (
    <div>
      <div className="text-gray-800">
        <h1 className="font-bold text-2xl mb-1">Crear tarea</h1>
        <span className="text-sm mb-4 block px-2 py-1 rounded-md bg-teal-600 text-white">
          <span className="font-semibold">Crea una tarea para la actividad: </span> {data?.title ?? "No se ha encontrado la actividad"}
        </span>
        <RegistrarSubActividadForm
          actividadId={id}
        />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}