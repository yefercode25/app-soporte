export const fechaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  return parseDate.toLocaleString('es-CO', { weekday: 'long', day: '2-digit', month: 'long', timeZone: 'America/Bogota' });
};

export const horaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  return parseDate.toLocaleString('es-CO', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bogota' });
};
