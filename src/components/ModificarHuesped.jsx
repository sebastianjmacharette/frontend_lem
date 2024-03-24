import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import { useParams } from "react-router-dom";

function ModificarHuesped() {
  const { id } = useParams();
  const [host, setHost] = useState({
    hostName: "",
    hostLastname: "",
    hostDni: "",
    hostTelephone: "",
    hostBirthDay: "",
    numberOfCompanions: 0,
    notes: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Función para mostrar el modal de confirmación
  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  // Función para cancelar la modificación
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  // Función para confirmar y guardar los cambios
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8080/actualizarHuesped/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(host),
      });
      if (response.ok) {
        console.log("Huésped actualizado correctamente");
        // Redireccionar a la lista de huéspedes
        window.location.href = "/lista-huespedes";
      } else {
        throw new Error("Error al actualizar el huésped");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDatosHuésped = async () => {
    try {
      const response = await fetch(`http://localhost:8080/huesped/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHost(data);
      } else {
        throw new Error("Error al obtener los datos del huésped");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    obtenerDatosHuésped();
  }, []); // Este efecto se ejecutará solo una vez al montar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHost((prevHost) => ({
      ...prevHost,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <h2>Modificar Huésped</h2>
      <form>
        <label>
          Nombre:
          <input
            type="text"
            name="hostName"
            value={host.hostName}
            onChange={handleChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="hostLastname"
            value={host.hostLastname}
            onChange={handleChange}
          />
        </label>
        <label>
          notes:
          <input
            type="text"
            name="notes"
            value={host.notes}
            onChange={handleChange}
          />
        </label>
        {/* Agrega más campos según sea necesario */}
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

export default ModificarHuesped;
