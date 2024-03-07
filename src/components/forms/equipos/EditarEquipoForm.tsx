'use client';

import { editarEquipoSchema } from '@/lib/yup-schemas';
import { EditarComputador, Equipo } from '@/types';
import { CameraCapture, Input } from '@/components';
import { IoAlbumsOutline, IoBagRemoveOutline, IoHardwareChipOutline, IoLaptopOutline, IoLogoWindows, IoSparklesOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CgSmartphoneRam } from 'react-icons/cg';
import { MdOutlineSdStorage } from 'react-icons/md';
import { FaComputer, FaRegKeyboard } from 'react-icons/fa6';
import { UploadApiResponse } from 'cloudinary';
import { actualizarEquipo } from '@/actions/equipos';
import Image from 'next/image';
import { deleteImageFromCloudinary, eliminarImagen, insertarImagen } from '@/actions';

interface Props {
  equipo: Equipo;
}

export const EditarEquipoForm = ({ equipo }: Props) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<UploadApiResponse | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EditarComputador>({
    resolver: yupResolver(editarEquipoSchema) as any,
  });

  useEffect(() => {
    setValue('id', equipo.id);
    setValue('brand', equipo.brand);
    setValue('model', equipo.model);
    setValue('serial', equipo.serial);
    setValue('processor', equipo.processor);
    setValue('ram', equipo.ram);
    setValue('storage', equipo.storage);
    setValue('os', equipo.os);
    setValue('peripherals', equipo.peripherals.join(', ') || '');
    setValue('type', equipo.type as any);
    setValue('status', equipo.status as any);
  }, [equipo, setValue]);

  const onSubmit = async (data: EditarComputador) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Actualizando equipo',
      description: 'Se está intentando actualizar el equipo, por favor espera un momento.'
    });

    try {
      let insertImage = null;
      if (uploadingImage) {
        // Intentar eliminar la imagen actual del equipo
        if (equipo.imageRel?.id) {
          const deleteFromCloudinary = await deleteImageFromCloudinary(equipo.imageRel?.cloudinaryId || '');
          if (deleteFromCloudinary.statusCode !== 200) {
            await eliminarImagen(equipo.imageRel?.id as string);
          }
        }

        insertImage = await insertarImagen(uploadingImage as UploadApiResponse);
        if (insertImage.statusCode !== 201) {
          return toaster({
            tipo: 'error',
            title: 'Error registro imagen',
            description: 'No se ha podido registrar la imagen del equipo, intentalo nuevamente.'
          });
        }
        data.imageId = insertImage.data?.id;
      }

      const updateEquipo = await actualizarEquipo(data);
      if (updateEquipo.statusCode === 200) {
        toaster({
          tipo: 'success',
          title: 'Equipo actualizado',
          description: 'El equipo se ha actualizado correctamente.'
        });
        reset();
        return router.push('/equipos');
      }

      return toaster({
        tipo: 'error',
        title: 'Error actualización',
        description: 'No se ha podido registrar el nuevo equipo, intentalo nuevamente.'
      });
    } catch (_error: any) {
      return toaster({
        tipo: 'error',
        title: 'Error actualización',
        description: 'Se ha producido un error al intentar actualizar el equipo, intentalo nuevamente.'
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
        placeholder="Ejm. Hewlett Packard"
        title="Marca del equipo"
        type="text"
        id="brand"
        icon={<IoBagRemoveOutline />}
        {...register('brand')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. HP Pavilion 15-cs3000la"
        title="Modelo"
        type="text"
        id="model"
        icon={<IoLaptopOutline />}
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
        title="Procesador"
        type="text"
        id="processor"
        icon={<IoHardwareChipOutline />}
        {...register('processor')}
        errors={errors}
        placeholder="Ejm. Intel Core i5-1035G1"
      />
      <Input
        title="Memoria RAM (GB)"
        type="number"
        id="ram"
        icon={<CgSmartphoneRam />}
        {...register('ram')}
        errors={errors}
        placeholder="Ejm. 8"
      />
      <Input
        title="Almacenamiento (GB)"
        type="number"
        id="storage"
        icon={<MdOutlineSdStorage />}
        {...register('storage')}
        errors={errors}
        placeholder="Ejm. 512"
      />
      <Input
        title="Sistema operativo"
        type="text"
        id="os"
        icon={<IoLogoWindows />}
        {...register('os')}
        errors={errors}
        placeholder="Ejm. Windows 10 Pro 64 bits"
      />
      <Input
        title="Periféricos (Separados por comas)"
        type="text"
        id="peripherals"
        icon={<FaRegKeyboard />}
        {...register('peripherals')}
        errors={errors}
        placeholder="Ejm. Mouse, teclado, monitor"
      />
      <Input
        title="Tipo de equipo"
        type="select"
        id="type"
        icon={<FaComputer />}
        {...register('type')}
        errors={errors}
        placeholder="Ejm. laptop, desktop, server"
        selectOptions={[
          { value: 'laptop', label: 'Laptop' },
          { value: 'desktop', label: 'Desktop' },
          { value: 'server', label: 'Server' }
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
          {equipo.imageRel?.id ? (
            <div>
              <span className='text-xs text-gray-500 mb-2 block'>Esta es la imágen cargada actualmente.</span>
              <Image
                src={equipo.imageRel.secureUrl ?? '/img/placeholder.png'}
                alt={`Imagen de ${equipo.brand} ${equipo.model}`}
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
        />
      </div>
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Actualizando equipo...' : 'Actualizar equipo'}
        </button>
      </div>
    </form>
  )
}