'use server';

import prisma from "@/lib/prisma";

export const eliminarActividad = async (id: string) => {
  try {
    const findActividad = await prisma.activity.findUnique({ where: { id } });

    if (!findActividad) {
      return {
        data: null,
        message: 'No se ha encontrado la actividad solicitada.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    await prisma.activity.delete({ where: { id }, include: { SubActivity: true } });

    return {
      message: 'La actividad ha sido eliminada correctamente.',
      data: null,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al eliminar la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};