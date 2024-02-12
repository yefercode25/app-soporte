'use server';

import prisma from "@/lib/prisma";
import { convertToISO } from "@/utils/dates";

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