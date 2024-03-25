import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import { useParams } from "react-router-dom";
import  Footer from './shared/Footer' ;
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

  const handleConfirm = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHost((prevHost) => ({
      ...prevHost,
      [name]: value,
    }));
  };

  return (
    <div className="bg-teal-50" >
      <Navbar />
      <h2 className="text-center text-4xl mt-4 font-bold text-teal-500 mb-4">Modificar Huésped</h2>
      <div className="mx-auto max-w-lg">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-teal-500 font-semibold">Nombre:</label>
              <input
                type="text"
                name="hostName"
                value={host.hostName}
                onChange={handleChange}
                className="block w-full rounded-3xl text-teal-500 font-semibold border-teal-500 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-teal-500 font-semibold">Apellido:</label>
              <input
                type="text"
                name="hostLastname"
                value={host.hostLastname}
                onChange={handleChange}
                className="block w-full rounded-3xl text-teal-500 font-semibold border-teal-500 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block mb-2 text-teal-500 font-semibold">Notes:</label>
              <input
                type="text"
                name="notes"
                value={host.notes}
                onChange={handleChange}
                className="block w-full rounded-3xl text-teal-500 font-semibold border-teal-500 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
              />
            </div>
            {/* Agrega más campos según sea necesario */}
          </div>
          <button type="button" onClick={handleConfirm} 
          className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
          focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 mt-4 me-2 mb-2 dark:bg-gray-800
           dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Guardar Cambios
          </button>
        </form>
      </div>
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
                    className="text-white font-semibold bg-teal-500 hover:bg-lime-500 text-base focus:outline-none 
                    focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                     dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                  <button
                    className="text-white font-semibold bg-teal-500 hover:bg-red-500 text-base focus:outline-none 
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
      <Footer/>
    </div>
  );
}

export default ModificarHuesped;
