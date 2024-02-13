import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as ESlocale from 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.extend(utc as any);
dayjs.extend(timezone as any);
dayjs.locale(ESlocale);

export const convertToISO = (date: string) => {
  return dayjs(date).toISOString();
};