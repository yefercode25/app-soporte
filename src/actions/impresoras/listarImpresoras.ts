'use server';

import prisma from "@/lib/prisma";

export const listarImpresoras = async () => {
  try {
    const impresoras = await prisma.printer.findMany({
      include: {
        imageRel: true
      }
    });

    return {
      data: impresoras,
      message: 'Lista de impresoras obtenida correctamente',
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