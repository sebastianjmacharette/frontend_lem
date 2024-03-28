import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importar el idioma español para Moment.js
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function ajustarFechas(reservas) {
  return reservas.map(reserva => ({
    ...reserva,
    start: new Date(reserva.start.getFullYear(), reserva.start.getMonth(), reserva.start.getDate(), 12, 0, 0),
    end: new Date(reserva.end.getFullYear(), reserva.end.getMonth(), reserva.end.getDate(), 12, 0, 0),
  }));
}

function CalendarReservas() {
  moment.locale('es'); // Establecer Moment.js en español

  // Supongamos que tienes una lista de reservas como esta:
  const reservasBackend = [
    {
      id: 1,
      title: 'Reserva de Juan Perez',
      start: new Date(2024, 2, 20), // Aquí, 2 representa marzo
      end: new Date(2024, 2, 22),   // Aquí, 2 representa marzo
      guest: 'Juan Perez'
    },
    {
      id: 2,
      title: 'Reserva de María Gomez',
      start: new Date(2024, 2, 22), // Aquí, 2 representa marzo
      end: new Date(2024, 2, 25),   // Aquí, 2 representa marzo
      guest: 'María Gomez'
    },
    {
      id: 3,
      title: 'Reserva de Pedro Rodriguez',
      start: new Date(2024, 2, 5), // Aquí, 3 representa abril
      end: new Date(2024, 2, 10),   // Aquí, 3 representa abril
      guest: 'Pedro Rodriguez'
    },
    // Puedes agregar más reservas según necesites
  ];
  
  const reservas = ajustarFechas(reservasBackend);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#0694a2', // Color de fondo de las reservas
      color: 'white',
      borderRadius: '0px',
      border: 'none',
      display: 'block',
      textAlign: 'left',
      padding: '2px 5px',
      fontSize: '14px'
    };
    return {
      style: style
    };
  };

  return (
    <div style={{ height:600 }}>
     <Calendar
     className='text-teal-500 font-semibold '
  localizer={localizer}
  events={reservas}
  startAccessor="start"
  endAccessor="end"
  eventPropGetter={eventStyleGetter}
  views={['month']}
  popup
  eventOverlap={false} // Evitar que las reservas se superpongan
  messages={{
    today: 'Hoy',
    next: 'Siguiente',
    previous: 'Anterior',
    nextLabel: 'Siguiente',
    prevLabel: 'Anterior',
    allDay: 'Todo el día',
    showMore: total => `+${total} más`,
    day: 'Día',
    month: 'Mes',
    week: 'Semana',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    monthHeaderFormat: 'MMMM YYYY',
    dayFormat: 'ddd D',
    dayRangeHeaderFormat: ({ start, end }) => `${moment(start).format('D MMM')} - ${moment(end).format('D MMM')}`,
    agendaTimeFormat: 'h:mm a',
    agendaDateFormat: 'D MMM',
    agendaTimeRangeFormat: ({ start, end }) => `${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`,
    selectRangeFormat: ({ start, end }) => `${moment(start).format('D MMM')} - ${moment(end).format('D MMM')}`,
  }}
/>
    </div>
  );
}

export default CalendarReservas;
