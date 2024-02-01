'use client';

import Link from "next/link"
import { IoAtOutline, IoLockClosedOutline } from "react-icons/io5";
import { Input, SignInGoogle } from '@/components';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iniciarSesionSchema } from "@/lib/yupSchemas";
import { toastAlert } from "@/utils/toastAlert";
import { signIn } from "next-auth/react";

interface IIniciarSesion {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const IniciarSesionForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<IIniciarSesion>({
    resolver: yupResolver(iniciarSesionSchema)
  });

  const onSubmit = async (data: IIniciarSesion) => {
    setIsSendingData(true);

    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: `/`,
      redirect: true
    });

    if([401, 401].includes(result?.status!)) {
      toastAlert({ tipo: 'error', title: 'Error al iniciar sesion', description: result?.error || 'Credenciales incorrectas' });
      return setIsSendingData(false);
    }

    setIsSendingData(false);
  };


  return (
    <>
      <form
        className="mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <div className="mb-4 flex flex-wrap content-center">
          <input
            id="remember"
            type="checkbox"
            className="mr-1 checked:bg-blue-600"
            {...register('rememberMe')}
          />
          <label htmlFor="remember" className="mr-auto text-xs font-semibold">Recordar por 30 días</label>
          <Link href="/auth/recuperar-password" className="text-xs font-semibold text-blue-600">¿Olvidaste tu contraseña?</Link>
        </div>

        <div className="mb-3">
          <button disabled={isSendingData} className="mb-2 block w-full text-center text-white bg-blue-600 hover:bg-blue-700 px-2 py-1.5 rounded-md">Iniciar sesión</button>
          <SignInGoogle isSendingData={isSendingData} />
        </div>
      </form>

      <div className="text-center">
        <span className="text-xs text-gray-400 font-semibold mr-2">¿No tienes una cuenta?</span>
        <Link href="/auth/registrar" className="text-xs font-semibold text-blue-600">Registrate aquí</Link>
      </div>
    </>
  )
}