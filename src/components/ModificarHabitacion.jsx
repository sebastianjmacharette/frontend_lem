import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./shared/navbar";
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
    <div className="h-screen bg-teal-50"><Navbar/>
      <h2
            className="text-teal-500 font-sans font-bold text-4xl text-center m-4"

      >Modificar Habitación</h2>
  <form className="flex flex-col items-center">
  <label             className="text-teal-500 font-sans font-bold text-xl text-center m-1"
>
    Número de Habitación:
  </label>
  <input
    type="text"
    name="roomNumber"
    value={room.roomNumber}
    onChange={handleChange}
    className="text-teal-500 font-sans font-bold text-xl text-center rounded-3xl m-1"
  />
  <label className="text-teal-500 font-sans font-bold text-xl text-center m-1 rounded-3xl">
    Estado:
  </label>
  <select
  name="roomState"
  value={room.roomState}
  onChange={handleChange}
  className="text-teal-500 font-sans text-center m-1 rounded-3xl"
>
  <option value="LIBRE" className="hover:bg-teal-500 rounded-3xl">LIBRE</option>
  <option value="OCUPADA">OCUPADA</option>
  <option value="MANTENIMIENTO">EN MANTENIMIENTO</option>
</select>

  <input type="hidden" name="price" value={room.price} onChange={handleChange} />
  <label className="text-teal-500 font-sans font-bold text-xl text-center m-1 ">
    Plazas:
  </label>
  <input
    type="text"
    name="roomBeds"
    value={room.roomBeds}
    onChange={handleChange}
    className="text-teal-500 font-sans font-bold text-xl text-center rounded-3xl m-1"
  />
  <button type="button" onClick={handleConfirm} 
  className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
  focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-gray-800
   dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
  >
    Guardar Cambios
  </button>
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
                <p className=" text-lg mb-2 text-teal-500 font-semibold">¿Estás seguro de guardar los cambios?</p>
                <div className="flex justify-end">
                  <button
                    className="text-white font-semibold bg-teal-500 hover:bg-red-700 text-base focus:outline-none 
                    focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                     dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    className="text-white font-semibold bg-teal-500 hover:bg-lime-500 text-base focus:outline-none 
                    focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                     dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
