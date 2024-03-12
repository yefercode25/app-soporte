import { AddItemButton, Controls } from "@/components";
import { decryptPassword } from "@/utils/crypto-pass";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Listado Asignaciones',
  description: 'Listado de asignaciones de equipos y dispositivos de la entidad'
};

export default function ListadoAsignacionesPage() {
  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Asignaciones de equipos
      </h1>

      <Controls returnLink='/'>
        <AddItemButton path="/asignaciones/crear" />
      </Controls>
    </div>
  );
}