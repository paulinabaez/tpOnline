export const URL_SERVICIOS = "http://localhost:3685/api/";

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_MOMENT_FORMATS = {
  parseInput: 'L LT',
  fullPickerInput: 'L LT',
  datePickerInput: 'L',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

// Language configurations para las tablas
export const language = {
  decimal: "",
  emptyTable: "No hay datos disponibles en la tabla",
  info: "Mostrando del _START_ al _END_ de _TOTAL_ registros",
  infoEmpty: "Mostrando del 0 al 0 de 0 registros",
  infoFiltered: "(Filtrado desde _MAX_ registros totales)",
  infoPostFix: "",
  thousands: ",",
  lengthMenu: "Mostrar _MENU_ registros",
  loadingRecords: "Cargando...",
  processing: "Procesando...",
  search: "Buscar:",
  zeroRecords: "No se encontraron registros",
  paginate: {
    first: "Primer",
    last: "Último",
    next: "Siguiente",
    previous: "Anterior"
  },
  aria: {
    sortAscending: ": activar para ordenar columna ascendente",
    sortDescending: ": activar para ordenar columna descendente"
  }
};

