import { obtenerEquipo } from "@/actions";
import { Controls } from "@/components";
import { APIResponse, Equipo, PageProps } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import { CgSmartphoneRam } from "react-icons/cg";
import { FaComputer, FaRegKeyboard } from "react-icons/fa6";
import { IoAlbumsOutline, IoBagRemoveOutline, IoHardwareChipOutline, IoLaptopOutline, IoLogoWindows, IoSparklesOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Información Equipo | Soporte App",
  description: "Conoce más sobre el computador solicitado",
};

export default async function InformacionEquipoPage({ params }: PageProps) {
  const { id } = params;
  const { data: computer } = await obtenerEquipo(id) as APIResponse<Equipo>;

  return (
    <div>
      <div>
        <div className="flex flex-col items-start gap-2 text-white">
          <span
            className={`text-xs ${computer.status === 'inactivo' ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full`}
          >
            <span className="font-bold">Estado: </span> {computer?.status}
          </span>
          <h1 className="text-2xl font-extrabold flex items-center gap-2 flex-wrap">
            {computer.brand} - {computer.model}
            <span className="text-xs px-2 py-[4px] bg-blue-600 rounded-full uppercase">{computer.serial}</span>
          </h1>
        </div>
      </div>
      <div className="mt-3 max-w-[400px]">
        <Image
          src={computer.imageRel?.secureUrl ?? '/img/placeholder.png'}
          alt={`${computer.brand} ${computer.model}`}
          width={800}
          height={500}
          layout="responsive"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 font-extrabold">
            <IoBagRemoveOutline />
            <span> Marca: </span>
            <span className="font-normal">{computer.brand}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoLaptopOutline />
            <span> Modelo: </span>
            <span className="font-normal">{computer.model}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoSparklesOutline />
            <span> Serial: </span>
            <span className="font-normal">{computer.serial}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoHardwareChipOutline />
            <span> Procesador: </span>
            <span className="font-normal">{computer.processor}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <CgSmartphoneRam />
            <span> Memoria RAM: </span>
            <span className="font-normal">{computer.ram} GB</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <CgSmartphoneRam />
            <span> Almacenamiento: </span>
            <span className="font-normal">{computer.storage} GB</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoLogoWindows />
            <span> Sistema operativo: </span>
            <span className="font-normal">{computer.os} GB</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <FaRegKeyboard />
            <span> Periféricos: </span>
            <div>
              {(computer.peripherals?.length ?? 0) === 0 && (
                <span className="font-normal">No se han registrado periféricos</span>
              )}
              {(computer.peripherals?.length ?? 0) > 0 && (
                <div className="flex items-center flex-wrap gap-2">
                  {computer.peripherals?.map((peripheral, index) => (
                    <span key={index} className="inline-block font-normal px-2 py-[3px] bg-blue-600 text-sm rounded-full">{peripheral}</span>
                  ))}
                </div>
              )}
            </div>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <FaComputer />
            <span> Tipo de equipo: </span>
            <span className="font-normal capitalize">{computer.type}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoAlbumsOutline />
            <span> Estado: </span>
            <span className={`font-normal text-sm ${computer.status === 'inactivo' ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full`}>{computer.status}</span>
          </p>
        </div>
      </div>
      <Controls returnLink="/equipos" />
    </div>
  );
}