import { Funcionario } from "@/types"
import { IoAtOutline, IoBusinessOutline, IoCallOutline } from "react-icons/io5";

interface Props {
  funcionario: Funcionario;
}

export const FuncionarioItem = ({ dependency, email, fullName, id, phone }: Funcionario) => {
  return (
    <div className="px-3 py-4 bg-white text-gray-800 rounded-md overflow-hidden">
      <div className="flex items-center gap-2">
        <div>
          <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white text-2xl font-semibold rounded-full">
            {fullName[0]}
          </span>
        </div>
        <div className="overflow-hidden">
          <h2 className="text-xl font-semibold mb-1">{fullName}</h2>
          <div className="flex items-center gap-1 text-xs to-gray-600 truncate">
            <span><IoAtOutline /></span>
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-1 text-xs to-gray-600">
            <span><IoBusinessOutline /></span>
            <span className="truncate">{dependency || 'No especificada'}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-1 text-xs to-gray-600">
              <span><IoCallOutline /></span>
              <span className="truncate">{phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
