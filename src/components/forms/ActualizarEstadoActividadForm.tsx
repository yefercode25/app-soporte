'use client';

import * as yup from 'yup';
import { ActivityStatus } from "@/types";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Controls, Input } from '@/components';
import { IoReceiptOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { actualizarEstadoActividad } from '@/actions';
import { toastAlert } from '@/utils/toastAlert';
import { useRouter } from 'next/navigation';

interface ActualizarEstadoActividadProps {
  id: string;
  status: ActivityStatus;
}

interface IActualizarEstadoActividad {
  status: ActivityStatus;
}

const actualizarEstadoActividadSchema = yup.object().shape({
  status: yup.string()
    .required('El estado es obligatorio')
    .oneOf(['pendiente', 'en progreso', 'completada', 'pospueta'], 'El estado no es válido')
});

export const ActualizarEstadoActividadForm = ({ id, status }: ActualizarEstadoActividadProps) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<IActualizarEstadoActividad>({
    resolver: yupResolver(actualizarEstadoActividadSchema as any)
  });

  useEffect(() => {
    setValue('status', status);
  }, [status, setValue]);

  const onSubmit = async (data: IActualizarEstadoActividad) => {
    try {
      setIsSendingData(true);

      const updateStatus = await actualizarEstadoActividad(id, data.status);
      if(updateStatus.statusCode === 200) {
        reset();
        toastAlert({ title: 'Estado actualizado', description: updateStatus.message, tipo: 'success' });
        return router.push(`/actividades/${id}`);
      }

      return toastAlert({ title: 'Error actualizar estado', description: updateStatus.message, tipo: 'error' });
    } catch (error) {
      toastAlert({ title: 'Error actualizar estado', description: 'Se ha producido un error al actualizar el estado de la actividad, intente nuevamente.', tipo: 'error' });
    } finally {
      setIsSendingData(false);
    }
  }

  return (
    <div>
      <form
        className="mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          title="Estado"
          type="select"
          id="dependency"
          icon={<IoReceiptOutline />}
          {...register('status')}
          errors={errors}
          placeholder="Selecciona un estado"
          selectOptions={[
            { value: 'pendiente', label: 'Pendiente' },
            { value: 'en progreso', label: 'En progreso' },
            { value: 'completada', label: 'Completada' },
            { value: 'pospueta', label: 'Pospueta' }
          ]}
        />
        <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Enviando...' : 'Actualizar estado'}
        </button>
      </div>
      </form>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  )
}
