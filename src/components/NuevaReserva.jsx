import React, { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import Navbar from "./shared/navbar";
import Footer from "./shared/Footer";
function NuevaReserva() {
  const { idHost } = useParams(); // ID del host desde los parámetros de la URL
  const location = useLocation(); // Obtener el estado de la ubicación
  const { state } = location;
  const { token } = state; // Token desde el estado de la ubicación

  const [hostInfo, setHostInfo] = useState(null); // Estado para almacenar la información del host
  const [rooms, setRooms] = useState([]); // Estado para almacenar la lista de habitaciones

  // Obtener información del host y de las habitaciones desde el backend
  useEffect(() => {
    async function fetchData() {
      try {
        // Configurar la cabecera con el token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Realizar la llamada al backend para obtener la información del host
        const hostResponse = await fetch(
          `http://localhost:8080/huesped/${idHost}`,
          {
            headers: headers,
          }
        );
        const hostData = await hostResponse.json();
        setHostInfo(hostData); // Almacenar la información del host en el estado

        // Realizar la llamada al backend para obtener la lista de habitaciones
        const roomsResponse = await fetch(
          "http://localhost:8080/habitaciones",
          {
            headers: headers,
          }
        );
        const roomsData = await roomsResponse.json();
        setRooms(roomsData); // Almacenar la lista de habitaciones en el estado
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    }
    fetchData();
  }, [idHost, token]); // Se ejecuta solo cuando cambia el ID del host o el token

  // Estado para almacenar los datos del huésped
  const [formData, setFormData] = useState({
    startDate: "", // Puedes establecer la fecha de inicio aquí si lo deseas
    endDate: "", // Puedes establecer la fecha de fin aquí si lo deseas
    typePension: "DESAYUNO", // Valor predeterminado de tipo de pensión
    checkInTime: "10:00", // Hora de check-in predeterminada
    checkOutTime: "12:00", // Hora de check-out predeterminada
    roomId: "", // ID de la habitación seleccionada
  });

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para validar los datos del formulario
  const validarDatos = (formData) => {
    // Implementa la lógica de validación aquí
    // Por ejemplo, verifica si los campos obligatorios están llenos, si las fechas son válidas, etc.
    // En este ejemplo, simplemente se verifica si el campo "startDate" está lleno
    if (!formData.startDate) {
      return false; // Retorna falso si el campo está vacío
    }

    return true; // Retorna verdadero si los datos son válidos
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preguntar al usuario si desea enviar el formulario
    const confirmMessage = "¿Estás seguro de que deseas guardar la reserva?";
    const userConfirmed = window.confirm(confirmMessage);

    if (userConfirmed) {
      // Aquí puedes implementar la lógica de validación antes de enviar los datos al servidor
      const isValid = validarDatos(formData);

      if (isValid) {
        try {
          // Realizar la llamada al backend para guardar la reserva
          const response = await fetch("URL_DEL_BACKEND", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Agregar token de seguridad
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            // Si la respuesta es exitosa, mostrar notificación de éxito
            console.log("Reserva realizada con éxito.");
            // Redirigir al usuario a la página de inicio
            history.push("/inicio");
          } else {
            // Si hay un error en la respuesta, mostrar notificación de error
            console.error("Error al realizar la reserva:", response.statusText);
            // Aquí puedes mostrar una notificación al usuario sobre el error
          }
        } catch (error) {
          console.error("Error al realizar la reserva:", error);
          // Aquí puedes mostrar una notificación al usuario sobre el error
        }
      } else {
        // Si los datos no son válidos, mostrar mensaje de error o realizar alguna acción
        console.error("Los datos no son válidos.");
        // Aquí puedes mostrar una notificación al usuario sobre los datos inválidos
      }
    } else {
      // El usuario canceló la operación
      console.log("Operación cancelada por el usuario.");
    }
  };

  // parsear la fecha
  function formatDate(dateString) {
    // Verifica si la cadena de fecha no está vacía
    if (dateString) {
      // Parsea la cadena de fecha a un objeto Date
      const date = new Date(dateString);
      // Obtiene los componentes de la fecha (día, mes, año)
      const day = date.getDate().toString().padStart(2, "0"); // Agrega un cero si el día es de un solo dígito
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // El mes se indexa desde 0
      const year = date.getFullYear();

      // Retorna la fecha formateada en el formato "dd/mm/yyyy"
      return `${day}/${month}/${year}`;
    } else {
      return ""; // Retorna una cadena vacía si la fecha está vacía o no válida
    }
  }

  return (
    <div className="bg-teal-50 h-full">
      <Navbar />
      <div className="mt-4">
        <div className="w-full  bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-teal-500 text-base  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: "98%" }}
          >
            98%
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-4 md:flex-row">
        {/* Columna derecha */}
        <div className="w-full md:w-1/2 md:order-2">
          {/* Formulario para completar los datos del huésped */}
          <form onSubmit={handleSubmit} className="w-full">
          <label className="block text-teal-500 text-base ">
  <span className="inline-block w-36">Fecha de Inicio:</span>
  <input
    type="date"
    name="startDate"
    value={formData.startDate}
    onChange={handleInputChange}
    className="mt-1 p-1 w-64 rounded-3xl"
  />
</label>
<br />
<label className="block text-teal-500 text-base ">
  <span className="inline-block w-36">Fecha de Fin:</span>
  <input
    type="date"
    name="endDate"
    value={formData.endDate}
    onChange={handleInputChange}
    className="mt-1 p-1 w-64 rounded-3xl"
  />
</label>
<br />
<label className="block text-teal-500 text-base ">
  <span className="inline-block w-36">Tipo de Pensión:</span>
  <select
    name="roomPension"
    value={formData.roomPension}
    onChange={handleInputChange}
    className="mt-1 p-1 w-64 rounded-3xl"
  >
    <option key="default" value="">
      Seleccione un tipo de pensión
    </option>
    <option value="DESAYUNO">Desayuno</option>
    <option value="MEDIA PENSION">Media Pensión</option>
    <option value="PENSION COMPLETA">Pensión Completa</option>
  </select>
</label>
<br />
{/* Agregar el campo de selección para las habitaciones */}
<label className="block text-teal-500 text-base  ">
  <span className="inline-block w-36">Habitación:</span>
  <select
    name="roomId"
    value={formData.roomId}
    onChange={handleInputChange}
    className="mt-1 p-1 w-64 rounded-3xl"
  >
    <option value="">Seleccione una habitación</option>
    {rooms.map((room) => (
      <option key={room.id} value={room.id}>
        {room.roomNumber}
      </option>
    ))}
  </select>
</label>
<div className="flex items-center">
  <label className="block text-teal-500 text-base  ">
    <span className="inline-block w-36">Precio Estadia:</span>
  </label>
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
    className="mt-2 p-1 w-40 rounded-3xl border border-teal-500 focus:border-teal-600 focus:outline-none"
    placeholder="Ingrese el precio de la estadía"
  />
</div>


            <br />
            <p
            className="text-lime-500 text-2xl  font-semibold"
            >Horario de check-in predeterminado: {formData.checkInTime}</p>
            <p
            className="text-red-500 text-2xl font-semibold"
            >Horario de check-out predeterminado: {formData.checkOutTime}</p>
            <button type="submit"
             className=" text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
             focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">
              Guardar Reserva
            </button>
          </form>
        </div>
        {/* Columna izquierda */}
        <div className="w-full justify-center text-center md:w-1/2 md:order-1 md:mt-4">
          <h1 className="text-teal-500 text-4xl  font-semibold">
            Nueva Reserva
          </h1>
          <p
          className="text-teal-500 text-base  font-semibold"
          >Identificador de Reserva: {idHost}</p>
          {hostInfo && (
            <div>
              <p className="text-teal-500 text-base  font-semibold">
                Nombre del Huesped: {hostInfo.hostName}
              </p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Apellido del Huespedt: {hostInfo.hostLastname}</p>
              <p
              className="text-red-500 text-2xl  font-semibold mt-1"
              >OBSERVACIONES: {hostInfo.notes}</p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Cantidad de Acompañantes: {hostInfo.numberOfCompanions}</p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Fecha de Nacimiento: {formatDate(hostInfo.hostBirthDay)}</p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Numero de Telefono: {hostInfo.hostTelephone}</p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Numero de Documento: {hostInfo.hostDni}</p>
              <p
              className="text-teal-500 text-base  font-semibold mt-1"
              >Telefono: {hostInfo.numberOfCompanions}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NuevaReserva;
