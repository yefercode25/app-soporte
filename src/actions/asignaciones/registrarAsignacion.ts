'use server';

import prisma from "@/lib/prisma";
import { CrearAsignacion } from "@/types";
import { encryptPassword } from "@/utils/crypto-pass";

export const registrarAsignacion = async (data: CrearAsignacion) => {
  const { anydeskCode, computerId, location, password, status, userId, userPc, observations, printerId } = data;

  try {
    const findComputer = await prisma.computer.findUnique({ where: { id: computerId } });
    if (!findComputer) {
      return {
        data: null,
        message: 'El computador al que intentas asignar no existe.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    if (printerId) {
      const findPrinter = await prisma.printer.findUnique({ where: { id: printerId } });
      if (!findPrinter) {
        return {
          data: null,
          message: 'La impresora al que intentas asignar no existe.',
          statusCode: 404,
          statusText: 'NOT_FOUND'
        }
      }
    }

    const findUser = await prisma.employee.findUnique({ where: { id: userId } });
    if (!findUser) {
      return {
        data: null,
        message: 'El usuario al que intentas asignar no existe.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    const cryptPassword = await encryptPassword(password);

    const assigned = await prisma.assignedComputer.create({
      data: {
        anydeskCode,
        computerId,
        location,
        password: cryptPassword,
        status,
        userId,
        userPc,
        observations: observations || null,
        printerId: printerId || null
      }
    });

    return {
      data: assigned,
      message: 'Asignación registrada correctamente.',
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    console.error('Error registrarAsignacion: ', error);
    return {
      data: null,
      message: 'Se ha producido un error al intentar registrar la asignación.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};