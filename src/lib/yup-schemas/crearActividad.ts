import * as yup from 'yup';

export const crearActividadSchema = yup.object().shape({
  title: yup.string()
    .min(6, 'El título de la actividad debe tener al menos 6 caracteres.')
    .required('El título de la actividad es requerido.'),
  observation: yup.string().optional(),
  createdAt: yup.string()
    .required('La fecha de creación de la actividad es requerida.'),
  posponedAt: yup.string().optional(),
  // low, normal, high
  priority: yup.string()
    .oneOf(['baja', 'normal', 'alta'], 'La prioridad de la actividad no es válida.')
    .required('La prioridad de la actividad es requerida.'),
  // pending, in-progress, completed, postponed
  userId: yup.string()
    .required('El usuario al que crear la actividad es requerido.'),
  employeeId: yup.string()
    .required('Se debe seleccionar el funcionario solicitante.')
});