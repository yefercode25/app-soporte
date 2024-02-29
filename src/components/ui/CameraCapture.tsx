'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { IoCamera } from "react-icons/io5";
import { MdOutlineCamera } from "react-icons/md";
import Webcam from "react-webcam";

export const CameraCapture = () => {
  const webcamRef = useRef(null) as any;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<{ deviceId: string }>({ deviceId: '' });
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [resetCamera, setResetCamera] = useState<boolean>(false);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  }

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceId({ deviceId: event.target.value });
    setResetCamera(true);
    setTimeout(() => {
      setResetCamera(false);
    }, 500);
  };

  useEffect(() => {
    const handleDevices = (mediaDevices: MediaDeviceInfo[]) => {
      const videoDevices = mediaDevices.filter(({ kind }) => kind === 'videoinput');
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
    };

    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  useEffect(() => {
    if (devices.length > 0) {
      const backCamera = devices.find(device => device.label.toLowerCase().includes('back'));
      if (backCamera) {
        setDeviceId({ deviceId: backCamera.deviceId });
      } else {
        setDeviceId({ deviceId: devices[0].deviceId });
      }
    }
  }, [devices]);

  return (
    <div className="p-3 bg-white rounded-md">
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setIsCameraActive(!isCameraActive)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <IoCamera /> {isCameraActive ? "Ocultar cámara" : "Tomar fotografía"}
        </button>
      </div>
      {isCameraActive && !imageSrc && (
        <div className="flex justify-center mt-4 flex-col items-center">
          <div className="text-gray-800 w-full mb-4">
            <h3 className="font-bold">Selecciona la cámara a utilizar</h3>
            <select
              value={deviceId.deviceId}
              onChange={handleCameraChange}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              {devices.map((device, index) => (
                <option key={index} value={device.deviceId}>{device.label}</option>
              ))}
            </select>
          </div>

          {!resetCamera && (
            <>
              <Webcam
                audio={false}
                videoConstraints={{
                  width: 1000,
                  height: 562.5,
                  facingMode: "user",
                  deviceId: deviceId.deviceId
                }}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="rounded-md aspect-video"
                height={562.5}
                width={1000}
              />
              <button
                type="button"
                onClick={() => handleCapture()}
                className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
              >
                <MdOutlineCamera /> Realizar captura
              </button>
            </>
          )}
        </div>
      )}
      {imageSrc && (
        <div className="flex justify-center mt-4 flex-col p-3 bg-gray-800 rounded-md">
          <h3 className="font-bold mb-2">Imagen capturada:</h3>
          <Image
            className="rounded-md"
            src={imageSrc}
            alt="Captured Image"
            width={1000}
            height={562.5}
          />
          <button
            type="button"
            onClick={() => setImageSrc(null)}
            className="mt-4 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md"
          >
            <HiOutlineTrash /> Eliminar captura
          </button>
        </div>
      )}
    </div>
  )
}
