import { listarEquipos } from "@/actions/equipos";
import { AddItemButton, Controls, ListadoEquipos } from "@/components";
import { APIResponse, Equipo } from "@/types";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado Equipos | Soporte App',
  description: 'Visualiza todos los equipos registrados en la aplicación.',
};

export default async function ListadoEquiposPage() {
  const listadoEquipos = await listarEquipos() as APIResponse<Equipo>;
  const equipos: Equipo[] = listadoEquipos.data as any as Equipo[];

  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Equipos registrados
      </h1>

      <ListadoEquipos equipos={equipos} />

      <Controls returnLink='/'>
        <AddItemButton path="/equipos/crear" />
      </Controls>
    </div>
  );
}