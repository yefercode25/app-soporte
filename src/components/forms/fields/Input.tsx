import React, { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { IoLockClosedOutline, IoWarningOutline } from "react-icons/io5";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  icon: React.ReactNode;
  isOptional?: boolean;
  autoComplete?: string;
  errors: FieldErrors<any>;
}

const Input = forwardRef<HTMLInputElement, Props>(({ title, icon, name, placeholder, id, onChange, type, isOptional, autoComplete, errors }: Props, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 text-base font-bold flex gap-2 items-center">
        {title}
        {isOptional && (<span className="text-xs inline-block bg-blue-600 text-white px-2 py-[2px] rounded-md">Opcional</span>)}
      </label>
      <div className="flex items-center border py-2  border-gray-700 px-3 rounded-md text-gray-800">
        {icon}
        <input
          ref={ref}
          className="pl-2 outline-none border-none w-full"
          type={type || 'text'}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={type === 'password' ? 'new-password' : autoComplete}
        />
      </div>
      {errors[name as any] && (
        <div className="bg-red-600 text-sm mt-1 text-white flex items-center gap-2 px-2 py-1 rounded-md">
          <IoWarningOutline />
          {String(errors[name as any]?.message)}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
