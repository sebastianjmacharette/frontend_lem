import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetallesHuesped() {
  const { idHost } = useParams();
  const [hostData, setHostData] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/huesped/${idHost}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHostData(response.data);
      } catch (error) {
        console.error('Error fetching host data:', error);
        // Manejar el error de manera adecuada, como mostrar un mensaje al usuario
      }
    };

    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/habitacionesDisponibles`, {
          params: {
            startDate: '2024-03-27', // Aquí debes pasar las fechas correspondientes
            endDate: '2024-03-30',   // según tus requisitos
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableRooms(response.data);
      } catch (error) {
        console.error('Error fetching available rooms:', error);
        // Manejar el error de manera adecuada, como mostrar un mensaje al usuario
      }
    };

    fetchHostDetails();
    fetchAvailableRooms();
  }, [idHost, token]);

  return (
    <div>
      {hostData ? (
        <div>
          <h2>ID:{hostData.idHost}</h2>
          <h2>Nombre: {hostData.hostName}</h2>
          <h2>Apellido: {hostData.hostLastname}</h2>
          {/* Agrega aquí los demás detalles del huésped que deseas mostrar */}
        </div>
      ) : (
        <p>Cargando datos del huésped...</p>
      )}

      <h2>Habitaciones Disponibles:</h2>
      <ul>
        {availableRooms.map(room => (
          <li key={room.idRoom}>
            Habitación {room.roomNumber} - Precio: {room.price} - ID: {room.idRoom}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetallesHuesped;
