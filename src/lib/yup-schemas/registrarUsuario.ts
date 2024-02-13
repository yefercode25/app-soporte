import * as yup from 'yup';

export const registrarUsuarioSchema = yup.object().shape({
  name: yup.string()
    .required('El nombre del usuario es requerido.'),
  lastName: yup.string().optional(),
  email: yup.string()
    .email('El correo electrónico no es válido.')
    .required('El correo electrónico es requerido.'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('La contraseña es requerida y debe tener al menos 6 caracteres.'),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir.')
    .required('La confirmación de la contraseña es requerida.'),
});