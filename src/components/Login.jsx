import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password }
      );

      const responseData = response.data;
      console.log("Respuesta del inicio de sesión:", responseData);

      if (responseData.token) {
        const token = responseData.token;
        const user = responseData.Username; // Ajusta si el nombre de la propiedad es diferente
        const role = responseData.Role; // Ajusta si el nombre de la propiedad es diferente

        console.log("Token de autenticación:", token);
        console.log("Nombre de usuario:", user);
        console.log("Rol:", role);

        // Almacena la información en LocalStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("role", role);

        // Redirecciona a la página principal o la que desees
        window.location.href = "/home";
      } else {
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
        text: "¡Usuario o contraseña incorrectos!",
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
