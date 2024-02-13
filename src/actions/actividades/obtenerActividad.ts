'use server';

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { getServerSession } from 'next-auth';

export const obtenerActividad = async (id: string) => {
  const session = await getServerSession(authOptions);

  try {
    const actividad = await prisma.activity.findUnique({
      where: { id },
      include: { employee: true }
    });

    if (!actividad || actividad.userId !== session?.user?.id) {
      return {
        data: null,
        message: 'No se ha encontrado la actividad solicitada.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    return {
      message: 'Actividad encontrada',
      data: actividad,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};