import { Funcionario } from ".";

export interface Actividad {
  id: string;
  title: string;
  observation: string;
  createdAt: Date;
  priority: 'baja' | 'normal' | 'alta';
  posponedAt: Date;
  completedAt: Date;
  status: 'pendiente' | 'en progreso' | 'completada' | 'pospueta';
  userId: string;
  employeeId: string;
  employee: Funcionario;
}

export type ActivityPriority = 'baja' | 'normal' | 'alta';

export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada' | 'pospueta';