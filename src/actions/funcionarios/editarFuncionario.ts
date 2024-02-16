'use server';

import prisma from "@/lib/prisma";
import { EditarFuncionario } from "@/types";

export const editarFuncionario = async (data: EditarFuncionario) => {
  const { id, fullName, email, phone, dependency } = data;

  try {
    const funcionario = await prisma.employee.update({
      where: { id },
      data: {
        fullName,
        email,
        phone,
        dependency
      }
    });

    return {
      message: 'El funcionario ha sido actualizado correctamente.',
      data: funcionario,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al actualizar el funcionario, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};