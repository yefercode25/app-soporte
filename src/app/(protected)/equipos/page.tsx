import { AddItemButton, Controls } from "@/components";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado Equipos | Soporte App',
  description: 'Visualiza todos los equipos registrados en la aplicación.',
};

export default function ListadoEquiposPage() {
  return (
    <div>
      <h1>Hello Page</h1>
      <Controls>
        <AddItemButton path="/equipos/crear" />
      </Controls>
    </div>
  );
}