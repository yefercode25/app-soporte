'use server';

import prisma from '@/lib/prisma';

export const listarEquipos = async () => {
  try {
    const listadoEquipos = await prisma.computer.findMany({
      include: {
        imageRel: true
      }
    });

    return {
      data: listadoEquipos ?? [],
      message: 'Listado de equipos obtenido correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar listar los equipos.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};