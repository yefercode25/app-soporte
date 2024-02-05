'use client';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Input } from '@/components';
import { IoCalendarClearOutline, IoTicketOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import { toastAlert } from '@/utils/toastAlert';
import { crearSubActivity } from '@/actions';
import { useRouter } from 'next/navigation';

interface IProps {
  actividadId: string;
}

interface IGestionarSubtarea {
  title: string;
  createdAt: string;
  isCompleted: boolean;
  activityId: string;
}

const subTareaSchema = yup.object().shape({
  title: yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  createdAt: yup.string()
    .required('La fecha de creación es obligatoria'),
  isCompleted: yup.boolean()
    .required('El estado de la subtarea es obligatorio')
    .default(false),
  activityId: yup.string()
    .required('La actividad es obligatoria')
});

export const GestionarSubtareaForm = ({ actividadId }: IProps) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<IGestionarSubtarea>({
    resolver: yupResolver(subTareaSchema)
  });

  useEffect(() => {
    setValue('activityId', actividadId);
  }, [actividadId, setValue]);

  const onSubmit = async (data: IGestionarSubtarea) => {
    try {
      const create = crearSubActivity(data);
      
      toastAlert({
        tipo: 'promise',
        promise: create,
        loadingText: 'Creando subtarea...',
        successText: 'Subtarea creada correctamente',
        errorText: 'Error al crear la subtarea'
      });

      create.then((data) => {
        if(data.statusCode === 201) {
          reset();
          return router.push(`/actividades/${actividadId}`);
        }

        toastAlert({ title: 'Se ha producido un error', tipo: 'error', description: data.message });
      });
    } catch (error) {
      toastAlert({ title: 'Error al crear la subtarea', tipo: 'error', description: 'No se pudo crear el registro, intentalo nuevamente.' })
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