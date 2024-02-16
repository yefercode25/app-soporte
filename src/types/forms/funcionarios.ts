export interface RegistrarFuncionario {
  fullName: string;
  email?: string;
  phone?: string;
  dependency: string;
}

export interface EditarFuncionario extends RegistrarFuncionario {
  id: string;
}