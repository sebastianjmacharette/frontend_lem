import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      { username: username, password: password }
    );
    // Si el inicio de sesión es exitoso, captura el token de autenticación
    const token = response.data.token;
    // Verifica si se recibió un token válido
    if (token) {
      // Almacena el token en el localStorage
      localStorage.setItem("token", token);
      // Redirige al usuario al home
      window.location.href = "/home";
    } else {
      // Si no se recibió un token válido, muestra un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se recibió un token de autenticación válido",
        footer: "Grupo Lem",
      });
    }
  } catch (error) {
    // Si hay un error en la solicitud, muestra un mensaje de error
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

          <label htmlFor="username" className="block mb-2 text-sm font-medium text-teal-500 dark:text-white">Usuario</label>

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

          <label htmlFor="password" className="block mb-2 text-basefont-medium text-teal-500 font-semibold dark:text-teal-500">Password</label>


          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
D
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

        {error && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span className="font-medium">Error:</span> {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
