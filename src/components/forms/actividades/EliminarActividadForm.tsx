'use client';

import { eliminarActividad } from "@/actions";
import { toaster } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteTareaFormProps {
  id: string;
}

export const EliminarActividadForm = ({ id }: DeleteTareaFormProps) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsSendingData(true);
      toaster({
        tipo: 'loading',
        title: 'Eliminando actividad',
        description: 'Se está intentando eliminar la actividad'
      });

      const deleteActivity = await eliminarActividad(id);
      if (deleteActivity.statusCode === 200) {
        toaster({
          title: "Actividad eliminada",
          description: deleteActivity.message,
          tipo: "success"
        });
        return router.push(`/actividades`);
      }

      return toaster({
        title: "Error eliminación",
        description: deleteActivity.message,
        tipo: "error"
      });
    } catch (error) {
      toaster({
        title: "Error eliminación",
        description: "Ocurrió un error al intentar eliminar la actividad",
        tipo: "error"
      });
    } finally {
      setIsSendingData(false);
    }
  };

  const handleCancel = () => {
    router.push(`/actividades`);
  };

  return (
    <div className="mt-4">
      <button onClick={handleDelete} type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-red-600 hover:bg-red-700 px-2 py-1.5 rounded-md">
        {isSendingData ? 'Eliminando...' : 'Eliminar tarea'}
      </button>
      <button className="bg-gray-600 mb-2 block w-full text-center text-white hover:bg-gray-700 px-2 py-1.5 rounded-md" onClick={handleCancel}>Cancelar</button>
    </div>
  )
}
