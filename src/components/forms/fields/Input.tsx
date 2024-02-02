'use client';

import React, { forwardRef } from "react";
import { FieldErrors } from "react-hook-form";
import { IoLockClosedOutline, IoWarningOutline } from "react-icons/io5";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  icon: React.ReactNode;
  isOptional?: boolean;
  autoComplete?: string;
  errors?: FieldErrors<any>;
  selectOptions?: { value: string; label: string }[];
}

const Input = forwardRef<HTMLInputElement, Props>(({ title, icon, name, placeholder, id, onChange, type, isOptional, autoComplete, errors, selectOptions }: Props, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 text-base font-bold flex gap-2 items-center">
        {title}
        {isOptional && (<span className="text-xs inline-block bg-blue-600 text-white px-2 py-[2px] rounded-md">Opcional</span>)}
      </label>
      <div className="flex items-center justify-start border py-2  border-gray-700 px-3 rounded-md text-gray-800">
        <div className="border-r pr-2 h-full">
          {icon}
        </div>
        {type !== 'textarea' && type !== 'select' && (
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
        )}
        {type === 'textarea' && (
          <textarea
            ref={ref as any}
            className="pl-2 outline-none border-none w-full scrollbar h-[50px]"
            name={name}
            id={id}
            placeholder={placeholder}
            onChange={onChange as any}
            autoComplete={autoComplete}
          />
        )}
        {type === 'select' && (
          <select
            ref={ref as any}
            className="pl-2 outline-none border-none w-full"
            name={name}
            id={id}
            onChange={onChange as any}
          >
            <option value="">{placeholder}</option>
            {selectOptions!.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
      </div>
      {errors![name as any] && (
        <div className="bg-rose-700 text-sm mt-1 text-white flex items-center gap-2 px-2 py-1 rounded-md">
          <IoWarningOutline />
          {String(errors![name as any]?.message)}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
