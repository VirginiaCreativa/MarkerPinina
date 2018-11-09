const meses = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const date = new Date();
const CURRENT_MESES = `${date.getDate()} de ${
  meses[date.getMonth()]
} de ${date.getFullYear()}`;

export { CURRENT_MESES };
