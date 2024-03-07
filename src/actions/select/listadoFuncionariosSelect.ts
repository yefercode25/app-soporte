'use server';

import prisma from "@/lib/prisma";

export const listadoFuncionariosSelect = async () => {
  try {
    const funcionarios = await prisma.employee.findMany({
      select: {
        id: true,
        fullName: true
      },
    });

    const selectData = funcionarios.map((func: any) => ({ label: func?.fullName, value: func?.id }));

    return {
      data: selectData,
      message: 'Listado de funcionarios para el select obtenido correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de funcionarios.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};