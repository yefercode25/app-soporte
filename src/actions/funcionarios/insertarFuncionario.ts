'use server';

import { RegistrarFuncionario } from "@/types";
import prisma from "@/lib/prisma";

export const insertarFuncionario = async ({ dependency, fullName, email, phone }: RegistrarFuncionario) => {
  try {
    const funcionario = await prisma.employee.create({
      data: {
        dependency,
        fullName,
        email,
        phone
      }
    });

    return {
      message: 'El funcionario se ha creado correctamente',
      data: {
        ...funcionario
      },
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      message: 'Se ha producido un error al crear el funcionario, verifique los datos enviados e intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};