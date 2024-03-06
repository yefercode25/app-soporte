import { Equipo } from "@/types";
import { EquipoItem } from ".";
import Image from "next/image";

interface Props {
  equipos: Equipo[];
}

export const ListadoEquipos = ({ equipos }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {equipos.length > 0 ? equipos.map((equipo, index) => (
        <EquipoItem
          key={index}
          equipo={equipo}
        />
      )) : (
        <div className="mt-5 flex flex-col items-center">
          <Image src="/img/empty.svg" alt="No hay tareas asociadas" width={250} height={250} />
          <p className="mt-3 font-semibold text-xl">No hay equipos registrados.</p>
        </div>
      )}
    </div>
  )
}

export default ListadoEquipos;