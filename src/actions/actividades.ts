'use server';

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { GestionarTarea } from "@/types";
import { convertToAmericana } from "@/utils/dates";
import { getServerSession } from 'next-auth';

interface ListarActividades {
  month?: string;
  year?: string;
}

export const listarActividades = async ({ month, year }: ListarActividades) => {
  const session = await getServerSession(authOptions);

  if (!month) month = (new Date().getMonth() + 1).toString();
  if (!year) year = new Date().getFullYear().toString();

  try {
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    const actividades = await prisma.activity.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate,
              lt: endDate
            }
          },
          {
            userId: session?.user?.id || ''
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        employee: true
      },
    });

    // Inicializar un objeto para almacenar actividades agrupadas por día
    let actividadesAgrupadasPorDia: any = {};

    // Iterar sobre las actividades y agruparlas por día
    actividades.forEach((actividad: any) => {
      const fecha = actividad.createdAt.toISOString().split('T')[0];
      if (!actividadesAgrupadasPorDia[fecha]) {
        actividadesAgrupadasPorDia[fecha] = [];
      }
      actividadesAgrupadasPorDia[fecha].push(actividad);
    });

    // Convertir el objeto en un array de objetos { date: xxx, activities:[xxx] }
    const arrayActividadesPorDia = Object.entries(actividadesAgrupadasPorDia).map(([fecha, actividadesDia]) => ({
      date: fecha,
      activities: actividadesDia
    }));

    return {
      message: 'Listado de actividades',
      data: {
        actividades: arrayActividadesPorDia,
        month,
        year
      },
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de actividades, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};

export const obtenerActividad = async (id: string) => {
  const session = await getServerSession(authOptions);

  try {
    const actividad = await prisma.activity.findUnique({
      where: { id },
      include: { employee: true }
    });

    if (!actividad || actividad.userId !== session?.user?.id) {
      return {
        data: null,
        message: 'No se ha encontrado la actividad solicitada.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    return {
      message: 'Actividad encontrada',
      data: actividad,
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};

export const crearActividad = async (actividad: GestionarTarea) => {
  try {
    const { createdAt, employeeId, priority, title, userId, observation, posponedAt } = actividad;
    const localeDate = convertToAmericana(createdAt);
    
    const nuevaActividad = await prisma.activity.create({
      data: {
        createdAt: new Date(localeDate),
        employeeId,
        priority,
        title,
        userId,
        observation,
        posponedAt: posponedAt ? new Date(convertToAmericana(posponedAt)) : null
      }
    });

    return {
      message: 'La actividad ha sido creada correctamente.',
      data: nuevaActividad,
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al crear la actividad, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};