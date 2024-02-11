import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as locale from 'dayjs/locale/es'; // Importar el idioma español
import dayjs from 'dayjs';

dayjs.extend(utc as any);
dayjs.extend(timezone as any);
dayjs.locale(locale); // Establecer el idioma español

export const fechaFormateada = (fecha: string) => {
  const parseDate = dayjs(fecha).tz('America/Bogota');
  return parseDate.format('dddd, DD MMMM');
};

export const horaFormateada = (fecha: string) => {
  const parseDate = dayjs(fecha).tz('America/Bogota');
  return parseDate.format('HH:mm A');
};

export const obtenerZonaHoraria = () => {
  return dayjs.tz.guess();
};

export const convertToAmericana = (date: string) => {
  const currentZone = dayjs.tz.guess();
  const toConvertZone = 'America/Bogota';

  if (currentZone === toConvertZone) return date;

  return dayjs(date).tz(toConvertZone).format();
};