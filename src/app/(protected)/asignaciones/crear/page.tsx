import { Controls, RegistrarAsignacionForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Asignación | App Soporte",
  description: "Crea una nueva asignación de equipo a un funcionario de la entidad.",
}

export default function CrearAsignacionPage() {
  return (
    <div>
      <div className="text-white">
        <h1 className="font-bold text-2xl">Asignar equipos</h1>
        <span className="text-sm mb-4 inline-block">
          Aquí podrás registrar una asignación de equipo a un funcionario de la entidad.
        </span>

        <RegistrarAsignacionForm />
      </div>
      <Controls returnLink={`/asignaciones`} />
    </div>
  );
}