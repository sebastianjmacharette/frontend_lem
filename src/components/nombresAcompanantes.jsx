import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "./shared/navbar";

function NombresAcompanantes() {
  const [hostData, setHostData] = useState(null);
  const [accompanists, setAccompanists] = useState([]);
  const { idHost } = useParams();

  const fetchHostData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/huesped/${idHost}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHostData(response.data);
      // Inicializa los acompañantes según el número de acompañantes del huésped
      setAccompanists(new Array(response.data.numberOfCompanions).fill({ name: '', lastname: '', dni: '' }));
    } catch (error) {
      console.error('Error fetching host data:', error);
      // Aquí puedes manejar el error de acuerdo a tus necesidades
    }
  };

  useEffect(() => {
    fetchHostData();
  }, [idHost]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const year = date.getFullYear();

    // Añadir ceros delante si el día o el mes son menores que 10
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleAccompanistChange = (index, field, value) => {
    const updatedAccompanists = [...accompanists];
    updatedAccompanists[index][field] = value;
    setAccompanists(updatedAccompanists);
  };

  const handleSaveOnly = () => {
    if (window.confirm("¿Estás seguro de que deseas guardar sin continuar la reserva?")) {
      // Aquí puedes implementar la lógica para guardar solo
      console.log("Guardando solo");
    }
  };

  const handleContinueReservation = () => {
    if (window.confirm("¿Estás seguro de que deseas continuar con la reserva?")) {
      // Aquí puedes implementar la lógica para continuar con la reserva
      console.log("Continuando con la reserva");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos de los acompañantes al servidor utilizando axios u otra biblioteca para peticiones HTTP
    console.log(accompanists);
  };

  return (
    <div className='bg-neutral-200 h-full '>
      <Navbar />
      <div className="container mx-auto flex flex-col sm:flex-row">
        <div className="text-teal-500 w-full sm:w-1/2   p-4">
          {hostData ? (
            <div>
              <h1
              className='font-bold text-4xl mt-4 underline'
              >Datos del Huésped</h1>
              <p
              className='font-semibold text-xl mt-1'
              >Nombre: {hostData.hostName}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >Apellido: {hostData.hostLastname}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >DNI: {hostData.hostDni}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >Fecha de Nacimiento: {formatDate(hostData.hostBirthDay)}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >Telefono: {hostData.hostTelephone}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >Cantidad de Acompañantes: {hostData.numberOfCompanions}</p>
              <p
                            className='font-semibold text-xl mt-1'

              >Observaciones: {hostData.notes}</p>
            </div>
          ) : (
            <p>Cargando datos del huésped...</p>
          )}
        </div>
        <div className="text-teal-500 w-full sm:w-1/2 h-screen bg-neutral-200  p-4">
          {hostData && hostData.numberOfCompanions > 0 ? (
            <form onSubmit={handleSubmit}>
              {/* Itera sobre los acompañantes y muestra un formulario para cada uno */}
              {accompanists.map((accompanist, index) => (
                <div key={index} className="mb-4">
                  <h2
                   className='font-bold text-xl mt-4 underline'

                  >Acompañante {index + 1}</h2>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={accompanist.name}
                    onChange={(e) => handleAccompanistChange(index, 'name', e.target.value)}
                    className="border border-teal-500 focus:border-teal-500 rounded-md p-2 mt-2"
                  />
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={accompanist.lastname}
                    onChange={(e) => handleAccompanistChange(index, 'lastname', e.target.value)}
                    className="border border-teal-500 focus:border-teal-500 rounded-md p-2 mt-2"
                  />
                  <input
                    type="text"
                    placeholder="DNI"
                    value={accompanist.dni}
                    onChange={(e) => handleAccompanistChange(index, 'dni', e.target.value)}
                    className="border border-teal-500 focus:border-teal-500 rounded-md p-2 mt-2"
                  />
                </div>
              ))}
              <button type="button" onClick={handleSaveOnly}
                         className="text-white bg-teal-500 hover:bg-red-600 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"

              >Solo guardar</button>
              <button type="button"
                onClick={handleContinueReservation}
                className="text-white bg-teal-500 hover:bg-green-400 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"

              >Continuar Reserva</button>
            </form>
          ) : (
              <h1
              className='font-bold text-4xl mt-4 underline'

              >Sin acompañantes agregados</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default NombresAcompanantes;
