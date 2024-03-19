import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/reservas')
      .then(response => {
        const reservations = response.data;
        const formattedEvents = reservations.map(reservation => ({
          id: reservation.idReservations,
          title: `Reserva ${reservation.numero_habitacion}`, // Mostrar número de habitación en el título
          start: reservation.startDate,
          end: reservation.endDate,
          backgroundColor: getReservationColor(reservation.status) // Obtener color según el estado de la reserva
        }));
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
      });
  }, []);

  function handleDateClick(info) {
    alert(`Fecha clickeada: ${info.dateStr}`);
  }

  // Función para obtener el color de la reserva según el estado
  function getReservationColor(status) {
    switch (status) {
      case 'LIBRE':
        return 'green'; // Color verde para reservas libres
      case 'OCUPADA':
        return 'red'; // Color rojo para reservas ocupadas
      case 'MANTENIMIENTO':
        return 'yellow'; // Color amarillo para reservas en mantenimiento
      default:
        return 'blue'; // Color azul predeterminado para otros estados
    }
  }

  // Función para personalizar el contenido del evento
  function customEventContent(eventInfo) {
    return (
      <>
        <div>{eventInfo.timeText}</div> {/* Mostrar hora */}
        <div>{eventInfo.event.title}</div> {/* Mostrar título */}
      </>
    );
  }

  return (
    <div className="bg-neutral-200 p-4 text-teal-500 font-semibold text-center">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={esLocale}
        dateClick={handleDateClick}
        eventContent={customEventContent} 
        className="w-full bg-white rounded shadow p-4"
      />
    </div>
  );
}

export default Calendar;
