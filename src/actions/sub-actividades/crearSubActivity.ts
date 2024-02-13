'use server';

import prisma from "@/lib/prisma";
import { convertToISO } from "@/utils/dates";

interface IGestionarSubTarea {
  title: string;
  createdAt: string;
  isCompleted: boolean;
  activityId: string;
}

export const crearSubActivity = async (data: IGestionarSubTarea) => {
  const { title, createdAt, isCompleted, activityId } = data;

  try {
    const isoDate = convertToISO(createdAt);

    const subActivity = await prisma.subActivity.create({
      data: {
        title,
        createdAt: isoDate,
        isCompleted,
        activityId
      }
    });

    return {
      message: 'Sub actividad creada correctamente',
      data: subActivity,
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      message: 'Se ha producido un error al crear la sub actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};