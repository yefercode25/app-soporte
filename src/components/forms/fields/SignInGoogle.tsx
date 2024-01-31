'use client';

import { signIn } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io5"

interface ISignInGoogle {
  isSendingData?: boolean;
}

export const SignInGoogle = ({ isSendingData = false }: ISignInGoogle) => {
  const onCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn('google');
  };

  return (
    <button 
      disabled={isSendingData} 
      className="flex items-center gap-2 flex-wrap justify-center w-full border border-blue-400 hover:bg-blue-400 hover:text-white px-2 py-1.5 rounded-md"
      onClick={onCLick}
    >
      <IoLogoGoogle />
      Iniciar sesión con Google
    </button>
  )
}