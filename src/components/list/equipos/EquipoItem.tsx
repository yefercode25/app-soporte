import { Equipo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CgSmartphoneRam } from "react-icons/cg";
import { IoEyeOutline, IoCreateOutline, IoRefreshOutline, IoTrashOutline, IoHardwareChipOutline, IoLogoWindows } from "react-icons/io5";
import { MdOutlineSdStorage } from "react-icons/md";

interface Props {
  equipo: Equipo;

}

export const EquipoItem = ({ equipo }: Props) => {
  const { brand, id, imageRel, model, os, processor, ram, serial, status, storage } = equipo;

  return (
    <div className="px-3 py-4 bg-white text-gray-800 rounded-md overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="aspect-video w-[100px] h-[60px]">
          <Image
            src={imageRel?.secureUrl || '/img/placeholder.png'}
            alt={`Imagen de ${brand} ${model}`}
            width={300}
            height={210}
            loading="lazy"
            className="rounded-md"
          />
        </div>
        <div className="block w-full md:flex md:items-center md:justify-between">
          <div>
            <div className="flex flex-col-reverse gap-2">
              <h2 className="font-bold text-xl flex items-center gap-2">
                {model}
                <span className={`text-xs capitalize px-2 py-[3px] text-white rounded-full ${status !== 'activo' ? 'bg-red-600' : 'bg-green-600'}`}>{status}</span>
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-white px-2 py-[3px] bg-blue-600 rounded-full text-xs font-semibold">{brand}</p>
                <p className="text-white px-2 py-[3px] bg-blue-600 rounded-full text-xs font-semibold">{serial}</p>
              </div>
            </div>
            <div className="text-xs flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <IoHardwareChipOutline />
                <p>{processor}</p>
              </div>
              <div className="flex items-center gap-1">
                <CgSmartphoneRam />
                <p>{ram} GB</p>
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineSdStorage />
                <p>{storage} GB</p>
              </div>
              <div className="flex items-center gap-1">
                <IoLogoWindows />
                <p>{os}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 justify-between">
            <Link
              href={`/equipos/${id}`}
              className="bg-green-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-green-700 font-semibold"
            >
              <span><IoEyeOutline /></span>
            </Link>
            <Link
              href={`/equipos/${id}/editar`}
              className="bg-blue-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
            >
              <span><IoCreateOutline /></span>
            </Link>
            <Link
              href={`/equipos/${id}/eliminar`}
              className="bg-red-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-700 font-semibold"
            >
              <span><IoTrashOutline /></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
