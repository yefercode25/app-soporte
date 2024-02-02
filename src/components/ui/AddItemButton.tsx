import Link from "next/link"
import { FaPlus } from "react-icons/fa6"

interface Props {
  path: string
}

export const AddItemButton = ({path }: Props) => {
  return (
    <div className="fixed bottom-[90px] xl:bottom-10 right-5 xl:right-10 bg-blue-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
      <Link href={path}>
        <FaPlus />
      </Link>
    </div>
  )
}