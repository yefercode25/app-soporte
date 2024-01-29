import * as yup from 'yup';

export const registrarUsuarioScheme = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().optional(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});