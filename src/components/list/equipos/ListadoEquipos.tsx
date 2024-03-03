import { Equipo } from "@/types";
import { EquipoItem } from ".";

interface Props {
  equipos: Equipo[];
}

export const ListadoEquipos = ({ equipos }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {equipos.map((equipo, index) => (
        <EquipoItem
          key={index}
          equipo={equipo}
        />
      ))}
    </div>
  )
}

export default ListadoEquipos;