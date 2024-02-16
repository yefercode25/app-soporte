import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as ESlocale from 'dayjs/locale/es';
import dayjs from 'dayjs';

dayjs.extend(utc as any);
dayjs.extend(timezone as any);
dayjs.locale(ESlocale);

/*
  "2024-02-07T15:17:00.000Z" does not conform to the required format.  The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
*/

export const defaultInputDate = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
};