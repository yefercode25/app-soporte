import { Controls, EditarEquipoForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Registrar equipo | AppSoporte',
  description: 'Registra un nuevo equipo para llevar un control y seguimiento de los mismos.'
}; 

export default function CrearEquipoPage() {
  return (
    <div>
      <div className="text-white">
        <h1 className="font-bold text-2xl">Registro de equipos</h1>
        <span className="text-sm mb-4 inline-block">
          Aquí podrás registrar un nuevo equipo para llevar un control y seguimiento de los mismos.
        </span>
        <EditarEquipoForm />
      </div>
      <Controls returnLink={`/equipos`} />
    </div>
  );
}