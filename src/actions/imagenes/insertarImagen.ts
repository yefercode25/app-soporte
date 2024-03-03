'use server';

import prisma from "@/lib/prisma";
import { UploadApiResponse } from "cloudinary";

export const insertarImagen = async (image: UploadApiResponse) => {
  try {
    const { secure_url, public_id } = image;

    const insertImage = await prisma.image.create({
      data: {
        secureUrl: secure_url,
        cloudinaryId: public_id,
      }
    });

    return {
      data: insertImage,
      message: 'Imagen registrada correctamente.',
      statusCode: 201,
      statusText: 'CREATED'
    }
  } catch (error) {
    console.log("🚀 ~ insertarImagen ~ error:", error)
    return {
      data: null,
      message: 'Se ha producido un error al registrar la imagen en la base de datos.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};