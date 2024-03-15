'use server';

import prisma from "@/lib/prisma";

export const tomarFoto = async (activityId: string, imageId: string) => {
  try {
    const findActividad = await prisma.activity.findUnique({
      where: { id: activityId }
    });

    if (!findActividad) {
      return {
        data: null,
        message: 'No se ha encontrado la actividad que se desea tomar la foto.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    const addImage = await prisma.activityImage.create({
      data: {
        activityId: activityId,
        imageId: imageId
      }
    });

    return {
      data: null,
      message: 'Se ha registrado la imagen de la actividad correctamente.',
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      message: 'Se ha producido un error al tomar la foto de la actividad.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};