'use client';

import { eliminarActividad } from "@/actions";
import { toastAlert } from "@/utils/toastAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteTareaFormProps {
  id: string;
}

export const DeleteTareaForm = ({ id }: DeleteTareaFormProps) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsSendingData(true);
      const deleteActivity = await eliminarActividad(id);
      if(deleteActivity.statusCode === 200) {
        toastAlert({ title: "Actividad eliminada", description: deleteActivity.message, tipo: "success" });
        return router.push(`/actividades`);
      }

      return toastAlert({ title: "Error", description: deleteActivity.message, tipo: "error" });
    } catch (error) {
      toastAlert({ title: "Error", description: "Ocurrió un error al eliminar la actividad", tipo: "error" })
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
