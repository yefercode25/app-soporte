'use client';

import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { HiOutlineTrash } from 'react-icons/hi';
import { IoCamera, IoSaveOutline } from 'react-icons/io5';
import { MdOutlineCamera, MdOutlineResetTv } from 'react-icons/md';
import Image from 'next/image';
import Cropper, { Area, Point } from 'react-easy-crop';
import { FaArrowRotateLeft, FaArrowRotateRight } from 'react-icons/fa6';
import { getCroppedImg } from '@/utils/crop-images';
import { toaster } from '@/utils/toast';
import { uploadImageToCloudinary } from '@/actions';
import type { UploadApiResponse } from 'cloudinary';

interface Props { 
  setUploadingImage?: (value: UploadApiResponse) => void;
}

export const CameraCapture = ({ setUploadingImage }: Props) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 });
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
      setSelectedDeviceId(backCamera?.deviceId);
    });
  }, []);

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImageSrc(imageSrc || null);
  };

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
  };

  const handleRotation = (degrees: number = 90) => {
    if (degrees === 0) return setRotation(0);
    setRotation((rotation + degrees) % 360);
  }

  const handleCrop = async () => {
    try {
      if (!imageSrc) {
        return;
      }
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      // Ahora puedes hacer lo que quieras con la imagen recortada, como enviarla al servidor o guardarla localmente
      // Por ahora, simplemente puedes mostrarla en una nueva ventana
      setCroppedImage(croppedImageBlob);
    } catch (error) {
      toaster({
        tipo: 'error',
        title: 'Error al recortar imagen',
        description: 'No se ha podido recortar la imagen, intentalo nuevamente.'
      });
    }
  };

  const handleSaveInCloudinary = async () => {
    if(!croppedImage) {
      return toaster({
        tipo: 'error',
        title: 'Error al guardar imagen',
        description: 'No se ha podido guardar la imagen, intentalo nuevamente.'
      });
    }

    const uploadResponse = await uploadImageToCloudinary(croppedImage, 'soporte-app/equipos');
    if (uploadResponse.statusCode === 200) {
      toaster({
        tipo: 'success',
        title: 'Imagen guardada',
        description: 'La imagen se ha guardado correctamente en Cloudinary.'
      });
      setCroppedImage(null);
      setIsUploaded(true);
      if (setUploadingImage) {
        setUploadingImage(uploadResponse.data as UploadApiResponse);
      }
    } else {
      toaster({
        tipo: 'error',
        title: 'Error al guardar imagen',
        description: 'No se ha podido guardar la imagen, intentalo nuevamente.'
      });
    }
  };

  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsCameraActive(!isCameraActive)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <IoCamera /> {isCameraActive ? 'Ocultar cámara' : 'Tomar fotografía'}
        </button>
      </div>
      {isCameraActive && !imageSrc && (
        <div className="flex justify-center mt-4 flex-col items-center">
          <div className="text-gray-800 w-full mb-4">
            <h3 className="font-bold">Selecciona la cámara a utilizar</h3>
            <select
              value={selectedDeviceId || ''}
              onChange={handleCameraChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              {devices.map((device, index) => (
                <option key={index} value={device.deviceId}>{device.label}</option>
              ))}
            </select>
          </div>
          {!imageSrc && (
            <>
              <Webcam
                audio={false}
                videoConstraints={{
                  facingMode: 'environment', // Utiliza la cámara trasera si está disponible
                  deviceId: selectedDeviceId,
                  width: { ideal: 1000 },
                  height: { ideal: 562.5 },
                }}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="rounded-md"
                height={'auto'}
                width={'100%'}
                style={{
                  objectFit: 'cover',
                }}
              />
              <button
                type="button"
                onClick={handleCapture}
                className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
              >
                <MdOutlineCamera /> Realizar captura
              </button>
            </>
          )}
        </div>
      )}
      {!isUploaded && !croppedImage && imageSrc && (
        <div className='mt-4'>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            onCropChange={(crop) => setCrop(crop)}
            onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
            onZoomChange={setZoom}
            style={{
              containerStyle: {
                width: '100%',
                height: '300px',
                position: 'relative',
                objectFit: 'cover',
                aspectRatio: 16 / 9,
              },
              mediaStyle: {
                width: 'auto',
                height: 'auto',
                objectFit: 'cover',
              },
            }}
            rotation={rotation}
            aspect={16 / 9}
          />
          <div className='flex justify-between gap-2'>
            <button
              type="button"
              onClick={() => handleRotation(-90)}
              className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md w-full justify-center"
            >
              <FaArrowRotateLeft />
            </button>
            <button
              type="button"
              onClick={() => handleRotation(0)}
              className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md w-full justify-center"
            >
              <MdOutlineResetTv />
            </button>
            <button
              type="button"
              onClick={() => handleRotation(90)}
              className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-md w-full justify-center"
            >
              <FaArrowRotateRight />
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleCrop()}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <IoSaveOutline /> Guardar captura
          </button>
          <button
            type="button"
            onClick={() => setImageSrc(null)}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
          >
            <HiOutlineTrash /> Eliminar captura
          </button>
        </div>
      )}
      {!isUploaded && croppedImage && (
        <div className="mt-4">
          <Image src={croppedImage} alt="Imagen recortada" width={1000} height={562.5} />
          <button
            type="button"
            onClick={() => handleSaveInCloudinary()}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <IoSaveOutline /> Cargar a Cloudinary
          </button>
          <button
            type="button"
            onClick={() => setCroppedImage(null)}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
          >
            <HiOutlineTrash /> Recortar nuevamente
          </button>
        </div>
      )}

      {isUploaded && (
        <div className="mt-4">
          <Image className='rounded-md' src={croppedImage || ''} alt="Imagen recortada" width={1000} height={562.5} />
          <p className="px-2 py-1 bg-green-600 text-white mt-2 rounded-md text-center">Imagen cargada a Cloudinary</p>
          <button
            type="button"
            onClick={() => setIsUploaded(false)}
            className="w-full mt-2 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
          >
            <HiOutlineTrash /> Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
};
