import { listarImpresoras } from "@/actions";
import { AddItemButton, Controls, ListadoImpresoras } from "@/components";
import { APIResponse, Impresora } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Listado Impresoras | App Soporte",
  description: "Visualiza el listado de impresoras disponibles en la entidad.",
};

export default async function ListadoImpresorasPage() {
  const impresoras = await listarImpresoras() as APIResponse<Impresora[]>;
  const impresorasData: Impresora[] = impresoras.data as any as Impresora[] || [];

  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Impresoras registradas
      </h1>

      <ListadoImpresoras impresoras={impresorasData} />

      <Controls returnLink='/'>
        <AddItemButton path="/impresoras/crear" />
      </Controls>
    </div>
  );
}