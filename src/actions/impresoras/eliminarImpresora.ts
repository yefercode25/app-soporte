'use server';

import prisma from "@/lib/prisma";
import { deleteImageFromCloudinary, eliminarImagen, obtenerImagen } from "..";

export const eliminarImpresora = async (id: string, imageId: string) => {
  try {
    const findImage = await obtenerImagen(imageId);
    if(findImage.statusCode === 200) {
      const { statusCode } = await deleteImageFromCloudinary(findImage.data?.cloudinaryId as string);
      if(statusCode !== 200) {
        await eliminarImagen(imageId);
      }
    }

    const findImpresora = await prisma.printer.findUnique({ where: { id } });
    if (!findImpresora) {
      return {
        data: null,
        message: 'No se ha encontrado la impresora que se intenta eliminar.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    await prisma.printer.delete({ where: { id } });

    return {
      data: null,
      message: 'Impresora eliminada correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar eliminar la impresora.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};