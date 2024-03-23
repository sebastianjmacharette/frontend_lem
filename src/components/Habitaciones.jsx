import React, { useState, useEffect } from "react";
import axios from "axios";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get("http://localhost:8080/habitaciones", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response.data); // Verifica el formato de la respuesta
        if (Array.isArray(response.data)) {
          setHabitaciones(response.data);
        } else {
          console.error(
            "La respuesta del servidor no es un arreglo:",
            response.data,
          );
        }
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    fetchHabitaciones();
  }, [token]);

  return (
    <div>
      <h1>Habitaciones</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Habitación</th>
            <th>Estado</th>
            <th>Precio</th>
            <th>Plazas</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion) => (
            <tr key={habitacion.idRoom}>
              <td>{habitacion.idRoom}</td>
              <td>{habitacion.roomNumber}</td>
              <td>{habitacion.roomState}</td>
              <td>{habitacion.price}</td>
              <td>{habitacion.roomBeds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Habitaciones;
