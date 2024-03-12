'use server';

import prisma from "@/lib/prisma";

export const listadoImpresorasSelect = async () => {
  try {
    const impresoras = await prisma.printer.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        serial: true
      },
    });

    const selectData = impresoras.map((imp: any) => ({ label: `${imp?.brand} ${imp?.model} (${imp?.serial})`, value: imp?.id }));

    return {
      data: selectData,
      message: 'Listado de impresoras para el select obtenido correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de impresoras.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};