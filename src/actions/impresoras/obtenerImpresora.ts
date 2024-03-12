'use server';

import prisma from "@/lib/prisma";

export const obtenerImpresora = async (id: string) => {
  try {
    const impresora = await prisma.printer.findUnique({
      where: {
        id: id
      },
      include: {
        imageRel: true
      }
    });

    if (!impresora) {
      return {
        data: null,
        message: 'No se ha encontrado la impresora solicitada',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    return {
      data: impresora,
      message: 'Impresora obtenida correctamente',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar listar las impresoras',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};