'use client';

import { dataDependencias } from '@/lib/data';
import { Input } from '@/components';
import { insertarFuncionario } from '@/actions';
import { IoAtOutline, IoBusinessOutline, IoCallOutline, IoPersonAddOutline } from 'react-icons/io5';
import { RegistrarFuncionario } from '@/types';
import { registrarFuncionarioSchema } from '@/lib/yup-schemas';
import { toaster } from '@/utils/toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

const formatDependencies = dataDependencias.map((dep: string) => ({
  value: dep,
  label: dep
}));

export const RegistrarFuncionarioForm = () => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<RegistrarFuncionario>({
    resolver: yupResolver(registrarFuncionarioSchema),
  });

  const onSubmit = async (data: RegistrarFuncionario) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Registrando funcionario',
      description: 'Se está intentando registrar el nuevo funcionario'
    });

    try {
      const crearFuncionario = await insertarFuncionario({ ...data, dependency: data.dependency });

      if (crearFuncionario.statusCode === 201) {
        reset();
        toaster({
          tipo: 'success',
          title: 'Registro exitoso',
          description: crearFuncionario.message
        });

        return router.push('/funcionarios');
      }

      return toaster({
        tipo: 'error',
        title: 'Error al registrar funcionario',
        description: crearFuncionario.message
      });
    } catch (error: any) {
      toaster({
        tipo: 'error',
        title: 'Error al iniciar sesion',
        description: 'No se ha podido registrar el funcionario, por favor intenta nuevamente.'
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
          {isSendingData ? 'Enviando...' : 'Crear funcionario'}
        </button>
      </div>
    </form>
  )
}