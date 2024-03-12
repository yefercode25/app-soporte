import { Impresora } from "@/types"
import { ImpresoraItem } from "."
import Image from "next/image"

interface Props {
  impresoras: Impresora[]
}

export const ListadoImpresoras = ({ impresoras }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {impresoras.length > 0 ? impresoras.map((impresora, index) => (
        <ImpresoraItem
          key={index}
          impresora={impresora}
        />
      )) : (
        <div className="mt-5 flex flex-col items-center">
          <Image src="/img/empty.svg" alt="No hay tareas asociadas" width={250} height={250} />
          <p className="mt-3 font-semibold text-xl">No hay impresoras registradas.</p>
        </div>
      )}
    </div>
  )
}
