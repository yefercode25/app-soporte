'use server';

import prisma from "@/lib/prisma";

export const listarSubActivities = async (idActivity: string) => {
  try {
    const subActivities = await prisma.subActivity.findMany({
      where: {
        activityId: idActivity
      },
      orderBy: {
        isCompleted: 'asc',
      }
    });

    return {
      message: 'Listado de sub actividades',
      data: subActivities,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      message: 'Se ha producido un error al obtener el listado de sub actividades, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};