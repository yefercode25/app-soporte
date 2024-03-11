import { AddItemButton, Controls } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listado Impresoras | App Soporte",
  description: "Visualiza el listado de impresoras disponibles en la entidad.",
};

export default function ListadoImpresorasPage() {
  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Impresoras registradas
      </h1>

      

      <Controls returnLink='/'>
        <AddItemButton path="/impresoras/crear" />
      </Controls>
    </div>
  );
}