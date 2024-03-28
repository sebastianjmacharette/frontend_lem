import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MostrarHabitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const token = localStorage.getItem('token'); // Obtener el token del localStorage

  useEffect(() => {
    // Función para obtener las habitaciones disponibles desde el backend
    const obtenerHabitacionesDisponibles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/habitacionesDisponibles', {
          params: {
            startDate: '2024-03-01', // Fecha de inicio (ejemplo)
            endDate: '2024-03-31' // Fecha de fin (ejemplo)
          },
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en el encabezado de autorización
          }
        });
        setHabitaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las habitaciones disponibles:', error);
      }
    };

    // Llamar a la función para obtener las habitaciones disponibles
    obtenerHabitacionesDisponibles();
  }, [token]); // Ejecutar cada vez que el token cambie

  // Resto del código para mostrar las habitaciones en el calendario...

  return (
    <div>
      <h1>Habitaciones Disponibles</h1>
      {/* Código para mostrar las habitaciones en el calendario */}
    </div>
  );
}

export default MostrarHabitaciones;
