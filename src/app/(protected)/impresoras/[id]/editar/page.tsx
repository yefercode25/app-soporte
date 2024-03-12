import { obtenerImpresora } from "@/actions";
import { Controls, EditarImpresoraForm } from "@/components";
import { APIResponse, Impresora, PageProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Editar Impresora | App Soporte',
  description: 'Página para editar una impresora en el sistema.',
};

export default async function EditarImpresoraPage({ params }: PageProps) {
  const { id } = params;
  const { data: printer } = await obtenerImpresora(id) as APIResponse<Impresora>;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1 flex flex-col-reverse md:flex-row items-start md:items-center gap-2">
        Editar impresora
        <span className="text-xs font-semibold inline-block px-2 py-[2px] bg-blue-600 text-white rounded-full">{printer.brand} - {printer.model}</span>
      </h1>
      <span className="text-sm mb-4 inline-block">
        Si lo deseas, puedes editar la información de la impresora en el siguiente formulario.
      </span>

      <EditarImpresoraForm impresora={printer} />

      <Controls returnLink='/impresoras' />
    </div>
  );
}