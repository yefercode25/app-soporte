export interface APIResponse<T> {
  message: string;
  data: T;
  statusCode: number;
  statusText: string;
}

export interface IniciarSesion {
  token: string;
  user:  User;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string;
}