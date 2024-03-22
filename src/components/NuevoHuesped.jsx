import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/navbar";
import { useNavigate } from "react-router-dom";

function NuevoHuesped() {
  const [formData, setFormData] = useState({
    hostName: "",
    hostLastname: "",
    hostDni: "",
    hostTelephone: "",
    hostBirthDay: "",
    notes: "",
    numberOfCompanions: 0,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/crearHuesped",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Huesped creado exitosamente");
        setFormData({
          hostName: "",
          hostLastname: "",
          hostDni: "",
          hostTelephone: "",
          hostBirthDay: "",
          notes: "",
          numberOfCompanions: 0,
        });
        // Almacenar los datos del huésped en localStorage
        localStorage.setItem("guestData", JSON.stringify(response.data));
        navigate(`/nombresAcompanantes/${response.data.idHost}`);
      } else {
        alert("Error al crear huesped");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear huesped");
    }
    setSubmitting(false);
  };

  const validateForm = () => {
    let errors = {};

    // Validación de campos
    if (!formData.hostName.trim()) {
      errors.hostName = "El nombre del huésped es requerido";
    }

    if (!formData.hostLastname.trim()) {
      errors.hostLastname = "El apellido del huésped es requerido";
    }

    if (!formData.hostDni.trim()) {
      errors.hostDni = "El DNI del huésped es requerido";
    } else if (!/^\d{8}$/.test(formData.hostDni.trim())) {
      errors.hostDni = "El DNI debe contener 8 dígitos numéricos";
    }

    if (!formData.hostTelephone.trim()) {
      errors.hostTelephone = "El teléfono del huésped es requerido";
    } else if (!/^\d{7,}$/.test(formData.hostTelephone.trim())) {
      errors.hostTelephone =
        "El teléfono debe contener al menos 7 dígitos numéricos";
    }

    if (!formData.hostBirthDay.trim()) {
      errors.hostBirthDay = "La fecha de nacimiento del huésped es requerida";
    }

    if (!formData.notes.trim()) {
      errors.notes = "Las observaciones son requeridas";
    }

    if (formData.numberOfCompanions < 0) {
      errors.numberOfCompanions =
        "El número de acompañantes debe ser mayor o igual a cero";
    }

    return errors;
  };

  const handleBlur = () => {
    setErrors(validateForm());
  };

  return (
    <div className="bg-neutral-200 h-screen">
      <Navbar />
      <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
  {/* Campo para el nombre del huésped */}
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="hostName"
      id="hostName"
      className="block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      value={formData.hostName}
      onChange={handleChange}
      onBlur={handleBlur} 

      required
    />
    <label
      htmlFor="hostName"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Nombre del Huesped
    </label>
  </div>
  
  {/* Campo para el apellido del huésped */}
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="hostLastname"
      id="hostLastname"
      className="block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      onBlur={handleBlur} // Agrega el evento onBlur

              
      value={formData.hostLastname}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="hostLastname"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Apellido del Huesped
    </label>
  </div>

  {/* Campo para el DNI del huésped */}
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="hostDni"
      id="hostDni"
      className="block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      value={formData.hostDni}
      onChange={handleChange}
      onBlur={handleBlur} // Agrega el evento onBlur
      required
    />
    <label
      htmlFor="hostDni"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      DNI del Huesped
    </label>
  </div>

  {/* Campo para el teléfono del huésped */}
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      name="hostTelephone"
      id="hostTelephone"
      className="block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      value={formData.hostTelephone}
     onChange={handleChange}
     onBlur={handleBlur} // Agrega el evento onBlur
     required
    />
    <label
      htmlFor="hostTelephone"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Teléfono del Huesped
    </label>
  </div>

  {/* Campo para la fecha de nacimiento del huésped */}
  <div className="relative z-0 w-full mb-5 group">
    <input
      type="date"
      name="hostBirthDay"
      id="hostBirthDay"
      className="block py-2.5 px-0 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      value={formData.hostBirthDay}
      onChange={handleChange}
                    onBlur={handleBlur} // Agrega el evento onBlur

      required
    />
    <label
      htmlFor="hostBirthDay"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Fecha de Nacimiento del Huesped
    </label>
  </div>

  {/* Campo para las observaciones */}
  <div className="relative z-0 w-full mb-5 group">
    <textarea
      name="notes"
      id="notes"
      className="block py-2.5 px-4 w-full text-sm text-teal-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
      placeholder=" "
      value={formData.notes}
      onChange={handleChange}
      required
    />
    <label
      htmlFor="notes"
      className="peer-focus:font-medium absolute text-sm text-teal-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      Observaciones
    </label>
  </div>

  {/* Campo para el número de acompañantes */}
  <div className="relative z-0 w-full mb-5 group">
    <select
      name="numberOfCompanions"
      id="numberOfCompanions"
      className="bg-neutral-200 border-teal-500 text-teal-500 text-semibold rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={formData.numberOfCompanions}
      onChange={handleChange}
      required
    >
      <option value="" disabled>
        Cantidad de Acompañantes
      </option>
      {/* Opciones para el número de acompañantes */}
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      {/* Agrega más opciones según sea necesario */}
    </select>
  </div>

  {/* Botón para enviar el formulario */}
  <button
    type="submit"
    className="text-white bg-teal-500 hover:bg-grasy-900 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    disabled={submitting}
  >
    {submitting ? "Enviando..." : "Nuevo Huesped"}
  </button>
</form>





      </div>
  );
}

export default NuevoHuesped;
