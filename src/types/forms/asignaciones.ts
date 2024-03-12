export interface CrearAsignacion {
  location: string;
  observations?: string;
  userPc: string;
  password: string;
  anydeskCode: string;
  status: 'vigente' | 'inactiva';
  userId: string;
  computerId: string;
  printerId?: string;
}

export interface EditarAsignacion extends CrearAsignacion {
  id: string;
}