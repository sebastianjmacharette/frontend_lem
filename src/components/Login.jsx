import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setToken } from './token/tokenSlice'; // Importa la acción setToken del slice

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); // Obtén la función dispatch

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username: username, password: password }
      );
      const responseData = response.data;
      
      // Verificar si se recibió un token en la respuesta
      if (responseData.token) {
        const token = responseData.token;
        const user = responseData.Username;
        const role = responseData.Role; // Agregar captura del rol
        console.log("Token de autenticación:", token);
        console.log("Usuario:", user);
        console.log("Rol:", role); // Mostrar el rol en la consola
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role); // Almacenar el rol en localStorage
        console.log("Token almacenado en localStorage:", token);

        // Actualiza el estado del token en Redux
        dispatch(setToken(token));

        // Redirigir al usuario a la página de inicio
        window.location.href = "/home";
      } else {
        // Si no se recibió un token en la respuesta, mostrar un mensaje de error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se recibió un token de autenticación válido",
          footer: "Grupo Lem",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos!",
        footer: "Grupo Lem",
      });
    }
  };


  return (
    <div className="h-screen bg-neutral-200 ">
      <div className="flex items-start mb-5 justify-content-center">
        <div className="mx-auto">
          <img
            className="w-48 mt-20"
            src="https://img.molachinoviajes.com/gallery/var/albums/lem.png?m=1708871487"
            alt="grupo lem"
          />
        </div>
      </div>

      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-base font-medium text-teal-500 font-semibold dark:text-teal-500">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-neutral-200 border-2 border-black text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-500 dark:focus:ring-black dark:focus:border-black"
            placeholder="Usuario"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-base font-medium text-teal-500 font-semibold dark:text-teal-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-200 border-2 border-black text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-500 dark:focus:ring-black dark:focus:border-black"
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-teal-500 hover:bg-gray-900 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
