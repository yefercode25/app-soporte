import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as locale from 'dayjs/locale/es'; // Importar el idioma español
import dayjs from 'dayjs';

dayjs.extend(utc as any);
dayjs.extend(timezone as any);
dayjs.locale(locale); // Establecer el idioma español

export const fechaFormateada = (fecha: string) => {
  return dayjs(fecha).format('dddd, DD MMMM');
};

export const horaFormateada = (fecha: string) => {
  return dayjs(fecha).format('HH:mm A');
};

export const obtenerZonaHoraria = () => {
  return dayjs.tz.guess();
};

export const convertToISO = (date: string) => {
  return dayjs(date).toISOString();
};