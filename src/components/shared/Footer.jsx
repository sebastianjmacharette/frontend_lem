import React from "react";

function Footer() {
  // Obtiene la fecha actual
  const currentDate = new Date();
  // Obtiene el nombre del día de la semana (ej: "Miércoles")
  const dayName = currentDate.toLocaleDateString("es-ES", { weekday: "long" });
  // Obtiene el nombre del mes (ej: "Marzo")
  const monthName = currentDate.toLocaleDateString("es-ES", { month: "long" });
  // Obtiene el año (ej: 2023)
  const year = currentDate.getFullYear();

  return (
    <footer
      className="bg-neutral-200 text-teal-500 dark:bg-gray-900 m-4"
      style={{ margin: 0 }}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 text-center font-bold">
        {/* Utiliza sm:flex-row para mostrar las imágenes en fila en pantallas pequeñas */}
        <div className="sm:flex sm:flex-row sm:items-center sm:justify-between">
          <img
            src="https://img.molachinoviajes.com/gallery/var/resizes/ranqueles.png?m=1709203019"
            className="h-12"
            alt="Flowbite Logo"
          />
          <img
            src="https://img.molachinoviajes.com/gallery/var/albums/lem.png?m=1708871487"
            className="h-20"
            alt="Flowbite Logo"
          />
        </div>
        <hr className="my-6 text-teal-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center">
          <span>
            {dayName}, {monthName} {year}{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              que nombre tenemos?™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
