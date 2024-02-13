import { Usuario } from ".";

export interface IniciarSesion {
  token: string;
  user: Usuario;
}