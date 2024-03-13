import { listarAsignaciones } from "@/actions";
import { AddItemButton, Controls } from "@/components";
import ListadoAsignaciones from "@/components/list/asignaciones/ListadoAsignaciones";
import { APIResponse, AsignacionComputador } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Listado Asignaciones | App Soporte',
  description: 'Listado de asignaciones de equipos y dispositivos de la entidad'
};

export default async function ListadoAsignacionesPage() {
  const { data } = await listarAsignaciones() as APIResponse<AsignacionComputador[]>;
  
  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Asignaciones de equipos
      </h1>

      <ListadoAsignaciones 
        asignaciones={data || []}
      />

      <Controls returnLink='/'>
        <AddItemButton path="/asignaciones/crear" />
      </Controls>
    </div>
  );
}