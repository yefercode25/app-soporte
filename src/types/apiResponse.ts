export interface APIResponse<T> {
  message: string;
  data: T;
  statusCode: number;
  statusText: string;
}

export interface IniciarSesion {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface Actividad {
  id: string;
  title: string;
  observation: string;
  createdAt: Date;
  priority: string;
  posponedAt: Date;
  completedAt: Date;
  status: 'pendiente' | 'en progreso' | 'completada' | 'pospueta';
  userId: string;
  employeeId: string;
  employee: Employee;
}

export interface SubActivity {
  id: string;
  title: string;
  createdAt: Date;
  isCompleted: boolean;
  activityId: string;
}

export interface Employee {
  dependency: string;
  email: string;
  fullName: string;
  id: string;
  phone: string;
}

export interface ListadoActividades {
  actividades: GrupoActividad[];
  month: string;
  year: string;
}

export interface GrupoActividad {
  date: string;
  activities: Actividad[];
}