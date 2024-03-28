import React, { useState } from "react";
import axios from "axios";
import Navbar from './shared/navbar';
import Footer from './shared/Footer';

function NuevaHabitacion() {
  const [habitacionData, setHabitacionData] = useState({
    roomNumber: "",
    roomState: "LIBRE",
    price: 0,
    roomBeds: "",
    checkInTime: "10:00", // Hora de ingreso predeterminada a las 10:00
    checkOutTime: "12:00" // Hora de salida predeterminada a las 12:00
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitacionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/NuevaHabitacion",
        habitacionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertMessage("¡Habitación creada exitosamente!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        // Redirigir a la página de habitaciones después de crear la habitación
        window.location.href = "/habitaciones";
      }, 2000);
    } catch (error) {
      console.error("Error al crear la nueva habitación:", error);
      setAlertMessage(
        "Error al crear la habitación. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className=" mb-0 bg-teal-50 ">
      <Navbar />
      <div className=" mb-0 bg-teal-50 flex flex-col justify-center items-center">
        <h1 className="text-teal-500 text-4xl font-semibold mt-4 mb-4">
          Agregar Nueva Habitación
        </h1>
        {showAlert && (
          <div className="alert text-lime-500 text-4xl font-semibold ">
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full max-w-md px-4">
          <div className="mb-4">
            <label className="block text-teal-500 text-xl font-semibold  ">
              Número de Habitación:
            </label>
            <input
              type="text"
              name="roomNumber"
              value={habitacionData.roomNumber}
              onChange={handleChange}
              required
              className="w-full border border-teal-600 px-3 py-2 text-teal-500 text-xl font-semibold rounded-3xl"
            />
          </div>
          <div className="mb-4">
            <label className="block text-teal-500 text-xl font-semibold">
              Estado:
            </label>
            <select
              name="roomState"
              value={habitacionData.roomState}
              onChange={handleChange}
              className="w-full border border-teal-300 text-teal-500 text-xl font-semibold rounded-3xl px-3 py-2"
            >
              <option value="LIBRE">LIBRE</option>
              <option value="OCUPADA">OCUPADA</option>
              <option value="MANTENIMIENTO">EN MANTENIMIENTO</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-teal-500 text-xl font-semibold">
              Plazas:
            </label>
            <input
              type="text"
              name="roomBeds"
              value={habitacionData.roomBeds}
              onChange={handleChange}
              required
              className="w-full border border-teal-600 rounded-3xl text-teal-500 text-xl font-semibold px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Crear Habitación           </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NuevaHabitacion;

         
