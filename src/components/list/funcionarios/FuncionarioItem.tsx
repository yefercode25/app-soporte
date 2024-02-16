import { Funcionario } from "@/types"
import Link from "next/link";
import { IoAtOutline, IoBusinessOutline, IoCallOutline, IoCreateOutline, IoTrashOutline } from "react-icons/io5";

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
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
          <div className="mt-4 flex gap-2 justify-between">
            <Link
              href={`/funcionarios/${id}/editar`}
              className="bg-blue-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700 font-semibold"
            >
              <span><IoCreateOutline /></span>
            </Link>
            <Link
              href={`/funcionarios/${id}/eliminar`}
              className="bg-red-600 text-white w-full justify-center flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 hover:bg-red-700 font-semibold"
            >
              <span><IoTrashOutline /></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
