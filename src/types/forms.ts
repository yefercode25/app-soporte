export interface GestionarTarea {
  title: string;
  observation?: string;
  createdAt: string;
  posponedAt?: string;
  priority: 'baja' | 'normal' | 'alta';
  userId: string;
  employeeId: string;
}