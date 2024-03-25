import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/navbar";
import { useNavigate } from "react-router-dom";
import Footer from './shared/Footer';


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
    <div className="bg-teal-50 h-full">
      <Navbar />
      <div className="mt-4">
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
  <div 
    className="bg-teal-500 text-base  font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" 
    style={{ width: '30%' }}
  >
    30%
  </div>
</div>

      </div>
  

      <h2 className="text-teal-500 font-sans font-bold text-2xl text-center mt-4 ">
        Agregar Husped / Reserva
      </h2>

      <form className=" m-10 " onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <div className="md:w-1/2">
            {/* Campo para el nombre del huésped */}
            <div className="relative z-0 w-full mb-5 group">
              <div>
                <label htmlFor="hostName" className=" text-teal-500 text-base  font-semibold ">
                  Nombre del Huesped
                </label>
              </div>

              <input
                type="text"
                name="hostName"
                id="hostName"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                 focus:outline-none rounded-2xl text-base  focus:border-teal-600"
                placeholder=" "
                value={formData.hostName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>

            {/* Campo para el apellido del huésped */}
            <div className="relative z-0 w-full mb-5 group">
            <div>
                    <label
                htmlFor="hostLastname"
                className=" text-teal-500 text-base  font-semibold "              >
                Apellido del Huesped
              </label>
              </div>
              <input
                type="text"
                name="hostLastname"
                id="hostLastname"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                placeholder=" "
                onBlur={handleBlur} // Agrega el evento onBlur
                value={formData.hostLastname}
                onChange={handleChange}
                required
              />
             
          
            </div>

            {/* Campo para el DNI del huésped */}
            <div className="relative z-0 w-full mb-5 group">
            <div>
                <label
                htmlFor="hostDni"
                className="text-teal-500 text-base  font-semibold"
                
              >
                DNI del Huesped
              </label> 
              </div>
              <input
                type="text"
                name="hostDni"
                id="hostDni"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                placeholder=" "
                value={formData.hostDni}
                onChange={handleChange}
                onBlur={handleBlur} // Agrega el evento onBlur
                required
              />
             
             
            </div>

            {/* Campo para el teléfono del huésped */}
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative z-0 w-full mb-5 group">
            <div>
                <label
                htmlFor="hostTelephone"
                className="text-teal-500 text-base  font-semibold"
              >
                Teléfono del Huesped
              </label>
              </div>
              <input
                type="text"
                name="hostTelephone"
                id="hostTelephone"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                placeholder=" "
                value={formData.hostTelephone}
                onChange={handleChange}
                onBlur={handleBlur} // Agrega el evento onBlur
                required
              />
              
              
            </div>

            {/* Campo para la fecha de nacimiento del huésped */}
            <div className="relative z-0 w-full mb-5 group">
            <div>
              <label
                htmlFor="hostBirthDay"
                className="text-teal-500 text-base  font-semibold"
              >
                Fecha de Nacimiento del Huesped
              </label>
              </div>
              <input
                type="date"
                name="hostBirthDay"
                id="hostBirthDay"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                placeholder=" "
                value={formData.hostBirthDay}
                onChange={handleChange}
                onBlur={handleBlur} // Agrega el evento onBlur
                required
              />
             
             
            </div>

            {/* Campo para las observaciones */}
            <div className="relative z-0 w-full mb-5 group">
            <div>
               <label
                htmlFor="notes"
                className="text-teal-500 text-base  font-semibold"
              >
                Observaciones
              </label> 
              </div>
              <textarea
                name="notes"
                id="notes"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                placeholder=" "
                value={formData.notes}
                onChange={handleChange}
                required
              />
            
              
            </div>

            {/* Campo para el número de acompañantes */}
            <div className="relative z-0 w-full mb-5 group">
            <div>
               <label
                htmlFor="notes"
                className="text-teal-500 text-base  font-semibold"
              >
                CANTIDAD DE ACOMPAÑANTES
              </label> 
              </div>
              <select
                name="numberOfCompanions"
                id="numberOfCompanions"
                className=" text-teal-500 bg-transparent border-b-2 border-teal-500 
                focus:outline-none rounded-2xl text-base  focus:border-teal-600"                value={formData.numberOfCompanions}
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
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>

            {/* Botón para enviar el formulario */}
            <button
              type="submit"
              className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"              disabled={submitting}
            >
              {submitting ? "Enviando..." : "Nuevo Huesped"}
            </button>
          </div>
        </div>
      </form>
      
      <Footer/>
    </div>
  );
}

export default NuevoHuesped;
