'use client';

import { crearSubActivity } from '@/actions';
import { Input } from '@/components';
import { IoCalendarClearOutline, IoTicketOutline } from 'react-icons/io5';
import { RegistrarSubActividad } from '@/types';
import { registrarSubActividadSchema } from '@/lib/yup-schemas';
import { toaster } from '@/utils/toast';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

interface IProps {
  actividadId: string;
}

export const RegistrarSubActividadForm = ({ actividadId }: IProps) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<RegistrarSubActividad>({
    resolver: yupResolver(registrarSubActividadSchema)
  });

  useEffect(() => {
    setValue('activityId', actividadId);
  }, [actividadId, setValue]);

  const onSubmit = async (data: RegistrarSubActividad) => {
    try {
      toaster({
        tipo: 'loading',
        title: 'Registrando subactividad',
        description: 'Se está intentando registrar la nueva subactividad'
      });

      const create = await crearSubActivity(data);
      
      if(create.statusCode === 201) {
        reset();
        toaster({
          tipo: 'success',
          title: 'Registro exitoso',
          description: create.message
        });
        return router.push(`/actividades/${actividadId}`);
      }

      return toaster({
        tipo: 'success',
        title: 'Error al registrar',
        description: create.message
      });
    } catch (error) {
      toaster({ 
        tipo: 'error', 
        title: 'Error al crear la subtarea', 
        description: 'No se pudo crear el registro, intentalo nuevamente.',
      });
    }
  }

  return (
    <form
      className="mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Ejm. Revisar el correo electrónico de la empresa."
        title="Título de la tarea"
        type="text"
        id="title"
        icon={<IoTicketOutline />}
        {...register('title')}
        errors={errors}
      />
      <Input
        title="Fecha de creación"
        type="datetime-local"
        id="createdAt"
        icon={<IoCalendarClearOutline />}
        {...register('createdAt')}
        errors={errors}
      />
      <div className='mb-4 flex items-center gap-2'>
        <input
          id="remember"
          type="checkbox"
          className="mr-1 checked:bg-blue-600"
          {...register('isCompleted')}
        />
        <label htmlFor="remember" className="mr-auto">¿La tarea ya fué completada?</label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 block w-full"
      >
        Registrar subtarea
      </button>
    </form>
  )
}