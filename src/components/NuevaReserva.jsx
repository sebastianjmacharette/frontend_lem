import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

function NuevaReserva() {
  const { idHost } = useParams(); // ID del host desde los parámetros de la URL
  const location = useLocation(); // Obtener el estado de la ubicación
  const { state } = location;
  const { token } = state; // Token desde el estado de la ubicación

  const [hostInfo, setHostInfo] = useState(null); // Estado para almacenar la información del host

  // Obtener información del host desde el backend
  useEffect(() => {
    async function fetchHostInfo() {
      try {
        // Configurar la cabecera con el token
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Realizar la llamada al backend para obtener la información del host
        const response = await fetch(`http://localhost:8080/huesped/${idHost}`, {
          headers: headers
        });

        const data = await response.json();
        setHostInfo(data); // Almacenar la información del host en el estado
      } catch (error) {
        console.error("Error al obtener la información del host:", error);
      }
    }
    fetchHostInfo();
  }, [idHost, token]); // Se ejecuta solo cuando cambia el ID del host o el token

  // Estado para almacenar los datos del huésped
  const [formData, setFormData] = useState({
    startDate: "", // Puedes establecer la fecha de inicio aquí si lo deseas
    endDate: "", // Puedes establecer la fecha de fin aquí si lo deseas
    typePension: "DESAYUNO", // Valor predeterminado de tipo de pensión
    checkInTime: "10:00", // Hora de check-in predeterminada
    checkOutTime: "12:00" // Hora de check-out predeterminada
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor, por ejemplo:
    console.log("Datos del huésped:", formData);
  };

  return (
    <div>
      <h1>Nueva Reserva</h1>
      <p>ID del Host: {idHost}</p>
      {hostInfo && (
        <div>
          <p>Nombre del Host: {hostInfo.hostName}</p>
          <p>Apellido del Host: {hostInfo.hostLastname}</p>
          <p>Notas: {hostInfo.notes}</p>
          <p>Número de Acompañantes: {hostInfo.numberOfCompanions}</p>
        </div>
      )}
      <p>Token: {token}</p>
      {/* Formulario para completar los datos del huésped */}
      <form onSubmit={handleSubmit}>
        <label>
          Fecha de Inicio:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Fecha de Fin:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Tipo de Pensión:
          <select
            name="typePension"
            value={formData.typePension}
            onChange={handleInputChange}
          >
            <option value="DESAYUNO">DESAYUNO</option>
            <option value="MEDIA PENSION">MEDIA PENSION</option>
            <option value="PENSION COMPLETA">PENSION COMPLETA</option>
          </select>
        </label>
        <br />
        <p>Horario de check-in predeterminado: {formData.checkInTime}</p>
        <p>Horario de check-out predeterminado: {formData.checkOutTime}</p>
        <button type="submit">Guardar Reserva</button>
      </form>
    </div>
  );
}

export default NuevaReserva;
