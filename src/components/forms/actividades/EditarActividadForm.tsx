'use client';

import { editarActividad, listadoEquiposSelect, listadoFuncionariosSelect, listarFuncionarios } from '@/actions';
import { editarActividadSchema } from '@/lib/yup-schemas';
import { Actividad, EditarActividad } from '@/types';
import { Input } from '@/components';
import { IoAlbumsOutline, IoCalendarClearOutline, IoDesktopOutline, IoTicketOutline, IoTimerOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { defaultInputDate } from '@/utils/dates';

interface Props {
  actividad: Actividad;
}

export const EditarActividadForm = ({ actividad }: Props) => {
  const { id, title, observation, createdAt, posponedAt, priority, userId, employeeId, computerId } = actividad;

  const session = useSession();
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [listEnployees, setListEmployees] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [listComputers, setListComputers] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EditarActividad>({
    resolver: yupResolver(editarActividadSchema)
  });

  useEffect(() => {
    const getListaEmpleados = async () => {
      const listadoFuncionarios = await listadoFuncionariosSelect();
      const listadoEquipos = await listadoEquiposSelect();

      setListEmployees(listadoFuncionarios.data || []);
      setListComputers(listadoEquipos.data || []);
      setValue('employeeId', employeeId ?? '');
      setValue('computerId', computerId ?? '');
    };

    getListaEmpleados();
  }, [session, setValue, employeeId, computerId]);

  useEffect(() => {
    setValue('id', id);
    setValue('title', title);
    setValue('observation', observation);
    setValue('createdAt', defaultInputDate(createdAt.toISOString()));
    setValue('posponedAt', defaultInputDate(posponedAt?.toISOString()));
    setValue('priority', priority);
    setValue('userId', userId);
  }, [setValue, id, title, observation, createdAt, posponedAt, priority, userId, employeeId]);

  const onSubmit = async (data: EditarActividad) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Actualizando actividad',
      description: 'Se está intentando actualizar la actividad'
    });

    try {
      const response = await editarActividad(data);
      if (response?.statusCode === 200) {
        toaster({
          tipo: 'success',
          title: 'Actividad actualizada',
          description: response.message
        });
        reset();
        return router.push('/actividades');
      }
      
      return toaster({
        tipo: 'error',
        title: 'Error al actualizar actividad',
        description: response.message
      });
    } catch (_error: any) {
      return toaster({
        tipo: 'error',
        title: 'Error al actualizar actividad',
        description: 'No se ha podido registrar la mueva actividad, intentalo nuevamente.'
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
        placeholder="Ejm. Revisar el correo electrónico de la empresa."
        title="Título de la tarea"
        type="text"
        id="title"
        icon={<IoTicketOutline />}
        {...register('title')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. Se notifica que el almacenamiento se está agotando."
        title="Observación"
        type="textarea"
        id="observation"
        icon={<IoAlbumsOutline />}
        {...register('observation')}
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
      <Input
        title="Prioridad"
        type="select"
        id="priority"
        icon={<IoAlbumsOutline />}
        {...register('priority')}
        errors={errors}
        placeholder="Selecciona la prioridad"
        selectOptions={[
          { value: 'baja', label: 'Baja' },
          { value: 'normal', label: 'Normal' },
          { value: 'alta', label: 'Alta' }
        ]}
        onChange={(e) => {
          register('priority').onChange(e);
          setValue('priority', e.target.value as any);
        }}
      />
      <Input
        title="Funcionario que solicitó"
        type="select"
        id="priority"
        icon={<IoAlbumsOutline />}
        {...register('employeeId')}
        errors={errors}
        placeholder="Seleccione un funcionario"
        selectOptions={listEnployees}
      />
      <Input
        title="Equipo relacionado (opcional)"
        type="select"
        id="priority"
        icon={<IoDesktopOutline />}
        {...register('computerId')}
        errors={errors}
        placeholder="Seleccione el equipo asociado a la actividad"
        selectOptions={listComputers}
      />
      <Input
        title="La tarea se pospone hasta (opcional)"
        type="datetime-local"
        id="posponedAt"
        icon={<IoTimerOutline />}
        {...register('posponedAt')}
        errors={errors}
      />
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Actualizando actividad...' : 'Actualizar actividad'}
        </button>
      </div>
    </form>
  )
}