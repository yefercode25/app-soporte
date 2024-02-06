export const fechaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  const options = { weekday: 'long', day: '2-digit', month: 'long' };
  return parseDate.toLocaleDateString('es-ES', options as any);
};

export const horaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  const hour = parseDate.getHours();
  const minute = parseDate.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${formattedHour}:${formattedMinute} ${ampm}`;
};
