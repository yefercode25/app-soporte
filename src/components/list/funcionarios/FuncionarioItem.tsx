import { Funcionario } from "@/types"

interface Props {
  funcionario: Funcionario;
}

export const FuncionarioItem = ({ dependency, email, fullName, id, phone }: Funcionario) => {
  return (
    <div>FuncionarioItem</div>
  )
}
