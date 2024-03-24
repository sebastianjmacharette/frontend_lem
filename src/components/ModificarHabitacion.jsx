import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ModificarHabitacion() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [room, setRoom] = useState({
    roomNumber: "",
    roomState: "",
    price: "",
    roomBeds: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/buscarHabitacion/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoom(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la habitación:", error);
      }
    };

    fetchRoom();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/editarHabitacion/${id}`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Habitación actualizada correctamente");
        window.location.href = "/habitaciones"; // Redireccionar a la página de habitaciones
      } else {
        console.error("Error al actualizar la habitación");
      }
    } catch (error) {
      console.error("Error al actualizar la habitación:", error);
    }
  };

  return (
    <div>
      <h2>Modificar Habitación</h2>
      <form>
        <label>
          Número de Habitación:
          <input
            type="text"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Estado:
          <select name="roomState" value={room.roomState} onChange={handleChange}>
            <option value="LIBRE">LIBRE</option>
            <option value="OCUPADA">OCUPADA</option>
            <option value="MANTENIMIENTO">EN MANTENIMIENTO</option>
          </select>
        </label>
        <input
          type="hidden"
          name="price"
          value={room.price}
          onChange={handleChange}
        />
        <label>
          Plazas:
          <input
            type="text"
            name="roomBeds"
            value={room.roomBeds}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleConfirm}>Guardar Cambios</button>
      </form>

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
                <p className="text-lg mb-2">¿Estás seguro de guardar los cambios?</p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={handleSaveChanges}
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

export default ModificarHabitacion;
