'use server';

import prisma from "@/lib/prisma";
import { EditarComputador } from "@/types";

export const actualizarEquipo = async (equipo: EditarComputador) => {
  try {
    const { id, brand, model, os, peripherals, processor, ram, serial, status, storage, type, imageId } = equipo;

    const equipoExistente = await prisma.computer.findUnique({ where: { id } });
    if (!equipoExistente) {
      return {
        data: null,
        message: 'El equipo que intentas actualizar no existe.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      }
    }

    const equipoExistenteSerial = await prisma.computer.findFirst({ where: { serial, NOT: { id } } });
    if (equipoExistenteSerial) {
      return {
        data: null,
        message: 'El serial del equipo ya se encuentra registrado, verifica e intenta nuevamente.',
        statusCode: 400,
        statusText: 'BAD_REQUEST'
      }
    }

    const listPeripherals = peripherals.split(',');

    const equipoActualizado = await prisma.computer.update({
      where: { id },
      data: {
        brand,
        model,
        os,
        peripherals: listPeripherals?.length ? listPeripherals : [],
        processor,
        ram,
        serial,
        status,
        storage,
        type,
        imageId: !!imageId ? imageId : equipoExistente.imageId
      }
    });

    return {
      data: equipoActualizado,
      message: 'El equipo se ha actualizado correctamente.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error: any) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar actualizar el equipo.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};