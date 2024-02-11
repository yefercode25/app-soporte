'use client';

import { toastAlert } from "@/utils/toastAlert";
import { redirect, usePathname } from "next/navigation";

interface AuthControl {
  isValidSession: boolean;
  title: string;
  message: string;
}

export const AuthControl = ({ isValidSession, message, title }: AuthControl) => {
  const pathName = usePathname();

  if(!isValidSession) {
    toastAlert({ tipo: 'error', title, description: message });
    redirect(`/auth/iniciar-sesion?redirect=${pathName}`);
  }
  
  return (
    <></>
  )
}