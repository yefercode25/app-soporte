import { Funcionario } from "@/types"
import { FuncionarioItem } from "."

interface Props {
  funcionarios: Funcionario[]
}

export const ListadoFuncionarios = ({ funcionarios }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {funcionarios.map((funcionario) => (
        <FuncionarioItem
          key={funcionario.id}
          {...funcionario}
        />
      ))}
    </div>
  )
}
