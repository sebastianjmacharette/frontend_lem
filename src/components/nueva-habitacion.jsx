import React, { useState } from 'react';
import axios from 'axios';

function NuevaHabitacion() {
  const [habitacionData, setHabitacionData] = useState({
    roomNumber: '',
    roomState: 'LIBRE',
    price: 0, // Precio establecido en 0 por defecto
    roomBeds: ''
  });

  const [alertMessage, setAlertMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = e => {
    const { name, value } = e.target;
    setHabitacionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/NuevaHabitacion', habitacionData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setAlertMessage('¡Habitación creada exitosamente!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al crear la nueva habitación:', error);
      setAlertMessage('Error al crear la habitación. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Nueva Habitación</h1>
      {alertMessage && <div className="alert">{alertMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Número de Habitación:
          <input type="text" name="roomNumber" value={habitacionData.roomNumber} onChange={handleChange} required />
        </label>
        <label>
          Estado:
          <select name="roomState" value={habitacionData.roomState} onChange={handleChange}>
            <option value="LIBRE">LIBRE</option>
            <option value="OCUPADA">OCUPADA</option>
            <option value="EN MANTENIMIENTO">EN MANTENIMIENTO</option>
          </select>
        </label>
        {/* Campo de precio oculto con valor 0 */}
        <input type="hidden" name="price" value={habitacionData.price} />
        <label>
          Plazas:
          <input type="text" name="roomBeds" value={habitacionData.roomBeds} onChange={handleChange} required />
        </label>
        <button type="submit">Crear Habitación</button>
      </form>
    </div>
  );
}

export default NuevaHabitacion;
