'use server';

import prisma from "@/lib/prisma";
import { EditarImpresora } from "@/types";

export const actualizarImpresora = async (data: EditarImpresora) => {
  try {
    const { brand, id, inkDetails, model, serial, status, type, imageId } = data;

    const findImpresora = await prisma.printer.findUnique({ where: { id } });
    if (!findImpresora) {
      return {
        data: null,
        message: 'No se ha encontrado la impresora que se intenta actualizar.',
        statusCode: 404,
        statusText: 'NOT_FOUND'
      };
    }

    const findImpresoraWithSerial = await prisma.printer.findFirst({ 
      where: { serial, NOT: { id }}, 
    });
    if (findImpresoraWithSerial) {
      return {
        data: null,
        message: 'Ya existe una impresora con el mismo serial, por favor verifica.',
        statusCode: 400,
        statusText: 'BAD_REQUEST'
      };
    }

    const updateImpresora = await prisma.printer.update({
      where: { id },
      data: {
        brand,
        inkDetails,
        model,
        serial,
        status,
        type,
        imageId: !!imageId ? imageId : findImpresora.imageId
      }
    });

    return {
      data: updateImpresora,
      message: 'Se ha actualizado la impresora correctamente.',
      statusCode: 200,
      statusText: 'OK'
    };
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al intentar actualizar la impresora.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    };
  }
};