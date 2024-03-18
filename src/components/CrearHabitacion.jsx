import React from 'react';
import Navbar from './shared/navbar';

function CrearHabitacion({ habitacionCreadaExitosamente }) {
    return (
        <div  className='bg-neutral-200 '>
            <Navbar />
            {habitacionCreadaExitosamente ? (
                <div className="alert alert-success " role="alert">
                    Habitación creada exitosamente.
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div>
            ) : (
                <div className="alert alert-danger" role="alert">
                    Ha ocurrido un error al crear la habitación. Por favor, inténtalo de nuevo.
                    <button type="button" className="btn-close" aria-label="Close"></button>
                </div>
            )}

            <h2>Crear Nueva Habitación</h2>
            <div>
                <div>
                    <form action="/habitaciones/crear" method="post">
                        <div>
                            <label htmlhtmlFor="numeroHabitacion">Número de Habitación:</label>
                            <input type="text" id="numeroHabitacion" name="numeroHabitacion" required />
                        </div>
                        <div>
                            <label htmlhtmlFor="capacidadHabitacion">Capacidad de la Habitación:</label>
                            <input type="number" id="capacidadHabitacion" name="capacidadHabitacion" required />
                        </div>
                        <div>
                            <label htmlhtmlFor="precio">Precio:</label>
                            <input type="number" id="precio" name="precio" required />
                        </div>
                        <button type="submit">Crear Habitación</button>
                    </form>
                </div>
                <div>
                    <img src="https://img.molachinoviajes.com/gallery/var/albums/lem.png?m=1708871487" alt="Imagen" />
                </div>
            </div>
        </div>
    );
}

export default CrearHabitacion;
