import { Controls, RegistrarActividadForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Crear actividad | App Soporte',
  description: 'Crea una nueva actividad para llevar un control de tus tareas diarias.',
};

export default function CrearActividadPage() {
  return (
    <div>
      <div className="text-white">
        <h1 className="font-bold text-2xl">Crear nueva actividad</h1>
        <span className="text-sm mb-4 inline-block">
          Aquí podrás crear una nueva actividad para llevar un control de tus tareas diarias.
        </span>
        <RegistrarActividadForm />
      </div>
      <Controls returnLink={`/actividades`} />
    </div>
  );
}