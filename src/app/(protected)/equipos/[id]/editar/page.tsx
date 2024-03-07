import { obtenerEquipo } from "@/actions";
import { Controls, EditarEquipoForm } from "@/components";
import { APIResponse, Equipo, PageProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Equipo | Soporte App",
  description: "Actualiza la información de un equipo",
};

export default async function EditarEquipoPage({ params }: PageProps) {
  const { id } = params;
  const { data: computer } = await obtenerEquipo(id) as APIResponse<Equipo>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1 flex flex-col-reverse md:flex-row items-start md:items-center gap-2">
        Editar equipo
        <span className="text-xs font-semibold inline-block px-2 py-[2px] bg-blue-600 text-white rounded-full">{computer.brand} - {computer.model}</span>
      </h1>
      <span className="text-sm mb-4 inline-block">
        Si lo deseas, puedes editar la información de esta actividad y guardar los cambios.
      </span>

      <EditarEquipoForm equipo={computer} />

      <Controls returnLink='/equipos' />
    </div>
  );
}