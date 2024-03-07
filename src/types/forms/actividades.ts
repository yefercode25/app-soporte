import { ActivityStatus } from "..";

export interface GestionarActividad {
  title: string;
  observation?: string;
  createdAt: string;
  posponedAt?: string;
  priority: 'baja' | 'normal' | 'alta';
  userId: string;
  employeeId: string;
  computerId?: string;
  printerId?: string;
}

export interface ActualizarEstadoActividad {
  status: ActivityStatus;
}

export interface EditarActividad extends GestionarActividad {
  id: string;
}