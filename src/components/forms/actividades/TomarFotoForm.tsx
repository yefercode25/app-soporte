'use client';

import { insertarImagen, tomarFoto } from "@/actions";
import { CameraCapture } from "@/components";
import { toaster } from "@/utils/toast";
import { UploadApiResponse } from "cloudinary";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  idActividad: string;
}

export const TomarFotoForm = ({ idActividad }: Props) => {
  const router = useRouter();

  const [uploadingImage, setUploadingImage] = useState<UploadApiResponse | null>(null);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsSendingData(true);

    if (!uploadingImage?.public_id) {
      return toaster({
        tipo: 'error',
        title: 'Error al subir imagen',
        description: 'No se ha podido subir la imagen, por favor intenta de nuevo.'
      });
    }

    try {
      let insertImage = await insertarImagen(uploadingImage as UploadApiResponse);
      if (insertImage.statusCode !== 201) {
        return toaster({
          tipo: 'error',
          title: 'Error registro imagen',
          description: 'No se ha podido registrar la imagen del equipo, intentalo nuevamente.'
        });
      }

      const { data, statusCode } = await tomarFoto(idActividad, insertImage.data.id);
      if (statusCode !== 201) {
        console.error(data);
        return toaster({
          tipo: 'error',
          title: 'Error al tomar foto',
          description: 'No se ha podido tomar la foto de la actividad, por favor intenta de nuevo.'
        });
      }

      toaster({
        tipo: 'success',
        title: 'Foto tomada',
        description: 'Se ha tomado la foto de la actividad correctamente.'
      });

      router.push(`/actividades/${idActividad}`);
    } catch (error: any) {
      return toaster({
        tipo: 'error',
        title: 'Error al subir imagen',
        description: 'No se ha podido subir la imagen de la actividad, por favor intenta de nuevo.'
      });
    } finally {
      setIsSendingData(false);
    }
  };

  return (
    <form
      className="mt-4"
      onSubmit={onSubmit}
    >
      <div className="mb-3">
        <CameraCapture
          setUploadingImage={setUploadingImage}
          uploadFolder="soporte-app/actividades"
        />
      </div>
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">Registrar equipo</button>
      </div>
    </form>
  )
}
