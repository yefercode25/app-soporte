'use client';

import { ErrorPageProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export const PageError = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="py-5 items-center flex justify-center flex-col-reverse lg:flex-row gap-5 xl:h-screen">
      <div className="w-full relative">
        <div className="relative text-center">
          <div className="">
            <div className="">
              <h1 className="my-2 font-medium text-3xl">
                { error.message }
              </h1>
              <div className='flex items-center justify-center gap-2 mt-3'>
                <button
                  className="sm:w-full lg:w-auto my-1 border rounded md py-2 px-8 text-center bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700"
                  onClick={reset}
                >
                  Reintentar
                </button>
                <Link
                  className="sm:w-full lg:w-auto my-1 border rounded md py-2 px-8 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700"
                  href="/"
                >
                  Regresar al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/img/error.png"
          alt="Error al cargar la página"
          width={400}
          height={400}
        />
      </div>
    </div>
  )
}