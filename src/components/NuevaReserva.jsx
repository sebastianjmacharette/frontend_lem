import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function NuevaReserva() {
  // Obtener el ID del host de los parámetros de la URL
  const { idHost } = useParams();

  // Obtener el estado de la ubicación
  const location = useLocation();

  // Extraer el token del estado de la ubicación
  const { state } = location;
  const { token } = state;

  return (
    <div>
      <h1>Nueva Reserva</h1>
      <p>ID del Host: {idHost}</p>
      <p>Token: {token}</p>
      {/* Aquí puedes mostrar los datos como necesites */}
    </div>
  );
}

export default NuevaReserva;
