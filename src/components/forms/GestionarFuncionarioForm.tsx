'use client';

import * as yup from 'yup';
import { Input } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoAtOutline, IoBusinessOutline, IoCallOutline, IoPersonAddOutline } from 'react-icons/io5';
import { toastAlert } from '@/utils/toastAlert';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { insertarFuncionario } from '@/actions';

type Dependency = 'Inspección de policía' | 'Sisben' | 'Personería' | 'Secretaría de gobierno' | 'Secretaría de planeación' | 'Secretaría de hacienda' | 'Secretaría de desarrollo social' | 'Secretaría de desarrollo económico' | 'Oficina de control interno' | 'Comisaría de familia' | 'Secretaría de salud' | 'Secretaría de educación' | 'Secretaría de cultura' | 'Secretaría ejecutiva' | 'Almacén' | 'Sin especificar';

interface IGestionarFuncionario {
  fullName: string;
  email?: string;
  phone?: string;
  dependency: string | Dependency;
}

const insertarFuncionarioSchema = yup.object().shape({
  fullName: yup.string().required('El nombre completo es obligatorio'),
  email: yup.string().email('El correo electrónico no es válido'),
  phone: yup.string().optional(),
  dependency: yup.string().required('La dependencia es obligatoria')
    .oneOf(['Inspección de policía', 'Sisben', 'Personería', 'Secretaría de gobierno', 'Secretaría de planeación', 'Secretaría de hacienda', 'Secretaría de desarrollo social', 'Secretaría de desarrollo económico', 'Oficina de control interno', 'Comisaría de familia', 'Secretaría de salud', 'Secretaría de educación', 'Secretaría de cultura', 'Secretaría ejecutiva', 'Almacén', 'Sin especificar'], 'La dependencia no es válida')
});

export const GestionarFuncionarioForm = () => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<IGestionarFuncionario>({
    resolver: yupResolver(insertarFuncionarioSchema)
  });

  const onSubmit = async (data: IGestionarFuncionario) => {
    setIsSendingData(true);

    try {
      const crearFuncionario = insertarFuncionario({ ...data, dependency: data.dependency as Dependency });

      toastAlert({
        promise: crearFuncionario as Promise<any>,
        tipo: 'promise',
        loadingText: 'Registrando funcionario...',
        successText: `Se ha registrado el funcionario ${data.fullName} correctamente.`,
        errorText: 'No se ha podido registrar el funcionario, por favor intenta nuevamente.'
      });

      crearFuncionario.then((res) => {
        if (res.statusCode === 201) {
          reset();
          setIsSendingData(false);
          return router.push('/funcionarios');
        }

        toastAlert({ tipo: 'error', title: 'Error al registrar funcionario', description: 'No se ha podido registrar el funcionario, por favor intenta nuevamente.' });
      });
    } catch (error: any) {
      toastAlert({ tipo: 'error', title: 'Error al iniciar sesion', description: error.message });
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
        selectOptions={[
          { value: 'Almacén', label: 'Almacén' },
          { value: 'Comisaría de familia', label: 'Comisaría de familia' },
          { value: 'Inspección de policía', label: 'Inspección de policía' },
          { value: 'Oficina de control interno', label: 'Oficina de control interno' },
          { value: 'Personería', label: 'Personería' },
          { value: 'Secretaría de cultura', label: 'Secretaría de cultura' },
          { value: 'Secretaría de desarrollo económico', label: 'Secretaría de desarrollo económico' },
          { value: 'Secretaría de desarrollo social', label: 'Secretaría de desarrollo social' },
          { value: 'Secretaría de educación', label: 'Secretaría de educación' },
          { value: 'Secretaría de gobierno', label: 'Secretaría de gobierno' },
          { value: 'Secretaría de hacienda', label: 'Secretaría de hacienda' },
          { value: 'Secretaría de planeación', label: 'Secretaría de planeación' },
          { value: 'Secretaría de salud', label: 'Secretaría de salud' },
          { value: 'Secretaría ejecutiva', label: 'Secretaría ejecutiva' },
          { value: 'Sin especificar', label: 'Sin especificar' },
          { value: 'Sisben', label: 'Sisben' },
        ]}
      />
      <div className="mb-3">
        <button type='submit' disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">
          {isSendingData ? 'Enviando...' : 'Crear funcionario'}
        </button>
      </div>
    </form>
  )
}