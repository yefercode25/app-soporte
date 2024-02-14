import { Funcionario } from "@/types"
import { FuncionarioItem } from "."

interface Props {
  funcionarios: Funcionario[]
}

export const ListadoFuncionarios = ({ funcionarios }: Props) => {
  return (
    <div>
      {funcionarios.map((funcionario) => (
        <FuncionarioItem
          key={funcionario.id}
          {...funcionario}
        />
      ))}
    </div>
  )
}
