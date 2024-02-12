import Link from "next/link";
import { Metadata } from "next";
import { FaPlus } from "react-icons/fa6";
import { ActivitiesList } from "@/components";
import { APIResponse, ListadoActividades } from "@/types";
import { listarActividades } from "@/actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Actividades | App Soporte',
  description: 'Visualiza las actividades que has realizado en tu día a día.',
};

export default async function ActividadesPage() {
  const listado: APIResponse<ListadoActividades> = await listarActividades({}) as APIResponse<ListadoActividades>;

  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Actividades realizadas en {format(listado.data.month, 'LLLL', { locale: es })}
      </h1>

      {listado?.data?.actividades?.length > 0 && (
        <ActivitiesList
          actividades={listado?.data?.actividades}
        />
      )}

      {listado?.data?.actividades?.length === 0 && (
        <div className="flex flex-col items-center mt-10 gap-2">
          <Image src="/img/empty.svg" width={250} height={250} alt="No hay actividades" />
          <p className="mt-3 text-xl font-semibold text-center">No hay actividades registradas en este mes.</p>
        </div>
      )}

      <Link href="/actividades/crear" className="fixed bottom-[90px] xl:bottom-10 right-5 xl:right-10 bg-blue-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
        <FaPlus />
      </Link>
    </div>
  );
}