import React, { useState } from "react";
import axios from "axios";
import Navbar from './shared/navbar';
import Swal from 'sweetalert2';

function Registro() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    try {
      if (password !== repeatPassword) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Las contraseñas no coinciden",
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/createUser",
        {
          email: email,
          username: username,
          password: password,
          roles: ["ADMIN"] // Aquí puedes ajustar los roles según tus necesidades
        }
      );

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Usuario creado satisfactoriamente",
      });

      // Redirigir al usuario a /home
      window.location.href = "/home";

    } catch (error) {
      setError("Error al registrar");
      console.error("Error al registrar:", error);
      // Aquí podrías mostrar una alerta de error
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="mt-10 text-center text-teal-500 text-4xl font-semibold">Nuevo Usuario</h2>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">¡Error!</span> {error}
        </div>
      )}
      <div className="px-10 sm:px-4 md:px-10 lg:px-60">
        <form onSubmit={handleRegistro}>
          <div className="mt-10">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-teal-500 dark:text-teal-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-neutral-200 border-2 border-black text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-500 dark:focus:ring-black dark:focus:border-black"
              placeholder="Email"
              required
            />
          </div>
          <div className="mt-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-teal-500 dark:text-teal-500">Usuario</label>
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
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-teal-500 dark:text-teal-500">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-neutral-200 border-2 border-black text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-500 dark:focus:ring-black dark:focus:border-black"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-teal-500 dark:text-teal-500">Confirmar Contraseña</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="bg-neutral-200 border-2 border-black text-teal-500 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-teal-500 dark:focus:ring-black dark:focus:border-black"
              placeholder="Confirmar Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-teal-500 hover:bg-gray-900 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}

export default Registro
