import prisma from "@/lib/prisma";

export const eliminarImagen = async (id: string) => {
  try {
    const findImage = await prisma.image.findUnique({ where: { id } });
    if (!findImage) {
      return {
        data: null,
        message: 'No se encontró la imagen que se intenta eliminar',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      };
    }

    await prisma.image.delete({ where: { id } });

    return {
      data: null,
      message: 'La imagen se ha eliminado correctamente',
      statusCode: 200,
      statusText: 'OK'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar eliminar la imagen',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};