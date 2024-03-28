import React from "react";
import { useLocation } from "react-router-dom";

function PagoReserva() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reservaId = searchParams.get("reservaId");

  // Verifica si el ID de la reserva está definido
  if (!reservaId) {
    return (
      <div>
        <h1>Detalles de la Reserva</h1>
        <p>Reserva ID no encontrado.</p>
      </div>
    );
  }

  // Si el ID de la reserva está definido, muestra los detalles de la reserva
  return (
    <div>
      <h1>Detalles de la Reserva</h1>
      <p>Reserva ID: {reservaId}</p>
      {/* Otros detalles de la reserva */}
    </div>
  );
}

export default PagoReserva;
