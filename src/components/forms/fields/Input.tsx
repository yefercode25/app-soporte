import { IoLockClosedOutline } from "react-icons/io5"

interface Props {
  title: string;
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  id?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOptional?: boolean;
}

export const Input = ({ title, icon, name, placeholder, id, onChange, type, isOptional }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1 text-base font-bold flex gap-2 items-center">
        { title }
        { isOptional && (<span className="text-xs inline-block bg-blue-600 text-white px-2 py-[2px] rounded-md">Opcional</span>)}
      </label>
      <div className="flex items-center border py-2  border-gray-700 px-3 rounded-md mb-4 text-gray-800">
        { icon }
        <input
          className="pl-2 outline-none border-none"
          type={type || 'text'}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}