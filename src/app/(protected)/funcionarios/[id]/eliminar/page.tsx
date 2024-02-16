import { obtenerFuncionario } from '@/actions';
import { Controls, EliminarFuncionarioForm } from '@/components';
import { APIResponse, Funcionario, PageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Eliminar funcionario | App Soporte',
  description: 'Elimina un funcionario de la base de datos',
};

export default async function EliminarFuncionarioPage({ params }: PageProps) {
  const id = params?.id;
  const { data } = await obtenerFuncionario(id) as APIResponse<Funcionario>;

  if (!data) throw notFound();

  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl mb-1">Eliminar funcionario</h1>
        <p className="mt-2 text-red-500 font-medium">Si eliminas el funcionario, se perderá toda la información relacionada con el.</p>
        <h3 className="mt-4">¿Estás seguro de que deseas eliminar el funcionario {`"${data?.fullName?.trim()}"`}?</h3>

        <EliminarFuncionarioForm id={id} />
      </div>
      <Controls returnLink={`/actividades/${id}`} />
    </div>
  );
}