import React, { useState, useEffect } from 'react';
import Navbar from './shared/navbar';
import Footer from './shared/Footer';
import NuevaHabitacion from './NuevaHabitacion';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/habitaciones') // Endpoint para obtener la lista de habitaciones
      .then(response => response.json())
      .then(data => setHabitaciones(data))
      .catch(error => console.error('Error fetching habitaciones:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div  className='h-screen bg-neutral-200'>
       <div className="flex justify-end py-2 ">
        <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="text-white bg-teal-500 hover:bg-gray-900 text-base
                   font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full 
                    px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                     dark:focus:ring-gray-700 dark:border-gray-700"
            type="button">
  Agregar Habitacion
</button>
</div>

        <div className="relative  shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-teal-500 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Numero Habitacion
                </th>
                <th scope="col" className="px-6 py-3">
                  plazas
                </th>
                <th scope="col" className="px-6 py-3">
                  estado
                </th>
                <th scope="col" className="px-6 py-3">
                  precios
                </th>
                <th scope="col" className="px-6 py-3">
                  accion
                </th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map(habitacion => (
                <tr key={habitacion.id_room} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-teal-500 whitespace-nowrap dark:text-white">
                    {habitacion.numero_habitacion}
                  </td>
                  <td className="px-6 py-4">
                    {habitacion.plazas}
                  </td>
                  <td className="px-6 py-4">
                    {habitacion.estado_habitaciones}
                  </td>
                  <td className="px-6 py-4">
                    {habitacion.precio}
                  </td>
                  <td className="text-white bg-teal-500 hover:bg-gray-900 text-base
                   font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full 
                    px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                     dark:focus:ring-gray-700 dark:border-gray-700">
                    <a href={`/editarHabitacion/${habitacion.id_room}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
       <div>
          

{/* <!-- Modal toggle --> */}
  

{/* <!-- Main modal --> */}
          <div id="crud-modal" tabindex="-1" aria-hidden="true" className="hidden
 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
    <div className="relative p-4 w-full max-w-md max-h-full bg-teal-500">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b bg-neutral-200 shadow-2xl rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-teal-500 dark:text-white">
                    Crear nueva Habitación
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-teal-500 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="p-4 md:p-5 bg-neutral-200 ">
                <div className="grid gap-4 mb-4 grid-cols-2">
                           
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-teal-500 dark:text-white">Numero Habitacion</label>
                                  <input type="number" name="price" id="price" className="bg-gray-50 border
                         border-gray-300 text-teal-500 text-sm rounded-lg focus:ring-teal-600
                          focus:border-teal-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500
                            dark:focus:border-teal-500"  required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-teal-500 dark:text-white">Estado</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-teal-500
                         text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5
                          dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
                           dark:focus:ring-teal-500 dark:focus:border-teal-500">
                            <option selected="">Seleccione estado</option>
                            <option value="LIBRE">LIBRE</option>
                            <option value="OCUPADA">OCUPADA</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
S                        </select>
                    </div>
                               <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-teal-500 dark:text-white">Precio</label>
                                  <input type="number" name="price" id="price" className="bg-gray-50 border
                         border-gray-300 text-teal-500 text-sm rounded-lg focus:ring-teal-600
                          focus:border-teal-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500
                            dark:focus:border-teal-500"  required=""/>
                    </div>
                  <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-teal-500 dark:text-white">Plazas</label>

                       <select id="plazas" className="bg-gray-50 border border-gray-300 text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                      </select>


                    </div>
                   
                </div>
                          <button type="submit"
                className="text-white bg-teal-500 hover:bg-gray-900 text-base
                   font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full 
                    px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                     dark:focus:ring-gray-700 dark:border-gray-700"
>
                    Agregar Habitación
                </button>
            </form>
        </div>
    </div>
</div> 


    </div>
      {/* modal  */}
      <Footer />
    </>
  )
}

export default Habitaciones;
