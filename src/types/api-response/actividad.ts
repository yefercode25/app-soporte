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
  computerId?: string;
}

export type ActivityPriority = 'baja' | 'normal' | 'alta';

export type ActivityStatus = 'pendiente' | 'en progreso' | 'completada' | 'pospueta';

export interface ListadoActividades {
  actividades: GrupoActividad[];
  month: string;
  year: string;
}

export interface GrupoActividad {
  date: string;
  activities: Actividad[];
}