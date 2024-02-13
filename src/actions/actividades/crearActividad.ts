'use server';

import prisma from "@/lib/prisma";
import { GestionarActividad } from "@/types";
import { convertToISO } from "@/utils/dates";

export const crearActividad = async (actividad: GestionarActividad) => {
  try {
    const { createdAt, employeeId, priority, title, userId, observation, posponedAt } = actividad;
    const isoDate = convertToISO(createdAt);
    
    const nuevaActividad = await prisma.activity.create({
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
      message: 'La actividad ha sido creada correctamente.',
      data: nuevaActividad,
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al crear la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};
