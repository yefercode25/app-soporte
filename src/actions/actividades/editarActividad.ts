'use server';

import prisma from "@/lib/prisma";
import { EditarActividad } from "@/types";
import { convertToISO } from "@/utils/dates";

export const editarActividad = async (actividad: EditarActividad) => {
  const { id, createdAt, employeeId, priority, title, userId, observation, posponedAt } = actividad;

  try {
    const isoDate = convertToISO(createdAt);
    const updatedActividad = await prisma.activity.update({
      where: { id },
      data: {
        createdAt: isoDate,
        employeeId,
        priority,
        title,
        userId,
        observation,
        posponedAt: posponedAt ? convertToISO(posponedAt) : null
      }
    });

    return {
      message: 'La actividad ha sido actualizada correctamente.',
      data: updatedActividad,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al actualizar la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};