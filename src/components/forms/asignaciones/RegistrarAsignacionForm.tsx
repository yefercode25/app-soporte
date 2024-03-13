'use client';

import { crearAsignacionSchema } from "@/lib/yup-schemas";
import { CrearAsignacion } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { IoAlbumsOutline, IoDesktopOutline, IoLocationOutline, IoLockClosedOutline, IoPersonCircleOutline, IoPrintOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { CiTextAlignLeft } from "react-icons/ci";
import { MdOutlinePersonOutline } from "react-icons/md";
import { SiAnydesk } from "react-icons/si";
import { listadoEquiposSelect, listadoFuncionariosSelect, listadoImpresorasSelect, registrarAsignacion } from "@/actions";
import { toaster } from "@/utils/toast";

export const RegistrarAsignacionForm = () => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const [listEnployees, setListEmployees] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [listComputers, setListComputers] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);
  const [listPrinters, setListPrinters] = useState<{ value: string, label: string }[]>([{ label: '', value: 'Sin opciones disponibles' }]);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<CrearAsignacion>({
    resolver: yupResolver(crearAsignacionSchema) as any,
  });

  useEffect(() => {
    const getSelectItems = async () => {
      const listadoFuncionarios = await listadoFuncionariosSelect();
      const listadoEquipos = await listadoEquiposSelect();
      const listadoImpresoras = await listadoImpresorasSelect();

      setListEmployees(listadoFuncionarios.data || []);
      setListComputers(listadoEquipos.data || []);
      setListPrinters(listadoImpresoras.data || []);
    };

    getSelectItems();
  }, [setValue]);

  const onSubmit = async (data: CrearAsignacion) => {
    setIsSendingData(true);

    toaster({
      tipo: 'loading',
      title: 'Registrando asignación',
      description: 'Estamos registrando la asignación, por favor espera un momento.'
    });

    try {
      const asignacion = await registrarAsignacion(data);
      if (asignacion.statusCode === 201) {
        toaster({
          tipo: 'success',
          title: 'Asignación registrada',
          description: 'La asignación se registró correctamente.'
        });
        reset();
        return router.push('/asignaciones');
      }

      toaster({
        tipo: 'error',
        title: 'Error asignación',
        description: asignacion.message
      });
    } catch (error) {
      toaster({
        tipo: 'error',
        title: 'Error asignación',
        description: 'Ocurrió un error al registrar la asignación, por favor intenta nuevamente.'
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
        placeholder="Ejm. Secretaría de hacienda"
        title="Ubicación del equipo"
        type="text"
        id="location"
        icon={<IoLocationOutline />}
        {...register('location')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. La pantalla está rota"
        title="Observaciones"
        type="text"
        id="observations"
        icon={<CiTextAlignLeft />}
        {...register('observations')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. Apoyo Hacienda"
        title="Usuario del computador"
        type="text"
        id="userPc"
        icon={<MdOutlinePersonOutline />}
        {...register('userPc')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. **********"
        title="Contraseña del computador"
        type="password"
        id="password"
        icon={<IoLockClosedOutline />}
        {...register('password')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. 232129282"
        title="Código de acceso Anydesk"
        type="number"
        id="anydeskCode"
        icon={<SiAnydesk />}
        {...register('anydeskCode')}
        errors={errors}
      />
      <Input
        title="Estado"
        type="select"
        id="status"
        icon={<IoAlbumsOutline />}
        {...register('status')}
        errors={errors}
        placeholder="Ejm. vigente, inactiva"
        selectOptions={[
          { value: 'vigente', label: 'Vigente' },
          { value: 'inactiva', label: 'Inactiva' }
        ]}
      />
      <Input
        title="Funcionario asignado"
        type="select"
        id="priority"
        icon={<IoPersonCircleOutline />}
        {...register('userId')}
        errors={errors}
        placeholder="Seleccione un funcionario"
        selectOptions={listEnployees}
      />
      <Input
        title="Equipo relacionado"
        type="select"
        id="priority"
        icon={<IoDesktopOutline />}
        {...register('computerId')}
        errors={errors}
        placeholder="Seleccione el equipo asignado"
        selectOptions={listComputers}
      />
      <Input
        title="Impresora asignada (opcional)"
        type="select"
        id="priority"
        icon={<IoPrintOutline />}
        {...register('printerId')}
        errors={errors}
        placeholder="Seleccione la impresora asignada"
        selectOptions={listPrinters}
      />
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Registrando asignación...' : 'Registrar asignación'}
        </button>
      </div>
    </form>
  )
}