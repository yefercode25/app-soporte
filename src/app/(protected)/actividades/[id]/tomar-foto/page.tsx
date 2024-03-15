import { obtenerActividad } from "@/actions";
import { TomarFotoForm } from "@/components";
import { APIResponse, Actividad, PageProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tomar Foto Actividad | App Soporte",
  description: "Toma una foto de la actividad para evidenciar su estado."
};

export default async function TomarFotoActividadPage({ params }: PageProps) {
  const { id } = params;
  const { data } = await obtenerActividad(id) as APIResponse<Actividad>;
  
  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1 flex flex-col-reverse md:flex-row items-start md:items-center gap-2">
        Tomar fotografía
        <span className="text-xs font-semibold inline-block px-2 py-[2px] bg-blue-600 text-white rounded-full">{data.title}</span>
      </h1>

      <TomarFotoForm 
        idActividad={id}
      />
    </div>
  );
}