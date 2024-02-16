import * as yup from 'yup';
import { dataDependencias } from '@/lib/data';

export const editarFuncionarioSchema = yup.object().shape({
  id: yup.string().required('El id del funcionario es obligatorio'),
  fullName: yup.string().required('El nombre completo es obligatorio'),
  email: yup.string().email('El correo electrónico no es válido'),
  phone: yup.string().optional(),
  dependency: yup.string().required('La dependencia es obligatoria')
    .oneOf(dataDependencias),
});