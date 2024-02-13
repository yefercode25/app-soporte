import { RegistrarFuncionarioForm } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Crear funcionario | App Soporte',
  description: 'Crea una nueva actividad para llevar un control de tus tareas diarias.',
};

export default function CrearActividadPage() {
  return (
    <div className="text-gray-800">
      <h1 className="font-bold text-2xl">Crear nuevo funcionario</h1>
      <span className="text-sm mb-4 inline-block">
        Ingresa la información solicitada para crear un nuevo funcionario asociado a la entidad.
      </span>
      <RegistrarFuncionarioForm />
    </div>
  );
}