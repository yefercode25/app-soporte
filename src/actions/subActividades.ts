'use server';

import prisma from "@/lib/prisma";

export const listarSubActivities = async (idActivity: string) => {
  try {
    const subActivities = await prisma.subActivity.findMany({
      where: {
        activityId: idActivity
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
    const subActivity = await prisma.subActivity.create({
      data: {
        title,
        createdAt: new Date(createdAt),
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