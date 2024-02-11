'use server';

import prisma from "@/lib/prisma";

type Dependency = 'Inspección de policía' | 'Sisben' | 'Personería' | 'Secretaría de gobierno' | 'Secretaría de planeación' | 'Secretaría de hacienda' | 'Secretaría de desarrollo social' | 'Secretaría de desarrollo económico' | 'Oficina de control interno' | 'Comisaría de familia' | 'Secretaría de salud' | 'Secretaría de educación' | 'Secretaría de cultura' | 'Secretaría ejecutiva' | 'Almacén' | 'Sin especificar';

interface InsertarFuncionario {
  fullName: string;
  email?: string;
  phone?: string;
  dependency: Dependency;
}

export const insertarFuncionario = async ({ dependency, fullName, email, phone }: InsertarFuncionario) => {
  try {
    const funcionario = await prisma.employee.create({
      data: {
        dependency,
        fullName,
        email,
        phone
      }
    });

    return {
      message: 'El funcionario se ha creado correctamente',
      data: {
        ...funcionario
      },
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      message: 'Se ha producido un error al crear el funcionario, verifique los datos enviados e intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};

export const obtenerListadoFuncionarios = async () => {
  try {
    const funcionarios = await prisma.employee.findMany();

    return {
      message: 'Listado de funcionarios',
      data: {
        funcionarios
      },
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al obtener el listado de funcionarios, intente nuevamente.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};