'use server';

import prisma from "@/lib/prisma";

export const obtenerFuncionario = async (id: string) => {
  try {
    const funcionario = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    if(!funcionario) {
      return {
        data: null,
        message: 'El funcionario solicitado no existe',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    return {
      message: 'Funcionario solicitado',
      data: funcionario,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el funcionario solicitado, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};