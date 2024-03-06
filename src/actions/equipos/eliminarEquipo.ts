'use server';

import prisma from "@/lib/prisma";

export const eliminarEquipo = async (id: string) => {
  try {
    const findComputer = await prisma.computer.findUnique({ where: { id } });
    if (!findComputer) {
      return {
        data: null,
        message: 'No se encontró el equipo que se intenta eliminar',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      };
    }

    await prisma.computer.delete({ where: { id } });

    return {
      data: null,
      message: 'El equipo se ha eliminado correctamente',
      statusCode: 200,
      statusText: 'OK'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar eliminar el equipo',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};