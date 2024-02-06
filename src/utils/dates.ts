export const fechaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  return parseDate.toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'long' });
};

export const horaFormateada = (fecha: string) => {
  const parseDate = new Date(fecha);
  return parseDate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
};
