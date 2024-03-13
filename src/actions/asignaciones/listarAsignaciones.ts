'use server';

import prisma from "@/lib/prisma";

export const listarAsignaciones = async () => {
  try {
    const asignaciones = await prisma.assignedComputer.findMany({
      include: {
        computer: true,
        printer: true,
        userCuid: true
      }
    });

    return {
      data: asignaciones || [],
      message: 'Asignaciones listadas correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar listar las asignaciones.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};