'use server';

import prisma from "@/lib/prisma";
import { deleteImageFromCloudinary, eliminarImagen, obtenerImagen } from "..";

export const eliminarEquipo = async (id: string, imageId: string) => {
  try {
    const findImage = await obtenerImagen(imageId);
    if(findImage.statusCode === 200) {
      const { statusCode } = await deleteImageFromCloudinary(findImage.data?.cloudinaryId as string);
      if(statusCode !== 200) {
        await eliminarImagen(imageId);
      }
    }

    const findComputer = await prisma.computer.findUnique({ where: { id } });
    if (!findComputer) {
      return {
        data: null,
        message: 'No se encontró el equipo que se intenta eliminar',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      };
    }

    await prisma.computer.delete({ where: { id } });

    return {
      data: null,
      message: 'El equipo se ha eliminado correctamente',
      statusCode: 200,
      statusText: 'OK'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar eliminar el equipo',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};