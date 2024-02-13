'use client';

import { ActivityStatus, ActualizarEstadoActividad } from "@/types";
import { actualizarEstadoActividad } from '@/actions';
import { actualizarEstadoActividadSchema } from '@/lib/yup-schemas';
import { Controls, Input } from '@/components';
import { IoReceiptOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

interface ActualizarEstadoActividadProps {
  id: string;
  status: ActivityStatus;
}

export const ActualizarEstadoActividadForm = ({ id, status }: ActualizarEstadoActividadProps) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ActualizarEstadoActividad>({
    resolver: yupResolver(actualizarEstadoActividadSchema as any)
  });

  useEffect(() => {
    setValue('status', status);
  }, [status, setValue]);

  const onSubmit = async (data: ActualizarEstadoActividad) => {
    try {
      setIsSendingData(true);
      toaster({
        tipo: 'loading',
        title: 'Actializando actividad',
        description: 'Intentando realizar la actualización del estado de la actividad'
      });

      const updateStatus = await actualizarEstadoActividad(id, data.status);
      if (updateStatus.statusCode === 200) {
        reset();
        toaster({
          title: 'Estado actualizado',
          description: updateStatus.message,
          tipo: 'success'
        });
        return router.push(`/actividades/${id}`);
      }

      return toaster({
        title: 'Error actualizar estado',
        description: updateStatus.message,
        tipo: 'error'
      });
    } catch (error) {
      toaster({
        title: 'Error actualizar estado',
        description: 'Se ha producido un error al actualizar el estado de la actividad, intente nuevamente.',
        tipo: 'error'
      });
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
