import React from "react";
import { useSelector } from 'react-redux';
import Navbar from './shared/navbar';
import Footer from "./shared/Footer";

function Home() {
  // Usa useSelector para acceder al estado de Redux
  const token = useSelector(state => state.token.token);
  const isAuthenticated = useSelector(state => state.token.isAuthenticated);

  return (
    <div className="h-screen bg-neutral-200">
      <Navbar />
      <div>
        {/* Muestra los datos almacenados en Redux */}
        <h1>Token: {token}</h1>
        <h2>Autenticado: {isAuthenticated ? 'Sí' : 'No'}</h2>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
