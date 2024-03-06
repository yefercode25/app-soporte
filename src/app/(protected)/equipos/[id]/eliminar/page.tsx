import { obtenerEquipo } from "@/actions";
import { Controls, EliminarEquipoForm } from "@/components";
import { APIResponse, Equipo, PageProps } from "@/types";

export default async function EliminarEquipoPage({ params }: PageProps) {
  const { id } = params;
  const { data: computer } = await obtenerEquipo(id) as APIResponse<Equipo>;

  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl mb-1">Eliminar equipo</h1>
        <p className="mt-2 text-red-500 font-medium">Si eliminas el equipo, se perderá toda la información relacionada con él.</p>
        <h3 className="mt-4">¿Estás seguro de que deseas eliminar el equipo <span className="font-bold">{`${computer.brand} - ${computer.model}`}</span>?</h3>

        <EliminarEquipoForm 
          id={id} 
          imageId={computer.imageRel?.id || ''}
        />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}