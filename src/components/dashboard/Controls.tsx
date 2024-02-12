import Link from 'next/link'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { IoArrowBackOutline } from 'react-icons/io5';

interface ControlsProps {
  children?: React.ReactNode;
  returnLink?: string;
}

export const Controls = ({ children, returnLink }: ControlsProps) => {
  return (
    <div className='fixed bottom-[90px] xl:bottom-10 right-5 xl:right-10 inline-flex flex-col gap-4'>
      {returnLink && (
        <Link href={returnLink} className="bg-pink-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
          <IoArrowBackOutline />
        </Link>
      )}
      {children}
    </div>
  )
}
