import { AsignacionComputador } from "@/types";
import { AsignacionItem } from ".";
import Image from "next/image";

interface Props {
  asignaciones: AsignacionComputador[];
}

const ListadoAsignaciones = ({ asignaciones }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {asignaciones.length > 0 ? asignaciones.map((asignacion, index) => (
        <AsignacionItem
          key={index}
          asignacion={asignacion}
        />
      )) : (
        <div className="mt-5 flex flex-col items-center">
          <Image src="/img/empty.svg" alt="No hay tareas asociadas" width={250} height={250} />
          <p className="mt-3 font-semibold text-xl">No hay asignaciones registrados.</p>
        </div>
      )}
    </div>
  )
}

export default ListadoAsignaciones