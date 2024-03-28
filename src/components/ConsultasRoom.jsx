import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ConsultasRoom() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [roomStates, setRoomStates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoomStatesForMonth(date) {
      try {
        const token = localStorage.getItem('token');
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);
        const formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
        const formattedEndDate = lastDayOfMonth.toISOString().split('T')[0];
        const queryParams = {
          idRoom: 5,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: '12:00:00',
          endTime: '12:00:00'
        };
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: queryParams
        };

        const response = await axios.get('http://localhost:8080/habitaciones/estado-horario', config);

        setRoomStates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room states:', error);
      }
    }

    fetchRoomStatesForMonth(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tileClassName = ({ date }) => {
    const stateForDate = roomStates.find(state => {
      const stateDate = new Date(state.date);
      return stateDate.getFullYear() === date.getFullYear() && stateDate.getMonth() === date.getMonth() && stateDate.getDate() === date.getDate();
    });

    if (stateForDate) {
      switch (stateForDate.state) {
        case 'OCUPADA':
          return 'bg-rose-600';
        case 'LIBRE':
          return 'bg-lime-500';
        case 'MANTENIMIENTO':
          return 'bg-yellow-500';
        default:
          return '';
      }
    }
    return '';
  };

  return (
    <div>
      <h1>Consulta de Habitaciones</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <h2>Estado de las habitaciones para {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</h2>
          {roomStates.map((roomState, index) => (
            <div key={index}>
              <p>ID de la habitación: {roomState.id}</p>
              <p>Estado: {roomState.state}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultasRoom;
