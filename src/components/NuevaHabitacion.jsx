import React from 'react'

function NuevaHabitacion() {
  return (
      <div>
          

{/* <!-- Modal toggle --> */}
<button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button>

{/* <!-- Main modal --> */}
          <div id="crud-modal" tabindex="-1" aria-hidden="true" className="hidden
 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center
 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ">
    <div className="relative p-4 w-full max-w-md max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b bg-neutral-200 shadow-2xl rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Crear nueva Habitación
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numero Habitacion</label>
                                  <input type="number" name="price" id="price" className="bg-gray-50 border
                         border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                          focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                            dark:focus:border-primary-500" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Seleccione estado</option>
                            <option value="LIBRE">LIBRE</option>
                            <option value="OCUPADA">OCUPADA</option>
                            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
S                        </select>
                    </div>
                               <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                  <input type="number" name="price" id="price" className="bg-gray-50 border
                         border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                          focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                            dark:focus:border-primary-500" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                  <input type="number" name="price" id="price" className="bg-gray-50 border
                         border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                          focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                            dark:focus:border-primary-500" placeholder="$2999" required=""/>
                    </div>
                   
                </div>
                          <button type="submit"
                                        className="text-white bg-teal-500 hover:bg-gray-900 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
>
                    Agregar Habitación
                </button>
            </form>
        </div>
    </div>
</div> 


    </div>
  )
}

export default NuevaHabitacion