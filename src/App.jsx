import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Registro from "./components/Registro";
import NuevoHuesped from "./components/NuevoHuesped";
import ModificarHuesped from "./components/ModificarHuesped";
import ListaHuespedes from "./components/ListaHuespedes";
import AgregarConsumoReserva from "./components/AgregarConsumoReserva";
import BalanceGeneral from "./components/BalanceGeneral";
import CajaChica from "./components/CajaChica";
import Habitaciones from "./components/Habitaciones";
import IngresarGastos from "./components/IngresarGastos";
import ModificarReserva from "./components/ModificarReserva";
import VerReserva from "./components/VerReserva";
import ListaReservas from "./components/ListaReservas";
import Reservation from "./components/Reservation";
import NombresAcompanantes from "./components/nombresAcompanantes";
import NuevaReserva from "./components/NuevaReserva";
import PreReserva from "./components/PreReserva";
import NuevaHabitacion from "./components/nueva-habitacion";
import ControlHabitaciones from "./components/ControlHabitaciones";
import ModificarHabitacion from "./components/ModificarHabitacion";
import CalendarReservas from "./components/CalendarReservas";
import MostrarHabitaciones from "./components/MostrarHabitaciones";
import PagoReserva from './components/PagoReserva';
import ConsultasRoom from "./components/ConsultasRoom";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/nuevo-huesped" element={<NuevoHuesped />} />
        <Route path="/modificar-huesped/:id" element={<ModificarHuesped />} />
        <Route path="/lista-huespedes" element={<ListaHuespedes />} />
        <Route
          path="/agregar-consumo-reserva"
          element={<AgregarConsumoReserva />}
        />
        <Route path="/balance-general" element={<BalanceGeneral />} />
        <Route path="/caja-chica" element={<CajaChica />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/ingresar-gasto" element={<IngresarGastos />} />
        <Route path="/modificar-reserva" element={<ModificarReserva />} />
        <Route path="/ver-reserva" element={<VerReserva />} />
        <Route path="/lista-reservas" element={<ListaReservas />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route
          path="/nombresAcompanantes/:idHost"
          element={<NombresAcompanantes />}
        />
        <Route path="/nueva-reserva/:idHost" element={<NuevaReserva />} />
        <Route path="/pre-reserva" element={<PreReserva />} />
        <Route path="/nueva-habitacion" element={<NuevaHabitacion />} />
        <Route path="/control-habitaciones" element={<ControlHabitaciones />} />
        <Route path="/modificar-habitacion/:id" element={<ModificarHabitacion />} />
        <Route path="/calendario-reservas" element={<CalendarReservas/>} />
        <Route path="/mostrar-habitaciones" element={<MostrarHabitaciones/>} />
        <Route path="/pago-reserva" element={<PagoReserva/>} />
        <Route path="/consultas-room" element={<ConsultasRoom/>} />




        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
