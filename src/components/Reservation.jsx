import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/reservas');
        console.log(response.data); // Verifica la estructura de los datos en la consola
        const reservationsArray = Array.isArray(response.data) ? response.data : [response.data]; // Convierte a array si no lo es
        setReservations(reservationsArray);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-neutral-200 p-4 text-teal-500 font-semibold text-center">
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.idReservations}>
              <div>
                <strong>Reservation ID:</strong> {reservation.idReservations}
              </div>
              <div>
                <strong>Start Date:</strong> {reservation.startDate}
              </div>
              <div>
                <strong>Check In Date:</strong> {reservation.checkInDate}
              </div>
              <div>
                <strong>Check In Time:</strong> {reservation.checkInTime}
              </div>
              <div>
                <strong>Check Out Date:</strong> {reservation.checkOutDate}
              </div>
              <div>
                <strong>Check Out Time:</strong> {reservation.checkOutTime}
              </div>
              <div>
                <strong>End Date:</strong> {reservation.endDate}
              </div>
              <div>
                <strong>Type of Pension:</strong> {reservation.typePension}
              </div>
              {/* Puedes agregar más detalles de la reserva aquí */}
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <div>No reservations available.</div>
      )}
    </div>
  );
}

export default Reservations;
