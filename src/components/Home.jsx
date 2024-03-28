import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import Footer from "./shared/Footer";
import CalendarReservas from './CalendarReservas';
function Home() {
  const [token, setToken] = useState(null);

  // Ejecutar solo una vez después del renderizado inicial
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div className="bg-neutral-200">
      <Navbar />
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <div className="lg:col-span-2 w-full mx-0">
            {/* Contenido del div de 9 columnas */}
           <CalendarReservas/>
          </div>
          <div className="lg:col-span-1 bg-yellow-400 w-full mx-0">
            {/* Contenido del div de 3 columnas */}
            <h2>adaasdasdasdasdasdadas</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
