import { Funcionario } from "@/types"
import { FuncionarioItem } from "."
import Image from "next/image"

interface Props {
  funcionarios: Funcionario[]
}

export const ListadoFuncionarios = ({ funcionarios }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {funcionarios.length > 0 ? funcionarios.map((funcionario) => (
        <FuncionarioItem
          key={funcionario.id}
          {...funcionario}
        />
      )) : (
        <div className="mt-5 flex flex-col items-center">
          <Image src="/img/empty.svg" alt="No hay tareas asociadas" width={250} height={250} />
          <p className="mt-3 font-semibold text-xl">No hay funcionarios registrados.</p>
        </div>
      )}
    </div>
  )
}
