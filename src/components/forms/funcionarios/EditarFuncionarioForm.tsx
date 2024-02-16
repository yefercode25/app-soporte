'use client';

import { dataDependencias } from '@/lib/data';
import { Input } from '@/components';
import { editarFuncionario, insertarFuncionario } from '@/actions';
import { IoAtOutline, IoBusinessOutline, IoCallOutline, IoPersonAddOutline } from 'react-icons/io5';
import { EditarFuncionario, Funcionario } from '@/types';
import { editarFuncionarioSchema } from '@/lib/yup-schemas';
import { toaster } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const formatDependencies = dataDependencias.map((dep: string) => ({
  value: dep,
  label: dep
}));

interface Props {
  funcionario: Funcionario;
}

export const EditarFuncionarioForm = ({ funcionario }: Props) => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<EditarFuncionario>({
    resolver: yupResolver(editarFuncionarioSchema),
  });

  useEffect(() => {
    setValue('id', funcionario.id);
    setValue('fullName', funcionario.fullName);
    setValue('email', funcionario.email);
    setValue('phone', funcionario.phone);
    setValue('dependency', funcionario.dependency);
  }, [funcionario, setValue]);

  const onSubmit = async (data: EditarFuncionario) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Actualizando funcionario',
      description: 'Se está intentando actualizar el funcionario'
    });

    try {
      const crearFuncionario = await editarFuncionario({ ...data, dependency: data.dependency });

      if (crearFuncionario.statusCode === 200) {
        reset();
        toaster({
          tipo: 'success',
          title: 'Actualización exitoso',
          description: crearFuncionario.message
        });

        return router.push('/funcionarios');
      }

      return toaster({
        tipo: 'error',
        title: 'Error al actualizar funcionario',
        description: crearFuncionario.message
      });
    } catch (error: any) {
      toaster({
        tipo: 'error',
        title: 'Error al actualizar funcionario',
        description: 'No se ha podido actualizar el funcionario, por favor intenta nuevamente.'
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
        placeholder="Ejm. Juan Pérez"
        title="Nombre completo del funcionario"
        type="text"
        id="fullName"
        icon={<IoPersonAddOutline />}
        {...register('fullName')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. email@gmail.com"
        title="Correo electrónico (opcional)"
        type="email"
        id="email"
        icon={<IoAtOutline />}
        {...register('email')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. 3114675432"
        title="Teléfono (opcional)"
        type="tel"
        id="phone"
        icon={<IoCallOutline />}
        {...register('phone')}
        errors={errors}
      />
      <Input
        title="Dependencia"
        type="select"
        id="dependency"
        icon={<IoBusinessOutline />}
        {...register('dependency')}
        errors={errors}
        placeholder="Selecciona una dependencia"
        selectOptions={formatDependencies}
      />
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Actualizanco...' : 'Actualizar funcionario'}
        </button>
      </div>
    </form>
  )
}