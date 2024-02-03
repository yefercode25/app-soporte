import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const fechaFormateada = (fecha: string) => {
  const parseDate = parseISO(fecha);
  return format(parseDate, "EEEE, dd 'de' MMMM", { locale: es });
};

export const horaFormateada = (fecha: string) => {
  const parseDate = parseISO(fecha);
  return format(parseDate, "hh:mm a");
};