'use server';

import prisma from "@/lib/prisma";
import { CrearComputador } from "@/types";

export const insertarEquipo = async (data: CrearComputador) => {
  try {
    const { brand, model, os, peripherals, processor, ram, serial, status, storage, type, imageId } = data;

    const listPeripherals = peripherals.split(',');

    const findEquipo = await prisma.computer.findFirst({ where: { serial } });
    if (findEquipo) {
      return {
        data: null,
        message: 'El serial del equipo ya se encuentra registrado, verifica e intenta nuevamente.',
        statusCode: 400,
        statusText: 'BAD_REQUEST'
      }
    }

    const equipo = await prisma.computer.create({
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
        imageId
      }
    });

    return {
      data: equipo,
      message: 'El equipo se ha registrado correctamente.',
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error: any) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar registrar el nuevo equipo.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};