import React, { useState, useEffect } from "react";
import Navbar from './shared/navbar';
import Calendar from "./calendar";
import Footer from "./shared/Footer";



function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Obtener el nombre de usuario desde el localStorage
    const storedUsername = localStorage.getItem("username");
    // Actualizar el estado con el nombre de usuario almacenado
    setUsername(storedUsername);
  }, []);

  return (
    <div>
      <Navbar />
      <Calendar />
      <Footer />
    </div>
  );
}

export default Home;
