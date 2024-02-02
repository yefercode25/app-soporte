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

export const iniciarSesionSchema = yup.object().shape({
  email: yup.string()
    .email('El correo electrónico no es válido.')
    .required('Ingresa tu correo electrónico.'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('Ingresa tu contraseña.'),
  rememberMe: yup.boolean().optional(),
});

export const crearActividad = yup.object().shape({
  title: yup.string()
    .min(6, 'El título de la actividad debe tener al menos 6 caracteres.')
    .required('El título de la actividad es requerido.'),
  observation: yup.string().optional(),
  createdAt: yup.string()
    .required('La fecha de creación de la actividad es requerida.'),
  posponedAt: yup.string().optional(),
  // low, normal, high
  priority: yup.string()
    .oneOf(['low', 'normal', 'high'], 'La prioridad de la actividad no es válida.')
    .required('La prioridad de la actividad es requerida.'),
  // pending, in-progress, completed, postponed
  userId: yup.string()
    .required('El usuario al que crear la actividad es requerido.'),
  employeeId: yup.string()
    .required('Se debe seleccionar el funcionario solicitante.')
});