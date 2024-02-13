import prisma from '@/lib/prisma';
import { crearActividadSchema } from '@/lib/yupSchemas';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const { createdAt, priority, title, userId, employeeId, observation, posponedAt } = await crearActividadSchema.validate(await req.json());
    
    const findUser = await prisma.user.findUnique({ where: { id: userId }});
    if (!findUser) {
      return NextResponse.json({
        message: 'El usuario al que se le quiere crear la actividad no existe.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }, { status: 404 });
    }

    if (employeeId) {
      const findEmployee = await prisma.employee.findUnique({ where: { id: employeeId }});
      if (!findEmployee) {
        return NextResponse.json({
          message: 'El empleado al que se le quiere asignar la actividad no existe.',
          statusCode: 404,
          statusText: 'NOT_FOUND'
        }, { status: 404 });
      }
    }

    const actividad = await prisma.activity.create({
      data: {
        createdAt: new Date(createdAt),
        priority,
        title,
        userId,
        employeeId,
        observation: observation || 'Sin observaciones de la actividad.',
        posponedAt: posponedAt ? new Date(posponedAt) : null
      }
    });

    return NextResponse.json({
      message: 'Actividad creada con éxito.',
      statusCode: 201,
      statusText: 'CREATED',
      data: actividad
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: 'Se ha producido un error al crear la actividad',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }, { status: 500 });
  }
}