export interface GestionarActividad {
  title: string;
  observation?: string;
  createdAt: string;
  posponedAt?: string;
  priority: 'baja' | 'normal' | 'alta';
  userId: string;
  employeeId: string;
}