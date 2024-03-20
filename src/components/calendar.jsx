import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener token del localStorage
    const role = localStorage.getItem('role'); // Obtener rol del localStorage

    // Configurar interceptor para token y rol
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Role = role;
      return config;
    }, error => {
      console.error('Error en el interceptor de solicitud:', error);
      return Promise.reject(error);
    });

    axios.get('http://localhost:8000/reservas')
      .then(response => {
        console.log('Respuesta de la solicitud GET:', response);
        const reservations = response.data;

        // Verificar existencia de `numero_habitacion` (ajustar formato del título si es necesario)
        const formattedEvents = reservations.map(reservation => ({
          id: reservation.idReservations,
          title: reservation.numero_habitacion
            ? `Reserva ${reservation.numero_habitacion}`
            : 'Reserva (sin número de habitación)', // Título predeterminado
          start: reservation.startDate ? new Date(reservation.startDate) : null, // Manejar formato de fecha potencial
          end: reservation.endDate ? new Date(reservation.endDate) : null,
          backgroundColor: '#FFCC99',
        }));
        console.log('Eventos formateados:', formattedEvents);
        setEvents(formattedEvents);
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
        // Manejar errores (mostrar mensaje al usuario)
      });
  }, []);

  function handleDateClick(info) {
    alert(`Fecha clickeada: ${info.dateStr}`);
  }
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


    
