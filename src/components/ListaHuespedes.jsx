import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import axios from "axios";
import Footer from './shared/Footer';

function ListaHuespedes() {
  const [hosts, setHosts] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetchHosts();
  }, []);

  const fetchHosts = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/Huespedes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setHosts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de huéspedes:", error);
      });
  };

  const handleEliminar = (id) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/eliminarHuesped/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setShowConfirmation(false);
        fetchHosts(); // Recargar la lista de huéspedes después de eliminar
      })
      .catch((error) => {
        console.error("Error al eliminar el huésped:", error);
        // Aquí puedes mostrar un mensaje de error si es necesario
      });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  const handleEditar = (id) => {
    const confirmar = window.confirm("¿Estás seguro de editar el huésped?");
  
    if (confirmar) {
      // Obtener el token desde localStorage
      const token = localStorage.getItem("token");
  
      // Redirigir a la página de modificación de huésped con el ID y el token en la URL
      window.location.href = `/modificar-huesped/${id}?token=${token}`;
    }
  };
  const sortedHosts = [...hosts].sort((a, b) => {
    if (!sortColumn) return 0;
  
    const aValue = typeof a[sortColumn] === 'string' ? a[sortColumn] : String(a[sortColumn]);
    const bValue = typeof b[sortColumn] === 'string' ? b[sortColumn] : String(b[sortColumn]);
  
    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });
  

  return (
    <div className="bg-teal-50" >
    <Navbar />
    
<div className="flex justify-center h-full bg-teal-50">
<div className="px-4 w-full max-w-screen-lg">      

      <h1 className="text-4xl text-center mt-4 text-teal-500 font-bold mb-4">Lista de Huéspedes</h1>
      {showConfirmation && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className=" items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white p-4">
          <p className="text-lg text-teal-500 font-semibold mb-2">¿Estás seguro de eliminar el huésped?</p>
          <div className="flex justify-end">
            <button
              className="text-white font-semibold bg-teal-500 hover:bg-lime-500 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={() => setShowConfirmation(false)}
            >
              Cancelar
            </button>
            <button
              className="text-white font-semibold bg-teal-500 hover:bg-red-500 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={confirmDelete}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

<div className="shadow-2xl shadow-teal-500 overflow-hidden mb-0 border-gray-200 sm:rounded-lg">
            <div className="table-responsive">
              <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 ">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-base  font-medium text-teal-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("idHost")}
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-base  font-medium text-teal-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("hostName")}
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-base  font-medium text-teal-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("hostLastname")}
              >
                Apellido
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-base  font-medium text-teal-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("notes")}
              >
                Notas
              </th>
              <th scope="col" className="px-6 py-3 text-left text-base  font-medium text-teal-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-teal-50 divide-ydivide-gray-200">
            {sortedHosts.map((host) => (
              <tr key={host.idHost}>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-500 font-semibold ">{host.idHost}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-500 font-semibold ">{host.hostName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-500 font-semibold ">{host.hostLastname}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-500 font-semibold ">{host.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-500 font-semibold ">
                  <button onClick={() => handleEliminar(host.idHost)} className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    Eliminar
                  </button>
                  <button onClick={() => handleEditar(host.idHost)} className="text-white font-semibold bg-teal-500 hover:bg-gray-900 text-base focus:outline-none 
              focus:ring-4 focus:ring-gray-300  rounded-full  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
               dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Editar
            </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
}

export default ListaHuespedes;

