'use client';

import { crearEquipoSchema } from '@/lib/yup-schemas';
import { CrearComputador } from '@/types';
import { CameraCapture, Input } from '@/components';
import { IoAlbumsOutline, IoBagRemoveOutline, IoHardwareChipOutline, IoLaptopOutline, IoLogoWindows, IoSparklesOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { CgSmartphoneRam } from 'react-icons/cg';
import { MdOutlineSdStorage } from 'react-icons/md';
import { FaComputer, FaRegKeyboard } from 'react-icons/fa6';
import { UploadApiResponse } from 'cloudinary';
import { insertarImagen } from '@/actions/imagenes';
import { insertarEquipo } from '@/actions/equipos';

export const RegistrarEquipoForm = () => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [listEnployees, setListEmployees] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [uploadingImage, setUploadingImage] = useState<UploadApiResponse | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CrearComputador>({
    resolver: yupResolver(crearEquipoSchema) as any,
  });

  const onSubmit = async (data: CrearComputador) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Registrando equipo',
      description: 'Se está intentando registrar el equipo, por favor espera un momento.'
    });

    try {
      let insertImage = null;
      if (uploadingImage) {
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

      const insertarComputador = await insertarEquipo(data);
      if (insertarComputador.statusCode === 201) {
        toaster({
          tipo: 'success',
          title: 'Registro exitoso',
          description: 'El nuevo equipo se ha registrado correctamente.'
        });
        reset();
        return router.push('/equipos');
      }

      return toaster({
        tipo: 'error',
        title: 'Error registro',
        description: 'No se ha podido registrar el nuevo equipo, intentalo nuevamente.'
      });
    } catch (_error: any) {
      console.error(_error);
      return toaster({
        tipo: 'error',
        title: 'Error registro',
        description: 'No se ha podido registrar el nuevo equipo, intentalo nuevamente.'
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
      <div className="mb-3">
        <CameraCapture 
          setUploadingImage={setUploadingImage}
        />
      </div>
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">Registrar equipo</button>
      </div>
    </form>
  )
}