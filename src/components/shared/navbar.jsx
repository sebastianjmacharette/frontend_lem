import React from 'react'
import { useState, useEffect } from "react";

function navbar() {
  const [username, setUsername] = useState("");


  //logout con pregunta

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro de salir?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0694a2",
      cancelButtonColor: "#2c3e50",
      confirmButtonText: "Sí, cerrar sesión"
    }).then((result) => {
      if (result.isConfirmed) {
        //  lógica para cerrar sesión
        window.location.href = "/logout";
      }
    });
  };


  return (

    <>
      <nav className='bg-stone-300 border-gray-400 dark:bg-gray-900'>
        <div className='flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4'>
          <a
            href='/home'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img
              src='https://img.molachinoviajes.com/gallery/var/albums/ranqueles.png?m=1709203019'
              className='h-20'
              alt='Flowbite Logo'
            />
          </a>
          <div className='flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse'>
            {/* <span
              className='text-teal-500 dark:text-teal-500 text-2xl 
              font-bold mb-2 rounded-lg  px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
            >
              bienvenido:{username}
            </span> */}
            
            <button
              data-collapse-toggle='mega-menu'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
             text-teal-500 rounded-lg  md:hidden hover:bg-gray-100 focus:outline-none 
             focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='mega-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            id='mega-menu'
            className='items-center text-2xl justify-between hidden w-full md:flex md:w-auto md:order-1'
          >
            <ul className='flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse'>
              <li>
                <a   className="text-teal-500 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:outline-none 
    focus:ring-stone-400  rounded-lg text-xl font-semibold px-5 py-2.5 text-center inline-flex items-center
     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" href="/home">Inicio</a>
              </li>
             {/* desplegable huespedes   */}

             <li>
              
<button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" 
className="text-teal-500 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:outline-none focus:ring-stone-400  
rounded-lg text-xl font-semibold px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
type="button">Huespedes<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{/* <!-- Dropdown menu --> */}
<div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
      <li>
        <a href="/nuevo-huesped" className="block px-4 py-2 hover:bg-teal-400
         hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500">Nuevo Huesped</a>
      </li>
      <li>
        <a href="/modificar-huesped" className="block px-4 py-2 hover:bg-teal-400
         hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500">Modificar Huesped</a>
      </li>
      <li>
        <a href="lista-huespedes" className="block px-4 py-2 hover:bg-teal-400
         hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500">Lista Huespedes</a>
      </li>
    
    </ul>
</div>

             </li>
             {/* despegable huespedes */}
          {/* Desplegable Reservas */}
<li>
  <button
    id="dropdownDelayButtonReservas"
    data-dropdown-toggle="dropdownDelayReservas"
    data-dropdown-delay="500"
    data-dropdown-trigger="hover"
    className="text-teal-500 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:outline-none 
    focus:ring-stone-400 font-medium rounded-lg text-xl font-semibold px-5 py-2.5 text-center inline-flex items-center
     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Reservas
    <svg
      className="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  {/* Dropdown menu */}
  <div
    id="dropdownDelayReservas"
    className="z-10 hidden bg-white divide-y divide-gray-100
     rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDelayButtonReservas"
    >
      <li>
        <a
          href="/ver-reserva"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Ver reserva
        </a>
      </li>
      <li>
        <a
          href="/modificar-reserva"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Modificar reservas
        </a>
      </li>
      <li>
        <a
          href="/lista-reservas"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Listas reservas
        </a>
      </li>
      <li>
        <a
          href="/agregar-consumo-reserva"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Agregar consumo a reserva
        </a>
      </li>
    </ul>
  </div>
</li>
{/* Desplegable Reservas */}
{/* Desplegable Panel de Control */}
<li>
  <button
    id="dropdownDelayButtonPanelControl"
    data-dropdown-toggle="dropdownDelayPanelControl"
    data-dropdown-delay="500"
    data-dropdown-trigger="hover"
    className="text-teal-500 bg-stone-300 hover:bg-stone-400 focus:ring-4 focus:outline-none 
    focus:ring-stone-400  rounded-lg text-xl font-semibold px-5 py-2.5 text-center inline-flex items-center
     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Panel de Control
    <svg
      className="w-2.5 h-2.5 ms-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 4 4 4-4"
      />
    </svg>
  </button>

  {/* Dropdown menu */}
  <div
    id="dropdownDelayPanelControl"
    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul
      className="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDelayButtonPanelControl"
    >
      <li>
        <a
          href="ingresar-gasto"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          ingresar gastos
        </a>
      </li>
      <li>
        <a
          href="/balance-general"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          balance General
        </a>
      </li>
      <li>
        <a
          href="/caja-chica"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Caja chica
        </a>
          <li>
        <a
          href="/habitaciones"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          habitaciones
        </a>
      </li>
      </li>
      <li>
        <a
          href="/registro"
          className="block px-4 py-2 hover:bg-teal-400 hover:text-white dark:hover:bg-gray-600 dark:hover:text-teal-500"
        >
          Nuevo usuario
        </a>
      </li>
    </ul>
  </div>
</li>
{/* Desplegable Panel de Control */}
<li>
  <a
              href='#'
              className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handleLogout}
            >
              Cerrar sesión
            </a>
</li>


      </ul>
    </div>
  </div>

            
            
        
       
      </nav>
    </>
  );

}

export default navbar