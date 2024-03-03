import * as yup from 'yup';

export const crearEquipoSchema = yup.object().shape({
  brand: yup.string()
    .required('La marca es requerida.'),
  model: yup.string()
    .required('El modelo es requerido.'),
  serial: yup.string()
    .required('El serial es requerido.'),
  processor: yup.string()
    .required('El procesador es requerido.'),
  ram: yup.number()
    .required('La memoria RAM es requerida.')
    .positive('La memoria RAM debe ser un número positivo.')
    .integer('La memoria RAM debe ser un número entero.')
    .typeError('La memoria RAM debe ser un número entero.'),
  storage: yup.number()
    .required('El almacenamiento es requerido.')
    .positive('El almacenamiento debe ser un número positivo.')
    .integer('El almacenamiento debe ser un número entero.')
    .typeError('El almacenamiento debe ser un número entero.'),
  os: yup.string()
    .required('El sistema operativo es requerido.'),
  peripherals: yup.string()
    .required('Los periféricos son requeridos.'),
  type: yup.string()
    .required('El tipo es requerido.')
    .oneOf(['laptop', 'desktop', 'server'], 'El tipo debe ser laptop, desktop o server.'),
  status: yup.string()
    .required('El estado es requerido.')
    .oneOf(['activo', 'inactivo', 'en reparación'], 'El estado debe ser activo, inactivo o en reparación.'),
  imageId: yup.string()
    .optional()
});