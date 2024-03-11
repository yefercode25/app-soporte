import { Controls, RegistrarImpresoraForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar Impresora | App Soporte",
  description: "Llena el formulario para registrar una nueva impresora."
};

export default function CrearImpresoraPage() {
  return (
    <div>
      <div className="text-white">
        <h1 className="font-bold text-2xl">Registro de impresoras</h1>
        <span className="text-sm mb-4 inline-block">
          Aquí podrás registrar una nueva impresora para llevar un control y seguimiento de las mismas.
        </span>

        <RegistrarImpresoraForm />
      </div>
      <Controls returnLink={`/equipos`} />
    </div>
  );
}