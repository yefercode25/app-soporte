import { obtenerFuncionario } from '@/actions';
import { EditarFuncionarioForm } from '@/components';
import { APIResponse, Funcionario, PageProps } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Editar funcionario | App Soporte',
  description: 'Edita la información de un funcionario',
};

export default async function EditarFuncionarioPage({ params }: PageProps) {
  const { id } = params;
  const { data } = await obtenerFuncionario(id) as APIResponse<Funcionario>;

  if (!data) throw notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1 flex flex-col-reverse md:flex-row items-start md:items-center gap-2">
        Editar funcionario
        <span className="text-xs font-semibold inline-block px-2 py-[2px] bg-blue-600 text-white rounded-full">{data.fullName}</span>
      </h1>
      <span className="text-sm mb-4 inline-block">
        Si lo deseas, puedes editar la información de este funcionario y guardar los cambios.
      </span>

      <EditarFuncionarioForm funcionario={data} />
    </div>
  );
}