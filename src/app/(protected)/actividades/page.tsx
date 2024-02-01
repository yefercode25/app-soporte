import Link from "next/link";
import { Metadata } from "next";
import { FaPlus } from "react-icons/fa6";

export const metadata: Metadata = {
  title: 'Actividades | App Soporte',
  description: 'Visualiza las actividades que has realizado en tu día a día.',
};

export default function ActividadesPage() {
  return (
    <div className="relative">
      <div className="fixed bottom-[90px] xl:bottom-10 right-5 xl:right-10 bg-blue-600 text-white py-4 p-4 rounded-full cursor-pointer visible transition-all duration-300 text-2xl">
        <Link href="/actividades/crear">
          <FaPlus />
        </Link>
      </div>
    </div>
  );
}