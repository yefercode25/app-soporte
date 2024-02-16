import { obtenerActividad } from '@/actions';
import { Controls, EditarActividadForm } from '@/components';
import { APIResponse, Actividad, PageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';

export const metadata: Metadata = {
  title: 'Editar actividad | Soporte App',
  description: 'Edita la información de la actividad seleccionada.'
};

export default async function EditarActividadPage({ params }: PageProps) {
  const { id } = params;
  const { data } = await obtenerActividad(id) as APIResponse<Actividad>;
  const session = await getServerSession(authOptions);
  
  if (!data) throw notFound();

  if(session?.user?.id !== data.userId) {
    throw new Error('No tienes permisos para editar esta actividad');
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1 flex flex-col-reverse md:flex-row items-start md:items-center gap-2">
        Editar actividad
        <span className="text-xs font-semibold inline-block px-2 py-[2px] bg-blue-600 text-white rounded-full">{data.title}</span>
      </h1>
      <span className="text-sm mb-4 inline-block">
        Si lo deseas, puedes editar la información de esta actividad y guardar los cambios.
      </span>

      <EditarActividadForm actividad={data} />

      <Controls returnLink='/actividades' />
    </div>
  );
}