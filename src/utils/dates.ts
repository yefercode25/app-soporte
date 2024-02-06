import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

dayjs.extend(utc as any);
dayjs.extend(timezone as any);

export const fechaFormateada = (fecha: string) => {
  const parseDate = dayjs(fecha).tz('America/Bogota');
  return parseDate.format('dddd DD MMMM');
};

export const horaFormateada = (fecha: string) => {
  const parseDate = dayjs(fecha).tz('America/Bogota');
  return parseDate.format('HH:mm A');
};