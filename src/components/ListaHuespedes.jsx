import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import axios from "axios";

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

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  return (
    <div className="overflow-x-auto">
      <Navbar />
      <h1 className="text-xl font-bold mb-4">Lista de Huéspedes</h1>
      {showConfirmation && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white p-4">
          <p className="text-lg mb-2">¿Estás seguro de eliminar el huésped?</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => setShowConfirmation(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
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

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("idHost")}
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("hostName")}
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("hostLastname")}
              >
                Apellido
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("notes")}
              >
                Notas
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-ydivide-gray-200">
            {sortedHosts.map((host) => (
              <tr key={host.idHost}>
                <td className="px-6 py-4 whitespace-nowrap">{host.idHost}</td>
                <td className="px-6 py-4 whitespace-nowrap">{host.hostName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{host.hostLastname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{host.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEliminar(host.idHost)} className="text-indigo-600 hover:text-indigo-900">
                    Eliminar
                  </button>
                  <button onClick={() => handleEditar(host.idHost)} className="text-indigo-600 hover:text-indigo-900 ml-2">
              Editar
            </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaHuespedes;

