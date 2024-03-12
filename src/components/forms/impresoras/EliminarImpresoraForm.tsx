'use client';

import { eliminarEquipo, eliminarImpresora } from "@/actions";
import { toaster } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string;
  imageId: string;
}

export const EliminarImpresoraForm = ({ id, imageId }: Props) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      setIsSendingData(true);
      toaster({
        tipo: 'loading',
        title: 'Eliminando impresora',
        description: 'Se está intentando eliminar la impresora'
      });

      const deletePrinter = await eliminarImpresora(id, imageId);
      if (deletePrinter.statusCode === 200) {
        toaster({
          title: "Impresora eliminada",
          description: deletePrinter.message,
          tipo: "success"
        });
        return router.push(`/impresoras`);
      }

      return toaster({
        title: "Error eliminación",
        description: deletePrinter.message,
        tipo: "error"
      });
    } catch (error) {
      toaster({
        title: "Error eliminación",
        description: "Ocurrió un error al intentar eliminar la impresora",
        tipo: "error"
      });
    } finally {
      setIsSendingData(false);
    }
  };

  const handleCancel = () => {
    router.push(`/impresoras`);
  };

  return (
    <div className="mt-4">
      <button onClick={handleDelete} type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-red-600 hover:bg-red-700 px-2 py-1.5 rounded-md">
        {isSendingData ? 'Eliminando...' : 'Eliminar impresora'}
      </button>
      <button className="bg-gray-600 mb-2 block w-full text-center text-white hover:bg-gray-700 px-2 py-1.5 rounded-md" onClick={handleCancel}>Cancelar</button>
    </div>
  )
}
