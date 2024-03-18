import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

function Calendar() {
  const events = [
    // eventos a consumir por api
    {
      title: 'Reserva 1',
      start: '2024-03-15T10:00:00',
      end: '2024-03-15T12:00:00'
    },
    {
      title: 'Reserva 2',
      start: '2024-03-16T14:00:00',
      end: '2024-03-16T16:00:00'
    }
  ];

  function handleDateClick(info) {
    // Aquí puedes manejar el evento de clic en una fecha
    // Por ejemplo, mostrar los datos en un popup o modal
    alert(`Fecha clickeada: ${info.dateStr}`);
  }

  return (
    <>

    <div className="bg-neutral-200 p-4  text-teal-500 font-semibold text-center"> {/* Aplicar clases de Tailwind CSS al contenedor principal */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={esLocale} // Configuración del idioma español
        dateClick={handleDateClick} // Manejar el clic en una fecha
        className="w-full bg-white rounded shadow p-4" // Aplicar clases de Tailwind CSS al calendario
      />
    </div>
    </>
  );
}

export default Calendar;
