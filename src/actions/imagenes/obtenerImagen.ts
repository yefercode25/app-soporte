'use server';

import prisma from "@/lib/prisma";

export const obtenerImagen = async (id: string) => {
  try {
    const findImage = await prisma.image.findUnique({ where: { id } });
    
    return {
      data: findImage,
      message: 'La imagen se ha obtenido correctamente',
      statusCode: 200,
      statusText: 'OK'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar obtener la imagen',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};