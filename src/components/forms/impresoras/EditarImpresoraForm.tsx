'use client';

import { crearImpresoraSchema, editarImpresoraSchema } from '@/lib/yup-schemas';
import { CrearImpresora, EditarImpresora, Impresora } from '@/types';
import { CameraCapture, Input } from '@/components';
import { IoAlbumsOutline, IoBagRemoveOutline, IoPrintOutline, IoSparklesOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadApiResponse } from 'cloudinary';
import { actualizarImpresora, crearImpresora, deleteImageFromCloudinary, eliminarImagen, insertarImagen } from '@/actions';
import { IoIosWater } from 'react-icons/io';
import { ImPrinter } from 'react-icons/im';
import Image from 'next/image';

interface Props {
  impresora: Impresora;
}

export const EditarImpresoraForm = ({ impresora }: Props) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<UploadApiResponse | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EditarImpresora>({
    resolver: yupResolver(editarImpresoraSchema) as any,
  });

  useEffect(() => {
    setValue('id', impresora.id);
    setValue('brand', impresora.brand);
    setValue('model', impresora.model);
    setValue('serial', impresora.serial);
    setValue('inkDetails', impresora.inkDetails);
    setValue('type', impresora.type as any);
    setValue('status', impresora.status as any);
  }, [impresora, setValue]);

  const onSubmit = async (data: EditarImpresora) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Actualizando impresora',
      description: 'Se está intentando actualizar la impresora, por favor espera un momento.'
    });

    try {
      let insertImage = null;
      if (uploadingImage) {
        // Intentar eliminar la imagen actual del equipo
        if (impresora.imageRel?.id) {
          const deleteFromCloudinary = await deleteImageFromCloudinary(impresora.imageRel?.cloudinaryId || '');
          if (deleteFromCloudinary.statusCode !== 200) {
            await eliminarImagen(impresora.imageRel?.id as string);
          }
        }

        insertImage = await insertarImagen(uploadingImage as UploadApiResponse);
        if (insertImage.statusCode !== 201) {
          return toaster({
            tipo: 'error',
            title: 'Error registro imagen',
            description: 'No se ha podido registrar la imagen de la impresora, intentalo nuevamente.'
          });
        }
        data.imageId = insertImage.data?.id;
      }

      const updateImpresora = await actualizarImpresora(data);
      if (updateImpresora.statusCode === 200) {
        toaster({
          tipo: 'success',
          title: 'Actualización exitoso',
          description: 'Se ha actualizadp la impresora correctamente.'
        });
        reset();
        return router.push('/impresoras');
      }

      return toaster({
        tipo: 'error',
        title: 'Error registro',
        description: 'No se ha podido actualizar la nueva impresora, intentalo nuevamente.'
      });
    } catch (_error: any) {
      console.error(_error);
      return toaster({
        tipo: 'error',
        title: 'Error registro',
        description: 'No se ha podido actualizar la nueva impresora, intentalo nuevamente.'
      });
    } finally {
      setIsSendingData(false);
    }
  };

  return (
    <form
      className="mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Ejm. EPSON"
        title="Marca de la impresora"
        type="text"
        id="brand"
        icon={<IoBagRemoveOutline />}
        {...register('brand')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. L3150"
        title="Modelo"
        type="text"
        id="model"
        icon={<IoPrintOutline />}
        {...register('model')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. 5CG1234XZ"
        title="Número serial"
        type="text"
        id="serial"
        icon={<IoSparklesOutline />}
        {...register('serial')}
        errors={errors}
      />
      <Input
        title="Detalles de la tinta"
        type="text"
        id="inkDetails"
        icon={<IoIosWater />}
        {...register('inkDetails')}
        errors={errors}
        placeholder="Ejm. 4 colores"
      />
      <Input
        title="Tipo de impresora"
        type="select"
        id="type"
        icon={<ImPrinter />}
        {...register('type')}
        errors={errors}
        placeholder="Ejm. láser, inyección, matriz"
        selectOptions={[
          { value: 'laser', label: 'Láser' },
          { value: 'inyección', label: 'Inyección' },
          { value: 'matriz', label: 'Matriz' }
        ]}
      />
      <Input
        title="Estado"
        type="select"
        id="status"
        icon={<IoAlbumsOutline />}
        {...register('status')}
        errors={errors}
        placeholder="Ejm. activo, inactivo, en reparación"
        selectOptions={[
          { value: 'activo', label: 'Activo' },
          { value: 'inactivo', label: 'Inactivo' },
          { value: 'en reparación', label: 'En reparación' }
        ]}
      />
      <div className='mb-3'>
        <span className='block text-sm font-semibold mb-1'>Imagen del equipo</span>
        <div className='flex items-center gap-2'>
          {impresora.imageRel?.id ? (
            <div>
              <span className='text-xs text-gray-500 mb-2 block'>Esta es la imágen cargada actualmente.</span>
              <Image
                src={impresora.imageRel.secureUrl ?? '/img/placeholder.png'}
                alt={`Imagen de ${impresora.brand} ${impresora.model}`}
                width={400}
                height={200}
                className='rounded-md'
              />
            </div>
          ) : (
            <span className='text-xs text-gray-500'>Si lo deseas, puedes subir una imagen del equipo.</span>
          )}
        </div>
      </div>
      <div className="mb-3">
        <CameraCapture 
          setUploadingImage={setUploadingImage}
          uploadFolder='soporte-app/impresoras'
        />
      </div>
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Actualizando impresora...' : 'Actualizar impresora'}
        </button>
      </div>
    </form>
  )
}