'use server';

import prisma from "@/lib/prisma";

export const toggleSubActivity = async (idSubActivity: string) => {
  try {
    const findSubActivity = await prisma.subActivity.findUnique({ where: { id: idSubActivity }});
    if (!findSubActivity) {
      return {
        data: null,
        message: 'La sub actividad que cambió de estado no existe',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    const subActivity = await prisma.subActivity.update({
      where: { id: idSubActivity },
      data: {
        isCompleted: !findSubActivity.isCompleted
      }
    });

    return {
      message: 'Sub actividad completada',
      data: subActivity,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al completar la sub actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};