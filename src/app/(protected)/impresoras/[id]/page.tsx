import { obtenerImpresora } from "@/actions";
import { Controls } from "@/components";
import { APIResponse, Impresora, PageProps } from "@/types";
import Image from "next/image";
import { ImPrinter } from "react-icons/im";
import { IoIosWater } from "react-icons/io";
import { IoAlbumsOutline, IoBagRemoveOutline, IoPrintOutline, IoSparklesOutline } from "react-icons/io5";

export default async function DetallesImpresoraPage({ params }: PageProps) {
  const { id } = params;
  const { data: print } = await obtenerImpresora(id) as APIResponse<Impresora>;
  
  return (
    <div>
      <div>
        <div className="flex flex-col items-start gap-2 text-white">
          <span
            className={`text-xs ${print.status === 'inactivo' ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full`}
          >
            <span className="font-bold">Estado: </span> {print?.status}
          </span>
          <h1 className="text-2xl font-extrabold flex items-center gap-2 flex-wrap">
            {print.brand} - {print.model}
            <span className="text-xs px-2 py-[4px] bg-blue-600 rounded-full uppercase">{print.serial}</span>
          </h1>
        </div>
      </div>
      <div className="mt-3 max-w-[400px]">
        <Image
          src={print.imageRel?.secureUrl ?? '/img/placeholder.png'}
          alt={`${print.brand} ${print.model}`}
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
            <span className="font-normal">{print.brand}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoPrintOutline />
            <span> Modelo: </span>
            <span className="font-normal">{print.model}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoSparklesOutline />
            <span> Serial: </span>
            <span className="font-normal">{print.serial}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoIosWater />
            <span> Detalles de la tinta: </span>
            <span className="font-normal">{print.inkDetails}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <ImPrinter />
            <span> Tipo de impresora: </span>
            <span className="font-normal capitalize">{print.type}</span>
          </p>
          <p className="flex items-center gap-2 font-extrabold">
            <IoAlbumsOutline />
            <span> Estado: </span>
            <span className={`capitalize font-normal text-sm ${print.status === 'inactivo' ? 'bg-red-600' : 'bg-green-600'} text-white px-3 py-1 rounded-full`}>{print.status}</span>
          </p>
        </div>
      </div>
      <Controls returnLink="/impresoras" />
    </div>
  );
}