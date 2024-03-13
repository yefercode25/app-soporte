'use client';

import { crearActividad, listadoEquiposSelect, listadoFuncionariosSelect, listadoImpresorasSelect, listarFuncionarios } from '@/actions';
import { crearActividadSchema } from '@/lib/yup-schemas';
import { GestionarActividad } from '@/types';
import { Input } from '@/components';
import { IoAlbumsOutline, IoCalendarClearOutline, IoDesktopOutline, IoPrintOutline, IoTicketOutline, IoTimerOutline } from 'react-icons/io5';
import { toaster } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';

export const RegistrarActividadForm = () => {
  const session = useSession();
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [listEnployees, setListEmployees] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [listComputers, setListComputers] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [listPrinters, setListPrinters] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<GestionarActividad>({
    resolver: yupResolver(crearActividadSchema)
  });

  useEffect(() => {
    setValue('userId', session?.data?.user?.id || '');

    const getListaEmpleados = async () => {
      const listadoFuncionarios = await listadoFuncionariosSelect();
      const listadoEquipos = await listadoEquiposSelect();
      const listadoImpresoras = await listadoImpresorasSelect();

      setListEmployees(listadoFuncionarios.data || []);
      setListComputers(listadoEquipos.data || []);
      setListPrinters(listadoImpresoras.data || []);
    };

    getListaEmpleados();
  }, [session, setValue]);

  const onSubmit = async (data: GestionarActividad) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Registrando actividad',
      description: 'Se está intentando registrar la nueva actividad'
    });

    try {
      const response = await crearActividad(data);
      if (response?.statusCode === 201) {
        toaster({
          tipo: 'success',
          title: 'Actividad registrada',
          description: response.message
        });
        reset();
        return router.push('/actividades');
      }
      
      return toaster({
        tipo: 'error',
        title: 'Error registro',
        description: response.message
      });
    } catch (_error: any) {
      return toaster({
        tipo: 'error',
        title: 'Error registro',
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
        id="employeeId"
        icon={<IoAlbumsOutline />}
        {...register('employeeId')}
        errors={errors}
        placeholder="Seleccione un funcionario"
        selectOptions={listEnployees}
      />
      <Input
        title="Equipo relacionado (opcional)"
        type="select"
        id="computerId"
        icon={<IoDesktopOutline />}
        {...register('computerId')}
        errors={errors}
        placeholder="Seleccione el equipo asociado a la actividad"
        selectOptions={listComputers}
      />
      <Input
        title="Impresora relacionada (opcional)"
        type="select"
        id="printerId"
        icon={<IoPrintOutline />}
        {...register('printerId')}
        errors={errors}
        placeholder="Seleccione la impresora asociada a la actividad"
        selectOptions={listPrinters}
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
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">Registrar actividad</button>
      </div>
    </form>
  )
}