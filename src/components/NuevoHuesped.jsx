import React from "react";
import Navbar from "./shared/navbar";

function NuevoHuesped() {
	return (
		<div className='bg-neutral-200 h-screen '>
			<Navbar />

			<form className='max-w-md mx-auto mt-4'>
				<div className='grid md:grid-cols-2 md:gap-6'>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='text'
							name='floating_first_name'
							id='floating_first_name'
							className='block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
							placeholder=' '
							required
						/>
						<label
							htmlFor='floating_first_name'
							className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Nombre
						</label>
					</div>
					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='text'
							name='floating_last_name'
							id='floating_last_name'
							className='block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
							placeholder=' '
							required
						/>
						<label
							htmlFor='floating_last_name'
							className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Apellido
						</label>
					</div>
				</div>
				<div className='relative z-0 w-full mb-5 group'>
					<input
						type='text'
						name='floating_dni'
						id='floating_dni'
						className='block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
						placeholder=' '
						required
					/>
					<label
						htmlFor='floating_email'
						className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						DNI
					</label>
				</div>
				<div className='relative z-0 w-full mb-5 group'>
  <select id="countries" className="bg-neutral-200 border-teal-500 text-teal-500 text-semibold rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
   <option className="text-teal-500 text-semibold" selected disabled>Cantidad de Acompañantes</option>
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
				

				<div className='grid md:grid-cols-2 md:gap-6'>
					<div className='grid md:grid-cols-2 md:gap-6'>
  <div className='relative z-0 w-full mb-5 group'>
  <input
						type='text'
						name='floating_telefono'
						id='floating_telefono'
						className='block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
						placeholder=' '
						required
					/>
					<label
						htmlFor='floating_password'
						className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Telefono
					</label>
   
  </div>
</div>

					<div className='relative z-0 w-full mb-5 group'>
						<input
							type='date'
							name='floating_bird'
							id='floating_bird'
							className='block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
							placeholder=' '
							required
						/>
						<label
							htmlFor='floating_company'
							className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
						>
							Fecha nacimiento
						</label>
					</div>
          <div className='relative z-0 w-full mb-5 group'>
			<textarea
  name='repeat_observaciones'
  id='floating_repeat_observaciones'
  className='block py-2.5 px-4 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer'
  placeholder=' '
  required
/>

					<label
						htmlFor='floating_repeat_password'
						className='peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
					>
						Observaciones
					</label>
				</div>
				</div>
				<button
					type='submit'
          className="text-white bg-teal-500 hover:bg-grasy-900 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					Nuevo Huesped
				</button>
			</form>
		</div>
	);
}

export default NuevoHuesped;
