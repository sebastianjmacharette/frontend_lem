import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./shared/Footer";



function NombresAcompanantes() {
  const [token, setToken] = useState("");
  const [idHost, setIdHost] = useState("");
  const [numAcompanantes, setNumAcompanantes] = useState(0);
  const [companionsData, setCompanionsData] = useState([]);
  const [companionsSaved, setCompanionsSaved] = useState(false);
  const [showInputs, setShowInputs] = useState(true); // Estado para mostrar/ocultar inputs

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token del localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Obtener el ID del huésped del parámetro de la URL
    const id = window.location.pathname.split("/").pop();
    if (id) {
      setIdHost(id);
      // Hacer una solicitud para obtener la información del huésped por su ID
      axios
        .get(`http://localhost:8080/huesped/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setNumAcompanantes(response.data.numberOfCompanions);
          // Crear un array con la cantidad de acompañantes
          const companionsArray = Array.from(
            { length: response.data.numberOfCompanions },
            (_, index) => ({
              name: "",
              lastName: "",
              dni: "",
            })
          );
          setCompanionsData(companionsArray);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCompanions = [...companionsData];
    updatedCompanions[index][name] = value;
    setCompanionsData(updatedCompanions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        companionsData.map(async (companion) => {
          await axios.post(
            "http://localhost:8080/crearAcompaniante",
            {
              companionName: companion.name,
              companionLastname: companion.lastName,
              companionDni: companion.dni,
              host: { idHost },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );
      setCompanionsSaved(true);
      setShowInputs(false); // Ocultar inputs después de guardar
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBackToHome = () => {
    if (window.confirm("¿Estás seguro de volver al inicio?")) {
      navigate("/home");
    }
  };

  const handleContinueReservation = () => {
    if (window.confirm("¿Estás seguro de continuar con la reserva?")) {
      navigate(`/nueva-reserva/${idHost}`, { state: { token } });
    }
  };

  return (
    <div className="bg-teal-50 w-full h-full ">
      <Navbar />
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-teal-500 text-base  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: "60%" }}
          >
            60%
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-4 ">
        <h2 className="text-teal-500 font-semibold text-base">
          Datos de Acompañantes de Huesped: {idHost}
        </h2>
        <h3 className="text-teal-500 font-semibold text-base mt-4">
          Número de acompañantes: {numAcompanantes}
        </h3>
        {numAcompanantes === 0 ? (
          <div>
            <p
            className="text-red-500 font-semibold text-4xl"
            >Sin acompañantes</p>
            <div className="flex flex-col md:flex-row mt-4 items-center justify-center space-y-2 md:space-y-0">
  <button
    className="text-white font-semibold bg-teal-500 hover:bg-red-500 text-base focus:outline-none 
               focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleBackToHome}
  >
    Volver al inicio
  </button>
  <button
    className="text-white font-semibold bg-teal-500 hover:bg-lime-500 text-base focus:outline-none 
               focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleContinueReservation}
  >
    Continuar con la reserva
  </button>
</div>
          </div>
        ) : (
          <form
           onSubmit={handleSubmit}>
            {showInputs &&
              companionsData.map((companion, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name="name"
                    className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                 focus:outline-none rounded-2xl text-base  focus:border-teal-600 flex justify-center"
                    placeholder="Nombre"
                    value={companion.name}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Apellido"
                    className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                 focus:outline-none rounded-2xl text-base  focus:border-teal-600"
                    value={companion.lastName}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <input
                    type="text"
                    className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                 focus:outline-none rounded-2xl text-base  focus:border-teal-600"
                    name="dni"
                    placeholder="DNI"
                    value={companion.dni}
                    onChange={(e) => handleChange(index, e)} // <- Paréntesis cerrado correctamente
                  />
                        <hr className="my-4 border-gray-300" />

                </div>
              ))}
            {showInputs && <button 
             className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
             focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit">Guardar Acompañantes</button>}
          </form>
        )}
        {companionsSaved && (
          <>
            <p
            className="text-lime-500 font-semibold text-base"
            >Los acompañantes han sido guardados correctamente.</p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0">
  <button
    className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
               focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleBackToHome}
  >
    Volver al inicio
  </button>
  <button
    className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
               focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    onClick={handleContinueReservation}
  >
    Continuar con la reserva
  </button>
</div>

          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default NombresAcompanantes;
