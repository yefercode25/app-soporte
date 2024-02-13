'use client';

import Link from "next/link";
import { IoPersonAddOutline, IoPersonOutline, IoAtOutline, IoLockClosedOutline, IoLockOpenOutline } from "react-icons/io5";
import { Input } from '@/components';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrarUsuarioSchema } from "@/lib/yup-schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toaster } from "@/utils/toast";

interface IRegistrarUsuario {
  name: string;
  lastName?: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export const RegistrarUsuarioForm = () => {
  const router = useRouter();

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegistrarUsuario>({
    resolver: yupResolver(registrarUsuarioSchema)
  });

  const onSubmit = async (data: IRegistrarUsuario) => {
    setIsSendingData(true);
    toaster({
      tipo: 'loading',
      title: 'Registrando usuario',
      description: 'Se está intentando registrar el nuevo usuario'
    });

    const createUser = await fetch('/api/user/registrar', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if(createUser.status === 201) {
      reset();
      toaster({
        tipo: 'success',
        title: 'Usuario registrado',
        description: 'Se ha registrado el nuevo usuario de manera correcta'
      });
      setIsSendingData(false);
      return router.push('/auth/iniciar-sesion');
    }

    return toaster({
      tipo: 'error',
      title: 'Error registro',
      description: 'No se ha podido registrar el nuevo usuario de manera correcta'
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-gray-800 font-bold text-2xl mb-1">Registrate en App Soporte</h1>
      <p className="text-sm font-normal text-gray-600 mb-7">¡Bienvenido! Por favor ingresa la información solicitada para crear tu cuenta</p>
      <Input
        placeholder="Ejm. Lucas"
        title="Nombres"
        type="text"
        id="name"
        icon={<IoPersonAddOutline />}
        {...register('name')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. Perez"
        title="Apellidos"
        type="text"
        id="lastName"
        icon={<IoPersonOutline />}
        isOptional
        {...register('lastName')}
        errors={errors}
      />
      <Input
        placeholder="Ejm. email@gmail.com"
        title="Correo electrónico"
        type="email"
        id="email"
        icon={<IoAtOutline />}
        {...register('email')}
        errors={errors}
      />
      <Input
        placeholder="**********"
        title="Contraseña"
        type="password"
        id="password"
        icon={<IoLockClosedOutline />}
        {...register('password')}
        errors={errors}
      />
      <Input
        placeholder="**********"
        title="Repetir contraseña"
        type="password"
        id="repeatPassword"
        icon={<IoLockOpenOutline />}
        {...register('repeatPassword')}
        errors={errors}
        disabled={isSendingData}
      />
      <button type="submit" className="block w-full bg-blue-600 mt-4 py-2 rounded-md text-white font-semibold mb-2 hover:bg-blue-700 transition-all">Realizar registro</button>

      <div className="text-center">
        <span className="text-xs text-gray-600 font-semibold mr-2">¿Tienes una cuenta?</span>
        <Link href="/auth/iniciar-sesion" className="text-xs font-semibold text-blue-600">Inicia sesión aquí</Link>
      </div>
    </form>
  )
}