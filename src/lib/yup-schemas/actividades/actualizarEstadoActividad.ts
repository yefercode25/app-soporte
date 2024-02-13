import * as yup from 'yup';

export const actualizarEstadoActividadSchema = yup.object().shape({
  status: yup.string()
    .required('El estado es obligatorio')
    .oneOf(['pendiente', 'en progreso', 'completada', 'pospueta'], 'El estado no es válido')
});
