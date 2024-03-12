import * as yup from 'yup';

export const crearAsignacionSchema = yup.object().shape({
  location: yup.string()
    .required('ingresa la ubicación del equipo'),
  observations: yup.string().optional(),
  userPc: yup.string()
    .required('ingresa el usuario principal del equipo'),
  password: yup.string()
    .required('ingresa la contraseña del equipo asignado'),
  anydeskCode: yup.string()
    .required('ingresa el código de acceso Anydesk del equipo'),
  status: yup.string()
    .required('selecciona el estado de la asignación')
    .oneOf(['vigente', 'inactiva'], 'selecciona un estado válido'),
  userId: yup.string()
    .required('selecciona el funcionario al que se le asignará el equipo'),
  computerId: yup.string()
    .required('selecciona el equipo que se asignará'),
  printerId: yup.string().optional(),
});