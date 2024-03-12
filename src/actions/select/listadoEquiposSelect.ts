'use server';

import prisma from "@/lib/prisma";

export const listadoEquiposSelect = async () => {
  try {
    const equipos = await prisma.computer.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        serial: true,
      },
    });

    const selectData = equipos.map((equipo: any) => ({ label: `${equipo?.brand} ${equipo?.model} (${equipo?.serial})`, value: equipo?.id }));

    return {
      data: selectData,
      message: 'Listado de equipos para el select obtenido correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de equipos.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};