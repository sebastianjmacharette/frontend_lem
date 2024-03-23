import React, { useState, useEffect } from "react";
import Navbar from "./shared/navbar";
import Footer from "./shared/Footer";

function Home() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  // Ejecutar solo una vez después del renderizado inicial
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setUsername(storedUser);
    setRole(storedRole);
  }, []);

  return (
    <div className="h-screen bg-neutral-200">
      <Navbar />
      <div>
        <h1>Token: {token}</h1>
        <h2>Autenticado: {token ? "Sí" : "No"}</h2>
        <h2>Usuario: {username}</h2>
        <h2>Rol: {role}</h2>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
