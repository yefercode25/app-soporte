import prisma from "@/lib/prisma";

export const obtenerEquipo = async (id: string) => {
  try {
    const findEquipo = await prisma.computer.findUnique({
      where: {
        id
      },
      include: {
        imageRel: true,
      }
    });

    if (!findEquipo) {
      return {
        data: null,
        message: 'No se ha encontrado el equipo solicitado',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    return {
      data: findEquipo,
      message: 'Equipo encontrado',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener la información del equipo',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};