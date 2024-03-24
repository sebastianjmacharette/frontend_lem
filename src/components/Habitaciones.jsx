import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/shared/navbar";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const token = localStorage.getItem("token");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);

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
            response.data
          );
        }
      } catch (error) {
        console.error("Error al obtener las habitaciones:", error);
      }
    };

    fetchHabitaciones();
  }, [token]);

  const handleConfirm = (action, id) => {
    setShowConfirmation(true);
    setActionType(action);
    setSelectedRoomId(id);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setActionType("");
    setSelectedRoomId(null);
  };

  const handleAction = async () => {
    if (actionType === "eliminar") {
      try {
        const response = await axios.delete(
          `http://localhost:8080/eliminarHabitacion/${selectedRoomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Habitación eliminada con éxito");
          // Recargar la página para reflejar los cambios
          window.location.reload();
        } else {
          console.error("Error al eliminar la habitación");
        }
      } catch (error) {
        console.error("Error al eliminar la habitación:", error);
      }
    } else if (actionType === "editar") {
      // Redirigir a la página de modificar habitación con el ID y el token en la URL
      window.location.href = `/modificar-habitacion/${selectedRoomId}?token=${token}`;
    }
    setShowConfirmation(false);
    setActionType("");
    setSelectedRoomId(null);
  };

  // colores de estados
  const getColorClass = (estado) => {
    switch (estado) {
      case "LIBRE":
        return "bg-lime-500";
      case "OCUPADA":
        return "bg-red-700";
      case "MANTENIMIENTO":
        return "bg-amber-400";
      default:
        return "";
    }
  };
  return (
    <div className="h-screen bg-teal-50">
      <Navbar />
      <h1
      className="text-teal-500 font-sans font-bold text-4xl text-center m-4"
      >Control de Habitaciones</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-stone-400 whitespace-nowrap px-6 py-4 border-b border-neutral-800">
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              ID
            </th>
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              Número de Habitación
            </th>
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              Estado
            </th>
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              Precio
            </th>
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              Plazas
            </th>
            <th className="whitespace-nowrap px-6 py-4 border-b text-center ">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion) => (
            <tr className="border-neutral-800" key={habitacion.idRoom}>
              <td className="whitespace-nowrap px-6 py-4 border-b text-center text-teal-500 font-sans font-semibold ">
                {habitacion.idRoom}
              </td>
              <td className="whitespace-nowrap px-6 py-4 border-b text-center text-teal-500 font-sans font-semibold ">
                {habitacion.roomNumber}
              </td>
              <td className="whitespace-nowrap px-1 py-1 border-b text-center font-sans font-semibold text-xs">
  <span className={`${getColorClass(habitacion.roomState)} inline-block w-3 h-3 mr-3 rounded-full`}></span>
  {habitacion.roomState}
</td>


              <td className="whitespace-nowrap px-6 py-4 border-b text-center text-teal-500 font-sans font-semibold ">
                {habitacion.price}
              </td>
              <td className="whitespace-nowrap px-6 py-4 border-b text-center text-teal-500 font-sans font-semibold ">
                {habitacion.roomBeds}
              </td>
              <td className="whitespace-nowrap px-6 py-4 border-b text-center ">
                <button
                  className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => handleConfirm("editar", habitacion.idRoom)}
                >
                  Editar
                </button>
                <button
                  className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  onClick={() => handleConfirm("eliminar", habitacion.idRoom)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4">
                <p className="text-lg mb-2">
                  ¿Estás seguro de{" "}
                  {actionType === "eliminar" ? "eliminar" : "editar"} la
                  habitación?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={handleAction}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Habitaciones;
