import React, { useState, useEffect } from "react";
import axios from "axios";

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
            response.data,
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
        const response = await axios.delete(`http://localhost:8080/eliminarHabitacion/${selectedRoomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
            <th>Acciones</th>
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
              <td>
                <button onClick={() => handleConfirm("editar", habitacion.idRoom)}>Editar</button>
                <button onClick={() => handleConfirm("eliminar", habitacion.idRoom)}>Eliminar</button>
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
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white p-4">
                <p className="text-lg mb-2">¿Estás seguro de {actionType === "eliminar" ? "eliminar" : "editar"} la habitación?</p>
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
