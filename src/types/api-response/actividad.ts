import { Equipo, Funcionario, Imagen, Impresora, SubActivity } from ".";

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
  imagesId: null;
  printerId: string;
  computer: Equipo;
  images: Imagen[];
  printer: Impresora;
  user: ActivityUser;
  SubActivity: SubActivity[];
  ActivityImage: ActivityImages[];
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

export interface ActivityUser {
  id: string;
  name: string;
  lastName: string;
}

export interface ActivityImages {
  id: string;
  activityId: string;
  imageId: string;
  activity: Actividad;
  image: Imagen;
}