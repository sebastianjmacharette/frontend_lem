import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ConsultasRoom() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [roomStates, setRoomStates] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoomsAndStates() {
      try {
        const token = localStorage.getItem('token');
        
        console.log('Iniciando solicitud para obtener habitaciones...');
        // Fetch rooms
        const roomsResponse = await axios.get('http://localhost:8080/habitaciones', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Respuesta de habitaciones:', roomsResponse.data);
        setRooms(roomsResponse.data);

        // Fetch states for each room
        const roomStatePromises = roomsResponse.data.map(async (room) => {
          const { idRoom } = room; // Cambia de id a idRoom
          const year = selectedDate.getFullYear();
          const month = selectedDate.getMonth() + 1;
          const firstDayOfMonth = new Date(year, month - 1, 1);
          const lastDayOfMonth = new Date(year, month, 0);
          const formattedStartDate = firstDayOfMonth.toISOString().split('T')[0];
          const formattedEndDate = lastDayOfMonth.toISOString().split('T')[0];
          const queryParams = {
            idRoom: idRoom, // Usa idRoom en lugar de id
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
        
          console.log(`Consultando estado para la habitación ${idRoom}...`);
          try {
            const response = await axios.get('http://localhost:8080/habitaciones/estado-horario', config);
            console.log(`Respuesta para la habitación ${idRoom}:`, response.data);
            return { roomId: idRoom, data: response.data };
          } catch (error) {
            console.error(`Error obteniendo estado para la habitación ${idRoom}:`, error);
            throw error; // Propaga el error para que pueda ser manejado fuera de esta función
          }
        });
        

       // Resolve all promises
const roomStatesData = await Promise.all(roomStatePromises);

// Update room states
console.log('Actualizando estados de las habitaciones...');
setRoomStates(roomStatesData); // Guarda todo el objeto, no solo data


        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms and states:', error);
        setLoading(false);
      }
    }

    fetchRoomsAndStates();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-8">Estado de Habitaciones</h1>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.idRoom} className="mb-8">
              <h2 className="text-2xl mb-4">Habitación {room.idRoom}</h2>
              <Calendar
                key={room.idRoom}
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={({ date }) => {
                  const dateString = date.toISOString().split('T')[0];
                  const roomStatesForRoom = roomStates.find(roomState => roomState.roomId === room.idRoom);
                  let colorClass = '';
  
                  if (roomStatesForRoom) {
                    const roomState = roomStatesForRoom.data.find(state => state.date === dateString);
                    if (roomState) {
                      switch (roomState.state) {
                        case 'OCUPADA':
                          colorClass = 'bg-red-600';
                          break;
                        case 'LIBRE':
                          colorClass = 'bg-green-600';
                          break;
                        case 'MANTENIMIENTO':
                          colorClass = 'bg-yellow-600';
                          break;
                        default:
                          colorClass = '';
                      }
                    }
                  }
  
                  return colorClass;
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConsultasRoom;