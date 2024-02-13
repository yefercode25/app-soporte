import * as yup from 'yup';

export const iniciarSesionSchema = yup.object().shape({
  email: yup.string()
    .email('El correo electrónico no es válido.')
    .required('Ingresa tu correo electrónico.'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('Ingresa tu contraseña.'),
  rememberMe: yup.boolean().optional(),
});