'use server';

import prisma from "@/lib/prisma";

export const listarFuncionarios = async () => {
  try {
    const funcionarios = await prisma.employee.findMany();

    return {
      message: 'Listado de funcionarios',
      data: funcionarios,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de funcionarios, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};