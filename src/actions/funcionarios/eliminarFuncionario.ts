'use server';

import prisma from "@/lib/prisma";

export const eliminarFuncionario = async (id: string) => {
  try {
    const funcionario = await prisma.employee.findUnique({ where: { id } });
    if (!funcionario) {
      return {
        message: 'No se encontró el funcionario que se intenta eliminar.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      };
    }

    await prisma.employee.delete({ where: { id }});
    return {
      data: null,
      statusCode: 200,
      statusText: 'OK',
      message: 'El funcionario se ha eliminado correctamente.'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Ocurrió un error al intentar eliminar el funcionario.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};