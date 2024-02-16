import { listarFuncionarios } from '@/actions';
import { AddItemButton, Controls, ListadoFuncionarios } from '@/components';
import { APIResponse, Funcionario } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listado de funcionarios | App Soporte',
  description: 'Listado de funcionarios registrados en la aplicación',
};

export default async function FuncionariosPage() {
  const listadoFuncionarios = await listarFuncionarios();
  if(listadoFuncionarios.statusCode !== 200) {
    throw new Error('Error al obtener el listado de funcionarios');
  }

  const funcionarios: Funcionario[] = listadoFuncionarios.data as any as Funcionario[];

  return (
    <div className="relative">
      <h1 className="text-2xl font-extrabold mb-4">
        Funcionarios registrados
      </h1>

      <ListadoFuncionarios 
        funcionarios={funcionarios} 
      />

      <Controls returnLink='/'>
        <AddItemButton path="/funcionarios/crear" />
      </Controls>
    </div>
  );
}