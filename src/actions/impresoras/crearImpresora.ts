'use server';

import prisma from "@/lib/prisma";
import { CrearImpresora } from "@/types";

export const crearImpresora = async (impresora: CrearImpresora) => {
  const { brand, model, serial, inkDetails, type, status, imageId } = impresora;

  try {
    const findImpresora = await prisma.printer.findFirst({ where: { serial } });
    if (findImpresora) {
      return {
        data: null,
        message: 'Ya existe una impresora con el mismo serial, por favor verifica.',
        statusCode: 400,
        statusText: 'BAD_REQUEST'
      }
    }

    const impresoraCreada = await prisma.printer.create({
      data: {
        brand,
        model,
        serial,
        inkDetails,
        type,
        status,
        imageId: imageId || null
      }
    });

    return {
      data: impresoraCreada,
      message: 'Impresora registrada correctamente.',
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar registrar la impresora.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};