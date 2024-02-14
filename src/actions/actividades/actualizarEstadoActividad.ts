'use server';

import prisma from "@/lib/prisma";
import { ActivityStatus } from "@/types";
import { convertToISO } from "@/utils/dates";

export const actualizarEstadoActividad = async (id: string, status: ActivityStatus) => {
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

    const completedAt = status === 'completada' ? convertToISO(new Date().toISOString()) : null;

    const actividad = await prisma.activity.update({
      where: { id },
      data: { 
        status,
        completedAt
      }
    });

    return {
      message: 'El estado de la actividad ha sido actualizado correctamente.',
      data: actividad,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al actualizar el estado de la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};