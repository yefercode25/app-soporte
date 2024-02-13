import * as yup from 'yup';

export const registrarSubActividadSchema = yup.object().shape({
  title: yup.string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),
  createdAt: yup.string()
    .required('La fecha de creación es obligatoria'),
  isCompleted: yup.boolean()
    .required('El estado de la sub actividad es obligatorio')
    .default(false),
  activityId: yup.string()
    .required('La actividad es obligatoria')
});