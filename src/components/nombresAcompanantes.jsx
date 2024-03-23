import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/navbar";
import { useNavigate } from "react-router-dom";

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
      axios.get(`http://localhost:8080/huesped/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        setNumAcompanantes(response.data.numberOfCompanions);
        // Crear un array con la cantidad de acompañantes
        const companionsArray = Array.from({ length: response.data.numberOfCompanions }, (_, index) => ({
          name: "",
          lastName: "",
          dni: ""
        }));
        setCompanionsData(companionsArray);
      })
      .catch(error => {
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
      await Promise.all(companionsData.map(async companion => {
        await axios.post("http://localhost:8080/crearAcompaniante", {
          companionName: companion.name,
          companionLastname: companion.lastName,
          companionDni: companion.dni,
          host: { idHost }
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }));
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
    <div className="bg-neutral-200 h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-4">
        <h1>Token: {token}</h1>
        <h2>ID del huésped: {idHost}</h2>
        <h3>Número de acompañantes: {numAcompanantes}</h3>
        {numAcompanantes === 0 ? (
          <div>
            <p>Sin acompañantes</p>
            <button onClick={handleBackToHome}>Volver al inicio</button>
            <button onClick={handleContinueReservation}>Continuar con la reserva</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {showInputs && companionsData.map((companion, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={companion.name}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={companion.lastName}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                type="text"
                name="dni"
                placeholder="DNI"
                value={companion.dni}
                onChange={(e) => handleChange(index, e)} // <- Paréntesis cerrado correctamente
              />

              </div>
            ))}
            {showInputs && <button type="submit">Guardar Acompañantes</button>}
          </form>
        )}
        {companionsSaved && (
          <>
            <p>Los acompañantes han sido guardados correctamente.</p>
            <button onClick={handleBackToHome}>Volver al inicio</button>
            <button onClick={handleContinueReservation}>Continuar con la reserva</button>
          </>
        )}
      </div>
    </div>
  );
}

export default NombresAcompanantes;

