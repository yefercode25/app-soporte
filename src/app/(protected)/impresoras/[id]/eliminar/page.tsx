import { obtenerImpresora } from "@/actions";
import { Controls, EliminarImpresoraForm } from "@/components";
import { APIResponse, Impresora, PageProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eliminar Impresora | App Soporte",
  description: "Si estás seguro de eliminar una impresora, hazlo aquí.",
};

export default async function EliminarImpresoraPage({ params }: PageProps) {
  const { id } = params;
  const { data: print } = await obtenerImpresora(id) as APIResponse<Impresora>;
  
  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl mb-1">Eliminar impresora</h1>
        <p className="mt-2 text-red-500 font-medium">Si eliminas la impresora, se perderá toda la información relacionada con ella.</p>
        <h3 className="mt-4">¿Estás seguro de que deseas eliminar la impresora <span className="font-bold">{`${print.brand} - ${print.model}`}</span>?</h3>

        <EliminarImpresoraForm 
          id={id} 
          imageId={print.imageRel?.id || ''}
        />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}