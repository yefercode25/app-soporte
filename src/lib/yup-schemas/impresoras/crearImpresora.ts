import * as yup from 'yup';

export const crearImpresoraSchema = yup.object().shape({
  brand: yup.string()
    .required('La marca es requerida.'),
  model: yup.string()
    .required('El modelo es requerido.'),
  serial: yup.string()
    .required('El serial es requerido.'),
  inkDetails: yup.string()
    .required('Los detalles de la tinta son requeridos.'),
  type: yup.string()
    .required('El tipo es requerido.')
    .oneOf(['laser', 'inyección', 'matriz'], 'El tipo debe ser láser, inyección o matriz.'),
  status: yup.string()
    .required('El estado es requerido.')
    .oneOf(['activo', 'inactivo', 'en reparación'], 'El estado debe ser activo, inactivo o en reparación.'),
  imageId: yup.string()
    .optional()
});