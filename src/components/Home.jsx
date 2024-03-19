import React, { useEffect, useState } from "react";
import Navbar from './shared/navbar';
import Calendar from "./calendar";
import Footer from "./shared/Footer";

function Home() {
  // Recuperar el token y el usuario del almacenamiento local
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return (
    <div>
       <Navbar /> 
      <h2>{user}</h2>
      <h2>{token }</h2>
       <Calendar /> 
       <Footer /> 
    </div>
  );
}

export default Home;
