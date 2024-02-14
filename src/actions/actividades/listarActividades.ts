'use server';

import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
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
      const fecha = dayjs(actividad.createdAt).format('YYYY-MM-DD');
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