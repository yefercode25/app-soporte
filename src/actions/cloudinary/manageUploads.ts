'use server';

import cloudinary from 'cloudinary';

const v2Cloudinary = cloudinary.v2;

v2Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type folderCloud = 'soporte-app/equipos' | 'soporte-app/impresoras' | 'soporte-app/actividades';

export const uploadImageToCloudinary = async (image: string, folder: folderCloud) => {
  try {
    const response = await v2Cloudinary.uploader.upload(image, {
      folder: folder,
      resource_type: 'auto',
    });

    return {
      data: response,
      message: 'La imagen se ha subido correctamente a Cloudinary.',
      statusCode: 200,
      statusText: 'OK'
    }
  } catch (error) {
    return {
      data: null,
      message: 'Se ha producido un error al subir la imagen a Cloudinary.',
      statusCode: 500,
      statusText: 'INTERNAL_SERVER_ERROR'
    }
  }
};